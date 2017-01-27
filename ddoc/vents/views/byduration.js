/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.start || !doc.end || !doc.url) { return }
    var start = Date.parse(doc.start)
    var end = Date.parse(doc.end)
    var x = doc.url.split('/')
    var y = parseInt(x[x.length - 1], 10)
    emit([(end - start) / 1000, y])
  },
  reduce: '_count'
}
