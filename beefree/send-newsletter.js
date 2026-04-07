#!/usr/bin/env node

/**
 * AgentMail Newsletter Delivery Service
 * Send HTML newsletters from BEEFree editor via AgentMail API
 */

const { AgentMailClient } = require('agentmail');
require('dotenv').config();

class NewsletterSender {
  constructor() {
    this.client = new AgentMailClient({
      apiKey: process.env.AGENTMAIL_API_KEY,
    });
  }

  /**
   * Create a new inbox for newsletters
   */
  async createInbox(displayName = 'Newsletter Agent') {
    try {
      const inbox = await this.client.inboxes.create({
        displayName,
        clientId: 'newsletter-inbox-v1', // For idempotent retries
      });

      console.log('✅ Newsletter inbox created!');
      console.log(`   Inbox ID: ${inbox.inboxId}`);
      console.log(`   Email: ${inbox.emailAddress}`);
      console.log('');
      return inbox;

    } catch (error) {
      console.error('❌ Failed to create inbox:', error.message);
      throw error;
    }
  }

  /**
   * List existing inboxes
   */
  async listInboxes() {
    try {
      const inboxes = await this.client.inboxes.list();
      console.log('📬 Existing inboxes:');
      console.log('');

      if (inboxes.inboxes.length === 0) {
        console.log('   No inboxes found. Create one first:');
        console.log('   node send-newsletter.js create-inbox');
        return [];
      }

      inboxes.inboxes.forEach((inbox, i) => {
        console.log(`   ${i + 1}. ${inbox.displayName || 'Untitled'}`);
        console.log(`      Email: ${inbox.emailAddress}`);
        console.log(`      ID: ${inbox.inboxId}`);
        console.log('');
      });

      return inboxes.inboxes;

    } catch (error) {
      console.error('❌ Failed to list inboxes:', error.message);
      throw error;
    }
  }

  /**
   * Send newsletter HTML to recipients
   */
  async sendNewsletter(inboxId, options) {
    const {
      to,
      subject,
      html,
      text,
      cc,
      bcc,
    } = options;

    try {
      console.log(`📧 Sending newsletter...`);
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log('');

      const result = await this.client.inboxes.messages.send(inboxId, {
        to,
        subject,
        html,
        text: text || this.extractTextFromHtml(html),
        cc,
        bcc,
      });

      console.log('✅ Newsletter sent successfully!');
      console.log(`   Message ID: ${result.messageId}`);
      console.log('');
      return result;

    } catch (error) {
      console.error('❌ Failed to send newsletter:', error.message);
      if (error.response) {
        console.error('   Status:', error.response.status);
        console.error('   Details:', error.response.data);
      }
      throw error;
    }
  }

  /**
   * Send newsletter to multiple recipients
   */
  async broadcastNewsletter(inboxId, options) {
    const {
      recipients,
      subject,
      html,
      text,
    } = options;

    console.log(`📣 Broadcasting to ${recipients.length} recipients...`);
    console.log('');

    const results = [];

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];

      try {
        const result = await this.sendNewsletter(inboxId, {
          to: recipient,
          subject,
          html,
          text,
        });

        results.push({
          recipient,
          success: true,
          messageId: result.messageId,
        });

        // Rate limiting - small delay between sends
        if (i < recipients.length - 1) {
          await this.sleep(1000);
        }

      } catch (error) {
        results.push({
          recipient,
          success: false,
          error: error.message,
        });
      }
    }

    // Print summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log('📊 Broadcast complete!');
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ❌ Failed: ${failed}`);

    if (failed > 0) {
      console.log('');
      console.log('Failed recipients:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`   ${r.recipient}: ${r.error}`);
      });
    }

    return results;
  }

  /**
   * Extract plain text from HTML for fallback
   */
  extractTextFromHtml(html) {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .trim()
      .substring(0, 5000); // Limit length
  }

  /**
   * Helper: Sleep for rate limiting
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const sender = new NewsletterSender();

  switch (command) {
    case 'create-inbox': {
      const displayName = args[1] || 'Newsletter Agent';
      await sender.createInbox(displayName);
      break;
    }

    case 'list-inboxes': {
      await sender.listInboxes();
      break;
    }

    case 'send': {
      if (args.length < 5) {
        console.log('Usage: node send-newsletter.js send <inbox-id> <to> <subject> <html-file>');
        console.log('');
        console.log('Example:');
        console.log('  node send-newsletter.js send inbox123 user@example.com "My Newsletter" newsletter.html');
        process.exit(1);
      }

      const inboxId = args[1];
      const to = args[2];
      const subject = args[3];
      const htmlFile = args[4];

      const fs = require('fs');
      if (!fs.existsSync(htmlFile)) {
        console.error(`❌ File not found: ${htmlFile}`);
        process.exit(1);
      }

      const html = fs.readFileSync(htmlFile, 'utf8');
      await sender.sendNewsletter(inboxId, { to, subject, html });
      break;
    }

    default:
      console.log(`
AgentMail Newsletter Delivery Service

Usage:
  node send-newsletter.js create-inbox [display-name]    - Create new newsletter inbox
  node send-newsletter.js list-inboxes              - List all inboxes
  node send-newsletter.js send <inbox-id> <to> <subject> <html-file>  - Send newsletter

Examples:
  # Create inbox
  node send-newsletter.js create-inbox "My Newsletter Agent"

  # List inboxes
  node send-newsletter.js list-inboxes

  # Send newsletter
  node send-newsletter.js send inbox123 user@example.com "Weekly Update" newsletter.html

Notes:
  - HTML file should be exported from BEEFree editor
  - Rate limiting applies (1 second between sends)
  - Use create-inbox first to get your inbox ID
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = NewsletterSender;
