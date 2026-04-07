# BEEFree Credentials - Verification Summary

## ✅ Working Credentials (3/4)

### Email Builder ✅
- **Client ID**: `0ed7060a-e315-4638-be2b-0a7c29cb7d25`
- **Client Secret**: `TxUMqv4TttPWmddrZ84bYmfHkeIVAeviws0sHorHMTayZdi9n8Ag`
- **Status**: ✅ Verified and tested
- **Use**: Newsletter design (current default)

### Page Builder ✅
- **Client ID**: `d2f00f6a-aeca-4503-98cf-6f25976b0220`
- **Client Secret**: `jB1tTwz6CHi8Uy5RM5Xl4PS5jL9c5KCX6pV80E4GtotYuoMQUBte`
- **Status**: ✅ Verified and tested
- **Use**: Landing pages, web pages

### Popup Builder ✅
- **Client ID**: `febe13c9-f8fa-4fd2-9990-942730997988`
- **Client Secret**: `ZUlCSVG5HTAQsM2zlFlsC7TO4Eko4Dx2BnKxX1UdK5Gj8OfEdD4z`
- **Status**: ✅ Verified and tested
- **Use**: Modals, popups, overlays

## ❌ Missing/Incorrect (1/4)

### File Manager ❌
- **Client ID**: `dd8a5a02-97cb-4605-85f0-66622871a85a`
- **Client Secret**: `f3a9d7e3-7e1b-4c5d-8a2f-9d6e8a3c7b9d`
- **Status**: ❌ Authentication failed
- **Use**: File uploads, asset management

**Action Needed**: Please provide the correct File Manager Client Secret from BEEFree Developer Console.

## 📝 Additional API Key

### HTML Importer API 📝
- **API Key**: `8673942ba994f8f48df35d7a2ce2b9294af08f48218bad161cde046c712c19b0`
- **Status**: ✅ Saved in .env
- **Use**: Import external HTML into BEEFree editor
- **Note**: This is for the HTML Importer service, not for authentication

## 🚀 Current Status

**Newsletter Designer**: ✅ Ready to use
- Using Email Builder credentials (verified)
- Auth proxy functional
- Visual editor ready

**Other Builders**: ✅ Available (Page Builder, Popup Builder)
- Credentials verified
- Can be enabled by changing `BEEFREE_CLIENT_ID` and `BEEFREE_CLIENT_SECRET` in .env

**File Manager**: ❌ Needs correction
- Current credentials don't match
- Requires correct Client Secret from BEEFree Console

## 📋 Environment Variables

All credentials stored in `~/workspace/beefree/.env`:
```env
BEEFREE_EMAIL_BUILDER_CLIENT_ID=...
BEEFREE_EMAIL_BUILDER_CLIENT_SECRET=...
BEEFREE_PAGE_BUILDER_CLIENT_ID=...
BEEFREE_PAGE_BUILDER_CLIENT_SECRET=...
BEEFREE_POPUP_BUILDER_CLIENT_ID=...
BEEFREE_POPUP_BUILDER_CLIENT_SECRET=...
BEEFREE_FILEMANAGER_CLIENT_ID=...
BEEFREE_FILEMANAGER_CLIENT_SECRET=...
BEEFREE_HTML_IMPORTER_API_KEY=...

# Default (Email Builder)
BEEFREE_CLIENT_ID=...
BEEFREE_CLIENT_SECRET=...
```

## 🔄 Switching Builders

To use Page Builder instead of Email Builder:

```bash
cd ~/workspace/beefree
# Edit .env
# Change:
#   BEEFREE_CLIENT_ID=d2f00f6a-aeca-4503-98cf-6f25976b0220
#   BEEFREE_CLIENT_SECRET=jB1tTwz6CHi8Uy5RM5Xl4PS5jL9c5KCX6pV80E4GtotYuoMQUBte

# Restart auth proxy
npm start
```

## ✅ Verification Script

```bash
cd ~/workspace/beefree
node verify-all-credentials.js
```

Output:
```
🔑 Verifying all BEEFree credentials...

✅ Email Builder
   Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz...
   V2: true

✅ Page Builder
   Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz...
   V2: true

✅ Popup Builder
   Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz...
   V2: true

❌ File Manager
   Error: Unable to authenticate with provided credentials.

---
📊 Results: 3/4 credentials working
```

---

**Last Updated**: 2026-04-07
**Status**: 3/4 builders working, File Manager needs correction
