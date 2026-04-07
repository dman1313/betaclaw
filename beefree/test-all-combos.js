#!/usr/bin/env node

/**
 * Test all Client ID + Secret combinations
 */

const axios = require('axios');

const CREDENTIALS = [
  {
    name: 'Email Builder',
    client_id: '0ed7060a-e315-4638-be2b-0a7c29cb7d25',
    client_secret: 'c2c8b5e2-3f4d-4a9e-8b1c-6d3f9a2e7c5b'
  },
  {
    name: 'Page Builder',
    client_id: 'd2f00f6a-aeca-4503-98cf-6f25976b0220',
    client_secret: 'a4f7e9d1-5c8a-4b2e-9e3f-7d4c8b1a5f9c'
  },
  {
    name: 'Popup Builder',
    client_id: 'febe13c9-f8fa-4fd2-9990-942730997988',
    client_secret: 'e5b8c6f2-6d9a-4e7b-9f4a-8e5d9c2b6a8e'
  },
  {
    name: 'Filemanager',
    client_id: 'dd8a5a02-97cb-4605-85f0-66622871a85a',
    client_secret: 'f3a9d7e3-7e1b-4c5d-8a2f-9d6e8a3c7b9d'
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
    console.log(`   Client ID: ${creds.client_id.substring(0, 20)}...`);
    console.log(`   Secret: ${creds.client_secret.substring(0, 20)}...`);
    console.log(`   Token: ${response.data.access_token.substring(0, 30)}...`);
    console.log(`   V2: ${response.data.v2}`);
    console.log('');
    return { success: true, token: response.data.access_token };

  } catch (error) {
    console.log(`❌ ${creds.name}: ${error.response?.data?.message || error.message}`);
    console.log('');
    return { success: false };
  }
}

async function main() {
  console.log('🔑 Testing all Client ID + Secret combinations');
  console.log('');

  let workingCombo = null;

  for (const creds of CREDENTIALS) {
    const result = await testCredentials(creds);
    if (result.success) {
      workingCombo = creds;
      console.log('🎉 Found working credentials!');
      break;
    }
  }

  if (!workingCombo) {
    console.log('⚠️ None of the credential combinations work.');
    console.log('Please verify:');
    console.log('1. All Client IDs are correct from BEEFree Developer Console');
    console.log('2. All Client Secrets are current (not regenerated)');
    console.log('3. All applications are enabled in BEEFree Console');
  }
}

main();
