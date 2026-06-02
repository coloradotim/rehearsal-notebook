# Rehearsal Notebook — Agent Context

## Product

Rehearsal Notebook is a private, single-user rehearsal continuity tool for Harmony Road, a small mixed a cappella/barbershop chorus.

The app helps Tim:

1. Track repertoire history across rehearsals.
2. Track current work areas for each song.
3. Maintain a warmup library tied to musical purposes.
4. Build realistic rehearsal plans from repertoire state, work areas, warmups, and available time.
5. Communicate rehearsal plans and homework to the chorus through copy-paste Slack output.
6. Run rehearsal from a phone with only the current relevant context visible.
7. Review what happened after rehearsal and carry useful work into the next cycle.

The product should feel practical, calm, and director-friendly. It should preserve the thread between rehearsals without becoming a generic task manager, chorus-management system, singer portal, or AI music director.

## Required product references

Before making product, workflow, data-model, UI, auth, or deployment changes, read:

1. `AGENTS.md`
2. `README.md`
3. The GitHub issue being worked
4. Any referenced docs or prior issue comments

Once product strategy, architecture, and roadmap docs exist, those docs become required references as well. Do not invent product behavior that conflicts with the agreed docs. If the issue and product docs conflict, stop and ask for clarification.

## Core product rules

- Harmony Road rehearses every other Monday for roughly 2-2.5 hours.
- Rehearsal time is limited, so singer preparation outside rehearsal matters.
- The app is organized around three modes: Planning, Execution, and Review.
- Planning Mode builds the next rehearsal plan.
- Execution Mode runs the current rehearsal on an iPhone.
- Review Mode closes the loop after rehearsal, often hours or days later.
- Execution Mode is the make-or-break feature.
- Rep review is central: distinguish substantive rehearsal work from brief maintenance review.
- Current song work areas are central: they answer what the song currently needs.
- Tags/taxonomy must be flexible and user-managed, not hard-coded permanently.
- Warmups should be selected by musical purpose, not just by name.
- Slack output is copy-paste only in v1. Do not add Slack API integration unless explicitly approved.
- Recordings happen occasionally and are not central to v1.
- AI is deferred until the rehearsal continuity system has real structured history.

## Product shape

The app has exactly three primary modes:

```text
Planning Mode -> Execution Mode -> Review Mode -> next Planning Mode
```

### Planning Mode

Planning Mode should help Tim answer:

- What songs need attention?
- What songs are getting stale?
- What did we skip or leave unfinished last rehearsal?
- What are the current open work areas by song?
- What warmups support this rehearsal's goals?
- Is the plan realistic for the available time?
- What homework should singers do before rehearsal?

Planning Mode should include:

- next rehearsal date
- planned rehearsal minutes
- next rehearsal scratch pad
- song/repertoire context
- last rehearsed and last rep reviewed dates
- open work areas
- warmup library
- ordered rehearsal blocks
- must/should/could priorities
- time-budget warning
- singer-facing Slack message copy output

### Execution Mode

Execution Mode must be phone-friendly and low-friction in a live rehearsal.

For the current block, show only:

- block title
- song or warmup
- planned time
- goal
- director reminder/notes
- relevant current work areas
- next block preview

Execution Mode actions are limited to:

- Done
- Partial
- Skip
- Add note

Do not add complex editing in Execution Mode. The director is directing. Notes must be quick to capture. Moving between blocks must be a single tap, and a simple block-list summary should support non-linear jumps when rehearsal goes off plan.

### Review Mode

Review Mode should work immediately after rehearsal or a day or two later.

Review Mode should help Tim:

- confirm what happened
- review done/partial/skipped blocks
- update last rehearsed dates in bulk
- update last rep reviewed dates separately
- promote notes into song work areas
- close completed work areas
- carry unfinished work forward
- add thoughts to the next rehearsal scratch pad

## Repertoire and rep review rules

The app should preserve the clarity of a spreadsheet with songs as rows and rehearsals as columns, while adding richer context and reminders.

Distinguish:

```text
last_rehearsed_at     = date of substantive rehearsal work
last_rep_reviewed_at  = date of brief maintenance review/run-through
```

These are separate facts and should be updated separately, usually in Review Mode.

Do not flatten all song touches into one generic date. Rep review history is one of the main reasons this app exists.

## Work areas and taxonomy

A song work area captures what a song currently needs.

Examples:

- Change The World: lock sync in the tag
- Change The World: lean into syncopation
- As Long As I'm Singing: keep tag connected to the song
- Look For The Light: maintain waltz feel
- Look For The Light: embody the emotional arc
- Why We Sing: learn mm. 1-41

Work-area status should stay simple in v1:

- open
- closed
- optional pinned/carry-forward flag

Tags/categories are important and will change as the app is used. Treat tags as user-owned data. Do not hard-code an irreversible taxonomy.

Starting tag examples may include:

- notes
- rhythm
- syncopation
- words
- vowels
- tuning
- blend
- balance
- breath
- musicality
- emotional arc
- energy
- physicality
- tag
- sectionals
- memorization
- part independence
- waltz feel
- swing feel

## Warmup library rules

Warmups should be stored with enough context to help Tim choose them based on rehearsal goals.

Warmups should include:

- name
- purpose
- approximate duration
- instructions
- tags/categories
- notes

Planning Mode should make it easy to find warmups that support the songs and work areas in the plan.

## Technical stack

Expected stack:

- Next.js App Router
- TypeScript
- Tailwind
- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- Vercel hosting
- Vitest for unit tests
- Playwright later for core browser flows

If a different stack is proposed, stop and ask before changing direction.

## Auth and access rules

The app is private and single-user in v1.

- Use Supabase Auth email/password login unless a later product decision changes this.
- Do not add public signup.
- Do not add singer accounts in v1.
- Do not commit secrets.
- Do not use service-role keys in browser code.
- Supabase schema and RLS changes must be captured in migrations and docs, not only in the dashboard.

## Mobile and rehearsal reliability

Execution Mode must work well on an iPhone in a rehearsal venue, possibly with weak wifi or cell signal.

Expected implementation bias:

- Prefetch the active rehearsal on load.
- Keep active rehearsal reads local/cached after initial load when feasible.
- Avoid spinners during live rehearsal.
- Use optimistic UI for Done/Partial/Skip/Add note.
- No Supabase Realtime in v1. Single user does not need it.
- Consider basic service-worker caching for the active rehearsal plan once the core flow exists.

## Development workflow

Use GitHub issues and PRs.

When the user asks to `work issue #X`, treat that as instruction to implement GitHub issue `#X` using this workflow:

1. Read `AGENTS.md`.
2. Read the required product docs once they exist.
3. Read the GitHub issue and all issue comments.
4. Check out `main`.
5. Pull latest `origin/main`.
6. Create a feature branch named for the issue, using the `codex/` prefix unless the user requests otherwise.
7. Keep work scoped to the issue.
8. Make the requested changes.
9. Update tests when behavior, data flow, UI state, auth, or Supabase behavior changes.
10. Update docs when setup, deployment, environment variables, data model, workflow, or user-visible behavior changes.
11. Run the required checks.
12. Commit changes to the feature branch.
13. Push the branch.
14. Open a PR that links the issue.
15. Enable auto-merge when branch protection and repository settings allow it, unless the task is high-risk or the user asks for manual review.
16. If auto-merge or merge is blocked, report the exact blocker.

Do not commit directly to `main` once normal issue/PR work begins.

## Required checks

Every PR should pass the repo check command before merge.

The intended check entry point is:

```bash
scripts/check.sh
```

Until `scripts/check.sh` exists, run the available equivalents and document what was run in the PR:

```bash
npm run lint
npm run test:run
npm run build
```

Do not bypass failing tests or builds. Fix failures or report the exact blocker.

## Issue and PR completeness standard

For every product, UX, feature, data, or workflow change, consider downstream impact across:

- Planning Mode
- Execution Mode
- Review Mode
- repertoire history
- work areas
- warmup selection
- Slack output
- mobile rehearsal usability
- accessibility
- auth and allowed-user behavior
- Supabase schema, migrations, and RLS
- tests
- README and docs
- deployment and environment variables

If an area is affected, update it in the same PR unless the issue explicitly says otherwise. If an area is not affected, note that briefly in the PR summary.

When creating or refining issues, include an impact audit section when the change is more than a tiny bug fix.

## Guardrails

Do not:

- commit secrets
- use service-role keys in browser code
- bypass failing tests or builds
- bypass branch protection or required checks
- force-merge blocked PRs
- add singer accounts, attendance tracking, Slack API integration, native mobile apps, push notifications, calendar sync, AI planning, AI coaching, audio storage, or recording review workflows unless explicitly approved
- change product direction without asking first
- hard-code taxonomy in a way that prevents user-managed tags
- flatten substantive rehearsal work and brief rep review into the same date field
- add complex editing to Execution Mode

## Autonomy expectations

Once intent is clear, proceed fully without asking for permission to do normal engineering work:

- write the code
- write or update tests
- run checks
- fix lint/type/test/build failures
- update relevant docs
- open a PR

Ask questions early when intent, edge cases, product behavior, data migrations, destructive changes, or user workflow are unclear.

## PR description requirements

Every PR should include:

- what changed and why
- issue linked with `Closes #N` or `Refs #N`
- how to verify locally, including commands and UI steps
- tests/checks run
- docs updated or why not needed
- known limitations
- follow-up issues opened, if any

## Commit style

Use conventional commits:

- `feat:`
- `fix:`
- `test:`
- `docs:`
- `chore:`
- `refactor:`

Subject line should be imperative and no more than 72 characters.

Keep commits atomic. Do not bundle unrelated fixes.

## Before major changes

Ask first if changing:

- product direction
- three-mode product shape
- auth provider or access-control model
- Supabase schema/RLS strategy
- repertoire history model
- taxonomy/tag strategy
- Execution Mode interaction model
- platform target
- deployment approach
