# Skill: End-of-Session Review

**Trigger:** After a productive conversation session ends (user says goodbye, session goes idle, or heartbeat detects session end).

## Steps

1. **Scan the conversation** for:
   - New skills or patterns discovered
   - User preferences revealed
   - Project updates or decisions made
   - Mistakes or corrections

2. **Extract skills** — If a reusable pattern emerged, write it as a SKILL.md in `skills/`

3. **Update memory**:
   - `memory/YYYY-MM-DD.md` — Add session summary
   - `memory/preferences.md` — New preferences discovered
   - `memory/failures.md` — Any mistakes + lessons
   - `memory/projects/` — Project state changes

4. **Curate MEMORY.md** — If something is worth keeping long-term, add it

5. **Commit** — `git add . && git commit -m "Session review: <brief summary>"`

## Rules
- Don't over-extract. Only capture what's genuinely reusable.
- Keep skills short and actionable.
- Preferences beat assumptions every time.
