# Rehearsal Notebook

A mobile-friendly rehearsal continuity tool for planning, running, reviewing, and remembering chorus rehearsals.

Rehearsal Notebook is being built for Harmony Road, a small mixed a cappella/barbershop chorus that rehearses every other Monday. The app helps preserve the musical thread between rehearsals by tracking repertoire history, song work areas, warmups, rehearsal plans, rehearsal notes, singer homework, after-rehearsal recaps, and carry-forward items.

This is a private/single-user app built for personal use by the chorus director.

## Core promise

Plan, run, and review rehearsals while keeping the full repertoire healthy.

The app should help answer:

- What did we rehearse last time?
- What did we only review briefly?
- What did we skip?
- What does each song currently need?
- What warmups support the current musical work?
- What homework should singers do before the next rehearsal?
- What key points should the chorus remember after rehearsal?
- Which repertoire is getting stale?
- What should carry forward?
- Where is rehearsal attention going over time?

## Product shape

Rehearsal Notebook is organized around the rehearsal cycle:

```text
Planning Mode -> Execution Mode -> Review Mode -> chorus recap -> next Planning Mode
```

### Planning Mode

Build a realistic next rehearsal plan based on repertoire history, open song work areas, warmups, available time, planned repertoire changes, and singer homework.

Planning Mode should support:

- next rehearsal date and planned minutes
- current repertoire state
- last rehearsed and last rep reviewed dates
- open work areas by song
- warmup selection by musical purpose
- rehearsal blocks with must/should/could priority
- time-budget warning
- singer-facing Slack plan copy output

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

Review what happened after rehearsal, either immediately or in the hours/days after.

Review Mode should support:

- confirming what happened
- reviewing done/partial/skipped blocks
- bulk-updating song dates
- distinguishing substantive rehearsal work from brief rep review
- promoting notes into song work areas
- closing completed work areas
- carrying unfinished work forward
- capturing next-rehearsal scratchpad thoughts
- generating a copy-paste chorus recap message

Review should guide the next planning cycle without requiring a heavy close/finalize ceremony.

## Current app status

This repo is at the foundation-build stage.

Current source-of-truth docs:

- [Product strategy](docs/product-strategy.md)
- [Architecture and data model](docs/architecture-and-data-model.md)
- [Roadmap and issue sequence](docs/roadmap-and-issues.md)
- [Agent guidance](AGENTS.md)

The first approved issue batch is foundation only:

1. Scaffold the Next.js app.
2. Add Supabase configuration and username/password auth shell.
3. Add initial Supabase schema and RLS migrations.
4. Add seed starter data for local development.

Do not create or work later roadmap issues until the foundation batch is reviewed.

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

The first version should remain a responsive web app. Do not add a native mobile app, Slack API integration, singer accounts, attendance tracking, AI planning, app-managed audio storage, recording-review workflow, full analytics suite, or heavyweight project management unless the product direction changes explicitly.

## Auth direction

Use Supabase email/password authentication with a normal username/password-style login experience.

Do not use:

- magic links
- OTP login
- email-link login
- public signup
- Google OAuth unless explicitly approved later

The app may use an email address as the login identifier, but the user experience should be normal password login, not email-link authentication.

## Development workflow

Use GitHub issues and PRs for implementation work.

Before normal feature work, read:

- `AGENTS.md`
- `docs/product-strategy.md`
- `docs/architecture-and-data-model.md`
- `docs/roadmap-and-issues.md`
- the GitHub issue being worked

See `AGENTS.md` for project-specific agent and Codex guidance.

## Local setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

No environment variables are required for the initial scaffold. Supabase
configuration will be added in a later issue.

For a background dev server that can be restarted by scripts:

```bash
scripts/dev.sh start
scripts/dev.sh status
scripts/dev.sh restart
scripts/dev.sh stop
```

The script uses `http://127.0.0.1:3000` by default. Override with `DEV_HOST`
or `DEV_PORT` when needed.

## Checks

The intended check entry point is:

```bash
scripts/check.sh
```

It runs:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The end-to-end test script uses Playwright and starts the built Next.js app
automatically on `http://127.0.0.1:3000`.

## Guardrails

Do not commit secrets.

Do not use Supabase service-role keys in browser code.

Do not let the app become a generic chorus-management system. The first product is a director-focused rehearsal continuity tool.

Do not build features unless they help make the next rehearsal better.
