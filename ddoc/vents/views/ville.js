/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.location || !doc.location.city || !doc.url) { return }
    var x = doc.url.split('/')
    var y = parseInt(x[x.length - 1], 10)
    emit([doc.location.city, y])
  },
  reduce: '_count'
}
