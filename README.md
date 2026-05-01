# PARA Vault Skeleton

A minimal, opinionated [Obsidian](https://obsidian.md) starter vault that wires up Tiago Forte's [PARA method](https://fortelabs.com/blog/para/) (**P**rojects, **A**reas, **R**esources, **A**rchive) using a small stack of community plugins. Capture is driven by **QuickAdd**, organization by tags, and every index page is a live Dataview query — no manual filing required.

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
└── Templates/            # Templater-powered scaffolds for every note type
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

## How to use it

> ⚠️ **Don't use Obsidian's built-in "New note" command.** It bypasses the templates and frontmatter the dashboard relies on. Always create notes through QuickAdd.

### The one shortcut you need: `Ctrl + C`

`Ctrl + C` opens the **QuickAdd** chooser. Every note type is one keystroke away:

| Choice                  | What it does                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| 🗓️ **Quick Note (Inbox)** | Prepends `HH:MM - <text>` into today's inbox file (auto-tagged `inbox: true`, surfaces on the dashboard). |
| ✅ **Quick Task (Inbox)** | Appends a task under `## Inbox` of today's daily note.                                        |
| 📝 **New Resource**      | Creates a resource note from `Templates/resource.md`, filename `YYYYMMDD-<title>`.            |
| 📍 **New Area**          | Creates an area note and drops a backlink at the cursor.                                      |
| 🗂️ **New Project**       | Creates a project note from `Templates/project.md`.                                           |
| 📅 **Meeting**           | Inserts a meeting link under `## Journal` of today's daily and creates the meeting note.      |
| 🤖 **Person**            | Creates `@Name` from `Templates/person.md`.                                                   |

If you forget which one to pick, just hit `Ctrl + C` and read the menu.

### Day-to-day flow

1. **Pin `00 - Dashboard.md`** — this is home. Inbox, tasks, recents, projects, areas, and resources all live here.
2. **Seed a few Areas first.** `Ctrl + C → 📍 New Area` for each broad domain you care about (e.g. `Engineering`, `Hiring`, `Personal`). Areas are the gravitational centers — everything else links to one.
3. **Capture freely with `Ctrl + C`:**
   - Random thought → **🗓️ Quick Note**
   - Todo → **✅ Quick Task**
   - Reading / reference → **📝 New Resource**, set `areas: [[YourArea]]`, pick a `resource/*` tag.
   - Goal with a deadline → **🗂️ New Project**
   - Calendar event → **📅 Meeting** (run from inside the daily note).
4. **Process the inbox.** Open inbox notes from the dashboard; convert each into a resource/project, or set `archived: true`.
5. **Review weekly** (see below).

### Auto-grouped Area pages

Each Area page runs a `dataviewjs` block that pulls every resource linking back to it and buckets them by their `resource/<kind>` sub-tag (Videos, Reference, Books, …). An Area is a self-updating MOC — you never edit it manually.

### Projects, tasks, and people

- Inline-tag tasks with their project: `- [ ] Ship spec [project:: [[20260430-project-x]]]`. The project page rolls them up automatically.
- Person notes (`@FirstLast.md`) auto-list every meeting they appear in and any direct reports (`reportsTo: [[@Manager]]`).

### Weekly review (Calendar ↔ weekly template)

The Calendar plugin's sidebar shows a `W##` column next to each week. Click a week number — it creates `Journals/YYYY-Www.md` from `Templates/weekly.md`, which:

1. Resolves Mon→Sun dates from the ISO week.
2. Embeds the `## Journal` section of all 7 daily notes.
3. Appends every task completed that week.

Result: a fully-rendered weekly digest of meetings, journal entries, and done tasks — zero manual aggregation. This is why daily notes must keep the `## Journal` heading exactly.

### Archiving

Set `archived: true` in frontmatter. **Do not move the file.** It vanishes from every view except `4. Archive.md`.

## Why it's cool

- **Tag-driven, not folder-driven.** Every note lives in `Notes/`. Reorganization = retagging, never moving files (and never breaking links).
- **Self-maintaining indexes.** `1.`–`4.` and every Area page are queries — they update the moment you save a note. No bullet-list MOCs to babysit.
- **One inbox, three exits.** Quick notes, quick tasks, and meeting links all funnel into the daily note or a date-stamped inbox file, which the dashboard surfaces until you act on them.
- **Smart Area pages.** Inbound resources auto-group by sub-type — an Area becomes a categorized reading list with zero manual upkeep.
- **Project ↔ task ↔ resource triangulation.** Tasks know their project, projects show their tasks and linked resources, resources link up to areas — closing the PARA loop without copy-paste.
- **Archive is a flag, not a folder.** Reversible, queryable, undestructive.
- **Zero lock-in.** Plain Markdown + YAML. Strip the plugins and you still have a perfectly readable vault.

## Requirements

Obsidian ≥ 1.5 with these community plugins (all pre-configured): Templater, Dataview, QuickAdd, Tasks, Buttons, Calendar.
