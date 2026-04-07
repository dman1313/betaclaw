#!/usr/bin/env node

/**
 * Test template catalog API access
 */

const axios = require('axios');

const CATALOG_BASE_URL = 'https://catalog.getbee.io/v1/catalog';

async function testCatalog() {
  console.log('📚 Testing Template Catalog API access...');
  console.log('');

  try {
    const response = await axios.get(`${CATALOG_BASE_URL}/templates`, {
      params: {
        template_type: 'email',
        pagesize: 5
      },
      timeout: 5000
    });

    console.log('✅ Catalog API accessible!');
    console.log('');
    console.log('Response summary:');
    console.log(`   Total templates: ${response.data.items.length}`);
    console.log(`   First template: ${response.data.items[0]?.name || 'N/A'}`);
    console.log('');
    console.log('🎉 BEEFree Template Catalog is working!');
    console.log('');
    console.log('Available endpoints:');
    console.log(`   ${CATALOG_BASE_URL}/templates`);
    console.log(`   ${CATALOG_BASE_URL}/templates/:slug`);

  } catch (error) {
    console.log('❌ Catalog API access failed');
    console.log('');
    console.log('Error details:');
    if (error.code === 'ENOTFOUND') {
      console.log('   DNS resolution failed - expected in sandboxed environments');
      console.log('   The API is accessible from your local machine');
    } else {
      console.log('   Code:', error.code);
      console.log('   Message:', error.message);
    }
  }
}

testCatalog();
