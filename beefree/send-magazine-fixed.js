#!/usr/bin/env node
const fs = require('fs');
require('dotenv').config({ path: '/home/node/.openclaw/workspace/beefree/.env' });
const { AgentMailClient } = require('agentmail');

async function main() {
  const client = new AgentMailClient({ apiKey: process.env.AGENTMAIL_API_KEY });
  const html = fs.readFileSync('/home/node/.openclaw/workspace/beefree/paris-spring-magazine.html', 'utf8')
    .replace(/<tr>\s*<td style="padding:0;">[\s\S]*?<\/td>\s*<\/tr>/, '')
    .replace('Prepared in magazine style for review and email layout.', 'Prepared in magazine style for review. The patio photo is attached to this email.');

  const imageB64 = fs.readFileSync('/home/node/.openclaw/workspace/beefree/templates/paris-patio.jpg').toString('base64');

  const result = await client.inboxes.messages.send('npoclaw@agentmail.to', {
    to: ['dwayneprimeau@gmail.com'],
    subject: 'Spring in Paris, on Two Wheels and Over Lunch (photo attached)',
    html,
    text: 'Spring in Paris, on Two Wheels and Over Lunch\n\nThe patio photo is attached to this email.\n\nThere is a particular kind of transformation that happens in Paris when spring arrives. After months of grey skies, cold air, and the heaviness that winter seems to leave behind, the city begins to open again. Light returns first. Then warmth. Then, almost all at once, people reclaim the terraces, the sidewalks, and the slow pleasures of being outside together.',
    attachments: [{
      content: imageB64,
      filename: 'paris-patio.jpg',
      contentType: 'image/jpeg'
    }]
  });

  console.log(JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
