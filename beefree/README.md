# BEEFree Newsletter Editor 🐝

A complete BEEFree SDK integration for designing newsletters with secure authentication.

## Setup Instructions

### 1. Get BEEFree Credentials

1. Go to [BEEFree Developer Console](https://developers.beefree.io/signup)
2. Sign up and create an application
3. Get your **Client ID** and **Client Secret**

### 2. Configure Environment

```bash
cd /home/node/.openclaw/workspace/beefree
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
BEEFREE_CLIENT_ID=your_actual_client_id
BEEFREE_CLIENT_SECRET=your_actual_client_secret
PORT=3001
```

### 3. Install Dependencies

```bash
npm install
```

## Usage

### Start the Auth Proxy Server

```bash
npm start
```

This starts the authentication proxy on `http://localhost:3001`

### Open the Editor

Open `newsletter-editor.html` in a browser (you'll need a local server):

```bash
# Using Python 3
python -m http.server 8080

# Then visit: http://localhost:8080/newsletter-editor.html
```

### Template Catalog CLI

```bash
# List all templates
npm run catalog:list

# Search templates
npm run catalog:search newsletter marketing

# Get specific template by slug
npm run catalog:get <template-slug>

# Or use the Node script directly
node catalog-client.js search business
```

## Features

- **Secure Authentication**: Server-to-server token generation (never expose credentials)
- **Template Catalog**: Access 2000+ professional templates
- **Auto Token Refresh**: Handles 12-hour token lifecycle
- **Save/Export**: Save designs and export HTML
- **Error Handling**: Graceful token expiration recovery

## API Endpoints

### Auth Proxy (`http://localhost:3001`)

- `POST /proxy/bee-auth` - Get authentication token
- `POST /proxy/bee-refresh` - Refresh expired token
- `GET /health` - Health check

### Template Catalog Client

```javascript
const catalog = require('./catalog-client');

// Get all templates with filters
await catalog.getTemplates({
  search: 'newsletter',
  category: 'business',
  pagesize: 20
});

// Get specific template
await catalog.getTemplate('basic-two-columns');

// Search templates
await catalog.searchTemplates(['marketing', 'business']);
```

## Editor JavaScript API

```javascript
// Initialize with template
window.beeEditor.init(templateJson);

// Save current design
window.beeEditor.save();

// Export HTML
window.beeEditor.export();

// Get editor instance
const instance = window.beeEditor.getInstance();
```

## Example Workflow

1. **Start auth proxy**: `npm start`
2. **Browse templates**: `npm run catalog:search newsletter`
3. **Copy template JSON** from catalog response
4. **Open editor** and paste JSON into browser console:
   ```javascript
   window.beeEditor.loadTemplate(yourTemplateJson);
   ```
5. **Design** using the visual editor
6. **Save** or **Export HTML** when done

## Security Notes

- ✅ Credentials stored in `.env` (never committed)
- ✅ Server-side authentication (no frontend exposure)
- ✅ Auto token refresh (12-hour sessions)
- ✅ Error handling for expired tokens

## Next Steps

1. Add your BEEFree credentials to `.env`
2. Test the template catalog CLI
3. Open the editor and start designing!

## Documentation

- [BEEFree SDK Docs](https://docs.beefree.io/beefree-sdk)
- [Template Catalog API](https://docs.beefree.io/beefree-sdk/apis/template-catalog-api/templates)
- [Authorization Guide](https://docs.beefree.io/beefree-sdk/getting-started/readme/installation/authorization-process-in-detail.md)
