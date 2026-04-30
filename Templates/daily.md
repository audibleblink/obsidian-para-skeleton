# <% tp.user.date(tp.file.title, 0, "dddd, MMMM Do YYYY").fmt %>

<% tp.user.dailyNav(tp.file.title, "Journals") %>

```button
name New Meeting
type note(, split) template
action meeting
color blue
folder Notes
prompt true
```
^button-70fj

### Journal


```dataview
table WITHOUT ID file.frontmatter.title as "Meetings", file.frontmatter.summary as "Summary" from #resource/meeting  
where startswith(file.name, "<% tp.user.date(tp.file.title, 0, "yyyyMMDD").fmt %>")
```



---

### Tasks

```dataview
task from "Journals" where !completed
```

### Inbox

![[<% tp.user.date(tp.file.title, 0, "yyyyMMDD").fmt %>-Inbox]]