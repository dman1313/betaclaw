#!/usr/bin/env python3
"""
Voice to Newsletter Bot
Send voice + photo to Telegram bot → get newsletter draft
"""

import os
import json
import requests
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters
import openai
from openai import OpenAI

# Configuration
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
MINIMAX_API_KEY = os.getenv("MINIMAX_API_KEY", "sk-api-nUeuW4PQdhnLeA-D36YUWMmjOnNYkGMr7TiseXBaoBhersD-_1q7p1Ut3DyagdSddc5sS3Bi4TrtNgOBoA0nhDAWJio4mKm5pmoJP0_0Bw8paErVjR88Sa")

# Initialize OpenAI client
openai_client = OpenAI(api_key=OPENAI_API_KEY)

def transcribe_audio(audio_file_path, use_minimax=False):
    """Transcribe audio using Whisper or MiniMax fallback"""
    try:
        with open(audio_file_path, 'rb') as audio_file:
            if not use_minimax:
                # Use OpenAI Whisper
                transcript = openai_client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    response_format="text"
                )
                return transcript
            else:
                # MiniMax fallback (would need specific API implementation)
                # For now, return error message
                return "MiniMax transcription not yet implemented. Please use OpenAI."

    except Exception as e:
        print(f"Transcription error: {e}")
        if not use_minimax:
            # Retry with MiniMax
            return transcribe_audio(audio_file_path, use_minimax=True)
        raise

def generate_newsletter(transcript, photo_analysis=None):
    """Generate newsletter content using GPT-4o"""
    try:
        messages = [
            {
                "role": "system",
                "content": "You are a skilled newsletter writer. Transform raw content into engaging newsletters."
            },
            {
                "role": "user",
                "content": f"""Transform this into a newsletter:

Transcript: {transcript}
{f"Photo context: {photo_analysis}" if photo_analysis else ""}

Output HTML with <h2> title, <p> paragraphs, <strong> emphasis.
Length: 300-500 words.
Tone: Warm, conversational.
Include: Hook, main content, personal insight, call-to-action, P.S. line."""
            }
        ]

        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )

        return response.choices[0].message.content

    except Exception as e:
        print(f"Newsletter generation error: {e}")
        raise

async def handle_voice_message(update: Update, context):
    """Handle incoming voice messages"""
    voice = update.message.voice
    user = update.effective_user

    print(f"Voice message from {user.id}: {voice.file_id}")

    # Acknowledge receipt
    await update.message.reply_text(
        "🎙️ Voice received! Transcribing..."
    )

    try:
        # Download voice file
        file = await context.bot.get_file(voice.file_id)
        voice_path = f"/tmp/voice_{voice.file_id}.oga"
        await file.download_to_drive(voice_path)

        # Transcribe
        transcript = transcribe_audio(voice_path)

        # Generate newsletter
        newsletter = generate_newsletter(transcript)

        # Send draft
        await update.message.reply_text(
            f"📧 **Newsletter Draft**\n\n{newsletter}\n\n"
            f"---\n💡 Edit & publish!",
            parse_mode='Markdown'
        )

        # Cleanup
        os.remove(voice_path)

    except Exception as e:
        print(f"Error processing voice: {e}")
        await update.message.reply_text(
            f"❌ Error: {str(e)}"
        )

async def handle_photo_message(update: Update, context):
    """Handle incoming photo messages"""
    photo = update.message.photo[-1]  # Get largest photo
    user = update.effective_user

    print(f"Photo from {user.id}: {photo.file_id}")

    await update.message.reply_text(
        "📸 Photo received! Please also send a voice note with context."
    )

async def handle_combined_voice_photo(update: Update, context):
    """Handle voice + photo together (would need conversation state tracking)"""
    # For now, treat as voice-first
    await handle_voice_message(update, context)

async def start_command(update: Update, context):
    """Handle /start command"""
    await update.message.reply_text(
        """🎙️ **Voice to Newsletter Bot**

Send me a voice note (and optionally a photo) and I'll:
1. Transcribe your audio
2. Generate a newsletter draft
3. Send it back for review

Commands:
/start - Show this message
/help - Get help

Ready! Send a voice note."""
    )

async def help_command(update: Update, context):
    """Handle /help command"""
    await update.message.reply_text(
        """**Help**

**How to use:**
1. Record a voice note
2. Send it to this bot
3. Optionally attach a photo
4. Receive your newsletter draft

**Tips:**
- Speak clearly for better transcription
- Keep voice notes under 3 minutes
- Photos add context to your story

**Issues?**
- Contact admin for support"""
    )

def main():
    """Start the bot"""
    if not TELEGRAM_BOT_TOKEN:
        print("Error: TELEGRAM_BOT_TOKEN not set")
        return

    if not OPENAI_API_KEY:
        print("Error: OPENAI_API_KEY not set")
        return

    # Create application
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # Add handlers
    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(MessageHandler(filters.VOICE, handle_voice_message))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo_message))

    # Start bot
    print("🤖 Bot started!")
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
