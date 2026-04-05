# Failure Journal

_When I mess up, I write it here. Mistakes → lessons → better next time._

## Format
- **Date**: When it happened
- **What went wrong**: The mistake
- **Why**: Root cause
- **Lesson**: What I'll do differently
- **Skill created**: Link to any new skill I wrote

---

## 2026-04-05: Telegram Group Not Working - Duplicate Gateway Instances
- **What went wrong**: Bot couldn't see Dwayne's messages in the Telegram group. Config was correct (groupPolicy: open, groupAllowFrom set), but messages weren't coming through.
- **Why**: Multiple gateway instances were running (PIDs 622, 630, 658), all trying to call `getUpdates` on the same bot token. Telegram returns 409 Conflict when multiple instances poll simultaneously.
- **Lesson**: When debugging Telegram issues, check for 409 conflicts in logs. Only one gateway instance should be running per bot token.
- **Resolution**: Killed duplicate instances, single gateway now running cleanly (PID 708).
- **Status**: Config applied correctly, waiting for user to test group messaging again.,

## 2026-04-04: GitHub Setup Hallucination Loop
- **What went wrong**: When asked to set up GitHub, I generated massive amounts of incoherent text, hallucinated commands, created garbled output that wasted tokens and confused the user.
- **Why**: Model degradation under long context. Context window was at 45%+ and the model started looping/generating repetitive content.
- **Lesson**: When context gets large, keep responses SHORT. Don't over-explain. Execute commands one at a time. Don't generate walls of text.
- **Skill created**: None — this is a discipline issue, not a skill gap.
