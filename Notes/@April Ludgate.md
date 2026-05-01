---
tags:
  - resource/person
reportsTo: "[[@Ron Swanson]]"
team: "[[]]"
isLead: false
isManager: false
---

# [[@April Ludgate]]

## Meetings

```dataview
table summary from #resource/meeting and [[@April Ludgate]] and !"Templates"
```

## Reports
```dataview
list from #resource/person 
where reportsTo = [[@April Ludgate]]
```