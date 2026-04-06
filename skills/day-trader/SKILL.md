---
name: day-trader
description: Multi-agent LLM trading framework for day trading analysis. Run TradingAgents to analyze stocks with fundamental, technical, sentiment, and news analysts, then debate trading decisions through bullish/bearish researchers and risk management. Research tool, not financial advice.
metadata: {"openclaw":{"emoji":"📈","requires":{"files":["TradingAgents/venv/"],"env":["TradingAgents/.env"]}}}
---

# Day Trader Skill — TradingAgents Framework

Multi-agent LLM trading analysis framework cloned from TauricResearch/TradingAgents v0.2.3. Not financial advice — research tool only.

## When to use this skill

Use when the user:
- Asks for stock analysis (e.g., "analyze NVDA", "what about AAPL?")
- Wants trading signals or buy/sell research
- Asks for fundamental, technical, or sentiment analysis
- Wants multi-perspective trading research with debates
- Needs risk assessment on potential trades

⚠️ **Disclaimer**: TradingAgents is for research purposes. Trading performance varies based on models, temperature, periods, data quality, and other factors. NOT financial, investment, or trading advice.

## Installation Status

✅ **Already installed:**
- Cloned to `/home/node/.openclaw/workspace/TradingAgents`
- Virtual environment created at `venv/`
- All dependencies installed via `pip install -e .`
- `.env` file created for API keys

⏳ **Required:** Set your API keys in `/home/node/.openclaw/workspace/TradingAgents/.env`

### Quick Setup

```bash
# Edit .env and add your key
cd /home/node/.openclaw/workspace/TradingAgents
nano .env

# Add at least one:
OPENAI_API_KEY=sk-...           # For GPT models
GOOGLE_API_KEY=...              # For Gemini
ANTHROPIC_API_KEY=sk-ant-...   # For Claude
XAI_API_KEY=...                 # For Grok
OPENROUTER_API_KEY=...         # For multiple models
```

Required API vendors (one or more):
- LLM provider: OpenAI, Google, Anthropic, xAI, OpenRouter, or Ollama
- Data: yfinance (free) or Alpha Vantage (API key required)

## Quick Start

Run interactive CLI:
```bash
cd /home/node/.openclaw/workspace/TradingAgents
python -m cli.main
```

This launches an interactive terminal UI where you can select:
- Tickers to analyze
- Analysis date (default: today)
- LLM provider and model
- Research depth (debate rounds)
- Analyst selection

## Python API Usage

For programmatic analysis from OpenClaw:

```python
from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

# Use your configured model (e.g., GLM-5.1)
config = DEFAULT_CONFIG.copy()
config["llm_provider"] = "openai"  # Change based on your setup
config["deep_think_llm"] = "gpt-5.4"  # Or your model
config["quick_think_llm"] = "gpt-5.4-mini"
config["max_debate_rounds"] = 2  # More rounds = deeper analysis

ta = TradingAgentsGraph(debug=True, config=config)
_, decision = ta.propagate("NVDA", "2026-04-06")
print(decision)
```

## Agent Teams

TradingAgents runs specialized agents in sequence:

### 1. Analyst Team (parallel)
- **Market Analyst** — Technical indicators (MACD, RSI, moving averages)
- **Social Analyst** — Social media sentiment scoring
- **News Analyst** — News and macroeconomic impact analysis
- **Fundamentals Analyst** — Financial statements, intrinsic value, red flags

### 2. Research Team (debate)
- **Bullish Researcher** — Makes case for buying
- **Bearish Researcher** — Makes case for selling/holding
- **Research Manager** — Synthesizes into investment plan

### 3. Trading Team
- **Trader** — Composes research into specific trade timing and size

### 4. Risk Management Team
- **Aggressive Analyst** — Maximizes upside focus
- **Neutral Analyst** — Balanced risk/reward
- **Conservative Analyst** — Capital preservation focus

### 5. Portfolio Manager
- **Final Decision** — Approves or rejects trade proposal

## Configuration Options

Edit `config` dictionary before running:

```python
config = DEFAULT_CONFIG.copy()

# LLM Settings
config["llm_provider"] = "openai"  # openai, google, anthropic, xai, openrouter, ollama
config["deep_think_llm"] = "gpt-5.4"
config["quick_think_llm"] = "gpt-5.4-mini"
config["backend_url"] = "https://api.openai.com/v1"  # Custom endpoint

# Thinking modes (optional)
config["openai_reasoning_effort"] = "medium"  # low, medium, high
config["google_thinking_level"] = "high"  # minimal, high
config["anthropic_effort"] = "high"  # low, medium, high

# Debate depth
config["max_debate_rounds"] = 2  # More rounds = longer, deeper analysis
config["max_risk_discuss_rounds"] = 1

# Data vendors
config["data_vendors"] = {
    "core_stock_apis": "yfinance",       # or alpha_vantage
    "technical_indicators": "yfinance",
    "fundamental_data": "yfinance",
    "news_data": "yfinance",
}

# Output language
config["output_language"] = "English"
```

## Common Workflows

### Quick single ticker analysis
```python
from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

ta = TradingAgentsGraph(debug=False, config=DEFAULT_CONFIG.copy())
_, decision = ta.propagate("AAPL", "2026-04-06")
```

### Multi-ticker batch analysis
```python
tickers = ["NVDA", "AAPL", "MSFT", "GOOGL", "TSLA"]
results = {}

for ticker in tickers:
    _, decision = ta.propagate(ticker, "2026-04-06")
    results[ticker] = decision

# Summarize all decisions
for ticker, decision in results.items():
    print(f"\n{ticker}: {decision}")
```

### Deep analysis (more debate rounds)
```python
config = DEFAULT_CONFIG.copy()
config["max_debate_rounds"] = 3  # Deeper bull/bear debate
config["max_risk_discuss_rounds"] = 2  # More risk discussion

ta = TradingAgentsGraph(debug=True, config=config)
_, decision = ta.propagate("NVDA", "2026-04-06")
```

## Integration with OpenClaw

This skill can be called from other OpenClaw workflows:

```bash
# From chat, the skill provides:
# - Full multi-agent analysis
# - Structured reports by analyst
# - Final trade decision with reasoning
# - Risk assessment
```

## Files Location

- Main code: `/home/node/.openclaw/workspace/TradingAgents/`
- Virtual environment: `TradingAgents/venv/`
- CLI entry point: `cli/main.py`
- Graph orchestration: `tradingagents/graph/trading_graph.py`
- Default config: `tradingagents/default_config.py`
- API keys: `.env` (create from `.env.example`)
- Results output: `./results/` (configurable via `TRADINGAGENTS_RESULTS_DIR`)
- Setup guide: `/home/node/.openclaw/workspace/skills/day-trader/setup.md`

## Performance Notes

- First run caches data (faster subsequent runs)
- More debate rounds = significantly longer run time
- yfinance is free but has rate limits
- Alpha Vantage has better data but requires API key

## License

TradingAgents is open-source from Tauric Research. See LICENSE in the repo.

## Disclaimer

⚠️ **NOT FINANCIAL ADVICE**

TradingAgents is designed for research purposes only. Trading performance varies based on many factors, including:
- Chosen backbone language models
- Model temperature and settings
- Trading periods and market conditions
- Quality and timeliness of data
- Other non-deterministic factors

Always do your own research and consult with qualified financial advisors before making trading decisions.

See full disclaimer: https://tauric.ai/disclaimer/
