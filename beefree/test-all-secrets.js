#!/usr/bin/env node

/**
 * Test all BEEFree secrets with the Email Builder Client ID
 */

const axios = require('axios');

const CLIENT_ID = '0ed7060a-e315-4638-be2b-0a7c29cb7d25';

const SECRETS = {
  'Email Builder': 'c2c8b5e2-3f4d-4a9e-8b1c-6d3f9a2e7c5b',
  'Page Builder': 'a4f7e9d1-5c8a-4b2e-9e3f-7d4c8b1a5f9c',
  'Popup Builder': 'e5b8c6f2-6d9a-4e7b-9f4a-8e5d9c2b6a8e',
  'Filemanager': 'f3a9d7e3-7e1b-4c5d-8a2f-9d6e8a3c7b9d'
};

async function testSecret(name, secret) {
  try {
    const response = await axios.post('https://auth.getbee.io/loginV2', {
      client_id: CLIENT_ID,
      client_secret: secret,
      uid: 'test-user-' + Date.now()
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ SUCCESS!');
    console.log(`   Secret: ${name}`);
    console.log(`   Token: ${response.data.access_token.substring(0, 30)}...`);
    console.log(`   V2: ${response.data.v2}`);
    console.log('');
    return true;

  } catch (error) {
    console.log(`❌ ${name}: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function main() {
  console.log('🔑 Testing all secrets with Email Builder Client ID');
  console.log(`   Client ID: ${CLIENT_ID}`);
  console.log('');

  for (const [name, secret] of Object.entries(SECRETS)) {
    console.log(`Testing: ${name}`);
    const success = await testSecret(name, secret);
    if (success) {
      console.log('');
      console.log('🎉 Found the matching secret!');
      console.log(`   Update .env with: BEEFREE_CLIENT_SECRET=${secret}`);
      break;
    }
    console.log('');
  }
}

main();
