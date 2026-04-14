#!/usr/bin/env python3
import json, urllib.request
from pathlib import Path

env = {}
for line in Path('/home/node/.openclaw/workspace/.env.secrets').read_text().splitlines():
    line = line.strip()
    if '=' in line and not line.startswith('#'):
        k, v = line.split('=', 1)
        env[k] = v
api_key = env['MAILCHIMP_API_KEY']
server_prefix = env['MAILCHIMP_SERVER_PREFIX']
campaign_id = '7ce5c98a39'
email = 'dwayneprimeau@gmail.com'

req = urllib.request.Request(
    f"https://{server_prefix}.api.mailchimp.com/3.0/campaigns/{campaign_id}/actions/test",
    data=json.dumps({'test_emails': [email], 'send_type': 'html'}).encode(),
    headers={'Authorization': f'Basic {api_key}', 'Content-Type': 'application/json'},
    method='POST'
)
with urllib.request.urlopen(req) as r:
    print(json.dumps({'campaignId': campaign_id, 'email': email, 'status': r.status}))
