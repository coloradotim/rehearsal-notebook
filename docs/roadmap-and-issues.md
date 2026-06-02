# Rehearsal Notebook — Roadmap and Issue Sequence

## Purpose

This document defines the initial roadmap and issue sequence for Rehearsal Notebook.

It should be read with:

- `docs/product-strategy.md`
- `docs/architecture-and-data-model.md`
- `AGENTS.md`

The goal is to create issues in a disciplined order so Codex can build the app without drifting into features that are not planned for this product.

## Product direction reminder

Rehearsal Notebook is a private, single-user rehearsal continuity tool for Harmony Road.

Core promise:

> Plan, run, and review rehearsals while keeping the full repertoire healthy.

The app should prove the rehearsal loop before adding broad management features.

## Roadmap approval rule

Only the current phase and next checkpoint are approved for issue creation.

Later phases are candidate roadmap until reviewed again.

Do not create all issues in this document at once. Use this document to sequence work, not to generate a giant backlog.

## Product anti-goals

Do not create issues for these unless Tim explicitly changes product direction:

- singer accounts
- attendance tracking
- Slack API integration or auto-posting
- native mobile app
- recording review workflow
- app-managed audio storage
- full chorus-management system
- heavyweight project management
- full analytics suite

Lightweight look-back is allowed. Heavy analytics is not.

## Build strategy

Build in thin vertical slices.

The first meaningful milestone is not a perfect song library or a perfect schema. It is one complete rehearsal cycle:

```text
Create rehearsal
-> build plan
-> run rehearsal on iPhone
-> capture notes
-> review what happened
-> update song history
-> generate simple Slack plan/recap copy
-> carry context into the next plan
```

If that loop is annoying, fix it before building more.

## Touch type semantics

The app must distinguish how a song was touched in rehearsal.

Initial touch-type behavior:

- `full_work`: substantive rehearsal work; updates `songs.last_rehearsed_at`.
- `sectional`: substantive rehearsal work in sectionals; updates `songs.last_rehearsed_at`.
- `rep_review`: brief maintenance review/run-through; updates `songs.last_rep_reviewed_at`.
- `homework`: assigned or discussed but not rehearsed; does not automatically update either date.
- `skipped`: planned but not done; does not update either date.

A sectional is real work, just not full-ensemble work. It should not update `last_rep_reviewed_at`.

These defaults can be overridden manually in Review Mode if needed, but Codex should not invent different behavior.

## First product checkpoint

After the app can create a rehearsal, add blocks, run Execution Mode, capture notes, and show a Review summary, stop and test the workflow before building more planning polish.

The test is not whether the app is complete. The test is whether the core rehearsal loop feels worth continuing.

This checkpoint should happen before creating Phase 4 issues.

## Phase 0 — Project foundation

Purpose: create a stable Next.js/Supabase project foundation with docs, checks, and username/password auth direction.

### Issue 1 — Scaffold the Next.js app

Summary:

Create the initial Next.js App Router application with TypeScript, Tailwind, linting, formatting, and a basic landing/login placeholder.

Acceptance criteria:

- Next.js App Router app exists.
- TypeScript is configured.
- Tailwind is configured.
- ESLint and formatting scripts exist.
- Basic responsive layout shell exists.
- README local setup instructions are updated.
- `scripts/check.sh` exists and runs available checks.

### Issue 2 — Add Supabase configuration and username/password auth shell

Summary:

Add Supabase client/server configuration and a username/password-style login flow using Supabase email/password auth.

Acceptance criteria:

- `.env.example` includes `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- App does not use magic links, OTP, email-link login, public signup, or Google OAuth.
- Login UI uses email/password fields but reads as normal username/password login.
- Auth helpers are structured for App Router.
- Service-role keys are not used in browser code.
- README documents auth assumptions.

### Issue 3 — Add initial Supabase schema and RLS migrations

Summary:

Create initial Supabase migrations for the core tables needed for the thin-slice MVP.

Acceptance criteria:

- Migrations create: `profiles`, `songs`, `tags`, `song_work_items`, `song_work_item_tags`, `warmups`, `warmup_tags`, `rehearsals`, `rehearsal_blocks`, `rehearsal_notes`, `rehearsal_messages`.
- Tables use flexible text fields rather than database enums for product options.
- User-owned tables include `user_id`.
- RLS is enabled.
- Policies allow authenticated users to manage their own rows.
- Join-table access is constrained through owned parent records.
- Migration docs are added or referenced.

### Issue 4 — Seed starter data for local development

Summary:

Add local seed data for initial songs, tags, and a few warmups so the app is useful during early UI development.

Acceptance criteria:

- Seed script or SQL exists.
- Seed data includes representative Harmony Road songs.
- Seed data includes initial flexible tags.
- Seed data includes a handful of warmups with purposes and durations.
- Seed data is safe for local/dev use and documented.

## Phase 1 — Minimum rehearsal notebook

Purpose: create the minimum song, warmup, work-area, and rehearsal-block foundation needed to run a crude rehearsal cycle.

### Issue 5 — Build song library list and song detail view

Summary:

Create the initial song library with song status, last rehearsed, last rep reviewed, notes, and planned introduction date.

Acceptance criteria:

- `/songs` lists songs.
- `/songs/[id]` shows song details.
- User can create and edit a song.
- User can set status using app-level options.
- User can set planned introduction date.
- User can see last rehearsed and last rep reviewed dates.
- Retired/shelved songs are preserved, not deleted by default.

### Issue 6 — Build song work areas with basic tags

Summary:

Allow each song to have lightweight open/closed work areas with flexible tags.

Acceptance criteria:

- User can create a work area from a song detail page.
- User can edit work area title and notes.
- User can mark a work area open/closed.
- User can pin a work area for next rehearsal.
- User can add existing or new tags to a work area.
- Tags are stored as user-managed data, not hard-coded enums.
- Work areas stay lightweight; no complex workflow state machine.

### Issue 7 — Build warmup library with basic tags

Summary:

Create a warmup library with purpose, duration, instructions, notes, and flexible tags.

Acceptance criteria:

- `/warmups` lists warmups.
- User can create and edit warmups.
- Warmups support purpose, duration, instructions, notes, and tags.
- Warmups can be filtered or searched by tag/purpose.
- Warmups remain lightweight; no audio/video/media storage.

### Issue 8 — Create rehearsals and ordered rehearsal blocks

Summary:

Allow the director to create a rehearsal and build a basic ordered plan with blocks.

Acceptance criteria:

- User can create a rehearsal with date, planned minutes, goal, and planning scratchpad.
- User can add ordered blocks.
- User can choose block type.
- User can link a song and/or warmup when relevant.
- User can enter title, goal, planned minutes, priority, director notes, singer homework, and section label.
- User can reorder blocks.
- Blocks display clearly on desktop and mobile.

## Phase 2 — Crude core loop

Purpose: get to Execution Mode and Review Mode earlier, before over-polishing planning.

### Issue 9 — Build crude mobile-first Execution Mode

Summary:

Create `/rehearsals/[id]/run`, focused on the current rehearsal block and minimal actions.

Acceptance criteria:

- Current block is visible without scrolling on iPhone-sized viewport.
- Current block shows title, song/warmup, planned time, goal, director notes, relevant work areas, and next block preview.
- Done/Partial/Skip are one-tap actions.
- Add note is two taps or fewer.
- Moving to next block is one tap.
- UI is fast and uncluttered.
- Before Phase 4 issues are created, this mode must be tested during a real or simulated rehearsal on an iPhone.

### Issue 10 — Add optimistic execution status updates and fast note capture

Summary:

Make Done/Partial/Skip update immediately and allow quick note capture during Execution Mode.

Acceptance criteria:

- Done/Partial/Skip update visually immediately.
- Failed sync is surfaced clearly and recoverably.
- No spinner blocks live rehearsal flow after initial load.
- Execution status persists after refresh.
- User can add a note from the current block quickly.
- Note is linked to rehearsal, block, and song when available.
- Notes default to director-only.
- Notes save without disrupting the execution flow.
- Browser-native speech-to-text can be used if available through the normal input experience; no custom voice recording feature.

### Issue 11 — Add basic Review Mode summary

Summary:

Create `/rehearsals/[id]/review` showing the original plan, execution statuses, and captured notes.

Acceptance criteria:

- Review view shows all blocks in order.
- Review view shows done/partial/skipped/planned status.
- Review view shows notes captured during rehearsal.
- Review view supports edits to execution statuses.
- Review view is usable later, not only immediately after rehearsal.

### Issue 12 — Add block summary/jump view

Summary:

Allow the director to jump non-linearly when rehearsal goes off plan.

Acceptance criteria:

- Execution Mode has a compact block list summary.
- User can jump to any block in one tap from the summary.
- Status for each block is visible in the summary.
- Summary is mobile-friendly and does not become a planning editor.

## Phase 3 — Planning and communication polish

Purpose: make the rehearsal loop actually useful for real rehearsal preparation and chorus communication.

### Issue 13 — Add time budget warning

Summary:

Show total planned minutes against available rehearsal time and warn when the plan is overpacked.

Acceptance criteria:

- Planning view shows total planned minutes.
- Planning view shows available minutes.
- Planning view shows over/under amount.
- Overpacked plans receive a clear warning.
- Lower-priority `should`/`could` blocks are visually identifiable as possible cuts.
- Logic has unit tests.

### Issue 14 — Generate rehearsal plan Slack copy

Summary:

Generate a copy-paste singer-facing rehearsal plan message from the rehearsal plan.

Acceptance criteria:

- Planning Mode can generate plan copy.
- Message includes rehearsal date, songs being worked, songs to review, homework, what to listen for, and links/docs if present.
- Director-only notes are excluded.
- User can copy the generated message.
- Editing and saved message history can be added later if needed.
- Unit tests cover message generation.

### Issue 15 — Generate after-rehearsal Slack recap copy

Summary:

Generate a copy-paste singer-facing recap message from Review Mode.

Acceptance criteria:

- Review Mode can generate recap copy.
- Message includes rehearsal date, songs/sections covered, key musical points, things improved, things to remember, and items singers should continue working.
- Director-only notes are excluded unless intentionally included.
- User can copy the generated message.
- Editing and saved message history can be added later if needed.
- Unit tests cover recap generation.

## Phase 4 — Review depth and carry-forward

Purpose: make the app remember what matters and feed naturally into the next planning cycle.

Create Phase 4 issues only after the first product checkpoint has been tested.

### Candidate Issue — Bulk song touch date update

Summary:

In Review Mode, allow bulk confirmation of song dates based on block touch types.

Acceptance criteria:

- Review Mode shows songs touched in the rehearsal.
- User can set/confirm touch type per relevant block or song.
- User can bulk update last rehearsed and last rep reviewed dates.
- `full_work` updates `last_rehearsed_at`.
- `sectional` updates `last_rehearsed_at`.
- `rep_review` updates `last_rep_reviewed_at`.
- `homework` does not automatically update either date.
- `skipped` does not update either date.
- Logic has tests.

### Candidate Issue — Promote notes into work areas and carry-forward items

Summary:

Allow rehearsal notes to become durable song work areas or carry-forward context.

Acceptance criteria:

- User can promote a note into a song work area.
- User can mark a note as carry-forward.
- Promoted notes link to the created work item.
- User can close completed work areas during review.
- Carry-forward items surface in the next planning view.

### Candidate Issue — Start next plan from review context

Summary:

Make Review Mode feed naturally into the next Planning Mode.

Acceptance criteria:

- User can add thoughts to review scratchpad.
- Carry-forward notes/work areas appear in Planning Mode.
- Pinned work areas appear in Planning Mode.
- Skipped or partial blocks can be used as next-plan candidates.
- No automatic plan creation happens without user action.

## Phase 5 — Candidate lightweight repertoire health and look-back

Purpose: add simple visual/history views once the core cycle has data.

Candidate work:

- Song history view.
- Stale rep indicators.
- Lightweight repertoire health view.

Constraints:

- Keep this lightweight.
- Do not build a full analytics/reporting dashboard.
- Use the rehearsal history already captured by the core loop.

## Phase 6 — Candidate repertoire lifecycle helpers

Purpose: support new-song introduction and shelving/retirement without heavy project management.

Candidate work:

- New-song introduction planning fields and views.
- Shelf/retire workflow.

Constraints:

- Use existing song status, planned introduction date, rehearsal blocks, section labels, and work areas first.
- Do not add a heavyweight project-management workflow.
- Do not add a dedicated introduction-plan table until real use proves it is needed.

## Phase 7 — Candidate reliability and deployment polish

Candidate work:

- App-like mobile install metadata.
- Basic active-rehearsal caching.
- Playwright smoke tests for the core cycle.

Constraints:

- Do not build complex offline-first architecture without explicit approval.
- Keep reliability work focused on making live rehearsal use safer.

## First issue batch recommendation

Create only the first 4 issues initially.

Recommended first batch:

1. Scaffold the Next.js app.
2. Add Supabase configuration and username/password auth shell.
3. Add initial Supabase schema and RLS migrations.
4. Add seed data.

After those are working, create the next small batch:

5. Build song library list and song detail view.
6. Build song work areas with basic tags.
7. Build warmup library with basic tags.
8. Create rehearsals and ordered rehearsal blocks.

Do not create Phase 2 issues until the first two batches are reviewed.
