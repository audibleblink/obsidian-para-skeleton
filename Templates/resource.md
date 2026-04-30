---
title: <% tp.user.canonicalize("{{VALUE:title}}") %>
areas: 
  - "[[Default]]"
tags: 
  - <% tp.system.suggester(item => item, Object.keys(app.metadataCache.getTags()).map(x => x.replace("#", ""))) %>
archived: false
---

# [[<% tp.file.title %>|<% tp.user.canonicalize("{{VALUE:title}}") %>]]

