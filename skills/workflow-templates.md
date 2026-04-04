# Skill: Workflow Templates

**Trigger:** When a multi-step task comes up that could recur.

## Pattern
For any recurring multi-step process, create a workflow template:

```markdown
## Workflow: [Name]

**Args:**
- arg1: description (default: X)

**Steps:**
1. [id: step1] — What to do
   - Output: {schema}
2. [id: step2] — What to do next
   - Input: $step1.output
   - 🔒 Approval needed? yes/no
3. [id: step3] — Final step
   - when: $step2.condition

**State file:** memory/projects/[project].json
```

## Principles (stolen from Lobster)
1. **Typed outputs** — every step produces structured data, not loose text
2. **Approval gates** — flag steps that need human sign-off before executing
3. **Change detection** — store state, only alert on deltas
4. **Conditional steps** — skip steps when conditions aren't met
5. **One-step invocation** — collapse complex flows into a single skill call

## State Tracking
For periodic checks, store state in `memory/` as JSON:
```json
{
  "lastChecked": "2026-04-04T12:00:00Z",
  "snapshot": { ... },
  "changes": [ ... ]
}
```
Only report to Dwayne when `changes` is non-empty.
