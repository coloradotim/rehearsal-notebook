# Rehearsal Notebook

A mobile-friendly rehearsal continuity tool for planning, running, and remembering chorus rehearsals.

Rehearsal Notebook is being built for Harmony Road, a small mixed a cappella/barbershop chorus that rehearses every other Monday. The app helps preserve the thread between rehearsals by tracking repertoire history, song work areas, warmups, rehearsal plans, rehearsal notes, singer homework, and carry-forward items.

This is a private/single-user app built for personal use by the chorus director.

## Core promise

Never lose the thread from one rehearsal to the next.

The app should help answer:

- What did we rehearse last time?
- What did we only review briefly?
- What did we skip?
- What does each song currently need?
- What warmups support the current musical work?
- What homework should singers do before the next rehearsal?
- Which repertoire is getting stale?
- What should carry forward?

## Product shape

Rehearsal Notebook is organized around three modes:

```text
Planning Mode -> Execution Mode -> Review Mode -> next Planning Mode
```

### Planning Mode

Build a realistic next rehearsal plan based on repertoire history, open song work areas, warmups, available time, and singer homework.

Planning Mode should support:

- next rehearsal date and planned minutes
- current repertoire state
- last rehearsed and last rep reviewed dates
- open work areas by song
- warmup selection by musical purpose
- rehearsal blocks with must/should/could priority
- time-budget warning
- singer-facing Slack message copy output

### Execution Mode

Run the current rehearsal from an iPhone without getting in the way.

Execution Mode should show only what matters for the current block:

- block title
- song or warmup
- planned time
- goal
- director notes/reminder
- relevant song work areas
- next block preview

Primary actions:

- Done
- Partial
- Skip
- Add note

Execution Mode is the make-or-break feature. If it is annoying during a live rehearsal, the app fails.

### Review Mode

Close the loop after rehearsal, either immediately or in the hours/days after.

Review Mode should support:

- confirming what happened
- reviewing done/partial/skipped blocks
- bulk-updating song dates
- distinguishing substantive rehearsal work from brief rep review
- promoting notes into song work areas
- closing completed work areas
- carrying unfinished work forward
- capturing next-rehearsal scratchpad thoughts

## Current app status

This repo is at the project setup stage. Product strategy, architecture, data model, and roadmap documents should be finalized before the first implementation issues are created.

## Expected stack

Planned stack:

- Next.js App Router
- TypeScript
- Tailwind
- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- Vercel hosting
- Vitest for unit tests
- Playwright later for core browser flows

The first version should remain a responsive web app. Do not add a native mobile app, Slack API integration, singer accounts, AI planning, audio storage, or recording-review workflow unless the product plan changes explicitly.

## Development workflow

Use GitHub issues and PRs for implementation work.

Before normal feature work starts, the project should establish:

- product strategy
- architecture and data model
- roadmap and issue sequence
- development setup
- Supabase operations approach
- testing and validation approach

See `AGENTS.md` for project-specific agent and Codex guidance.

## Local setup

Local setup instructions will be added once the Next.js app scaffold exists.

Expected future flow:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Checks

The intended check entry point is:

```bash
scripts/check.sh
```

Until that exists, implementation PRs should run the available equivalents and document them in the PR:

```bash
npm run lint
npm run test:run
npm run build
```

## Guardrails

Do not commit secrets.

Do not use Supabase service-role keys in browser code.

Do not let the app become a generic chorus-management system. The first product is a director-focused rehearsal continuity tool.

Do not build features unless they help make the next rehearsal better.
