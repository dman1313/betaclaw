#!/usr/bin/env node

/**
 * Test AgentMail API connectivity
 */

require('dotenv').config();
const { AgentMailClient } = require('agentmail');

async function testAgentMail() {
  console.log('🔑 Testing AgentMail API...');
  console.log('');

  if (!process.env.AGENTMAIL_API_KEY) {
    console.error('❌ AGENTMAIL_API_KEY not set in .env');
    process.exit(1);
  }

  const client = new AgentMailClient({
    apiKey: process.env.AGENTMAIL_API_KEY,
  });

  try {
    // Test: List inboxes
    console.log('📬 Listing inboxes...');
    const inboxes = await client.inboxes.list();
    console.log(`✅ Found ${inboxes.inboxes.length} inbox(es)`);
    console.log('');

    inboxes.inboxes.forEach((inbox, i) => {
      console.log(`   ${i + 1}. ${inbox.displayName || 'Untitled'}`);
      console.log(`      Email: ${inbox.emailAddress}`);
      console.log(`      ID: ${inbox.inboxId}`);
      console.log('');
    });

    // Test: Create test inbox
    console.log('➕ Creating test inbox...');
    const testInbox = await client.inboxes.create({
      displayName: 'Test Newsletter Agent',
      clientId: 'test-inbox-v1',
    });

    console.log('✅ Test inbox created!');
    console.log(`   Email: ${testInbox.emailAddress}`);
    console.log(`   ID: ${testInbox.inboxId}`);
    console.log('');

    // Test: Send test message
    console.log('📧 Sending test message...');
    const testMessage = await client.inboxes.messages.send(testInbox.inboxId, {
      to: testInbox.emailAddress, // Send to self
      subject: 'AgentMail Test Message',
      text: 'This is a test message from your newsletter system.',
      html: '<p>This is a <strong>test message</strong> from your newsletter system.</p>',
    });

    console.log('✅ Test message sent!');
    console.log(`   Message ID: ${testMessage.messageId}`);
    console.log('');

    console.log('🎉 All AgentMail tests passed!');
    console.log('');
    console.log('Your AgentMail API is working and ready for newsletter delivery.');
    console.log('');
    console.log('Next steps:');
    console.log('1. Design newsletter: http://localhost:8080/newsletter-editor.html');
    console.log('2. Export HTML from editor');
    console.log('3. Send: npm run newsletter:send <inbox-id> <to> <subject> <html-file>');

  } catch (error) {
    console.error('❌ AgentMail API test failed');
    console.error('');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
    process.exit(1);
  }
}

testAgentMail();
