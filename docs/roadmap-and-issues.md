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
-> generate Slack rehearsal plan copy
-> run rehearsal on iPhone
-> capture notes
-> review what happened
-> update song history
-> generate Slack recap copy
-> carry context into the next plan
```

If that loop is annoying, fix it before building more.

## Phase 0 — Project foundation

Purpose: create a stable Next.js/Supabase project foundation with docs, checks, and basic auth direction.

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

## Phase 1 — Core libraries

Purpose: create the basic song, work area, tag, and warmup foundations needed for planning.

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

### Issue 6 — Build song work areas

Summary:

Allow each song to have lightweight open/closed work areas.

Acceptance criteria:

- User can create a work area from a song detail page.
- User can edit work area title and notes.
- User can mark a work area open/closed.
- User can pin a work area for next rehearsal.
- Work areas stay lightweight; no complex workflow state machine.

### Issue 7 — Build flexible tag management

Summary:

Create a simple user-managed tag system for work areas, warmups, and general use.

Acceptance criteria:

- `/tags` shows active tags.
- User can add a tag.
- User can rename a tag.
- User can hide/deactivate a tag.
- Tags are not hard-coded enums.
- Merge/delete can be deferred.
- Work areas can be tagged.

### Issue 8 — Build warmup library

Summary:

Create a warmup library with purpose, duration, instructions, notes, and tags.

Acceptance criteria:

- `/warmups` lists warmups.
- User can create and edit warmups.
- Warmups support purpose, duration, instructions, notes, and tags.
- Warmups can be filtered or searched by tag/purpose.
- Warmups remain lightweight; no audio/video/media storage.

## Phase 2 — Planning Mode

Purpose: build a realistic rehearsal plan with time budget and singer-facing Slack output.

### Issue 9 — Create rehearsals and planning workspace

Summary:

Allow the director to create a rehearsal and enter date, available minutes, goal, and planning scratchpad.

Acceptance criteria:

- User can create a rehearsal.
- Rehearsal has date, planned minutes, goal, and planning scratchpad.
- `/planning` surfaces the next relevant rehearsal.
- `/rehearsals/[id]/plan` opens the plan builder.
- Planning view shows repertoire context needed for planning.

### Issue 10 — Add ordered rehearsal blocks

Summary:

Allow rehearsal plans to contain ordered blocks for warmups, song work, rep review, sectionals, and admin.

Acceptance criteria:

- User can add a block to a rehearsal.
- User can choose block type.
- User can link a song and/or warmup when relevant.
- User can enter title, goal, planned minutes, priority, director notes, singer homework, and section label.
- User can reorder blocks.
- Blocks display clearly on desktop and mobile.

### Issue 11 — Add time budget warning

Summary:

Show total planned minutes against available rehearsal time and warn when the plan is overpacked.

Acceptance criteria:

- Planning view shows total planned minutes.
- Planning view shows available minutes.
- Planning view shows over/under amount.
- Overpacked plans receive a clear warning.
- Lower-priority `should`/`could` blocks are visually identifiable as possible cuts.
- Logic has unit tests.

### Issue 12 — Generate rehearsal plan Slack copy

Summary:

Generate a copy-paste singer-facing rehearsal plan message from the rehearsal plan.

Acceptance criteria:

- Planning Mode can generate plan copy.
- Message includes rehearsal date, songs being worked, songs to review, homework, what to listen for, and links/docs if present.
- Director-only notes are excluded.
- User can edit generated copy before copying or saving.
- Generated/edited copy is stored as a `plan` rehearsal message.
- Unit tests cover message generation.

## Phase 3 — Execution Mode

Purpose: run rehearsal from an iPhone without friction.

Stop after this phase and test with a real or simulated rehearsal before continuing.

### Issue 13 — Build mobile-first Execution Mode

Summary:

Create `/rehearsals/[id]/run`, focused on the current rehearsal block and minimal actions.

Acceptance criteria:

- Current block is visible without scrolling on iPhone-sized viewport.
- Current block shows title, song/warmup, planned time, goal, director notes, relevant work areas, and next block preview.
- Done/Partial/Skip are one-tap actions.
- Add note is two taps or fewer.
- Moving to next block is one tap.
- UI is fast and uncluttered.

### Issue 14 — Add optimistic execution status updates

Summary:

Make Done/Partial/Skip update immediately in the UI and sync to Supabase in the background.

Acceptance criteria:

- Done/Partial/Skip update visually immediately.
- Failed sync is surfaced clearly and recoverably.
- No spinner blocks live rehearsal flow after initial load.
- Execution status persists after refresh.
- Tests cover status update behavior where feasible.

### Issue 15 — Add fast rehearsal note capture

Summary:

Allow quick notes during Execution Mode.

Acceptance criteria:

- User can add a note from current block quickly.
- Note is linked to rehearsal, block, and song when available.
- Notes default to director-only.
- Notes save without disrupting the execution flow.
- Browser-native speech-to-text can be used if available through the normal input experience; no custom voice recording feature.

### Issue 16 — Add block summary/jump view

Summary:

Allow the director to jump non-linearly when rehearsal goes off plan.

Acceptance criteria:

- Execution Mode has a compact block list summary.
- User can jump to any block in one tap from the summary.
- Status for each block is visible in the summary.
- Summary is mobile-friendly and does not become a planning editor.

## Phase 4 — Review Mode

Purpose: close the loop, update song history, create carry-forward context, and generate the after-rehearsal recap.

### Issue 17 — Build Review Mode summary

Summary:

Create `/rehearsals/[id]/review` showing the original plan, execution statuses, and captured notes.

Acceptance criteria:

- Review view shows all blocks in order.
- Review view shows done/partial/skipped/planned status.
- Review view shows notes captured during rehearsal.
- Review view supports edits to execution statuses.
- Review view is usable later, not only immediately after rehearsal.

### Issue 18 — Add bulk song touch date update

Summary:

In Review Mode, allow bulk confirmation of song dates based on block touch types.

Acceptance criteria:

- Review Mode shows songs touched in the rehearsal.
- User can set/confirm touch type per relevant block or song.
- User can bulk update last rehearsed and last rep reviewed dates.
- `full_work` updates `last_rehearsed_at`.
- `rep_review` updates `last_rep_reviewed_at`.
- `sectional` behavior is explicit and documented.
- Logic has tests.

### Issue 19 — Promote notes into work areas and carry-forward items

Summary:

Allow rehearsal notes to become durable song work areas or carry-forward context.

Acceptance criteria:

- User can promote a note into a song work area.
- User can mark a note as carry-forward.
- Promoted notes link to the created work item.
- User can close completed work areas during review.
- Carry-forward items surface in the next planning view.

### Issue 20 — Generate after-rehearsal Slack recap copy

Summary:

Generate a copy-paste singer-facing recap message from Review Mode.

Acceptance criteria:

- Review Mode can generate recap copy.
- Message includes rehearsal date, songs/sections covered, key musical points, things improved, things to remember, and items singers should continue working.
- Director-only notes are excluded unless intentionally included.
- User can edit generated copy before copying or saving.
- Generated/edited copy is stored as a `recap` rehearsal message.
- Unit tests cover recap generation.

### Issue 21 — Start next plan from review context

Summary:

Make Review Mode feed naturally into the next Planning Mode.

Acceptance criteria:

- User can add thoughts to review scratchpad.
- Carry-forward notes/work areas appear in Planning Mode.
- Pinned work areas appear in Planning Mode.
- Skipped or partial blocks can be used as next-plan candidates.
- No automatic plan creation happens without user action.

## Phase 5 — Lightweight repertoire health and look-back

Purpose: add simple visual/history views once the core cycle has data.

### Issue 22 — Add song history view

Summary:

Show a song's rehearsal history from rehearsal blocks and notes.

Acceptance criteria:

- Song detail shows past rehearsal touches.
- History distinguishes full work, rep review, sectional, homework, and skipped/planned work where available.
- History shows notes and linked work items.
- History is useful without becoming a full analytics suite.

### Issue 23 — Add stale rep indicators

Summary:

Surface songs that may need attention based on last rehearsed and last rep reviewed dates.

Acceptance criteria:

- Planning Mode shows stale indicators.
- Thresholds are configurable or easy to adjust.
- Indicators distinguish last rehearsed from last rep reviewed.
- No notification system is built.

### Issue 24 — Add lightweight repertoire health view

Summary:

Create a simple look-back view showing where rehearsal attention has gone.

Acceptance criteria:

- View shows songs worked/reviewed over recent rehearsals.
- View shows basic planned minutes by song where available.
- View shows open work area counts by song.
- View surfaces songs with repeated carry-forward notes.
- View stays lightweight; no full analytics suite.

## Phase 6 — Repertoire lifecycle helpers

Purpose: support new-song introduction and shelving/retirement without heavy project management.

### Issue 25 — Add new-song introduction planning fields and views

Summary:

Use existing song status, planned introduction date, rehearsal blocks, section labels, and work areas to support the Harmony Road new-song process.

Acceptance criteria:

- Song detail can show planned introduction date and status.
- Planning Mode surfaces upcoming planned introductions.
- User can plan Rehearsal 0 intro, sectional/four-part learning, full-group off-paper work, and recording requirement as normal rehearsal blocks.
- App does not add a heavyweight project-management workflow.

### Issue 26 — Add shelf/retire workflow

Summary:

Allow songs to move out of active use while preserving history.

Acceptance criteria:

- User can mark a song shelf or retired.
- Shelved/retired songs are hidden from default active planning views but accessible in the song library.
- History remains preserved.
- Retired songs can be revived by changing status.

## Phase 7 — Polish, reliability, and deployment hygiene

Purpose: harden the app after the core loop is usable.

### Issue 27 — Add app-like mobile install metadata

Summary:

Make the app behave well when added to iPhone Home Screen.

Acceptance criteria:

- Web app manifest exists.
- App icons/placeholders exist.
- Mobile viewport behavior is correct.
- README documents the add-to-home-screen path.

### Issue 28 — Add basic active-rehearsal caching

Summary:

Improve rehearsal reliability in weak signal environments.

Acceptance criteria:

- Active rehearsal loads and remains usable after initial load if network weakens.
- Previously loaded plan can still be viewed.
- Failed writes are recoverable.
- No complex offline-first architecture unless explicitly approved.

### Issue 29 — Add Playwright smoke tests for the core cycle

Summary:

Add browser-level tests for the thin-slice rehearsal cycle.

Acceptance criteria:

- Test covers create rehearsal, add blocks, run mode, review mode, and message generation.
- Mobile viewport is included for Execution Mode.
- Tests are documented and runnable locally.

## Not yet planned

Do not create issues for these without an explicit product-direction decision:

- singer accounts
- attendance tracking
- Slack API integration
- native mobile app
- audio upload/storage
- recording review workflow
- full analytics/reporting dashboard
- AI planning or AI summary features
- section leader collaboration

## First issue batch recommendation

Create only the first 8-12 issues initially.

Recommended first batch:

1. Scaffold the Next.js app.
2. Add Supabase configuration and username/password auth shell.
3. Add initial Supabase schema and RLS migrations.
4. Add seed data.
5. Build song library list and song detail view.
6. Build song work areas.
7. Build flexible tag management.
8. Build warmup library.
9. Create rehearsals and planning workspace.
10. Add ordered rehearsal blocks.
11. Add time budget warning.
12. Generate rehearsal plan Slack copy.

After those are working, create Execution Mode issues and test the live rehearsal flow before continuing.
