#!/bin/bash
set -e

echo "== Food newsletter pipeline =="
echo "1) Upload food images to Supabase"
python3 /home/node/.openclaw/workspace/scripts/supabase_upload_food_images.py

echo
echo "2) Build Mailchimp food connection test"
python3 /home/node/.openclaw/workspace/scripts/mailchimp_send_food_connection.py

echo
echo "Done. Check test inbox and Mailchimp editor."
