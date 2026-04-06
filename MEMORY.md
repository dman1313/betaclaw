# MEMORY.md — Long-Term Memory

_Curated wisdom. Updated regularly from daily logs._

## About Dwayne
- Name: Dwayne Primeau
- Telegram: @kabubaibai
- Style: Direct, action-oriented. Wants things done, not explained.
- First session: 2026-04-04

## Setup History
- 2026-04-04: Fresh OpenClaw install configured from scratch
  - Added GLM-5.1 as primary model (coding plan, endpoint: api.z.ai/api/coding/paas/v4)
  - DeepSeek as fallback provider
  - Telegram bot: @betaclawv1_bot (paired)
  - Identity: CLAW CLAW — wealth-building special-ops partner

## Lessons Learned
- GLM-5.1 returns reasoning_content before final content — normal behavior for reasoning models
- Telegram token was accidentally set to Zai API key — fixed with real bot token from BotFather
- Config edits directly to openclaw.json work when gateway config.patch fails due to pairing issues
- **Multiple gateway instances = 409 getUpdates conflict** — always kill duplicates before restarting. The container's start_gateway.sh loop can spawn extra instances if killed improperly.

## Active Projects
- **News Pipeline**: Firehose API live with 5 rules. Next: build delivery pipeline to Telegram group topic.
- **Trading Setup**: TradingAgents v0.2.3 installed, dependencies ready. Day Trader skill created. Needs API key configuration in `.env`.

## Key Decisions
- "Dream" / "Dream time" = trigger DREAM v2 nightly reflection cycle — always, no exceptions
- DREAM skill lives at skills/dream/SKILL.md
- Skipped MetaClaw install — adopted good ideas natively instead
- GLM-5.1 over GLM-4.7 as primary — Dwayne's explicit request

## Skills Built
- Cloner — external research → production skills
- Workflow Templates — composable pipelines (from Lobster)
- Newsletter & Social Media Pipeline — full comms production workflow
- End-of-Session Review — auto-extract skills after productive chats
- Firehose API — real-time web monitoring via Lucene queries + SSE streaming
- **Day Trader** — multi-agent LLM trading framework (fundamentals, technical, sentiment, news analysts; bull/bear debate; risk management)

## Telegram Groups
- "Dwayne & Betaclaw" (-1003842503877) — forum mode, topics working
- "News & Events" topic (thread 8) — for news delivery
- Bot is admin, can create/manage topics

## News Setup
- Firehose API v3.0 skill — fully rebuilt from official docs + use cases
- Management key active, tap "Dwayne News Feed" created with 5 rules (tech, finance, crypto, ai, world)
- Stream connects OK — matches flowing as pages get crawled
- **Next:** Build delivery pipeline (Firehose stream → Telegram group topic)
- Dwayne also has 7 other taps (Social Media Trends, AI/LLMs, Education, News & Stock Market, Parenting, Nutrition, Meditation)

## Telegram Group Status
- Two-way messaging **FIXED** — root cause was multiple gateway instances (409 conflict)
- Config: `groupPolicy: "open"`, `groupAllowFrom: ["7824646153"]`, specific group `-1003842503877`
- Confirmed working via session logs (topic 54 received)
