// A small formatting wrapper for moment.js
//
// dateString - the date
// offset = days +/- from tp.
// fmt = format string 

class ObsDate {
   constructor(dateString, offset, fmt) {
      if (!fmt) { fmt = "YYYY-MM-DD" }
      this.m = moment(dateString).add(offset, 'd')
      this.fmt = this.m.format(fmt)
   }
}


module.exports = (tp, offset, format) => new ObsDate(tp, offset, format)