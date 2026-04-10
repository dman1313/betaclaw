# BEEFree Automation Workflow

Use this flow for newsletter production:

1. Intake source
   - text, voice note, links, photos

2. Draft pipeline
   - intake brief
   - research brief
   - article draft
   - newsletter package

3. BEEFree packaging
   - create/update `templates/<slug>.json`
   - copy hero image into `templates/` when needed
   - open with:
     `http://localhost:8080/newsletter-editor.html?template=/templates/<slug>.json`

4. Review and export
   - review inside editor
   - export HTML
   - send via delivery platform after approval

## Current working example
- Template: `templates/paris-spring-newsletter.json`
- Editor URL: `http://localhost:8080/newsletter-editor.html?template=/templates/paris-spring-newsletter.json`
- Subject/preheader file: `templates/paris-spring-subjects.txt`
