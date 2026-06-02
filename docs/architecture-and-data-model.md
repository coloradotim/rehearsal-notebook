# Rehearsal Notebook — Architecture and Data Model

## Purpose

This document defines the initial architecture and data model for Rehearsal Notebook.

The goal is to support the first useful version of the app: a private, mobile-friendly rehearsal continuity tool that helps the director plan, run, review, and remember rehearsals while keeping the full repertoire healthy.

This document supports the product strategy in `docs/product-strategy.md`.

## Architecture principles

### Build the core loop first

The first implementation should prove one full rehearsal cycle:

```text
Create rehearsal
-> build plan
-> generate singer-facing rehearsal plan
-> run rehearsal
-> capture notes
-> review what happened
-> generate singer-facing recap
-> carry work forward
-> use that context in the next plan
```

Do not build a broad management system before this loop works.

### Optimize for live rehearsal use

Execution Mode is the make-or-break feature.

During rehearsal, the app must be fast, simple, and phone-friendly. The director should not be navigating complex screens or doing detailed editing while directing.

### Preserve rehearsal truth

The app should distinguish:

```text
planned rehearsal work
actual rehearsal work
brief rep review
substantive song work
skipped work
carry-forward work
singer-facing communication
director-only notes
```

These are different product facts and should not be collapsed too early.

### Expect early schema change

The first data model is a starting point, not a final schema.

Early real use will likely change:

- song statuses
- tag taxonomy
- work area shape
- rehearsal block types
- touch types
- review workflow
- long-term planning needs

Prefer flexible text fields, user-managed tags, and app-level options over rigid database enums. Keep the schema simple enough to migrate as the product learns from real rehearsal use.

### Keep taxonomy flexible

Tags and categories will change as the director uses the app.

The data model should support editable, user-managed tags. Do not hard-code the taxonomy as permanent enums.

### Avoid premature complexity

The product should stay focused on rehearsal continuity, rep health, and the director's planning/review workflow.

Do not build broad collaboration, chorus administration, analytics, or media-management infrastructure unless the product direction explicitly changes.

## Product anti-goals

The following are not planned for Rehearsal Notebook unless Tim explicitly changes product direction:

- singer accounts
- attendance tracking
- Slack API integration or auto-posting
- native mobile app
- recording review workflow
- full chorus-management system
- heavyweight project management
- full analytics suite

The following are presumed out of scope unless a lightweight need emerges:

- audio storage
- file upload/storage for rehearsal recordings
- section leader portals
- structured individual singer tracking
- complex collaboration

For recordings, prefer lightweight external references if needed later, such as a pasted Voice Memos, iCloud, Google Drive, or other link attached to a rehearsal block or note. Do not design the app around storing audio files.

Analytics should remain lightweight: history, simple visual indicators, stale rep signals, and basic rehearsal-attention summaries. Do not build a heavy reporting or business-intelligence-style analytics layer.

## Expected stack

- Next.js App Router
- TypeScript
- Tailwind
- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- Vercel hosting
- Vitest for unit tests
- Playwright later for core browser flows

## App modes

The app has three primary modes:

```text
Planning Mode
Execution Mode
Review Mode
```

There may also be supporting library/admin screens for songs, warmups, tags, and settings, but the main product flow is the rehearsal cycle.

## Route structure

Initial route shape:

```text
/
  Redirect to the most useful current app state.

/login
  Username/password-style login screen.

/planning
  Main planning workspace.

/rehearsals
  Rehearsal list/history.

/rehearsals/new
  Create a rehearsal.

/rehearsals/[id]/plan
  Build or edit a rehearsal plan.

/rehearsals/[id]/run
  Execution Mode for the current rehearsal.

/rehearsals/[id]/review
  Review Mode after rehearsal.

/songs
  Song library.

/songs/[id]
  Song detail, work areas, history, and status.

/warmups
  Warmup library.

/tags
  Tag management.

/settings
  Basic app settings.
```

The exact routes can change, but the first implementation should keep Planning, Execution, and Review distinct.

## Authentication and access

V1 is private and single-user.

Use Supabase email/password authentication with a normal password login experience.

Do not use:

- magic links
- OTP login
- email-link login
- public signup
- Google OAuth unless explicitly approved later

The app may use an email address as the login identifier, but the user experience should be username/password-style login, not email-link authentication.

Rules:

- no public signup
- no singer accounts
- no service-role key in browser code
- RLS enabled on user-owned tables
- all user-created data should belong to the authenticated user

Even though v1 is single-user, use an ownership model that does not make future migration painful.

## Core entities

The app needs these initial entity groups:

1. User/profile
2. Songs
3. Tags
4. Song work areas
5. Warmups
6. Rehearsals
7. Rehearsal blocks
8. Rehearsal notes
9. Singer-facing messages
10. Optional future lightweight repertoire lifecycle/introduction planning

## Data model posture

This schema is a starting point.

Early development should expect migrations as the first real rehearsals reveal what needs to change. Avoid rigid database enums and complex state machines unless real use proves they are necessary.

Use app-level option lists for statuses and types at first. Keep the database flexible enough for renaming, adding, hiding, or reshaping product concepts.

## Data model

### profiles

Stores app access and user-level settings.

```text
profiles
- id uuid primary key references auth.users(id)
- email text not null
- display_name text
- is_allowed boolean default true
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Notes:

- V1 may only have one allowed user.
- Keep access explicit rather than relying only on who can log in.

### songs

Represents a song in or near the Harmony Road repertoire.

```text
songs
- id uuid primary key
- user_id uuid not null references profiles(id)
- title text not null
- status text not null default 'candidate'
- performance_context text
- planned_introduction_date date
- last_rehearsed_at date
- last_rep_reviewed_at date
- notes text
- sort_order integer
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Initial status values should be app-level options, not hard database enums:

```text
candidate
planned_introduction
learning
active_work
performance_work
keep_warm
performance_ready
shelf
retired
```

Rationale:

- Status labels may change.
- Avoid hard database enums early.
- Songs should not be deleted just because they leave active use.

### tags

Flexible user-managed taxonomy.

```text
tags
- id uuid primary key
- user_id uuid not null references profiles(id)
- name text not null
- tag_type text not null default 'general'
- sort_order integer
- is_active boolean default true
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Possible `tag_type` values:

```text
general
work_area
warmup
song
```

Notes:

- Tags should be user-managed.
- Use soft deletion via `is_active`.
- Rename and hide should come before true delete.
- Merge can wait.

### song_work_items

Captures what a song currently needs.

```text
song_work_items
- id uuid primary key
- user_id uuid not null references profiles(id)
- song_id uuid not null references songs(id)
- title text not null
- notes text
- is_open boolean default true
- pinned_for_next_rehearsal boolean default false
- created_from_rehearsal_id uuid references rehearsals(id)
- created_at timestamptz default now()
- closed_at timestamptz
- updated_at timestamptz default now()
```

Work items should stay lightweight.

Status is intentionally simple:

```text
open
closed
pinned/carry-forward flag
```

Do not build a complex workflow state machine in v1.

### song_work_item_tags

Join table.

```text
song_work_item_tags
- song_work_item_id uuid references song_work_items(id)
- tag_id uuid references tags(id)
- primary key (song_work_item_id, tag_id)
```

### warmups

Warmup library.

```text
warmups
- id uuid primary key
- user_id uuid not null references profiles(id)
- name text not null
- purpose text
- duration_minutes integer
- instructions text
- notes text
- sort_order integer
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

### warmup_tags

Join table.

```text
warmup_tags
- warmup_id uuid references warmups(id)
- tag_id uuid references tags(id)
- primary key (warmup_id, tag_id)
```

### rehearsals

Represents a rehearsal cycle.

```text
rehearsals
- id uuid primary key
- user_id uuid not null references profiles(id)
- rehearsal_date date not null
- planned_minutes integer not null
- status text not null default 'planning'
- goal text
- planning_scratchpad text
- review_scratchpad text
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Possible status values should be app-level options:

```text
planning
active
review
reviewed
```

Notes:

- `planning_scratchpad` captures pre-rehearsal thoughts.
- `review_scratchpad` captures after-rehearsal thoughts and next-cycle ideas.
- We should be careful later about whether scratchpad becomes global or rehearsal-specific. Rehearsal-specific is fine for v1.

### rehearsal_blocks

Ordered blocks in a rehearsal plan.

```text
rehearsal_blocks
- id uuid primary key
- user_id uuid not null references profiles(id)
- rehearsal_id uuid not null references rehearsals(id)
- block_type text not null
- song_id uuid references songs(id)
- warmup_id uuid references warmups(id)
- title text not null
- goal text
- planned_minutes integer
- priority text not null default 'should'
- director_notes text
- singer_homework text
- sort_order integer not null
- execution_status text not null default 'planned'
- touch_type text
- section_label text
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Initial `block_type` values should be app-level options:

```text
warmup
song_work
rep_review
sectional
admin
```

Initial `priority` values should be app-level options:

```text
must
should
could
```

Initial `execution_status` values should be app-level options:

```text
planned
done
partial
skipped
```

Initial `touch_type` values should be app-level options:

```text
full_work
rep_review
sectional
homework
skipped
```

Notes:

- `touch_type` is set/confirmed in Review Mode.
- `touch_type` drives bulk updates to `songs.last_rehearsed_at` and `songs.last_rep_reviewed_at`.
- `section_label` can capture things like `mm. 1-41`, `first third`, `tag`, or `second half`.

### rehearsal_notes

Notes captured during execution or review.

```text
rehearsal_notes
- id uuid primary key
- user_id uuid not null references profiles(id)
- rehearsal_id uuid not null references rehearsals(id)
- rehearsal_block_id uuid references rehearsal_blocks(id)
- song_id uuid references songs(id)
- note text not null
- is_director_only boolean default true
- carry_forward boolean default false
- promoted_to_work_item_id uuid references song_work_items(id)
- external_reference_url text
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Notes:

- Notes are director-only by default.
- A note can be promoted into a song work item during Review Mode.
- A note can be used in the singer-facing recap only if the director chooses.
- `external_reference_url` can later hold a lightweight link to an external rehearsal recording or related resource without requiring app-managed audio storage.

### rehearsal_messages

Stores generated or edited singer-facing messages.

```text
rehearsal_messages
- id uuid primary key
- user_id uuid not null references profiles(id)
- rehearsal_id uuid not null references rehearsals(id)
- message_type text not null
- body text not null
- copied_at timestamptz
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Initial `message_type` values should be app-level options:

```text
plan
recap
```

Notes:

- The app does not auto-post to Slack.
- The app generates copy-paste output.
- Storing messages helps preserve what was communicated to the chorus.

## New-song introduction support

Do not build a full introduction planner in v1 unless needed for the thin slice.

The initial schema should avoid blocking this later.

V1 can represent most of the new-song process through:

- `songs.status`
- `songs.planned_introduction_date`
- rehearsal blocks
- `rehearsal_blocks.section_label`
- work items
- notes
- optional message/homework text

Only add a dedicated introduction-plan table after real use proves it is needed.

Possible future entity, not planned for initial implementation:

```text
song_introduction_plans
- id uuid primary key
- user_id uuid not null references profiles(id)
- song_id uuid not null references songs(id)
- target_start_date date
- status text
- current_stage text
- notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()
```

Possible future stages:

```text
rehearsal_0_intro
sectional_and_four_part_learning
full_group_off_paper
recording_requirement
in_repertoire
```

## Long-term look-back support

Do not build a full analytics suite.

The app should support lightweight look-back views over time, such as:

- song history
- last worked and last reviewed indicators
- stale rep signals
- basic rehearsal-attention summaries
- open work areas by song
- songs with repeated carry-forward notes

The critical data for later lightweight look-back is:

- rehearsal block type
- planned minutes
- execution status
- touch type
- song id
- rehearsal date
- notes
- work item state

Capture these cleanly from the beginning.

## Time budget

Planning Mode should calculate:

```text
total planned block minutes
available rehearsal minutes
over/under amount
```

If total planned minutes exceed available minutes, show a clear warning.

The warning should help identify lower-priority blocks that could be cut first.

## Slack output

The app should generate two singer-facing message types.

### Rehearsal plan message

Generated from Planning Mode.

Includes:

- rehearsal date
- songs being worked
- songs to review
- specific homework
- what to listen for
- what to print or read
- links or docs, when available

### Rehearsal recap message

Generated from Review Mode.

Includes:

- rehearsal date
- songs or sections covered
- key musical points
- things that improved
- things to remember
- items singers should continue working
- reminders about documents, tracks, or upcoming expectations

The app should never auto-post.

Director-only notes must not appear in singer-facing output unless the director intentionally includes them.

## Mobile execution requirements

Execution Mode should pass these practical checks on iPhone:

- active rehearsal opens in under two taps from the main app state
- current block is visible without scrolling
- Done/Partial/Skip are one-tap actions
- Add note is two taps or fewer
- next block is visible or reachable in one tap
- block list summary supports jumping when rehearsal goes off-plan
- UI updates immediately after a block action
- previously loaded active rehearsal remains usable if the network weakens

## Supabase and RLS approach

Every user-owned table should include `user_id`.

RLS policies should generally allow:

```text
select/insert/update/delete own rows only
```

For join tables, access should be constrained through the owning parent records.

Do not use service-role keys in browser code.

Supabase migrations should live in `supabase/migrations`.

## Testing strategy

Early tests should focus on product-critical behavior:

- time budget calculation
- block ordering
- Slack plan message generation
- Slack recap message generation
- touch type to song date update logic
- work item open/closed behavior
- tag filtering
- execution status changes
- note promotion into work item

Use Vitest for logic tests.

Add Playwright later for core browser flows, especially mobile Execution Mode.

## Thin-slice MVP

Before building broad management features, prove this vertical slice:

1. Create songs.
2. Create warmups.
3. Create one rehearsal.
4. Add ordered rehearsal blocks.
5. Show time budget warning.
6. Generate a copy-paste rehearsal plan message.
7. Run the rehearsal from Execution Mode.
8. Mark blocks done/partial/skipped.
9. Add notes.
10. Review the rehearsal.
11. Bulk update song touched/reviewed dates.
12. Promote at least one note into a song work area.
13. Generate a copy-paste recap message.
14. Start the next rehearsal plan with carry-forward context visible.

If this loop works, the product has a foundation.

If this loop is annoying, fix it before adding more features.
