---
archived: false
aliases:
  - 📍 Admin
tags:
  - area
---

# [[Admin]]

```dataviewjs
const files = dv.pages('[[Admin]] and #resource').array()
  .filter(x => x.name != "Admin" && !x.archived)
  .reduce((memo, current) => {
	  let tags = current.tags
	    .filter(x => x.startsWith("resource/"))
	    .map(x => x.split("/")[1])
		
	  if (tags.length) {
		let l = tags.pop()
		tags = l.charAt(0).toUpperCase() + l.slice(1)
	  }
	  let aLink = dv.fileLink(current.file.name, 0, current.file.frontmatter.title)
	  memo[tags] = memo.tags ? memo.tags.concat([aLink]) : [aLink]
	  return memo
}, {})

for (const [key, value] of Object.entries(files)) {
	dv.table([key], [value])
}
```