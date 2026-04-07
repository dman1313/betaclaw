# Skill: Master Newsletter Workflow

## Purpose
Manage full newsletter creation pipeline from raw input (text/voice + photos) to final newsletter draft. One unified workflow with three internal role stages.

## Trigger
When user asks to:
- Create a newsletter
- Build an article for newsletter
- Process voice/text for newsletter
- Turn content into newsletter-ready format

---

## INPUT ROUTES

### Route A: Direct Input
- User provides text prompt
- User provides photos
- Optional: captions, notes, audience, goals

### Route B: Telegram Input
- User provides voice note on a topic
- User provides photos
- Optional: captions or follow-up notes

### Initial Intake (all routes)
Identify before starting:
- Topic
- Purpose
- Audience
- Emotional tone
- Likely story angle
- Available supporting images
- Missing details

---

## MASTER PIPELINE

Run in this order. Do not skip stages or duplicate responsibilities.

---

## STAGE 1: COMMUNICATIONS OFFICER — INTAKE AND INTERPRETATION

**Goal**: Understand what user is trying to communicate before any research happens.

**Tasks**:
- Review text prompt or voice transcription
- Identify main topic, audience, purpose
- Identify desired tone
- Identify important phrases reflecting user's natural voice
- Identify likely story angle
- Identify what is missing or unclear
- Review photos and infer which story parts they support

**Output**: Create an **Intake Brief** with:
- Topic
- Audience
- Purpose
- Tone
- Likely article angle
- Key phrases to preserve
- Missing information
- Photo notes
- Research questions for Research Officer

**Important Rules**:
- Preserve user's natural voice
- Do not over-polish at this stage
- Do not draft newsletter yet
- Do not invent missing facts

---

## STAGE 2: RESEARCH OFFICER — RESEARCH AND CONTEXT BUILDING

**Goal**: Do high-quality research on topic and return only the most relevant context.

**Tasks**:
- Take Intake Brief and research questions
- Perform broad but relevant research on topic
- Gather useful background, supporting facts, verified names, dates, context
- Identify larger themes/issues connected to story when appropriate
- Avoid bloating article with unnecessary research
- Separate essential facts from optional enrichment
- Flag uncertainty clearly
- Return concise research package that helps writing

**Output**: Create a **Research Brief** with:
- Core verified facts
- Useful context
- Broader framing if relevant
- Details that should be checked carefully
- Suggested angles worth emphasizing
- Suggested details to avoid if weak or uncertain

**Important Rules**:
- Research should support story, not replace it
- Prioritize reliable and relevant sources
- Do not overload writing with facts
- Keep research brief useful for a writer
- If research adds little value, say so clearly

---

## STAGE 3: COMMUNICATIONS OFFICER — ARTICLE SHAPING AND REWRITE

**Goal**: Take original voice plus Research Brief and shape a strong article in user's natural style.

**Tasks**:
- Combine Intake Brief and Research Brief
- Preserve user's tone, rhythm, and natural message
- Lightly clean grammar and repetition
- Keep writing sounding human and grounded
- Use research where it strengthens clarity, depth, and trust
- Do not let research overpower personal or organizational message
- Shape content into a high-quality article suitable for a newsletter
- Ensure article is coherent, readable, and stakeholder-friendly

**Output**: Create an **Article Draft** with:
- Headline or title
- Opening hook
- Clear body structure
- Integrated research support where helpful
- Closing paragraph connected to audience

**Important Rules**:
- Preserve voice over polish
- Avoid generic AI-sounding phrasing
- Avoid over-formalizing message
- Avoid unnecessary adjectives and hype
- Write with clarity, warmth, and structure
- When choosing between polish and authenticity, prefer authenticity

---

## STAGE 4: NEWSLETTER MAKER — NEWSLETTER ASSEMBLY

**Goal**: Turn article draft into a newsletter-ready format.

**Tasks**:
- Convert article into newsletter structure
- Choose or suggest section layout
- Suggest where photos should go and why
- Match photos to parts of story
- Create newsletter headings and subheadings
- Create 3 subject line options
- Create a short preview text
- Optionally create a short social adaptation if requested
- Package result for approval

**Output**: Create a **Newsletter Package** with:
1. Newsletter title
2. Subject line options
3. Preview text
4. Final newsletter body
5. Image placement suggestions
6. Captions if needed
7. Optional social post version
8. Approval-ready notes

**Important Rules**:
- Image placement must support story, not be random
- Structure must be easy for stakeholders to read
- Final output must feel polished but still human
- Keep formatting clean and portable for email/newsletter tools

---

## HANDOFF RULES

The handoffs must be clean.

**Communications Officer → Research Officer:**
- Send Intake Brief only

**Research Officer → Communications Officer:**
- Send Research Brief only

**Communications Officer → Newsletter Maker:**
- Send Article Draft plus photo notes

**Do not:**
- Blur roles
- Repeat full earlier stages unnecessarily
- Restart pipeline unless input changes significantly

---

## VOICE RULES

The final article should:
- Preserve user's natural voice
- Keep strong original phrasing when useful
- Lightly improve grammar and flow
- Avoid sounding robotic, inflated, or overly corporate
- Avoid generic education-marketing language
- Sound thoughtful, clear, and human

**When choosing between polish and authenticity, prefer authenticity.**

---

## RESEARCH RULES

Research should:
- Strengthen credibility
- Add useful context
- Verify important details
- Enrich article when helpful

Research should not:
- Overwhelm story
- Turn article into an essay
- Crowd out user's message
- Introduce weak or unnecessary claims

---

## PHOTO RULES

Photos should be used intentionally.

For each image:
- Infer what part of story it supports
- Suggest where it should appear
- Explain briefly why it belongs there
- Avoid clustering images without narrative purpose

If image relevance is unclear, flag that instead of forcing a placement.

---

## FINAL OUTPUT FORMAT

Always output in this order:

```
## Intake Brief
## Research Brief
## Article Draft
## Newsletter Package
```

If a stage cannot be completed fully, state what is missing clearly.

**Do not:**
- Invent details
- Skip directly to newsletter unless pipeline stages have been completed

---

## SIMPLICITY RULE

This is one master workflow.

**Do not:**
- Create extra newsletter-related subskills unless there is a hard operational reason
- Prefer a clean pipeline with defined stages over fragmented workflow sprawl

---

## KEY PRINCIPLES

1. **One unified workflow** — not loose group of skills
2. **Three internal roles** — stages, not separate agents
3. **No unnecessary handoffs** — clean pipeline
4. **Voice preservation** — user's style is king
5. **Research as support** — not story itself
6. **Thoughtful visuals** — images enhance, not distract

---

## FILE STRUCTURE
- `skills/newsletter-workflow/` — skill directory
- `skills/newsletter-workflow/templates/` — newsletter templates
- `skills/newsletter-workflow/samples/` — sample outputs

---

## NOTES
- Always confirm intake brief with user before proceeding to research
- Flag research gaps early
- User approval recommended before final packaging
