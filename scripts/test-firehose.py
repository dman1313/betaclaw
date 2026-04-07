#!/usr/bin/env python3
"""Quick test: connect to one Firehose stream for 10 seconds"""

import asyncio
import aiohttp
import json

TELEGRAM_BOT_TOKEN = "8637621091:AAGTsXJNGynaNIi9nhhWlrsjcSHHHSarw8I"
TELEGRAM_CHAT_ID = "-1003842503877"
TELEGRAM_TOPIC = 8  # News & Events
TAP_TOKEN = "fh_52IxqhJVdXqS0AOE6paF1wFPI79iAK6GL582ElRn"


async def test_stream():
    url = "https://api.firehose.com/v1/stream"
    headers = {"Authorization": f"Bearer {TAP_TOKEN}"}

    print("Connecting to Firehose stream...")
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                print(f"Connected! Status: {resp.status}")
                if resp.status == 200:
                    async for line in resp.content:
                        line = line.decode().strip()
                        if line:
                            print(f"Received: {line[:100]}")
                else:
                    print(f"Error: {await resp.text()}")
    except asyncio.TimeoutError:
        print("Connection timed out (expected after 10s)")
    except Exception as e:
        print(f"Error: {e}")


async def test_telegram():
    """Test sending to Telegram"""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "message_thread_id": TELEGRAM_TOPIC,
        "text": "🧪 Firehose delivery test - if you see this, Telegram posting works!",
        "parse_mode": "HTML"
    }

    print("\nTesting Telegram post...")
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as resp:
            if resp.status == 200:
                result = await resp.json()
                print(f"✅ Telegram test passed! Message ID: {result['result']['message_id']}")
            else:
                print(f"❌ Telegram error: {await resp.text()}")


async def main():
    await test_stream()
    await test_telegram()


if __name__ == "__main__":
    asyncio.run(main())
