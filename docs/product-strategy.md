# Rehearsal Notebook — Product Strategy

## Purpose

Rehearsal Notebook is a private rehearsal continuity tool for Harmony Road.

It helps the director plan rehearsals, run rehearsals, review what happened, look back across rehearsal history, and carry useful musical work from one rehearsal cycle into the next.

The product exists because Harmony Road rehearses every other Monday for roughly 2-2.5 hours. Rehearsal time is scarce. Singer preparation between rehearsals matters, and the director needs a reliable way to preserve context from one rehearsal to the next while keeping the full repertoire healthy.

## Core promise

Plan, run, and review rehearsals while keeping the full repertoire healthy.

Rehearsal Notebook should help the director:

- prepare a realistic rehearsal plan
- communicate useful homework before rehearsal
- run rehearsal with the right context visible
- capture what actually happened
- recap key rehearsal takeaways for the chorus
- carry unfinished work forward
- track what each song currently needs
- keep repertoire from going stale by accident
- understand over time where rehearsal attention is going and where the repertoire may need more care
- plan future repertoire changes, including introducing new songs and shelving or retiring old ones

A useful internal principle is:

> Never lose the musical thread from one rehearsal to the next.

## Primary user

The primary user is the chorus director.

The app is not designed first as a singer-facing tool. Singers benefit from clearer homework, rehearsal plans, and rehearsal recaps, but v1 is a private director tool.

## Product point of view

Rehearsal Notebook is not a generic planning app. It is also not a generic chorus-management system.

It is a working notebook for a director managing a recurring rehearsal cycle and the longer-term health of a chorus repertoire.

The app should preserve the clarity of a simple spreadsheet where songs are rows and rehearsals are columns, while adding richer context:

- song history
- open work areas
- warmup choices
- rehearsal plans
- singer homework
- execution notes
- after-rehearsal recap output
- carry-forward items
- reminders about stale repertoire
- look-back views showing where rehearsal time and attention have gone
- planned repertoire changes, including new-song introductions and songs moving to shelf/retired status

The app should make rehearsal planning easier without turning rehearsal into data entry.

## Core workflow

The app is organized around the rehearsal cycle:

```text
Planning Mode -> Execution Mode -> Review Mode -> chorus recap -> next Planning Mode
```

### Planning Mode

Planning Mode helps the director build the next rehearsal plan.

It should surface:

- upcoming rehearsal date
- available rehearsal time
- next rehearsal scratch pad
- repertoire history
- last rehearsed and last rep reviewed dates
- open song work areas
- warmup library
- carry-forward items
- songs that may need review
- long-term repertoire-health signals, when available
- planned upcoming repertoire changes, when available
- time budget for the plan

Planning Mode should produce a copy-paste Slack message for the chorus with clear homework and preparation notes.

### Execution Mode

Execution Mode helps the director run the current rehearsal.

This is the make-or-break feature.

During rehearsal, the director should not be managing the app. The app should quietly remind the director what the current block is trying to accomplish and allow fast capture of what happened.

Execution Mode should show only what is relevant to the current rehearsal block:

- block title
- song or warmup
- planned time
- goal
- director notes
- relevant current work areas
- next block preview

Actions should stay minimal:

- Done
- Partial
- Skip
- Add note

If Execution Mode is annoying during a live rehearsal, the app fails.

### Review Mode

Review Mode helps the director close the loop after rehearsal.

This may happen immediately after rehearsal, later that night, the next day, or a few days later. The app should make it easy to reconstruct what happened from the original plan and captured notes.

Review Mode supports two different outcomes:

1. Updating the director's rehearsal memory inside the app.
2. Producing a singer-facing after-rehearsal recap message for Slack.

#### Director review

Director review should support:

- confirming what got done
- confirming what was partial
- confirming what was skipped
- updating last rehearsed dates
- updating last rep reviewed dates separately
- promoting notes into song work areas
- closing completed work areas
- carrying unfinished work forward
- adding thoughts to the next rehearsal scratch pad

Review Mode is what turns a rehearsal plan into durable rehearsal memory.

#### Chorus recap output

Review Mode should generate a copy-paste Slack message recapping the rehearsal.

This message is different from the next rehearsal plan. It summarizes what the chorus covered and what singers should remember while the work is still fresh.

The recap should include:

- rehearsal date
- songs or sections covered
- key musical points
- things that improved
- things to remember
- specific items singers should continue working
- any reminders about documents, tracks, or upcoming expectations

The after-rehearsal recap should ideally go out no later than the next evening after rehearsal.

The next formal rehearsal plan may come later, often a day or several days after the recap.

Director-only notes should not appear in the singer-facing recap unless the director intentionally includes them.

## Repertoire and rep review

Rep review is central to the product.

The app should distinguish between:

```text
last_rehearsed_at     = substantive rehearsal work
last_rep_reviewed_at  = brief maintenance review or run-through
```

These are separate facts.

A song may be touched lightly for rep review without receiving meaningful rehearsal work. The app should preserve that distinction because it affects future planning.

The app should make it easy to see:

- when each song was last worked
- when each song was last reviewed
- what happened most recently
- what the song currently needs
- whether it is getting stale

## Repertoire lifecycle

Rehearsal Notebook should support the reality that repertoire changes over time.

Songs may move through a lifecycle such as:

- candidate or under consideration
- planned introduction
- learning
- active work
- performance work
- keep warm
- performance-ready
- shelf
- retired

The exact lifecycle labels may change as the app is used, so the product should avoid hard-coding a rigid lifecycle too early. But the strategy should support the idea that songs are not all in the same state.

The director should be able to tell the app that a song is planned to come in on a specific date, or that a song is being moved toward shelf or retirement.

This matters because bringing a new song into the repertoire affects rehearsal planning across several rehearsals, not just one night.

## New-song introduction planning

Harmony Road has a defined process for introducing new songs that lasts several rehearsals.

The app should support this as a flexible staged process rather than a rigid wizard. The goal is to help the director plan the sequence, prepare singer homework, and see how new-song learning affects available rehearsal time across multiple rehearsal cycles.

A typical new-song introduction process is:

### Rehearsal 0 — Introduce the song

The chorus hears the song in rehearsal and discusses the overall approach.

This is not yet detailed note-learning work. The purpose is to orient the chorus to the song, why it is being added, the general style, and the intended musical/performance direction.

### Rehearsals 1-2 or 1-3 — Sectional learning and four-part assembly

For each rehearsal in this stage, the chorus spends about 10 minutes in sectionals on a portion of the song, usually the first half or first third depending on length and complexity.

After sectionals, the group spends about 10 minutes working that same portion in four parts.

This pattern repeats once or twice depending on song length and complexity.

The app should support planning these blocks as paired sectional and four-part work for a defined section of the song.

### Rehearsal 3 or 4 — Full-group, end-to-end, off-paper work

Once the staged learning work is far enough along, the chorus works the song as a full group end-to-end off paper.

At this point, the director assigns a recording requirement due before the next rehearsal.

The recording requirement is a milestone in the new-song introduction process, but recordings remain occasional and should not become the center of the product.

### After introduction — Into repertoire

After the full-group/off-paper stage and recording requirement, the song is considered part of the repertoire.

From there, the song moves into normal polishing, performance work, and rep review as needed.

### Product implications

The app should eventually support:

- selecting a song for future introduction
- setting a target introduction date
- tracking the song through Rehearsal 0, sectional/four-part learning stages, full-group off-paper work, and recording requirement
- adapting the number of learning rehearsals based on song length and complexity
- planning homework and rehearsal blocks for each stage
- identifying the portion of the song being worked in a given stage
- seeing how the introduction plan affects available rehearsal time
- carrying introduction-stage work forward if a rehearsal does not get through everything
- moving the song into the normal active repertoire once the introduction process is complete

This should not become heavy project management. It should help the director see the future rehearsal load created by introducing new music and avoid letting new-song learning crowd out necessary rep review and polishing.

## Shelving and retiring songs

The app should also support songs leaving active use.

A song may be:

- temporarily shelved
- kept warm but not performance-focused
- retired from active repertoire
- revived later

Shelving or retiring a song should preserve history. The app should not treat old songs as deleted just because they are no longer active.

This supports future look-back and better repertoire decisions.

## Long-term repertoire health and look-back

Rehearsal Notebook should eventually help the director understand rehearsal attention over time, not just plan the next rehearsal.

The app should make it easier to see:

- which songs have received the most rehearsal time
- which songs have only been touched lightly through rep review
- which songs have not been touched recently
- which songs have open work areas that keep carrying forward
- why rehearsal time has been spent on particular songs
- whether the full repertoire is staying healthy
- whether upcoming performances, contests, or gigs are receiving enough focused preparation
- whether new songs are crowding out necessary rep review or performance polishing
- whether songs should be kept warm, shelved, retired, or brought back

This should start simply. The first useful version may be a song history view that shows rehearsal dates, block types, notes, and open work areas.

Over time, this can become a more visual repertoire-health view, showing patterns such as:

- rehearsal time by song
- rep review frequency by song
- open work areas by song
- stale songs
- songs with repeated carry-forward notes
- planned introduction timelines
- shelf/retirement candidates
- songs tied to upcoming performance context

The goal is not analytics for its own sake. The goal is to help the director make better rehearsal-planning decisions and keep the entire repertoire from becoming lopsided, stale, or accidentally neglected.

## Song work areas

A song work area captures what a song currently needs.

Examples:

- Change The World: lock sync in the tag
- Change The World: lean into syncopation
- As Long As I'm Singing: keep the tag connected to the song
- Look For The Light: maintain the waltz feel
- Look For The Light: embody the emotional arc
- Why We Sing: learn mm. 1-41

Work areas should be lightweight and useful. They should not become a burdensome project-management system.

In v1, work-area status should stay simple:

- open
- closed
- optionally pinned or carried forward

## Flexible taxonomy

The taxonomy matters, but it should not be rigid.

The director should be able to tag work areas and warmups with categories such as:

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

These tags will likely change as the app is used. Tags should be user-managed data, not hard-coded product truth.

## Warmup library

Warmups should be chosen by purpose, not just by name.

The warmup library should help the director find warmups that support the rehearsal's musical goals.

A warmup should capture:

- name
- purpose
- approximate duration
- instructions
- tags/categories
- notes

The warmup library should support planning decisions like:

- We are working syncopation, so choose a rhythm/subdivision warmup.
- We are working Look For The Light, so choose a warmup that supports waltz feel, breath flow, and emotional embodiment.
- We are working tuning/blend, so choose a listening or vowel-alignment warmup.

## Singer communication

The app should help the director communicate clearly with the chorus before and after rehearsal.

### Rehearsal plan message

Planning Mode should generate a copy-paste Slack message that includes:

- rehearsal date
- songs being worked
- songs to review
- specific homework
- what to listen for
- what to print or read
- any links or documents

The app should not auto-post to Slack in v1.

Director-only notes must not appear in singer-facing output.

### After-rehearsal recap message

Review Mode should generate a copy-paste Slack recap after rehearsal.

The recap should help singers remember what was covered and what to keep working while the rehearsal is still fresh.

The recap should usually be sent no later than the next evening after rehearsal. The formal plan for the next rehearsal may come later.

## What v1 is not

v1 is not:

- a singer portal
- an attendance tracker
- a learning-track platform
- a sheet-music annotation tool
- a Slack integration
- a native mobile app
- an AI music director
- an audio recording platform
- a recording review workflow
- a general-purpose task manager
- a full chorus-management system
- a full analytics suite
- a heavyweight long-term project-management system

These may be considered later only if they serve the core rehearsal-continuity workflow.

## AI position

AI is deferred.

AI may eventually help with:

- suggesting rehearsal plans
- matching warmups to rehearsal goals
- drafting singer-facing Slack messages
- summarizing post-rehearsal notes
- cleaning up messy notes into clear work areas
- identifying repertoire-health patterns from rehearsal history
- helping plan new-song introduction timelines

But the app must first work as a rehearsal continuity system without AI.

The database is the memory. AI, if added later, is only a planning assistant.

AI should suggest, not silently change the database.

## MVP success test

The MVP succeeds if it is easier and more useful than a spreadsheet plus memory.

Specifically, it succeeds if the director can:

- plan a rehearsal faster and more clearly
- avoid overpacking the rehearsal
- send better singer homework earlier
- run the rehearsal from an iPhone without friction
- capture useful notes quickly
- review what happened later
- send a useful after-rehearsal recap
- carry the right work forward
- see what each song currently needs
- keep repertoire from going stale by accident
- start to see, even simply, what songs have been worked or reviewed recently

The most important test is:

Can the director use Execution Mode during a live rehearsal without it being annoying?

If yes, the app can work.

If no, the data will go stale and the product fails.

## Guiding principle

Every feature should pass this test:

Does this help make the next rehearsal better?

If not, defer it.
