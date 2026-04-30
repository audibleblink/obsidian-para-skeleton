# PARA Vault Skeleton

A minimal, opinionated [Obsidian](https://obsidian.md) starter vault that wires up Tiago Forte's [PARA method](https://fortelabs.com/blog/para/) (**P**rojects, **A**reas, **R**esources, **A**rchive) using a small stack of community plugins. Everything is driven by `dataview` queries, `templater` templates, and `quickadd` capture flows — no manual filing required.

## What's in the box

```
.
├── 00 - Dashboard.md     # Home view: inbox, tasks, recents, P/A/R rollups
├── 1. Projects.md        # Live table of active projects
├── 2. Areas.md           # Live table of areas + note counts
├── 3. Resources.md       # Resources grouped by area
├── 4. Archive.md         # Everything where archived = true
├── Notes/                # Flat folder — all resources, projects, areas, people, meetings
├── Journals/             # Daily + weekly notes
└── Templates/            # Templater-powered scaffolds
    ├── area.md           # 📍 Area index page (auto-groups its resources)
    ├── project.md        # 🗂️ Project page with task & resource rollups
    ├── resource.md       # 📝 Generic resource note
    ├── meeting.md        # 📅 Meeting note (attendees / notes / actions)
    ├── person.md         # 🤖 Person note with meeting + reports rollups
    ├── daily.md          # Daily journal (nav, meetings, tasks, inbox)
    ├── weekly.md         # Weekly journal — embeds 7 daily Journal sections
    ├── quicknote.md      # Inbox-flagged blank note
    ├── tags.md           # Tag suggester snippet
    └── template footer.md
```

## How it works

### The classification model
Notes are **flat in `Notes/`** and classified by tag + frontmatter, not folders:

| Type     | Tag                  | Marker                               |
| -------- | -------------------- | ------------------------------------ |
| Project  | `#project`           | `project:` field, `archived: false`  |
| Area     | `#area`              | alias `📍 <name>`                    |
| Resource | `#resource/<kind>`   | `areas: [[Area]]` link               |
| Meeting  | `#resource/meeting`  | `summary:` field                     |
| Person   | `#resource/person`   | `reportsTo`, `team`, `isManager`     |
| Inbox    | `inbox: true`        | unfiled quick-capture                |
| Archive  | `archived: true`     | hidden everywhere except `4. Archive`|

The four numbered top-level files are **pure dataview views** over those tags/fields. You never edit them — they reflect the vault.

### The capture flow (QuickAdd)
`quickadd/data.json` defines seven choices that produce every note type without thinking about paths:

- **🗓️ Quick Note (Inbox)** — prepends `HH:MM - <text>` into a daily `Notes/<date>-Inbox` file (auto-created with `inbox: true`, so it shows in Dashboard inbox).
- **✅ Quick Task (Inbox)** — appends a task under `## Inbox` of today's daily note.
- **📝 New Resource** — runs `Templates/resource.md`, filename `YYYYMMDD-<title>`.
- **📍 New Area** — runs `Templates/area.md`, drops a backlink at the cursor.
- **🗂️ New Project** — runs `Templates/project.md`.
- **📅 Meeting** *(macro)* — two-step: (1) inserts a meeting link under `## Journal` of today's daily, (2) creates the meeting note from `Templates/meeting.md`.
- **🤖 Person** — creates `@Name` from `Templates/person.md`.

Buttons in `1. Projects.md` and the daily template invoke the same templater flows.

### The query layer (Dataview)
- **`00 - Dashboard.md`** — inbox = `inbox AND !archived`; tasks split into Today / This Week / Coming Up / No Due Date via `obsidian-tasks-plugin`; recent notes table; embeds of `1. Projects`, `2. Areas`, `3. Resources`.
- **`area.md`** template runs a `dataviewjs` block that pulls every `#resource` page linking back to it, buckets them by their `resource/<kind>` sub-tag (Videos, Reference, Books…), and renders one table per kind. So an Area note becomes a self-updating MOC.
- **`project.md`** rolls up `task where project = [[this]]` and any note linking to the project.
- **`person.md`** lists meetings tagged with the person and direct reports (`reportsTo = [[this]]`).
- **`daily.md`** lists today's meetings (tag + filename prefix), open tasks across `Journals/`, and embeds the day's inbox file.
- **`weekly.md`** embeds the `#Journal` section of all 7 days of the ISO week.

### The wiring (config)
- `app.json` — attachments → `Notes/data`, vim mode on, links auto-update.
- `daily-notes.json` — `Journals/` + `Templates/daily`.
- Community plugins enabled: `templater-obsidian`, `obsidian-tasks-plugin`, `quickadd`, `dataview`, `calendar`, `buttons`, `notebook-navigator`, `obsidian-vimrc-support`, `obsidian-minimal-settings`, `global-proxy`.

## How to use it

1. Open the vault in Obsidian and trust the community plugins listed above.
2. Open **`00 - Dashboard.md`** — pin it. This is your home.
3. Seed a few **Areas** (`QuickAdd → 📍 New Area`) for the broad domains you care about (e.g. `Engineering`, `Hiring`, `Personal`). Areas are the gravitational centers — everything else links to one.
4. Capture freely:
   - Random thought → **🗓️ Quick Note** (lands in inbox, surfaces on dashboard).
   - Todo → **✅ Quick Task**.
   - Reading / reference → **📝 New Resource**, set `areas: [[YourArea]]`, pick a `resource/*` tag.
   - Goal with a deadline → **🗂️ New Project**.
   - Calendar event → **📅 Meeting** from inside the daily note.
5. Process the inbox: open inbox notes, convert them into resources/projects, or set `archived: true`.
6. Review weekly — see below.

### Weekly review (Calendar ↔ weekly template)

The Calendar plugin's sidebar shows a `W##` column next to each week. Clicking a week number creates a note in `Journals/` from `Templates/weekly.md` (configured in `.obsidian/plugins/calendar/data.json`: `weeklyNoteTemplate`, `weeklyNoteFolder`, `showWeeklyNote: true`).

The template's filename is expected to end in the ISO week number (`tp.file.title.slice(6,8)`), e.g. `2026-W18`. On creation, Templater:

1. Resolves the week number from the filename.
2. Computes Mon→Sun dates with `moment().day(...).week(ww)`.
3. Emits seven `![[YYYY-MM-DD#Journal]]` embeds — one per day — pulling the `## Journal` section straight from each daily note.
4. Appends a Tasks block (`done this week`) listing everything completed in that ISO week.

Result: clicking a week number in the Calendar sidebar produces a fully-rendered weekly digest of every meeting link, journal entry, and completed task — no manual aggregation. This is why daily notes must keep the `## Journal` heading exactly: the weekly rollup embeds it by name.

## Why it's cool

- **Tag-driven, not folder-driven.** Every note lives in `Notes/`. Reorganization = retagging, never moving files (and never breaking links).
- **Self-maintaining indexes.** `1.`–`4.` and every Area page are queries — they update the moment you save a note. No bullet-list MOCs to babysit.
- **One inbox, three exits.** Quick notes, quick tasks, and meeting links all funnel into the daily note or a date-stamped inbox file, which the dashboard surfaces until you act on them.
- **Smart Area pages.** The `dataviewjs` in `area.md` automatically groups inbound resources by sub-type — an Area becomes a categorized reading list with zero manual upkeep.
- **Project ↔ task ↔ resource triangulation.** Tasks know their project (`project::` inline field), projects show their tasks and linked resources, resources link up to areas — closing the PARA loop without copy-paste.
- **Archive is a flag, not a folder.** Flip `archived: true` and a note vanishes from every view but `4. Archive`. Reversible, queryable, undestructive.
- **Zero lock-in.** Plain Markdown + YAML. Strip the plugins and you still have a perfectly readable vault.

## Requirements

Obsidian ≥ 1.5 with: Templater, Dataview, QuickAdd, Tasks, Buttons, Calendar.
