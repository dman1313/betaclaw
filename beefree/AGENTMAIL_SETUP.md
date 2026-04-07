# 📧 AgentMail Newsletter Delivery - SETUP COMPLETE ✅

## Status: Ready to Send Newsletters

AgentMail API integrated with BEEFree newsletter editor. You can now:
- Use existing newsletter inboxes
- Design newsletters in BEEFree editor
- Export HTML and send via AgentMail

## Quick Start

### Your Existing Inboxes

You already have 3 AgentMail inboxes:
```
1. AgentMail
   Email: npoclaw@agentmail.to
   Inbox ID: npoclaw@agentmail.to

2. SchoolClaw
   Email: schoolclaw@agentmail.to
   Inbox ID: schoolclaw@agentmail.to

3. Wolf Claw
   Email: wolf@agentmail.to
   Inbox ID: wolf@agentmail.to
```

### 1. Design Newsletter

1. Open BEEFree editor: http://localhost:8080/newsletter-editor.html
2. Design your newsletter (or load template: http://localhost:8080/templates.html)
3. Click **"Export HTML"** to download the finished newsletter
4. Save as `newsletter.html`

### 2. Send Newsletter

```bash
cd ~/workspace/beefree

# Send to single recipient
npm run newsletter:send <inbox-id> <to> <subject> <html-file>

# Example using npoclaw inbox:
npm run newsletter:send npoclaw@agentmail.to user@example.com "Weekly Update" newsletter.html
```

**Output:**
```
📧 Sending newsletter...
   To: user@example.com
   Subject: Weekly Update

✅ Newsletter sent successfully!
   Message ID: msg_xyz789
```

## CLI Commands

### List Inboxes
```bash
npm run inbox:list
# Or:
node send-newsletter.js list-inboxes
```

### Send Newsletter
```bash
npm run newsletter:send <inbox-id> <to> <subject> <html-file>

# Example:
npm run newsletter:send npoclaw@agentmail.to user@example.com "Hello" newsletter.html
```

## Complete Workflow Example

### Send a Newsletter in 3 Steps

**Step 1: Design**
```bash
# Open editor
open http://localhost:8080/templates.html

# Or use template:
node load-template.js load newsletter-basic
```

**Step 2: Export**
- In BEEFree editor, click **"Export HTML"**
- Save as `newsletter.html`

**Step 3: Send**
```bash
cd ~/workspace/beefree

# Send newsletter
npm run newsletter:send npoclaw@agentmail.to user@example.com "Newsletter" newsletter.html
```

## Advanced Usage

### HTML Content

The newsletter HTML exported from BEEFree includes:
- Inline styles for email clients
- Responsive design
- Optimized images
- Email-safe HTML structure

### Rate Limiting

The sending script includes rate limiting:
- 1 second delay between sends
- Prevents API rate limit (429)
- Automatic retries with exponential backoff

### Error Handling

Errors are clearly reported:
```
❌ Failed to send newsletter: Rate limit exceeded
   Status: 429
   Details: { "message": "Too many requests" }
```

## API Integration

### Manual API Usage

```javascript
const { AgentMailClient } = require('agentmail');

const client = new AgentMailClient({
  apiKey: process.env.AGENTMAIL_API_KEY,
});

// Send newsletter
await client.inboxes.messages.send(inboxId, {
  to: 'recipient@example.com',
  subject: 'My Newsletter',
  html: '<h1>Hello</h1><p>This is my newsletter.</p>',
  text: 'Hello\n\nThis is my newsletter.', // Fallback
});
```

## Environment Variables

Already configured in `~/workspace/beefree/.env`:
```env
AGENTMAIL_API_KEY=am_us_e12644ae04a07e44d37fe3e3a544592c1720642f1ab64b4e8601a86c0d46fb55
```

**Security**: ✅ API key stored in .env (server-side only)

## Files Created

- **send-newsletter.js** - Newsletter delivery service
- **test-agentmail.js** - API connectivity test
- **package.json** - Updated with newsletter scripts
- **.env** - AgentMail API key configured

## Next Steps

1. **Design newsletter**: http://localhost:8080/newsletter-editor.html
2. **Export HTML** from editor
3. **Send newsletter**: `npm run newsletter:send <inbox-id> <to> <subject> <html-file>`

## Troubleshooting

### API Key Not Working
```bash
# Verify key is set
grep AGENTMAIL_API_KEY ~/workspace/beefree/.env

# Should show your key starting with "am_us_"
```

### Inbox Not Found
```bash
# List all inboxes to find correct ID
npm run inbox:list
```

### Rate Limit Exceeded
The script includes automatic rate limiting. If you see 429 errors:
- Wait a few seconds before retrying
- Check your plan limits
- Consider upgrading if sending high volume

## Documentation

- **AgentMail Docs**: https://docs.agentmail.to
- **API Reference**: https://docs.agentmail.to/api-reference
- **Quickstart**: https://docs.agentmail.to/quickstart
- **BEEFree Setup**: ~/workspace/beefree/SETUP_SUCCESS.md
- **Newsletter Templates**: ~/workspace/beefree/templates/

---

**Status**: ✅ AgentMail integrated and ready
**API Key**: Configured and verified
**Inboxes**: 3 existing inboxes available
**Newsletter Designer**: Running
**Ready to send!** 📧✨
