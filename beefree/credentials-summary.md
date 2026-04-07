# BEEFree Credentials - Verification Summary

## ✅ All Credentials Working (4/4) 🎉

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

### File Manager ✅
- **Client ID**: `dd8a5a02-97cb-4605-85f0-66622871a85a`
- **Client Secret**: `Qaq65cxwFMlaXahUXEv9VChduofqfdrEa5szWrST3ITXTis95f5K`
- **Status**: ✅ Verified and tested
- **Use**: File uploads, asset management

## 📝 Additional API Key

### HTML Importer API 📝
- **API Key**: `8673942ba994f8f48df35d7a2ce2b9294af08f48218bad161cde046c712c19b0`
- **Status**: ✅ Saved in .env
- **Use**: Import external HTML into BEEFree editor
- **Note**: This is for HTML Importer service, not for authentication

## 🚀 Current Status

**Newsletter Designer**: ✅ Ready to use
- Using Email Builder credentials (verified)
- Auth proxy functional
- Visual editor ready

**Other Builders**: ✅ All available
- Page Builder: ✅ Verified
- Popup Builder: ✅ Verified
- File Manager: ✅ Verified
- Can be enabled by changing `BEEFREE_CLIENT_ID` and `BEEFREE_CLIENT_SECRET` in .env

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

✅ File Manager
   Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz...
   V2: true

---
📊 Results: 4/4 credentials working
```

---

**Last Updated**: 2026-04-07
**Status**: ✅ All 4/4 builders verified and working
