#!/usr/bin/env node

/**
 * Verify all BEEFree credentials are working
 */

const axios = require('axios');
require('dotenv').config();

const CREDENTIALS = [
  {
    name: 'Email Builder',
    client_id: process.env.BEEFREE_EMAIL_BUILDER_CLIENT_ID,
    client_secret: process.env.BEEFREE_EMAIL_BUILDER_CLIENT_SECRET
  },
  {
    name: 'Page Builder',
    client_id: process.env.BEEFREE_PAGE_BUILDER_CLIENT_ID,
    client_secret: process.env.BEEFREE_PAGE_BUILDER_CLIENT_SECRET
  },
  {
    name: 'Popup Builder',
    client_id: process.env.BEEFREE_POPUP_BUILDER_CLIENT_ID,
    client_secret: process.env.BEEFREE_POPUP_BUILDER_CLIENT_SECRET
  },
  {
    name: 'File Manager',
    client_id: process.env.BEEFREE_FILEMANAGER_CLIENT_ID,
    client_secret: process.env.BEEFREE_FILEMANAGER_CLIENT_SECRET
  }
];

async function testCredentials(creds) {
  try {
    const response = await axios.post('https://auth.getbee.io/loginV2', {
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      uid: 'test-user-' + Date.now()
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ ${creds.name}`);
    console.log(`   Token: ${response.data.access_token.substring(0, 30)}...`);
    console.log(`   V2: ${response.data.v2}`);
    console.log('');
    return true;

  } catch (error) {
    console.log(`❌ ${creds.name}`);
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
    console.log('');
    return false;
  }
}

async function main() {
  console.log('🔑 Verifying all BEEFree credentials...');
  console.log('');

  let successCount = 0;

  for (const creds of CREDENTIALS) {
    const success = await testCredentials(creds);
    if (success) successCount++;
  }

  console.log('---');
  console.log(`📊 Results: ${successCount}/${CREDENTIALS.length} credentials working`);
  console.log('');

  if (successCount === CREDENTIALS.length) {
    console.log('🎉 All BEEFree credentials verified successfully!');
    console.log('');
    console.log('📝 Available builders:');
    console.log('   - Email Builder (newsletter design)');
    console.log('   - Page Builder (landing pages)');
    console.log('   - Popup Builder (modals/overlays)');
    console.log('   - File Manager (file uploads)');
    console.log('   - HTML Importer API (import external HTML)');
  }
}

main();
