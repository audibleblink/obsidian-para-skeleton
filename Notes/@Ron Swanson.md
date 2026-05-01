---
tags:
  - resource/person
reportsTo: "[[]]"
team: "[[]]"
isLead: false
isManager: true
---

# [[@Ron Swanson]]

## Meetings

```dataview
table summary from #resource/meeting and [[@Ron Swanson]] and !"Templates"
```

## Reports
```dataview
list from #resource/person 
where reportsTo = [[@Ron Swanson]]
```