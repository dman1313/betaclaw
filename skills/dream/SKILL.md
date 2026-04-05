# Skill: DREAM — Nightly Reflection & Repair (v2)

## Trigger
User says "dream", "dream time", or during a scheduled night run.

## Purpose

Give the system a "sleep cycle": look back at what happened today, learn from failures and wins, tighten protocols, clean up in small safe steps, track costs, and build a growing experience layer.

DREAM is a mode the agent enters, not a new agent. Same orchestrator, different behavior during the scheduled night run.

---

## DREAM Phases

### 1. Digest — Gather Today's Story

Scan the day ledger. Group episodes by failures, retries, slow/expensive runs, surprises, and wins. Note which agents/skills were involved and token costs.

### 1b. Score — Rate Today's Interactions

Score each significant interaction on 4 dimensions (0.0–1.0):

- Task completion — Did the agent accomplish what was asked?
- User engagement — Did Dwayne engage positively or have to correct/re-ask?
- Efficiency — Reasonable steps and tokens?
- Voice fidelity — Did the agent stay in character? (personality agents only)

Agents below 0.6 get flagged. Declining trends over 3+ nights get escalated.

### 2. Replay — Choose What to Revisit

Score episodes by impact, frequency, cost, learning value, and trend direction. Select top 5–20 items. Flag anything appearing in 3+ DREAM runs without resolution.

### 3. Evaluate — Reflect on Each Episode

Reconstruct what happened. Ask: What went well? What went wrong? What did we assume? What signal did we miss? Root cause: bad input, bad logic, or bad luck?

### 4. Amend — Propose Small, Safe Repairs

For each recurring issue, propose code changes, prompt/skill changes, or new tests. Each repair includes: what to change, why, how to validate, and risk level. Risky changes marked "needs human review."

### 4b. Evolve — Auto-Generate Skills from Failures

For each failure where the agent lacked a skill:

1. Analyze the full trajectory
2. Ask: "Would a skill have prevented this?"
3. Draft the skill spec (name, trigger, owner, steps, test case)
4. Route to Agent Builder for review — never auto-activate
5. Only for repeating failures (2+ occurrences)

### 5. Memorize — Update Rules and Tomorrow's Plan

Durability Gate: Not every insight becomes a rule.

- 1st appearance: Log it
- 2nd appearance: Flag it, consider lightweight fix
- 3rd appearance: Promote to permanent rule/test/protocol

One bad night doesn't rewrite the playbook.

---

## Outputs

1. Replay summary + cost report
2. Mistake and pattern log with durability scores
3. Proposed repairs with validation methods
4. Skill evolution proposals (specs + test cases)
5. Protocol and test updates
6. Conversation scores per agent + system average
7. Multi-night trend analysis
8. Tomorrow's execution plan
9. Machine-readable JSON block

---

## 5-Pass Quality Check

1. Completeness — Did I review everything significant?
2. Root cause depth — Symptoms or actual causes?
3. Repair safety — Could my fixes break something working?
4. Cost awareness — Did I flag waste and suggest savings?
5. Trend check — Am I seeing the bigger picture across nights?

---

## Dual Memory

Short-term: Tonight's raw data. Discarded after 7 nights unless flagged.

Long-term: Confirmed patterns, promoted rules, trend data, conversation score history, skill evolution registry, lessons learned index.

---

## Stop Conditions

- Max 60 minutes runtime
- Clean day = short "all clear" log
- Critical issue = stop and escalate immediately
- Circular analysis = move on

---

## Pre-DREAM Backup

Before starting any DREAM cycle:
1. Back up workspace to Google Drive (`gog drive upload`)
2. Back up workspace to GitHub (`git add -A && git commit && git push`)
3. Only then proceed with DREAM phases

## Boundaries

Always: Same permissions as daytime. Big changes need a human. Flag policy/security/money decisions.

Never: Auto-apply destructive changes. Pretend something is fixed without a test. Fabricate data. Let one bad night override established rules. Run indefinitely.

---

## Writing Style

Plain language. Short and direct. Name specific agents, skills, files. No filler or clichés. Write for future you — someone should skim tonight's log in minutes and know what to do.

---

## File Structure

- `memory/dream/` — dream output logs
- `memory/dream/YYYY-MM-DD.md` — nightly dream report
- `memory/dream/patterns.md` — long-term pattern tracking
- `memory/dream/scores.json` — conversation score history
- `memory/dream/repairs.md` — proposed and completed repairs
- `memory/dream/evolved-skills.md` — skill evolution registry
