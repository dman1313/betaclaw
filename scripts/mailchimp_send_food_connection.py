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
list_id = env['MAILCHIMP_LIST_ID']
urls = json.loads(Path('/home/node/.openclaw/workspace/food-image-urls.json').read_text())

html = f'''<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Food: What Actually Connects Us</title>
<style>
body {{ font-family: Georgia, 'Times New Roman', serif; line-height: 1.8; color: #3b332d; max-width: 680px; margin: 0 auto; padding: 0; background: #ffffff; }}
p {{ margin: 0 0 18px 0; }}
.hero, .section {{ padding: 0 34px; }}
img {{ max-width:100%; display:block; border:0; }}
</style></head><body>
<div style="background:#f5f1ea;padding:36px 28px 16px 28px;">
<p style="text-align:center;letter-spacing:2px;text-transform:uppercase;color:#7b6a58;margin:0 0 14px 0;font-size:12px;">Food Notes</p>
<h1 style="text-align:center;margin:0;color:#2d241d;font-size:34px;line-height:1.2;font-weight:normal;">Food: What Actually Connects Us</h1>
<p style="text-align:center;color:#6d6257;margin:16px 0 0 0;font-size:17px;line-height:1.6;">People don’t bond over mission statements. They bond over food.</p>
</div>
<img src="{urls['food-hero-1.jpg']}" alt="Food hero" style="width:100%;">
<div class="section" style="padding:26px 34px 18px 34px;">
<p>That’s not poetic. It’s just how it works. When you sit across from someone and share a meal, the conversation changes. You might start with the dish, but you end up in stories about family, about places they’ve lived, about what they miss. Food creates space where strangers can just talk.</p>
<p>I’ve seen this everywhere. In Paris, people linger at tables for hours not because they’re hungry, but because that time matters. In Malaysia, hawker centers aren’t just places to grab dinner—they’re where languages mix, where someone’s grandmother’s recipe ends up in front of you, where you taste something new without even asking.</p>
</div>
<div style="padding:0 34px 24px 34px;"><img src="{urls['food-scene-2.jpg']}" alt="Food scene"></div>
<div class="section" style="padding:0 34px 20px 34px;">
<p>The research backs this up. Social eating builds trust faster than almost anything else. There’s something simple about passing plates, about saying “you have to try this,” about sitting down instead of standing across from each other. You’re not arguing. You’re just eating.</p>
</div>
<div style="padding:0 34px 24px 34px;"><img src="{urls['food-scene-3.jpg']}" alt="Sharing food"></div>
<div class="section" style="padding:0 34px 30px 34px;">
<p>Food doesn’t fix everything. It doesn’t erase history or difference. But it gives people a reason to be in the same room. It turns a stranger into someone whose food you want to try again.</p>
<p>That’s the part that sticks. A good meal isn’t just flavors. It’s a memory of who you ate it with.</p>
</div>
<div style="background:#2d241d;padding:18px 24px;"><p style="text-align:center;color:#f5f1ea;margin:0;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Food notes, one bite at a time</p></div>
</body></html>'''

campaign_data = {
    'type': 'regular',
    'recipients': {'list_id': list_id},
    'settings': {
        'subject_line': 'Food: What Actually Connects Us',
        'title': 'Food Connection Newsletter',
        'from_name': 'Dwayne Primeau',
        'reply_to': 'dwayneprimeau@gmail.com',
        'auto_footer': True,
        'inline_css': True
    }
}
req = urllib.request.Request(
    f"https://{server_prefix}.api.mailchimp.com/3.0/campaigns",
    data=json.dumps(campaign_data).encode(),
    headers={'Authorization': f'Basic {api_key}', 'Content-Type': 'application/json'},
    method='POST'
)
with urllib.request.urlopen(req) as r:
    campaign = json.loads(r.read())
content_req = urllib.request.Request(
    f"https://{server_prefix}.api.mailchimp.com/3.0/campaigns/{campaign['id']}/content",
    data=json.dumps({'html': html}).encode(),
    headers={'Authorization': f'Basic {api_key}', 'Content-Type': 'application/json'},
    method='PUT'
)
with urllib.request.urlopen(content_req):
    pass

test_req = urllib.request.Request(
    f"https://{server_prefix}.api.mailchimp.com/3.0/campaigns/{campaign['id']}/actions/test",
    data=json.dumps({'test_emails': ['dwayneprimeau@gmail.com'], 'send_type': 'html'}).encode(),
    headers={'Authorization': f'Basic {api_key}', 'Content-Type': 'application/json'},
    method='POST'
)
with urllib.request.urlopen(test_req) as r:
    print(json.dumps({'campaignId': campaign['id'], 'webId': campaign['web_id'], 'status': r.status}))
