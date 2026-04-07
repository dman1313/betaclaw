#!/usr/bin/env python3
"""
Firehose → Telegram Delivery Service
Connects to multiple Firehose taps and routes matches to Telegram topics.
"""

import os
import json
import asyncio
import aiohttp
from datetime import datetime

# Tap to topic mapping
TAP_CONFIG = {
    "Dwayne News Feed": {
        "token": "fh_52IxqhJVdXqS0AOE6paF1wFPI79iAK6GL582ElRn",
        "tap_id": "607d826e-2c7e-443a-a649-acf7f698f3f1",
        "topic_id": 8  # News & Events
    },
    "Social Media Trends": {
        "token": "fh_qHo63fwNR18bAK5xsreZ02HH7ZETPbeREa3CbCU6",
        "tap_id": "4e586d3f-c85a-42e5-ad4c-1682f34699de",
        "topic_id": 236
    },
    "Meditation & Wellness": {
        "token": "fh_jjiK8ZMhSngxF77EUC2CBILj1qyO75wzyqvPf3ZJ",
        "tap_id": "6fd6b96f-1dc1-4d87-9e42-c0d5978b4b1f",
        "topic_id": 237
    },
    "Nutrition & Health": {
        "token": "fh_HeGobDuFJBmNS9zEnLW9HjHh3Mda4Y4qP17sz13J",
        "tap_id": "f5da10be-5cad-4434-ba9f-d0ff53f82f82",
        "topic_id": 238
    },
    "Parenting & Child Development": {
        "token": "fh_WCPD8NP2d8NaNkWmIFl8n2T3fnxtpQXxwF2jGBkL",
        "tap_id": "f0a5f50e-fd13-4888-8d4a-4e4cac4b70d1",
        "topic_id": 239
    },
    "News & Stock Market": {
        "token": "fh_llLkTy6IFOW8BVc04fwe7UQH20N7fauRDghAzjMI",
        "tap_id": "eeb70ec3-7656-4ce4-afe3-ca735196057e",
        "topic_id": 240
    },
    "Education, Brain Science & Learning": {
        "token": "fh_EIrnEvEoCaqLhsdzssF90agyjiaIgrit8oIlmNil",
        "tap_id": "87b8e795-402d-447f-b08d-f111f7bd4f60",
        "topic_id": 242
    },
    "AI, LLMs & Agents": {
        "token": "fh_tS4McWlLLvPWgHxd7itXZXktdYPX4ofXVPVbNFBn",
        "tap_id": "e6b2c7c6-c913-4e56-bac6-8f6bb82f1265",
        "topic_id": 228
    }
}

TELEGRAM_BOT_TOKEN = "8637621091:AAGTsXJNGynaNIi9nhhWlrsjcSHHHSarw8I"
TELEGRAM_CHAT_ID = "-1003842503877"

FIREHOSE_BASE = "https://api.firehose.com"
STREAM_TIMEOUT = 290  # seconds (just under 300s max)


def format_article(doc, tap_name):
    """Format a Firehose document for Telegram."""
    title = doc.get("title", "No title")
    url = doc.get("url", "")
    publish_time = doc.get("publish_time", "")

    # Try to get a snippet from diff or markdown
    snippet = ""
    if "diff" in doc and "chunks" in doc["diff"]:
        for chunk in doc["diff"]["chunks"][:2]:  # First 2 chunks
            if chunk.get("typ") == "ins":
                text = chunk.get("text", "")
                if len(text) > 200:
                    snippet = text[:197] + "..."
                else:
                    snippet = text
                break

    if not snippet and "markdown" in doc:
        md = doc["markdown"]
        # Extract first paragraph (up to 200 chars)
        lines = md.split("\n\n")
        if lines:
            snippet = lines[0][:200] + "..." if len(lines[0]) > 200 else lines[0]

    # Format timestamp if available
    time_str = ""
    if publish_time:
        try:
            dt = datetime.fromisoformat(publish_time.replace("Z", "+00:00"))
            time_str = dt.strftime("%H:%M UTC · %b %d")
        except:
            pass

    # Build message (handle Telegram URL length limits)
    lines = []
    if title:
        lines.append(f"📰 <b>{escape_html(title)}</b>")
    if snippet:
        lines.append(f"{escape_html(snippet)}")
    lines.append(f"🔗 {url}")
    if time_str:
        lines.append(f"🕐 {time_str}")

    return "\n\n".join(lines)


def escape_html(text):
    """Escape HTML special characters for Telegram."""
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;"))


async def send_to_telegram(topic_id, text):
    """Send a message to a Telegram topic."""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "message_thread_id": topic_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": False
    }

    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(url, json=data) as resp:
                if resp.status == 200:
                    return True
                else:
                    error_text = await resp.text()
                    print(f"Telegram error {resp.status}: {error_text}")
                    return False
        except Exception as e:
            print(f"Telegram send error: {e}")
            return False


async def stream_tap(tap_name, config):
    """Stream events from a single Firehose tap."""
    url = f"{FIREHOSE_BASE}/v1/stream"
    headers = {"Authorization": f"Bearer {config['token']}"}

    while True:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=STREAM_TIMEOUT)) as resp:
                    if resp.status != 200:
                        print(f"[{tap_name}] Stream error {resp.status}, retrying in 5s...")
                        await asyncio.sleep(5)
                        continue

                    # Process SSE stream
                    async for line in resp.content:
                        line = line.decode().strip()
                        if not line:
                            continue

                        if line.startswith("event: "):
                            event_type = line[7:]
                        elif line.startswith("data: "):
                            data_str = line[6:]
                            if event_type == "update":
                                try:
                                    data = json.loads(data_str)
                                    if "document" in data:
                                        doc = data["document"]
                                        message = format_article(doc, tap_name)
                                        success = await send_to_telegram(config["topic_id"], message)
                                        if success:
                                            print(f"[{tap_name}] Delivered: {doc.get('title', 'No title')[:50]}")
                                        else:
                                            print(f"[{tap_name}] Failed to deliver")
                                except json.JSONDecodeError as e:
                                    print(f"[{tap_name}] JSON decode error: {e}")

        except asyncio.TimeoutError:
            print(f"[{tap_name}] Stream timeout, reconnecting...")
            await asyncio.sleep(2)
        except Exception as e:
            print(f"[{tap_name}] Stream error: {e}, retrying in 10s...")
            await asyncio.sleep(10)


async def main():
    """Run all tap streams concurrently."""
    tasks = []
    for tap_name, config in TAP_CONFIG.items():
        task = asyncio.create_task(stream_tap(tap_name, config))
        tasks.append(task)
        print(f"Started stream: {tap_name} → topic {config['topic_id']}")

    # Run forever
    await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())
