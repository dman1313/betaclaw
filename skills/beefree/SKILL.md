# Skill: Beefree Newsletter Automation

## Purpose
Use Beefree SDK to build complete newsletter automation pipelines. Generate newsletters from prompts, voice, or data; structure content using best practices; export HTML + JSON; continuously improve from documentation and GitHub.

## Core Principle
Agent = Brain, Beefree SDK = Builder. You decide WHAT to build, Beefree executes HOW it looks.

## Trigger
When user asks to:
- Create/build a newsletter
- Design an email
- Generate newsletter content
- Automate newsletter production

---

## 🔗 Required Learning Sources
- https://developers.beefree.io/build-with-ai
- https://docs.beefree.io/beefree-sdk
- https://docs.beefree.io/beefree-sdk/mcp-server/getting-started
- https://docs.beefree.io/beefree-sdk/visual-builders
- https://github.com/BeefreeSDK/beefree-sdk-npm-official

## Auto-Research Directive
Before doing anything:
1. Check documentation
2. Check GitHub repo
3. Extract best practices
4. Improve your workflow

Never rely on outdated assumptions.

---

## 🔐 Account Configuration

### Applications
| Builder | Client ID | Status | Plan |
|---------|-----------|--------|------|
| Email Builder | 0ed7060a-e315-4638-be2b-0a7c29cb7d25 | Active | Free |
| Page Builder | d2f00f6a-aeca-4503-98cf-6f25976b0220 | Active | Free |
| Popup Builder | febe13c9-f8fa-4fd2-9990-942730997988 | Active | Free |
| File Manager | dd8a5a02-97cb-4605-85f0-66622871a85a | Active | Free |

### Required Secrets
```bash
# EMAIL BUILDER
BEEFREE_EMAIL_BUILDER_CLIENT_SECRET=PASTE_HERE

# PAGE BUILDER
BEEFREE_PAGE_BUILDER_CLIENT_SECRET=PASTE_HERE

# POPUP BUILDER
BEEFREE_POPUP_BUILDER_CLIENT_SECRET=PASTE_HERE

# FILE MANAGER
BEEFREE_FILEMANAGER_CLIENT_SECRET=PASTE_HERE
```

---

## Workflow

### Phase 1: Content Generation
1. Get user input: prompt, voice, or data source
2. Research topic if needed (web search, documentation)
3. Structure content using newsletter best practices
4. Draft: subject line, headline, body, CTA

### Phase 2: Beefree Integration
1. Initialize Beefree SDK with appropriate builder (email/page/popup)
2. Select or create template
3. Build content using Beefree tools
4. Export HTML + JSON

### Phase 3: Delivery
1. Preview if requested
2. Export to final format
3. Deliver via email, webhook, or storage
4. Log for analytics/learning

---

## File Structure
- `skills/beefree/` — skill directory
- `skills/beefree/templates/` — saved Beefree templates
- `skills/beefree/newsletters/` — generated newsletters
- `skills/beefree/docs/` — extracted best practices

---

## Notes
- Free plan has limitations; check before production
- Always verify secrets before first use
- Continuously learn from docs and GitHub updates
