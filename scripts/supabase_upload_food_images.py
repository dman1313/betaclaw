#!/usr/bin/env python3
import json, mimetypes, urllib.request, urllib.error
from pathlib import Path

env = {}
for line in Path('/home/node/.openclaw/workspace/.env.secrets').read_text().splitlines():
    line = line.strip()
    if '=' in line and not line.startswith('#'):
        k, v = line.split('=', 1)
        env[k] = v

SUPABASE_URL = env['SUPABASE_URL'].rstrip('/')
SUPABASE_KEY = env['SUPABASE_SECRET_KEY']
BUCKET = 'newsletter-images'

headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json'
}

bucket_req = urllib.request.Request(
    f"{SUPABASE_URL}/storage/v1/bucket",
    data=json.dumps({'id': BUCKET, 'name': BUCKET, 'public': True}).encode(),
    headers=headers,
    method='POST'
)
try:
    with urllib.request.urlopen(bucket_req) as r:
        print('Bucket created', r.status)
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8', 'ignore')
    if e.code not in (400, 409):
        raise
    print('Bucket exists or already created', e.code, body)

files = [
    '/home/node/.openclaw/workspace/public/newsletter-images/food-hero-1.jpg',
    '/home/node/.openclaw/workspace/public/newsletter-images/food-scene-2.jpg',
    '/home/node/.openclaw/workspace/public/newsletter-images/food-scene-3.jpg',
    '/home/node/.openclaw/workspace/public/newsletter-images/food-scene-4.jpg',
    '/home/node/.openclaw/workspace/public/newsletter-images/food-scene-5.jpg',
    '/home/node/.openclaw/workspace/public/newsletter-images/food-scene-6.jpg',
]

urls = {}
for file_path in files:
    p = Path(file_path)
    content_type = mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
    upload_req = urllib.request.Request(
        f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{p.name}",
        data=p.read_bytes(),
        headers={
            'apikey': SUPABASE_KEY,
            'Authorization': f'Bearer {SUPABASE_KEY}',
            'Content-Type': content_type,
            'x-upsert': 'true'
        },
        method='POST'
    )
    try:
        with urllib.request.urlopen(upload_req) as r:
            print('Uploaded', p.name, r.status)
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', 'ignore')
        if e.code == 400 and 'Duplicate' in body:
            print('Already exists', p.name)
        else:
            raise
    urls[p.name] = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{p.name}"

Path('/home/node/.openclaw/workspace/food-image-urls.json').write_text(json.dumps(urls, indent=2))
print(json.dumps(urls, indent=2))
