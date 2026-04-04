# Skill: Cloner — External Researcher

**Description:** Research external sources (GitHub repos, APIs, docs, tools) and convert them into production-ready skills or actionable knowledge for CLAW CLAW.

## Triggers
- "clone this", "build a skill from", "ingest this repo"
- "turn this into a skill", "research this", "what can you learn from"
- "steal ideas from", "learn from here"

## Source Taxonomy

| Source Type | Strategy | Depth |
|---|---|---|
| **Skill/Tutorial Repo** | Extract SKILL.md files, agents, hooks | Heavy |
| **SDK / Library** | Key classes, init patterns, entrypoints, CLI | Medium |
| **API Docs** | Endpoints, auth, request/response shapes | Medium |
| **General GitHub Repo** | README → key files → listing | Variable |
| **Blog/Tutorial** | Concepts, commands, code snippets | Light |
| **CLI Tool** | Subcommands, flags, config, workflows | Heavy |
| **Academic Paper** | Model details, architecture, API | Medium |

## Pipeline

### 1. Triage
- What type of source?
- What would Dwayne need this for?
- 2-3 core capabilities to extract?
- Skill or just knowledge?

### 2. Fetch
- GitHub: `git clone --depth 1` or `web_fetch` README
- Single file: `web_fetch` raw URL
- Web page: `web_fetch` main URL

### 3. Survey (priority order)
1. README.md
2. SKILL.md / AGENTS.md / CLAUDE.md
3. Source-specific key files
4. Full file listing if needed

### 4. Distill
For each capability: what it does, how to invoke, inputs, outputs, key commands, pitfalls.

### 5. Deliver Options
- **Full skill**: Write to `skills/[name]/SKILL.md` (if reusable)
- **Knowledge extraction**: Update `memory/` files with learnings
- **Quick summary**: Reply with key takeaways

## Rules
1. 80% signal in 20% of content — extract only what's needed
2. Summaries under 150 words per document
3. Commands must be copy-pasteable
4. Pitfalls mandatory (2+ per skill)
5. Source attribution always
6. Never overwrite existing skills — rename with suffix
7. Ask when ambiguous

## Quality Checklist
- [ ] Trigger conditions clear (3+ phrases)
- [ ] Steps numbered and actionable
- [ ] Commands exact and copy-pasteable
- [ ] Examples included
- [ ] Pitfalls documented (2+)
- [ ] Output format specified
- [ ] Category assigned
