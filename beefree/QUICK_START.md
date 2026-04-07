# 🎨 Make Your First Newsletter - Quick Start Guide

## Status: Ready to Create ✅

Both services are running:
- Auth Proxy: http://localhost:3001
- Editor: http://localhost:8080/newsletter-editor.html

## 🚀 Three Ways to Make a Newsletter

### Method 1: Quick Template Loader (Easiest)

1. **Open the template selector:**
   ```
   http://localhost:8080/templates.html
   ```

2. **Click "Load Template"** on "Basic Newsletter"

3. **Editor opens** with the template loaded automatically

4. **Customize** by clicking and editing text/images

5. **Export** when done (click "Export HTML" button)

### Method 2: Direct Editor (Full Control)

1. **Open the editor:**
   ```
   http://localhost:8080/newsletter-editor.html
   ```

2. **Start from blank** or browse templates

3. **Drag and drop** elements:
   - Text blocks
   - Images
   - Buttons
   - Dividers
   - Spacers

4. **Edit** directly on the canvas

5. **Save or Export** when finished

### Method 3: Load via Browser Console

1. **Open editor:**
   ```
   http://localhost:8080/newsletter-editor.html
   ```

2. **Open browser console** (F12)

3. **Run this command:**
   ```javascript
   fetch('/templates/newsletter-basic.json')
     .then(r => r.json())
     .then(data => window.beeEditor.loadTemplate(data));
   ```

4. **Template loads** and you can start editing

## 📧 Newsletter Template Features

The **Basic Newsletter** template includes:

- ✅ **Header Section** - Bold title with red/pink background
- ✅ **Hero/Welcome** - Introduction text
- ✅ **Featured Article** - Main content with image placeholder
- ✅ **Quick Updates** - Bullet list for news items
- ✅ **CTA Button** - "Learn More" with red/pink styling
- ✅ **Footer** - Copyright and social links

## 🎨 Customization Tips

### Text Editing
- Click any text to edit
- Use the sidebar to change fonts, sizes, colors
- Add headings, paragraphs, lists

### Images
- Click placeholder images to replace
- Upload your own or use URLs
- Adjust size and alignment

### Colors
- Click any element
- Use the color picker in the sidebar
- Template uses:
  - Primary: #e94560 (red/pink)
  - Secondary: #0f3460 (dark blue)

### Layout
- Drag elements to reorder
- Add new sections
- Delete unwanted blocks
- Use spacers for padding

## 💾 Saving & Exporting

### Save Design
- Click "Save Design" button
- JSON saved to hidden textarea
- Copy or download for later use

### Export HTML
- Click "Export HTML" button
- Downloads ready-to-use HTML file
- Can send via email or upload to web

### Auto-Save
- Changes auto-save every 30 seconds
- JSON stored in browser memory
- Prevents data loss

## 🔧 Browser Console API

After loading the editor, use these commands:

```javascript
// Initialize with template
window.beeEditor.init(templateJson);

// Save current design
window.beeEditor.save();

// Export HTML (downloads file)
window.beeEditor.export();

// Load template from JSON
window.beeEditor.loadTemplate(jsonData);

// Get editor instance
const bee = window.beeEditor.getInstance();
```

## 📚 Available Commands

### Template Loading (CLI)
```bash
cd ~/workspace/beefree
node load-template.js list
node load-template.js load newsletter-basic
```

### Service Management
```bash
# Check status
curl http://localhost:3001/health

# Restart auth proxy
cd ~/workspace/beefree
node auth-proxy.js &

# Restart HTTP server
python3 -m http.server 8080 &
```

## 🎯 Step-by-Step Example

**Create a newsletter in 5 minutes:**

1. **Open:** http://localhost:8080/templates.html
2. **Click:** "Load Template" on Basic Newsletter
3. **Edit:** Title to "This Week's News"
4. **Replace:** Featured article text with your content
5. **Update:** Quick updates list with 3 items
6. **Click:** "Export HTML"
7. **Done!** You have a professional newsletter

## 📝 Template Structure

```json
{
  "description": "Template description",
  "title": "Template Name",
  "templateContent": {
    "body": {
      "type": "standardPage",
      "theme": {...},
      "rows": [
        {"type": "header", ...},
        {"type": "row", ...},
        {"type": "footer", ...}
      ]
    }
  }
}
```

## 🌟 Next Steps

After creating your newsletter:

1. **Export as HTML**
2. **Test in email client** (optional)
3. **Send to your list** or
4. **Integrate with automation** for regular newsletters

---

**Status:** ✅ Ready to create newsletters
**Editor:** http://localhost:8080/newsletter-editor.html
**Templates:** http://localhost:8080/templates.html

Start creating now! 📧✨
