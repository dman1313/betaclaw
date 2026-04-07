# BEEFree Newsletter Templates

## Available Templates

### newsletter-basic.json
A clean, professional newsletter template with:
- Bold header section
- Hero/welcome section
- Featured article with image placeholder
- Quick updates list
- Call-to-action button
- Footer with social links

Colors:
- Primary: #e94560 (red/pink)
- Secondary: #0f3460 (dark blue)
- Background: #ffffff (white)

## How to Use

### Option 1: Via Browser Console

1. Open the editor: http://localhost:8080/newsletter-editor.html
2. Open browser console (F12 or Ctrl+Shift+I)
3. Load template:

```javascript
// Load basic newsletter template
fetch('/templates/newsletter-basic.json')
  .then(r => r.json())
  .then(data => window.beeEditor.loadTemplate(data));
```

### Option 2: Via Node.js Script

```bash
cd ~/workspace/beefree
node load-template.js load newsletter-basic
```

This will show you the exact code to paste in the browser console.

### Option 3: Load from File

1. Open the editor
2. Click "Load" or "Import" button (if available)
3. Select the template JSON file from:
   `~/workspace/beefree/templates/newsletter-basic.json`

## Customization

Once loaded, you can:
- Edit text directly in the visual editor
- Replace placeholder images with your own
- Change colors using the style panel
- Add/remove sections
- Drag and drop new elements
- Save your custom design
- Export as HTML when ready

## Exporting

When finished designing:
1. Click "Save Design" to save JSON
2. Click "Export HTML" to download finished newsletter

## Creating New Templates

To create your own templates:

1. Design in the BEEFree editor
2. Save the JSON
3. Copy the `templateContent` object
4. Save as a new file in this directory
5. Follow the structure of `newsletter-basic.json`

Template structure:
```json
{
  "description": "Template description",
  "title": "Template Name",
  "templateContent": {
    "body": {
      "type": "standardPage",
      "rows": [...]
    }
  }
}
```

## Notes

- Images use placeholder URLs (replace with your own)
- All text is editable in the visual editor
- Styles can be customized per element
- Templates are responsive by default
