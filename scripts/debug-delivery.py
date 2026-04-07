#!/usr/bin/env python3
"""Debug version with print statements"""

import asyncio
import aiohttp
import json

TAP_CONFIG = {
    "Dwayne News Feed": {
        "token": "fh_52IxqhJVdXqS0AOE6paF1wFPI79iAK6GL582ElRn",
        "topic_id": 8
    }
}

TELEGRAM_BOT_TOKEN = "8637621091:AAGTsXJNGynaNIi9nhhWlrsjcSHHHSarw8I"
TELEGRAM_CHAT_ID = "-1003842503877"
STREAM_TIMEOUT = 10


async def stream_tap(tap_name, config):
    """Stream events from a Firehose tap."""
    url = f"https://api.firehose.com/v1/stream"
    headers = {"Authorization": f"Bearer {config['token']}"}

    print(f"Starting stream for {tap_name}...")

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=STREAM_TIMEOUT)) as resp:
                print(f"Connected! Status: {resp.status}")

                if resp.status != 200:
                    print(f"Error {resp.status}: {await resp.text()}")
                    return

                event_type = None
                async for line in resp.content:
                    line = line.decode().strip()
                    if line:
                        print(f"Line: {line[:100]}")

                        if line.startswith("event: "):
                            event_type = line[7:]
                        elif line.startswith("data: "):
                            if event_type == "update":
                                print("Got update event!")
                                data_str = line[6:]
                                try:
                                    data = json.loads(data_str)
                                    print(f"Data keys: {list(data.keys())}")
                                except json.JSONDecodeError:
                                    print("JSON decode error")

    except asyncio.TimeoutError:
        print("Stream timed out")
    except Exception as e:
        print(f"Error: {e}")


async def main():
    for tap_name, config in TAP_CONFIG.items():
        await stream_tap(tap_name, config)


if __name__ == "__main__":
    print("=== Firehose Debug ===")
    asyncio.run(main())
