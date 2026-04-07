#!/usr/bin/env node

/**
 * Test BEEFree authentication directly
 */

const axios = require('axios');

require('dotenv').config();

async function testAuth() {
  console.log('🔑 Testing BEEFree Authentication...');
  console.log('');

  if (!process.env.BEEFREE_CLIENT_ID || !process.env.BEEFREE_CLIENT_SECRET) {
    console.error('❌ Missing credentials in .env');
    process.exit(1);
  }

  console.log('📋 Credentials found:');
  console.log('   Client ID:', process.env.BEEFREE_CLIENT_ID.substring(0, 8) + '...');
  console.log('   Client Secret:', process.env.BEEFREE_CLIENT_SECRET.substring(0, 8) + '...');
  console.log('');

  try {
    const response = await axios.post('https://auth.getbee.io/loginV2', {
      client_id: process.env.BEEFREE_CLIENT_ID,
      client_secret: process.env.BEEFREE_CLIENT_SECRET,
      uid: 'test-user-' + Date.now()
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Authentication successful!');
    console.log('');
    console.log('Response:');
    console.log('   Access Token:', response.data.access_token.substring(0, 20) + '...');
    console.log('   V2:', response.data.v2);
    console.log('');
    console.log('🎉 BEEFree SDK is ready to use!');

  } catch (error) {
    console.error('❌ Authentication failed!');
    console.error('');
    console.error('Error details:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('   Message:', error.message);
    }
    process.exit(1);
  }
}

testAuth();
