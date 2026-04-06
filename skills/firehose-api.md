# Skill: Firehose API — Real-Time Web Monitoring

**Description:** Monitor the web in real-time using Firehose. Create Lucene query rules to match crawled pages and receive results via SSE stream. Use for news monitoring, brand tracking, competitor intel, market research, and security alerts.

**Sources:** https://firehose.com/api-docs, https://firehose.com/use-cases

## Triggers
- "monitor the web for", "track mentions of", "set up a firehose rule"
- "stream web matches", "create a news alert", "watch for"
- "firehose", "real-time web monitoring", "web event stream"
- "brand monitoring", "competitive intelligence", "news feed"

## Setup

**Required keys (stored in env):**
- `FIREHOSE_MANAGEMENT_KEY` — Admin key (`fhm_` prefix) for creating/managing taps
- `FIREHOSE_TAP_TOKEN` — Tap token (`fh_` prefix) for rules and streaming

**Base URL:** `https://api.firehose.com`

**Auth:** `Authorization: Bearer <key>` (both key types use Bearer)

## Key Concepts

| Concept | Description |
|---|---|
| **Management Key** (`fhm_`) | Create, list, update, revoke taps. Created by admins. Shown once. |
| **Tap** | A named collection of rules. Each tap has its own token. |
| **Tap Token** (`fh_`) | Manage rules within a tap and stream results. Retrievable anytime. |
| **Rule** | A Lucene query that matches against crawled pages. Max 25 per org. |
| **Stream** | SSE connection delivering matched pages in real-time. |

## API Reference

### Management Endpoints (fhm_ key)

#### List Taps
```bash
curl -s -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  https://api.firehose.com/v1/taps
```

#### Create Tap
```bash
curl -s -X POST \
  -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "News Tracker"}' \
  https://api.firehose.com/v1/taps
```
Returns `data` + full `token` field. **Save the token — it's shown at creation and in GET /v1/taps.**

#### Get / Update / Revoke Tap
```bash
curl -s -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  https://api.firehose.com/v1/taps/<tap_id>

curl -s -X PUT -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Name"}' \
  https://api.firehose.com/v1/taps/<tap_id>

curl -s -X DELETE -H "Authorization: Bearer $FIREHOSE_MANAGEMENT_KEY" \
  https://api.firehose.com/v1/taps/<tap_id>   # 204 no content
```

### Tap Token Endpoints (fh_ key)

#### List Rules
```bash
curl -s -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  https://api.firehose.com/v1/rules
```

#### Create Rule
```bash
# Simple keyword match
curl -s -X POST \
  -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "tesla", "tag": "tesla-mentions"}' \
  https://api.firehose.com/v1/rules

# Advanced with filters
curl -s -X POST \
  -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "title:tesla AND page_category:\"/News\" AND language:\"en\" AND recent:24h", "tag": "tesla-news"}' \
  https://api.firehose.com/v1/rules
```
**Fields:** `value` (required, Lucene query), `tag` (optional, max 255 chars), `nsfw` (boolean, default false), `quality` (boolean, default true). Max 25 rules per org.

#### Get / Update / Delete Rule
```bash
curl -s -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  https://api.firehose.com/v1/rules/<rule_id>

curl -s -X PUT -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "new query", "tag": "new-tag"}' \
  https://api.firehose.com/v1/rules/<rule_id>

curl -s -X DELETE -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  https://api.firehose.com/v1/rules/<rule_id>   # 204 no content
```

### Stream (SSE)
```bash
# Live tail (default 300s)
curl -N -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  https://api.firehose.com/v1/stream

# With params
curl -N -H "Authorization: Bearer $FIREHOSE_TAP_TOKEN" \
  'https://api.firehose.com/v1/stream?timeout=60&since=30m&limit=100'
```

**Params:** `timeout` (1-300s, default 300), `since` (relative replay, e.g. `5m`, `1h`, max 24h), `offset` (exact Kafka offset), `limit` (1-10000 events)

**Resume:** `Last-Event-ID: {partition}-{offset}` — auto-reconnect from last event.

**Precedence:** Last-Event-ID > offset > since > default (live)

## SSE Event Types

| Event | Description |
|---|---|
| `connected` | Connection opened |
| `update` | Page matched a rule (see payload below) |
| `error` | Something went wrong |
| `end` | Stream ended (timeout or limit reached) |

### Update Event Payload
```
id: {partition}-{offset}
event: update
data: {
  "query_id": "rule-id",
  "matched_at": "2026-02-13T08:06:32Z",
  "tap_id": "tap-id",
  "document": {
    "url": "https://example.com/page",
    "title": "Example Page",
    "publish_time": "2026-02-13T08:06:32",
    "diff": { "chunks": [{ "typ": "ins", "text": "New content..." }] },
    "page_category": ["/News"],
    "page_types": ["/Article"],
    "language": "en",
    "markdown": "full page content..."
  }
}
```

## Lucene Query Reference

### Indexed Fields

| Field | Type | Case | Description |
|---|---|---|---|
| `added` (default) | text | insensitive | Text from inserted diff chunks. Default for bare terms. |
| `removed` | text | insensitive | Text from deleted diff chunks |
| `added_anchor` | text | insensitive | Anchor text from inserted links |
| `removed_anchor` | text | insensitive | Anchor text from deleted links |
| `title` | text | insensitive | Page title |
| `url` | keyword | **sensitive** | Full URL (exact match) |
| `domain` | keyword | **sensitive** | Domain (e.g. `example.com`) |
| `publish_time` | keyword | **sensitive** | ISO-8601 datetime |
| `page_category` | keyword | **sensitive** | ML category (e.g. `/News`) |
| `page_type` | keyword | **sensitive** | ML type (e.g. `/Article`) |
| `language` | keyword | **sensitive** | ISO 639-1 code (e.g. `en`, `fr`) |
| `recent` | filter | — | Recency: `1h`, `7d`, `3mo` |

**Text vs keyword:** Text fields are tokenized/lowercased (case-insensitive). Keyword fields are exact match (case-sensitive). Null/empty fields are absent — queries against them never match.

### Common Patterns
```bash
# Brand mentions in news
"brand name" AND page_category:"/News" AND language:"en" AND recent:24h

# Competitor tracking on specific site
domain:techcrunch.com AND added:acquisition

# Financial news
title:tesla AND page_category:"/News" AND language:"en"

# Security alerts
added:"data breach" AND page_category:"/News" AND recent:24h

# Research papers
domain:arxiv.org AND added:"large language model"

# SEC filings
domain:sec.gov AND title:"10-K"

# Job market intelligence
domain:greenhouse.io AND added:"machine learning engineer"

# Breaking changes in dependencies
domain:github.com AND title:"release" AND added:"breaking change"

# AI news with quality filter
page_category:"/News" AND added:"artificial intelligence" AND language:"en" AND recent:7d
```

### URL/Domain Queries
Forward slashes must be escaped with `\` in wildcard queries. In JSON, use `\\/`:
```bash
# Wildcard (contains path segment)
url:*\\/category\\/*

# Regex (pattern matching)
url:/.*\\/page\\/[0-9]+.*/

# Exclude pagination/category/tag pages
NOT url:/.*\\/page\\/[0-9]+.*/ AND NOT url:*\\/category\\/* AND NOT url:*\\/tag\\/*
```

### Date Ranges
```bash
publish_time:[2025-01-01T00\\:00\\:00 TO 2025-12-31T23\\:59\\:59]
```
Colons must be escaped with `\\:` in all query types.

### Boolean Operators
```bash
java AND programming           # both terms
title:tesla OR added:"electric vehicle"  # either
NOT malware                     # exclude
title:ahrefs AND added:seo     # cross-field
```

## Quality & NSFW Filters

**Quality filter** (`quality` field on rule, default `true`):
- Pages published within last 7 days only
- No pagination URLs (`/page/1`, `/page/2`)
- No tag/category index URLs (`/tag/seo`, `/category/news`)
- No URLs with query parameters (`?page=2`)

**NSFW filter** (`nsfw` field on rule, default `false`):
- `true` = include adult content
- `false` = exclude adult content

## Use Cases

| Use Case | Example Rule |
|---|---|
| Brand Monitoring | `added:"Tesla" OR title:"Tesla Motors"` |
| Competitive Intel | `domain:techcrunch.com AND added:acquisition` |
| Financial News | `title:tesla AND page_category:"/News" AND language:"en"` |
| Security Alerts | `added:"data breach" AND page_category:"/News" AND recent:24h` |
| E-commerce Pricing | `domain:amazon.com AND title:"deal" AND page_type:"/Article"` |
| Research Papers | `domain:arxiv.org AND added:"large language model"` |
| Legal/Regulatory | `domain:sec.gov AND title:"10-K"` |
| Media/Content | `page_category:"/News" AND added:"artificial intelligence" AND language:"en"` |
| Dev Tool Monitoring | `domain:github.com AND title:"release" AND added:"breaking change"` |
| Job Market | `domain:greenhouse.io AND added:"machine learning engineer"` |

## Pitfalls

1. **Max 25 rules per org** — consolidate queries with OR instead of creating many narrow rules. List existing rules before creating new ones.
2. **Keyword fields are case-sensitive** — `page_category:"/News"` must match exactly. Check values with a broad query first.
3. **Forward slashes need escaping** — `\\/` in JSON for wildcard, `\\/` inside regex patterns. Forget this and your URL queries silently fail.
4. **Management key shown once** — if lost, must generate a new one from dashboard. Tap tokens are retrievable via GET /v1/taps.
5. **Stream timeout max 300s** — long-running monitors need reconnect logic. Use `Last-Event-ID` for gapless resume.
6. **~24h event buffer** — `since` can only replay up to 24h. Events older than that are gone.
7. **Null fields are absent** — querying `page_category` on pages without categories returns nothing. Use OR fallbacks.
8. **`recent` is a filter, not a field** — it's parsed from the query string server-side, not indexed on documents.

## Active Tap (Dwayne's News Feed)

- **Tap ID:** `607d826e-2c7e-443a-a649-acf7f698f3f1`
- **Tap Name:** Dwayne News Feed
- **Token:** `fh_52IxqhJVdXqS0AOE6paF1wFPI79iAK6GL582ElRn`
- **Rules:** tech, finance, crypto, ai, world

## Version History
- v3.0.0 (2026-04-06): Full rebuild from official API docs + use cases. Added Lucene deep reference, URL escaping rules, quality/NSFW docs, 10 use cases, pitfalls.
- v2.0.0 (2026-04-05): Initial skill from use-cases page only
- v1.0.0 (2026-04-04): First draft
