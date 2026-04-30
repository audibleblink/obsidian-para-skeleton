---
alias: "Home"
---

# Inbox

```dataview
list from !"Templates" where inbox and archived = false
```

# Tasks

## Due Today
```tasks
due today
sort by priority
short mode
```

## Due This Week
```tasks
due this week
due after today
sort by priority
short mode
```

## Coming Up

```tasks
due next week
sort by priority
short mode
```

## No Due Date

```tasks
not done
no due date
group by filename
short mode
```

# Recent

```dataview
TABLE without id
link(file.link, title) AS Notes,
file.mtime AS Modified
FROM "Notes" or "Journals"
WHERE !archived
SORT file.mtime DESC
LIMIT 6
```

# Projects
![[1. Projects]]

# Areas
![[2. Areas]]

# Resources
![[3. Resources]]