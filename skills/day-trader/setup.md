# Day Trader Skill — Setup Notes

## Installation Status

✅ **Completed:**
- Cloned TradingAgents v0.2.3 to `/home/node/.openclaw/workspace/TradingAgents`
- Created Python virtual environment at `venv/`
- Installed all dependencies via `pip install -e .`
- Created `.env` file for API keys

⏳ **Next Steps:**

### 1. Set API Keys

Edit `/home/node/.openclaw/workspace/TradingAgents/.env` and add at least one:

```bash
# Choose one or more LLM providers:
OPENAI_API_KEY=sk-...           # For GPT models (recommended)
GOOGLE_API_KEY=...              # For Gemini
ANTHROPIC_API_KEY=sk-ant-...   # For Claude
XAI_API_KEY=...                 # For Grok
OPENROUTER_API_KEY=...         # For multiple models
```

### 2. Data Vendor Setup

**Free option (recommended for testing):**
- yfinance — Free, no API key needed. Configured by default.

**Premium option:**
- Alpha Vantage — Get free key at https://www.alphavantage.co/support/#api-key
- Add to config: `config["data_vendors"]["core_stock_apis"] = "alpha_vantage"`

### 3. Test Installation

```bash
cd /home/node/.openclaw/workspace/TradingAgents

# Activate virtual environment
. venv/bin/activate

# Run interactive CLI
python -m cli.main
```

### 4. Quick Test (Python)

```python
from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

# Minimal test config
config = DEFAULT_CONFIG.copy()
config["llm_provider"] = "openai"  # Change based on your key
config["deep_think_llm"] = "gpt-5.4"
config["quick_think_llm"] = "gpt-5.4-mini"
config["max_debate_rounds"] = 1  # Faster for testing

ta = TradingAgentsGraph(debug=False, config=config)
_, decision = ta.propagate("AAPL", "2026-04-06")
print(decision)
```

## Configuration for Your Setup

### Using GLM-5.1 (Zai)

If you want to use GLM-5.1, configure:

```python
config = DEFAULT_CONFIG.copy()
config["llm_provider"] = "openai"  # GLM-5.1 uses OpenAI-compatible API
config["deep_think_llm"] = "glm-4.7"  # Or your model name
config["quick_think_llm"] = "glm-4.7"
config["backend_url"] = "https://api.z.ai/api/coding/paas/v4"  # Zai endpoint
```

Then set:
```bash
export OPENAI_API_KEY=your-zai-api-key
```

### Model Performance Notes

- **Deep think model** — Used for complex reasoning (analyst reports, debates)
- **Quick think model** — Used for simple tasks (data fetching, formatting)
- **More debate rounds** = Deeper analysis but significantly slower
- **yfinance** = Free but has rate limits
- **Alpha Vantage** = Better data but requires API key

## Common Issues

### "Module not found" error
Make sure you're using the virtual environment:
```bash
cd /home/node/.openclaw/workspace/TradingAgents
. venv/bin/activate
```

### API key errors
Check that `.env` file exists and contains your key:
```bash
cat .env
```

### Rate limiting (yfinance)
Reduce frequency or use Alpha Vantage:
```python
config["data_vendors"]["core_stock_apis"] = "alpha_vantage"
```

## Integration with OpenClaw

This skill can be called from other workflows. The skill provides:
- Full multi-agent analysis
- Structured reports by analyst
- Final trade decision with reasoning
- Risk assessment

Example OpenClaw command:
```
/day-trader analyze NVDA
```

Would run the full TradingAgents pipeline and return results.

## Files Reference

- **Main code:** `/home/node/.openclaw/workspace/TradingAgents/`
- **Virtual env:** `/home/node/.openclaw/workspace/TradingAgents/venv/`
- **Config file:** `/home/node/.openclaw/workspace/TradingAgents/.env`
- **Skill docs:** `/home/node/.openclaw/workspace/skills/day-trader/SKILL.md`
- **Setup notes:** `/home/node/.openclaw/workspace/skills/day-trader/setup.md`
