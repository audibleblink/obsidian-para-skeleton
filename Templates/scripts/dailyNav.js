// Make Nav Links for Daily Notes (YYYY-MM-DD.md)
// ❮❮ |2021 › Aug › W32 | ❯❯
//
// title: name of the note in YYYY-MM-DD format
// folder: where daily notes are stored
module.exports = (title, folder) => {
   let date = moment(title)
   let yesterday = date.clone().add(-1, 'd').format("YYYY-MM-DD")
   let tomorrow = date.clone().add(1, 'd').format("YYYY-MM-DD")

   return `[[${folder}/${yesterday}|❮❮]] | ` +
      `[[${folder}/${date.year()}|${date.year()}]] › ` +
      `[[${folder}/${date.format("YYYY-MM")}|${date.format("MMM")}]] › ` +
      `[[${folder}/${date.format("YYYY-[W]ww")}|${date.format("[W]ww")}]] | ` +
      `[[${folder}/${tomorrow}|❯❯]]`
}