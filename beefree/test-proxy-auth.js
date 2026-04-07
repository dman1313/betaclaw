#!/usr/bin/env node

/**
 * Test auth proxy functionality
 */

const axios = require('axios');

const PROXY_URL = 'http://localhost:3001/proxy/bee-auth';

async function testProxyAuth() {
  console.log('🔑 Testing Auth Proxy...');
  console.log('');

  try {
    const response = await axios.post(PROXY_URL, {
      uid: 'test-user-' + Date.now()
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('✅ Auth Proxy working!');
    console.log('');
    console.log('Response:');
    console.log(`   Token: ${response.data.token.substring(0, 30)}...`);
    console.log(`   V2: ${response.data.v2}`);
    console.log('');
    console.log('🎉 Proxy authentication successful!');
    console.log('');
    console.log('Editor URL: http://localhost:8080/newsletter-editor.html');

  } catch (error) {
    console.log('❌ Auth Proxy failed');
    console.log('');
    console.log('Error:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

testProxyAuth();
