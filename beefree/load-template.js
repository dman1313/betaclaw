#!/usr/bin/env node

/**
 * Load a template into the running BEEFree editor
 * This script provides the template JSON and instructions
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, 'templates');

function loadTemplate(templateName) {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.json`);

  if (!fs.existsSync(templatePath)) {
    console.log('❌ Template not found:', templateName);
    console.log('');
    console.log('Available templates:');
    listTemplates();
    return;
  }

  const templateJson = fs.readFileSync(templatePath, 'utf8');

  console.log('📄 Template loaded:', templateName);
  console.log('');
  console.log('🔗 Editor URL: http://localhost:8080/newsletter-editor.html');
  console.log('');
  console.log('💡 To load this template in the editor:');
  console.log('1. Open the editor in your browser');
  console.log('2. Open browser console (F12)');
  console.log('3. Paste the following:');
  console.log('');
  console.log('```javascript');
  console.log('const templateJson = ' + templateJson + ';');
  console.log('window.beeEditor.loadTemplate(templateJson);');
  console.log('```');
  console.log('');
  console.log('Or save to file and load from:');
  console.log(templatePath);
}

function listTemplates() {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.log('No templates directory found');
    return;
  }

  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));

  if (files.length === 0) {
    console.log('No templates found');
    return;
  }

  console.log('Available templates:');
  files.forEach(f => console.log(`  - ${f}`));
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
      listTemplates();
      break;

    case 'load':
      const templateName = args[1];
      if (!templateName) {
        console.log('Usage: node load-template.js load <template-name>');
        listTemplates();
      } else {
        loadTemplate(templateName);
      }
      break;

    default:
      console.log(`
BEEFree Template Loader

Usage:
  node load-template.js list              - List available templates
  node load-template.js load <name>      - Load template and show instructions

Examples:
  node load-template.js list
  node load-template.js load newsletter-basic
      `);
  }
}

main();
