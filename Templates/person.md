---
tags:
  - resource/person
reportsTo: "[[]]"
team: "[[]]"
isLead: false
isManager: false
---

# [[<% tp.file.title %>]]

## Meetings

```dataview
table summary from #resource/meeting and [[<% tp.file.title %>]] and !"Templates"
```

## Reports
```dataview
list from #resource/person 
where reportsTo = [[<% tp.file.title %>]]
```