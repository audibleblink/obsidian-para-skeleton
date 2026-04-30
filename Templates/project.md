---
project: <% tp.file.title %>
aliases:
  - 🗂️ <% tp.file.title %>
areas: 
  - "[[Default|📍 Default]]"
tags:
  - project
archived: false
---

# [[<% tp.file.title %>]]


# Tasks
```dataview
task where project = [[<% tp.file.title %>]]
```

# Resources
```dataview
table from [[<%tp.file.title%>]]
where file.name != "<%tp.file.title%>"
```

