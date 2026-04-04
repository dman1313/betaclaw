# Skill: Newsletter and Social Media Pipeline

## Purpose
Turn a Telegram voice note or message from the newsperson (with optional photos) into a polished, stakeholder-facing communication package (newsletter/blog + social variants) that preserves their voice, is enriched by research, and uses photos meaningfully.

## Owned By
**Communication Officer**

## Use This Skill When
- A Telegram voice note is received with an idea or story that should reach stakeholders.
- A Telegram text message describes a topic for a newsletter, blog, or social post.
- Photos are attached that could enhance stakeholder communication.
- The newsperson explicitly asks for a newsletter, blog post, or social media draft sourced from their own raw input.
- An existing long-form piece needs to be repurposed across multiple channels.

## Do Not Use This Skill When
- You already have a polished article or email and only need minor editing (use a generic editing/communication skill instead).
- The request is purely operational (e.g., schedule reminders, data export) without a narrative component.
- There is no voice note or message from the newsperson as a starting point.

## Defaults and Assumptions
If not specified:
- **Audience default:** school stakeholders, parents, and community.
- **Primary format default:** newsletter-style article plus short social post option.
- **If no photos are attached:** skip the photo-review step and proceed with text only.
- **If no transcript is provided:** the Communication Officer arranges transcription as the first action.
- **Tone default:** warm, clear, human, school-appropriate, and community-aware.
- **Length default:** newsletter body 300-600 words, social short 1-3 sentences, social long 4-6 sentences.

---

## Inputs
- Telegram voice note or text message.
- Transcript of the voice note (if available, or generated as part of the workflow).
- Attached photos (optional).
- Target audience if known.
- Distribution goal if known (newsletter, blog, social post, or multi-format package).
- Brand voice guidelines or past examples if available.

## Outputs (Contract)

The skill returns a structured package:

**1. Main long-form draft** for stakeholders:
- Newsletter article section, or
- Stakeholder blog post / community update.

**2. Social media set** (adapted per platform, not copy-pasted from long-form):
- One short post version (X/LinkedIn — 1-3 sentences with a clear hook).
- One longer caption version (Instagram/Facebook — 4-6 sentences, narrative style).
- Platform-specific hashtag suggestions where appropriate.

**3. Subject line & preheader options:**
- 3 subject line variants (one curiosity-driven, one direct, one emotional).
- 2 preheader suggestions that complement each subject line.

**4. Photo placement notes:**
- Recommended role for each image (hero / inline / supporting social / exclude).
- Suggested placement or pairing with specific paragraphs/sections.
- Crop or framing suggestions for social formats (square, landscape, story).

**5. Research summary:**
- Bullet list of key facts/context from the Researcher agent that influenced the piece.
- Sources noted for verification.

**6. Voice fidelity check:**
- 2-3 specific phrases or moments from the original voice note that were preserved in the final draft.
- Note on where the original voice was strongest and where research was layered in.

---

## Agents Involved

### Communication Officer (Owner)
- Owns the pipeline and final narrative.
- Preserves the newsperson's voice and intent as the spine of every piece.
- Orchestrates calls to the Researcher agent.
- Decides structure, tone, and format adaptations per channel.
- Runs the internal quality review before delivering drafts.

### Researcher Agent (Sherlock)
- Enriches the topic with recent background, supporting facts, and context.
- Does not change or override the core message.
- Returns a focused brief, not a full article.
- Flags when a topic has sensitivity, controversy, or requires extra care.

---

## Quality Gates

Before any draft is delivered, the Communication Officer runs three internal passes:

### Pass 1 — Voice & Message Check
- "Does this still sound like the newsperson, or did I flatten their voice into generic newsletter speak?"
- "Is the core message from the voice note still the spine of this piece?"
- "Would the newsperson recognize their own story in this draft?"

### Pass 2 — Audience & Clarity Check
- "Would a busy parent read this and immediately understand what it's about?"
- "Is there anything that could be misinterpreted, taken out of context, or cause concern?"
- "Does every paragraph earn its place, or am I padding?"
- "Are the subject lines compelling enough to open, or are they generic?"

### Pass 3 — Platform & Format Check
- "Does the social post feel native to its platform, or is it just a truncated newsletter?"
- "Are the photos placed meaningfully, or just decoratively?"
- "Does the research add credibility without overwhelming the reader?"
- "If I read this aloud, does it flow naturally?"

Only deliver after all three passes.

---

## Global Rules and Human Checkpoints

- Always start from the newsperson's own voice note or message. Never invent the starting point.
- Always preserve the core message and tone. Research is additive, not substitutive.
- Never fabricate facts, statistics, or quotes.
- If the topic is sensitive (student issues, staff changes, policy, legal/regulatory matters), flag this and require explicit human review before publishing.
- Do not publish or schedule automatically. Always return drafts for approval.
- If the audience or communications risk is unclear, default to a cautious, stakeholder-friendly tone and explicitly state your assumption.
- Include a "Don't Sound Like AI" self-check on every draft (see Writing Standards below).

---

## Workflow

### Step 1: Intake from Telegram
- Receive the voice note or text message from Telegram.
- Collect any attached photos.
- Note any explicit instructions about format (newsletter, blog, social, or all).
- Treat the voice note as the creative brief and primary source of voice.

### Step 2: Transcribe and Extract the Core Message
- Transcribe the voice note if a transcript is not already provided.
- Clean up obvious speech errors without changing meaning.
- Identify and summarize:
  - Main topic or story.
  - Core message or lesson.
  - Intended audience (or default if unspecified).
  - Purpose (inform, celebrate, invite, reassure, request action).
  - Desired feeling or action for the audience.
  - Key phrases that carry the newsperson's personality — mark these for preservation.

### Step 3: Ask the Researcher Agent
Send a structured request to the Researcher agent:
- **Topic:** [extracted from voice note]
- **Goal:** Strengthen this communication with useful background, recent context, and relevant supporting information.
- **Audience:** [stakeholders / parents / community / staff / default].
- **Need:** Facts, context, examples, and anything that would make the final communication more meaningful.
- **Constraint:** Preserve the original message. Do not shift the core purpose.
- **Depth:** Quick recon for simple updates, standard investigation for feature stories or initiatives.

The Researcher returns a short, focused brief (not a full article).

### Step 4: Blend Voice and Research
- Keep the newsperson's original intent, key phrases, and natural style where they add personality.
- Use the research to add context, credibility, and relevance.
- Clarify why this event/initiative matters to stakeholders.
- Provide helpful specifics without overwhelming the reader.
- Ensure the tone is warm, clear, and human — not robotic or generic.
- Run the "Don't Sound Like AI" check (see Writing Standards).

### Step 5: Review and Classify Photos
For each photo:
- Identify what it shows (people, activity, location, emotion).
- Decide how it connects to the theme or story.
- Classify as:
  - Hero image (sets the scene at the top).
  - Inline image (supports a specific paragraph or section).
  - Supporting social image (best used in social posts or stories).
  - Excluded (if off-theme, confusing, or low quality).
- Suggest where each image should appear.
- For social posts, suggest crop orientation (square for Instagram, landscape for X/LinkedIn, vertical for stories).

### Step 6: Create the Main Communication Piece

#### Long-form (Newsletter / Blog / Stakeholder Article)
Structure:
- **Title or headline** tailored to stakeholders.
- **Opening hook** that ties directly to the voice note story — not a generic intro.
- **2-4 short body sections:**
  - What happened / what this is.
  - Why it matters (to students, staff, parents, community).
  - What's next or what we're learning.
- **Strong closing:**
  - A note of gratitude, pride, or shared purpose.
  - A simple call to action or invitation if appropriate.

#### Social Media Package
From the same core content, create platform-native variants:
- **Short post (X/LinkedIn):** 1-3 sentences with a clear hook and takeaway. Optimized for scanning — front-load the most interesting thing.
- **Longer caption (Instagram/Facebook):** A short narrative or 2-3 key points. Conversational, not corporate. Tie captions to specific images where appropriate.
- **Hashtag suggestions:** 3-5 relevant hashtags per platform. Mix of broad reach and niche/community-specific.

Never copy-paste the long-form text into social. Adapt it so each post feels native to its platform.

#### Subject Line & Preheader Options
Generate 3 subject line variants:
- **Curiosity:** Makes the reader want to know more.
- **Direct:** Tells the reader exactly what this is about.
- **Emotional:** Connects to a feeling (pride, excitement, gratitude).

For each subject line, suggest a complementary preheader (the preview text that appears in the inbox).

### Step 7: Run Quality Gates
Run all three internal passes (Voice, Audience, Platform) before packaging.

### Step 8: Prepare the Final Package
Return a structured result containing:
- Main draft (newsletter/blog/stakeholder article).
- Social media drafts (short + longer versions + hashtags).
- Subject line options + preheaders.
- Photo placement notes (per image, with crop suggestions for social).
- Research summary used to enrich the piece.
- Voice fidelity check (specific preserved phrases noted).
- Questions or gaps:
  - Anything needing the newsperson's confirmation.
  - Any risk or ambiguity that should be reviewed before sending.

---

## Writing Standards

- Preserve the newsperson's voice and intent as the spine of the piece.
- Write in a warm, clear, stakeholder-aware tone.
- Keep paragraphs short and scannable — 2-3 sentences max.
- Use research to anchor and strengthen the communication, not dominate it.
- Connect photos to meaning and story, not just decoration.
- Focus every draft on a clear purpose: what the audience should understand, feel, or do.
- Vary sentence length — mix short punchy lines with longer ones when needed.
- Use specific details from the voice note (names, places, small moments) instead of abstract summaries.
- Prefer plain language over buzzwords.

### Don't Sound Like AI Checklist
Before delivering any draft, check for and eliminate:
- [ ] Generic openers ("In today's fast-paced world", "We are thrilled to announce")
- [ ] Buzzwords and filler ("leveraging", "synergies", "cutting-edge", "holistic approach")
- [ ] Over-smoothed tone where every sentence sounds the same length and rhythm
- [ ] Sentences that could appear in any school's newsletter — if it's not specific to THIS story, rewrite it
- [ ] Exclamation point overload — one per draft maximum
- [ ] Missing personality — if the newsperson told this story with humor, enthusiasm, or emotion, that should show in the draft
- [ ] Passive voice where active voice would be stronger
- [ ] Abstract claims without specific evidence or examples

---

## Reflection Loop (Post-Delivery)

After the newsperson reviews and provides feedback on the draft:
1. **Log what landed** — Which elements did they keep? Which phrases resonated?
2. **Log what was changed** — What did they rewrite? What tone shifts did they make?
3. **Identify patterns** — Over multiple cycles, learn what this newsperson's voice preferences are.
4. **Adapt** — Use these patterns to improve future first drafts. The goal is for each draft to need fewer edits over time.

This is how the skill gets smarter. The first draft might be 70% there. After 10 cycles, it should be 90%.

---

## Version History
- v1.0.0 (2026-04-04): Initial skill from Dwayne's specification
