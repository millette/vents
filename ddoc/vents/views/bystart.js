/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.start || !doc.url) { return }

    var x = doc.url.split('/')
    var y = parseInt(x[x.length - 1], 10)
    emit([doc.start, y])
  },
  reduce: '_count'
}
