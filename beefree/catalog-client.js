#!/usr/bin/env node

/**
 * BEEFree Template Catalog Client
 * Access template catalog API securely from backend
 */

const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://catalog.getbee.io/v1/catalog';

/**
 * Get all templates with optional filters
 */
async function getTemplates(filters = {}) {
  try {
    const response = await axios.get(`${BASE_URL}/templates`, {
      params: {
        search: filters.search,
        category: filters.category,
        collection: filters.collection,
        designer: filters.designer,
        tag: filters.tag,
        template_type: filters.template_type || 'email',
        pagesize: filters.pagesize || 20,
        published_after: filters.published_after,
        published_before: filters.published_before
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching templates:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get a single template by slug
 */
async function getTemplate(slug) {
  try {
    const response = await axios.get(`${BASE_URL}/templates/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching template:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Search templates by keyword
 */
async function searchTemplates(terms) {
  const filters = {
    search: Array.isArray(terms) ? terms.join(',') : terms,
    template_type: 'email'
  };

  return getTemplates(filters);
}

/**
 * Get templates by category
 */
async function getTemplatesByCategory(categorySlug) {
  return getTemplates({ category: categorySlug });
}

/**
 * Get templates by collection
 */
async function getTemplatesByCollection(collectionSlug) {
  return getTemplates({ collection: collectionSlug });
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
      const filters = {};
      if (args[1]) filters.search = args[1];
      const templates = await getTemplates(filters);
      console.log(JSON.stringify(templates, null, 2));
      break;

    case 'get':
      if (!args[1]) {
        console.error('Please provide a template slug');
        process.exit(1);
      }
      const template = await getTemplate(args[1]);
      console.log(JSON.stringify(template, null, 2));
      break;

    case 'search':
      if (!args[1]) {
        console.error('Please provide search terms');
        process.exit(1);
      }
      const results = await searchTemplates(args.slice(1));
      console.log(JSON.stringify(results, null, 2));
      break;

    default:
      console.log(`
BEEFree Template Catalog CLI

Usage:
  node catalog-client.js list [search]    - List all templates (optional search)
  node catalog-client.js get <slug>      - Get template by slug
  node catalog-client.js search <terms>   - Search templates by keywords

Examples:
  node catalog-client.js list "newsletter"
  node catalog-client.js get basic-two-columns
  node catalog-client.js search business marketing
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  getTemplates,
  getTemplate,
  searchTemplates,
  getTemplatesByCategory,
  getTemplatesByCollection
};
