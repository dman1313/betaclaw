# BEEFree Newsletter Designer Skill

Design professional newsletters using the BEEFree SDK with secure authentication.

## Setup

### Prerequisites

1. **Get BEEFree Credentials**:
   - Sign up at https://developers.beefree.io/signup
   - Create an application in the Developer Console
   - Copy Client ID and Client Secret

2. **Configure Environment**:
   ```bash
   cd ~/workspace/beefree
   cp .env.example .env
   # Edit .env and add your credentials
   ```

3. **Install Dependencies**:
   ```bash
   cd ~/workspace/beefree
   npm install
   ```

## Usage

### Start Auth Proxy
```bash
cd ~/workspace/beefree
npm start
```
Server runs on http://localhost:3001

### Open Editor
```bash
cd ~/workspace/beefree
python -m http.server 8080
# Visit: http://localhost:8080/newsletter-editor.html
```

### Template Catalog CLI
```bash
# List all templates
npm run catalog:list

# Search templates
npm run catalog:search newsletter marketing

# Get specific template
npm run catalog:get <template-slug>
```

## Features

- **2000+ Templates**: Access BEEFree's template catalog
- **Visual Editor**: Drag-and-drop newsletter builder
- **Secure Auth**: Server-side token generation
- **Auto Refresh**: 12-hour session handling
- **Export HTML**: Download finished designs

## API Endpoints

### Auth Proxy (localhost:3001)
- `POST /proxy/bee-auth` - Get authentication token
- `POST /proxy/bee-refresh` - Refresh expired token
- `GET /health` - Health check

### Template Catalog
```javascript
// Get templates with filters
await catalog.getTemplates({
  search: 'newsletter',
  category: 'business',
  pagesize: 20
});

// Get specific template
await catalog.getTemplate('template-slug');
```

## Editor JavaScript API

```javascript
// Initialize with template JSON
window.beeEditor.init(templateJson);

// Save current design
window.beeEditor.save();

// Export HTML
window.beeEditor.export();

// Load template from JSON
window.beeEditor.loadTemplate(templateJson);
```

## Example Workflow

1. **Start auth proxy**: `npm start`
2. **Search templates**: `npm run catalog:search newsletter`
3. **Copy template JSON** from response
4. **Open editor** in browser
5. **Load template**: `window.beeEditor.loadTemplate(yourJson)`
6. **Design** with visual editor
7. **Export HTML** when done

## File Structure

```
beefree/
├── .env                # Credentials (NEVER commit)
├── .env.example        # Template for env vars
├── auth-proxy.js       # Server-side auth handler
├── catalog-client.js   # Template catalog API client
├── newsletter-editor.html  # Visual editor UI
├── package.json        # Dependencies and scripts
├── README.md           # Full documentation
└── SKILL.md           # This file
```

## Security

- ✅ Credentials stored in `.env` (server-side only)
- ✅ No frontend credential exposure
- ✅ Auto token refresh (12-hour sessions)
- ✅ Graceful error handling

## Next Steps

1. Add BEEFree credentials to `.env`
2. Test template catalog: `npm run catalog:search newsletter`
3. Open editor and start designing!

## Documentation Links

- [BEEFree SDK Docs](https://docs.beefree.io/beefree-sdk)
- [Template Catalog API](https://docs.beefree.io/beefree-sdk/apis/template-catalog-api/templates)
- [Getting Started](https://docs.beefree.io/beefree-sdk/getting-started)
