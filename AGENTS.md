# AGENTS.md

Operational guide for AI agents working inside this vault. Read [README.md](README.md) first for the conceptual model — this file covers the rules.

## Vault identity

- **Type:** Obsidian PARA vault (Work).
- **Root:** the directory containing this file and `.obsidian/`.
- **Note storage:** flat. Everything goes in `Notes/`. Do not create subfolders under `Notes/` unless explicitly asked.
- **Journals:** `Journals/`, dated `YYYY-MM-DD.md` (daily) or `YYYY-Wxx.md` (weekly).
- **Templates:** `Templates/` — read-only unless the user asks you to modify them.

## Prefer the CLI

This machine has the `obsidian` CLI. Use it for vault operations — it respects link resolution, sync, templates, and the active file. Fall back to direct file I/O only when the CLI can't do what you need.

Run `obsidian help` for the full command reference, or `obsidian help <command>` for details on a specific command.

### Discovery & search
```shell
obsidian search query="<term>"              # full-text search, returns matching file paths
obsidian search:context query="<term>"      # search with surrounding line context
obsidian backlinks file=NoteName            # what links TO this note
obsidian links file=NoteName               # what this note links OUT to
obsidian unresolved                         # all broken wikilinks in the vault
obsidian orphans                            # notes with no incoming links
obsidian deadends                           # notes with no outgoing links
```

### Reading & writing
```shell
obsidian read file=NoteName                 # read note contents (resolves by wikilink name)
obsidian property:set name=archived value=true file=NoteName
obsidian property:read name=tags file=NoteName
```

### Daily notes
```shell
obsidian daily                              # open/create today's daily
obsidian daily:append content="..."
obsidian tasks daily                        # list tasks in today's daily
```

### Graph hygiene (run after edits)
```shell
obsidian unresolved                         # verify no broken links introduced
obsidian backlinks file=NoteName counts     # confirm new note is reachable
```

## Filename convention

**`YYYYMMDD-kebab-case-title.md`**, today's date. Examples:
- `20260430-q2-planning-kickoff.md`
- `20260430-okr-review-with-jane.md`

Person notes are the exception: `@FirstLast.md` (no date).
Meeting notes use the same date prefix: `YYYYMMDD-<MeetingTitle>.md`.

## Frontmatter — match the template that fits

Always include `archived: false`. Always quote internal links in YAML (`"[[Target]]"`).

### Resource (default for any captured content)
```yaml
---
title: Human-readable title
areas:
  - "[[Engineering|📍 Engineering]]"
tags:
  - resource/reference          # or videos / lectures / articles / books / podcasts
archived: false
source: https://...             # optional
author: Name                    # optional
---

# [[20260430-my-note|Human-readable title]]
```

Pick the most specific `resource/*` sub-tag. Multiple tags allowed.

### Project
```yaml
---
project: 20260430-project-x
aliases:
  - 🗂️ Project X
areas:
  - "[[Engineering|📍 Engineering]]"
tags:
  - project
archived: false
---
```

### Area
```yaml
---
archived: false
aliases:
  - 📍 Area Name
tags:
  - area
---
```
Areas should keep the `dataviewjs` block from `Templates/area.md` so they auto-populate.

### Meeting
```yaml
---
title: 📅 20260430-MeetingTitle
areas:
  - "[[Default]]"
tags:
  - resource/meeting
summary: "One-line summary for the daily-note rollup"
---
```
The `summary` field is read by `Templates/daily.md`'s dataview — fill it.

### Person
```yaml
---
tags:
  - resource/person
reportsTo: "[[@Manager]]"
team: "[[TeamName]]"
isLead: false
isManager: false
---
```

## H1 rule

The first heading is always a self-wikilink with a display alias:

```md
# [[20260430-my-note|My Note Title]]
```

Filename without `.md` on the left, human title on the right.

## Linking rules

- **Wikilinks only** (`[[Target]]`), never `[text](file.md)`.
- **Verify before linking.** If the target doesn't exist, either create it (when it makes sense — e.g. a person, an area) or note it as a candidate. Don't leave broken links litter.
- **Areas use the emoji alias:** `[[Engineering|📍 Engineering]]`.
- **Projects use the briefcase alias:** `[[20260430-project-x|🗂️ Project X]]`.
- **Tasks reference projects via inline field:** `- [ ] Do thing  [project:: [[20260430-project-x]]]`. The dashboard and project pages query this.
- Don't be afraid to link inline and use vanity aliases to make the sentence flow.
  - Ex: The methods behind [[20260508-12-factor-agents|12 Factor Agents]] are beneficial because...
  - Prefer this over link indexes at the bottom of the page. Obsidian already does this with link/backlink interfaces.

## Capture flows (when to use what)

| Intent                              | Action                                                  |
| ----------------------------------- | ------------------------------------------------------- |
| Stray thought, unfiled              | Append to `Notes/<YYYYMMDD>-Inbox.md` (set `inbox: true`) |
| Actionable todo                     | Append `- [ ] ...` under `## Inbox` of today's daily    |
| New reference / reading             | Create resource note in `Notes/`                        |
| New ongoing area of responsibility  | Create area note in `Notes/`                            |
| New goal with a deadline            | Create project note in `Notes/`                         |
| Calendar event prep / notes         | Create meeting note + link from today's daily `## Journal` |
| Someone you work with               | Create `@Name.md` person note                           |

If the user describes a note ambiguously, ask which type before creating.

## Inbox semantics

- A note is "in the inbox" when `inbox: true` AND `archived: false`. It will appear on `00 - Dashboard.md`.
- Processing the inbox = remove `inbox: true` (or set to `false`) and ensure proper tags + `areas` are filled.

## Archiving

Set `archived: true` in frontmatter. **Do not move the file.** `4. Archive.md` queries the flag.

## Files agents should NOT modify without explicit instruction

- `00 - Dashboard.md`, `1. Projects.md`, `2. Areas.md`, `3. Resources.md`, `4. Archive.md` — these are query-only views. Editing them breaks the rollups.
- `.obsidian/**` — plugin and app config. Touch only if the user is configuring the vault.
- `Templates/**` — change only on request.
- `README.md`, `AGENTS.md` — meta files; ask before editing.

## Tasks plugin syntax

Use the [obsidian-tasks-plugin](https://publish.obsidian.md/tasks/) emoji format that the dashboard queries expect:

```
- [ ] Write spec 📅 2026-05-02 ⏫
- [ ] Review PR 🔼 [project:: [[20260430-project-x]]]
```

`📅` = due date, `⏫🔼🔽` = priority. The dashboard's "Due Today / This Week / Coming Up" rely on these.

## Daily note rules

- Created from `Templates/daily.md`. Filename: `YYYY-MM-DD.md` in `Journals/`.
- Sections to preserve: `## Journal`, `### Tasks`, `### Inbox`. The QuickAdd macros and dataview queries depend on these exact headings.
- Meeting links are inserted **under `## Journal`**, not at the top.

## Things to do before you finish a vault edit

1. Frontmatter has `archived: false` and at least one `tags` entry.
2. `areas:` points to an existing area note (or `[[Default]]` if none fits).
3. H1 self-wikilink uses the actual filename.
4. No broken wikilinks introduced.
5. If you created tasks, they're either inside a project (`[project::]`) or in a daily note's `## Inbox`.

## Enrichment

When creating a note from a rich source (video, article, talk), also create atomic notes for each distinct concept and link them bidirectionally. This makes ideas findable by concept, not just by source.

### Finding related notes

Don't rely on filenames alone — search by concept:

```shell
obsidian search query="<key term>"
obsidian search query="<related concept>"
```

Read the first ~25 lines of candidate notes to confirm relevance before linking. A note about a related idea may live under an unrelated filename.

### Atomic note standards

- **One idea per note.** If you need "and" in the title, split it.
- **Self-contained.** The note should make sense without the source.
- **Tag:** `resource/reference`. No `source:` field unless the atomic note itself has a canonical URL.
- **Link to the source note** from each atomic note
- Each atomic note links to the source and to the 1–4 most conceptually related notes.

#Maintenance

- Only link to notes that exist. When in doubt, check with `obsidian search` before adding a wikilink.
- The Vault may have existing related notes, find and link them
- Use `obsidian {links,backlinks}` to surface notes 

## Quick reference

- Today's date format for filenames: `date +%Y%m%d`.
- Today's daily note: `Journals/$(date +%Y-%m-%d).md`.
- Tag taxonomy: `area`, `project`, `resource/{videos,lectures,reference,articles,books,podcasts,meeting,person}`.
- Default area when nothing fits: `[[Default]]`.
