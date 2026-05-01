// Make Link from the first alias
//
// file: the file object
module.exports = (file, fm) => {
  return `[[${file.title}|${fm.aliases[0]}]]`;
};
