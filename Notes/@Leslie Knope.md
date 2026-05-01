---
tags:
  - resource/person
reportsTo: "[[@Ron Swanson]]"
team: "[[]]"
isLead: false
isManager: false
---

# [[@Leslie Knope]]

## Meetings

```dataview
table summary from #resource/meeting and [[@Leslie Knope]] and !"Templates"
```

## Reports
```dataview
list from #resource/person 
where reportsTo = [[@Leslie Knope]]
```