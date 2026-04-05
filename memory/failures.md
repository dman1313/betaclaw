# Failure Journal

_When I mess up, I write it here. Mistakes → lessons → better next time._

## Format
- **Date**: When it happened
- **What went wrong**: The mistake
- **Why**: Root cause
- **Lesson**: What I'll do differently
- **Skill created**: Link to any new skill I wrote

---

## 2026-04-05: GitHub auth configured, Telegram token updated, groupPolicy to open + groupAllowFrom set
 Set Telegram group working!",

## 2026-04-04: GitHub Setup Hallucination Loop
- **What went wrong**: When asked to set up GitHub, I generated massive amounts of incoherent text, hallucinated commands, created garbled output that wasted tokens and confused the user.
- **Why**: Model degradation under long context. Context window was at 45%+ and the model started looping/generating repetitive content.
- **Lesson**: When context gets large, keep responses SHORT. Don't over-explain. Execute commands one at a time. Don't generate walls of text.
- **Skill created**: None — this is a discipline issue, not a skill gap.
