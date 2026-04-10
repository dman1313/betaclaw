# BEEFree SDK Reference

Concise local reference distilled from the official docs: https://docs.beefree.io/beefree-sdk

## What it is
BEEFree SDK is an embeddable no-code builder for:
- Email builder
- Page builder
- Popup builder
- File Manager
- Template catalog
- Content APIs (import/export/convert)

## Best fit for our setup
We should use it as:
- **Design layer** for newsletters
- **HTML export source** for sending workflows
- **Template system** for reusable branded newsletter formats
- **Optional file manager** for media assets

## Core setup flow
1. Create BEEFree Developer account
2. Create application/subscription
3. Get Client ID + Client Secret
4. Use sample client or custom app
5. Generate auth token server-side
6. Initialize builder in frontend with `beeConfig`

## Important rule
**Never expose Client Secret in the frontend.**
Auth must be handled server-side.

## Our credentials
Stored safely in:
- `workspace/.env.secrets`

Variables available:
- `BEEFREE_CLIENT_ID`
- `BEEFREE_CLIENT_SECRET`
- `BEEFREE_FILEMANAGER_CLIENT_ID`
- `BEEFREE_FILEMANAGER_CLIENT_SECRET`

## Useful official starting points
- Playground: https://playground.beefree.io/
- Developer Console: https://developers.beefree.io/
- Sample client repo: https://github.com/BeefreeSDK/beefree-sdk-sample-client

## Most relevant docs areas
- Getting started
- Configuration parameters
- Server-side configuration
- Email builder
- File manager
- Content Services API export
- HTML importer API

## Features worth using
- Drag-and-drop email editor
- Template catalog
- HTML export
- Import existing HTML for editing
- AI writing assistant
- File Manager

## Recommended implementation for us
### Phase 1
- Use email builder only
- Generate auth token server-side
- Export HTML
- Feed HTML into newsletter delivery workflow

### Phase 2
- Add template catalog browsing
- Add reusable branded templates
- Add File Manager for assets

### Phase 3
- Add import/edit existing newsletter HTML
- Add conversion/export automation

## Best architecture for Dwayne
- **Frontend:** local editor page
- **Backend:** auth proxy (`auth-proxy.js`)
- **Storage:** local files / exported HTML
- **Delivery:** newsletter pipeline or AgentMail

## Notes from docs
- BEEFree offers framework quickstarts for React, Vue, Angular, Django
- Developer Console config can change app behavior without frontend rewrites
- Playground is the fastest way to test UX and configuration ideas

## My recommendation
Stick to this path:
1. server-side auth
2. email builder
3. HTML export
4. delivery integration

That gets value fast without overbuilding.
