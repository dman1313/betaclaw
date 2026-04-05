# Skill: Firehose API — Real-Time Web Monitor

**Description:** Monitor the web in real-time using Firehose. Create Lucene query rules to match crawled pages and receive results via SSE stream. Use for news monitoring, brand tracking, competitor intel, and market research.

## Triggers
- "monitor the web for", "track mentions of", "set up a firehose rule"
- "stream web matches", "create a news alert", "watch for"
- "firehose", "real-time web monitoring"

## Setup

**Required environment variables:**
- `FIREHOSE_MANAGEMENT_KEY` — Admin key (`fhm_` prefix) for creating/managing taps
- `FIREHOSE_TAP_TOKEN` — Tap token (`fh_` prefix) for rules and streaming

## Key Concepts

| Concept | Description |
|---|---|
| **Management Key** (`fhm_`) | Create, list, update, revoke taps. Created by admins. Shown once. |
| **Tap** | A named collection of rules. Each tap has its own token. |
| **Tap Token** (`fh_`) | Manage rules within a tap and stream results. Retrievable anytime. |
| **Rule** | A Lucene query that matches against crawled pages. Max 25 per org. |
| **Stream** | SSE connection delivering matched pages in real-time. |

## Commands

### List Taps (management key)
```bash
curl -s -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  https://api.firehose.com/v1/taps
```

### Create Tap (management key)
```bash
curl -s -X POST \
  -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "News Tracker"}' \
  https://api.firehose.com/v1/taps
```

### Create Rule
```bash
# Simple keyword match
curl -s -X POST \
  -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "tesla", "tag": "tesla-mentions"}' \
  https://api.firehose.com/v1/rules

# Advanced: title match + news category + English + last 24h
curl -s -X POST \
  -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "title:tesla AND page_category:\"/News\" AND language:\"en\" AND recent:24h", "tag": "tesla-news"}' \
  https://api.firehose.com/v1/rules
```

### List Rules
```bash
curl -s -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  https://api.firehose.com/v1/rules
```

### Delete Rule
```bash
curl -s -X DELETE \
  -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  https://api.firehose.com/v1/rules/RULE_ID
```

### Stream (SSE)
```bash
# Live tail (runs until timeout, default 300s)
curl -N -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  https://api.firehose.com/v1/stream

# With timeout and replay
curl -N -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  'https://api.firehose.com/v1/stream?timeout=60&since=30m&limit=100'
```

### Revoke Tap (management key)
```bash
curl -s -X DELETE \
  -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  https://api.firehose.com/v1/taps/TAP_UUID
```

## Lucene Query Quick Reference

### Most Useful Fields
| Field | Type | Example |
|---|---|---|
| `added` (default) | text, case-insensitive | `tesla` or `"electric vehicle"` |
| `title` | text, case-insensitive | `title:tesla` |
| `domain` | keyword, case-sensitive | `domain:techcrunch.com` |
| `url` | keyword, case-sensitive | `url:*\\/news\\/*` |
| `page_category` | keyword, case-sensitive | `page_category:"/News"` |
| `language` | keyword, case-sensitive | `language:"en"` |
| `recent` | filter | `recent:24h` |

### Common Patterns
```
# Brand mentions in news
"brand name" AND page_category:"/News" AND language:"en" AND recent:24h

# Competitor tracking
title:("competitor A" OR "competitor B") AND page_type:"/Article"

# Exclude junk URLs
title:tesla AND NOT url:/.*\/page\/[0-9]+.*/ AND NOT url:*\/category\/*

# Domain-specific
domain:reuters.com AND added:bitcoin AND recent:1h

# Multi-category
page_category:("/News/Technology_News" OR "/Finance/Investing") AND recent:7d
```

## News Rules for Dwayne

Pre-built rules for the daily digest:

```bash
# Tech News
-d '{"value": "page_category:\"/News/Technology_News\" AND language:\"en\" AND recent:24h", "tag": "tech-news"}'

# Finance
-d '{"value": "page_category:\"/News/Business_News/Financial_Markets_News\" AND language:\"en\" AND recent:24h", "tag": "finance-news"}'

# Crypto
-d '{"value": "(bitcoin OR ethereum OR crypto OR cryptocurrency) AND page_category:\"/Finance\" AND language:\"en\" AND recent:24h", "tag": "crypto-news"}'

# AI
-d '{"value": "(artificial intelligence OR \"machine learning\" OR \"large language model\" OR AI) AND page_category:\"/News/Technology_News\" AND language:\"en\" AND recent:24h", "tag": "ai-news"}'

# World News
-d '{"value": "page_category:\"/News/World_News\" AND language:\"en\" AND recent:24h", "tag": "world-news"}'
```

## Stream Response Format

Each matched page returns:
```json
{
  "query_id": "1",
  "matched_at": "2026-02-13T08:06:32Z",
  "document": {
    "url": "https://example.com/article",
    "title": "Article Title",
    "publish_time": "2026-02-13T08:06:32",
    "language": "en",
    "page_category": ["/News"],
    "page_types": ["/Article"],
    "markdown": "Full page content..."
  }
}
```

## Pitfalls

1. **URL escaping in JSON**: Lucene `/` must be `\\/` in JSON strings. `url:*\/abs\/*` becomes `"url:*\\/abs\\/*"` in JSON.
2. **Keyword fields are case-sensitive**: `domain:TechCrunch.com` won't match — use exact `domain:techcrunch.com`.
3. **25 rule limit per org**: Consolidate with `OR` operators. Don't waste rules on near-duplicates.
4. **Stream timeout**: Default 300s. Use `timeout` param or reconnect with `Last-Event-ID` for continuity.
5. **24h event buffer**: Events buffered ~24h. Use `since=24h` to replay missed events after disconnect.
6. **Quality filter is ON by default**: Auto-excludes pagination, tag/category pages, URLs with query params, and pages older than 7 days. Set `"quality": false` to disable.

## Rate Limits
| Endpoint | Limit |
|---|---|
| `/v1/rules` | 60 req/min per tap |
| `/v1/stream` | 30 connections/min per tap |

## Source
- Homepage: https://firehose.com
- API docs: https://firehose.com/use-cases
- Extracted: 2026-04-05
