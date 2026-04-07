# Voice to Newsletter Skill

Convert voice recordings + photos into newsletter drafts via Telegram.

## What It Does

User sends voice message and optional photo to Telegram bot → receives:
- Transcribed text (OpenAI Whisper)
- Newsletter draft (HTML format)
- Image caption & alt text
- Draft URL for review/publish

## Workflow

1. User sends voice note to Telegram bot
2. User optionally sends photo
3. Bot downloads files
4. Whisper transcribes audio
5. GPT-4o analyzes photo (if provided)
6. GPT-4o generates newsletter content
7. Returns formatted draft to user

## Required APIs

- **Telegram Bot Token** - Already configured (@betaclawv1_bot)
- **OpenAI API Key** - For Whisper (transcription) and GPT-4o (content generation)
- **Beehiiv API Key** - Optional, for publishing directly

## Usage

Send voice note to Telegram bot. Optionally attach photo.

Bot responds with:
```
🎙️ Transcription: [text]
📸 Photo Analysis: [summary]
📧 Newsletter Draft:
[HTML content]
```

## Commands

- `/newsletter` - Start newsletter creation mode
- `/help` - Show instructions

## Fallback

If OpenAI disconnects, use MiniMax provider:
`sk-api-nUeuW4PQdhnLeA-D36YUWMmjOnNYkGMr7TiseXBaoBhersD-_1q7p1Ut3DyagdSddc5sS3Bi4TrtNgOBoA0nhDAWJio4mKm5pmoJP0_0Bw8paErVjR88Sa`
