/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.url) { return }
    var x = doc.url.split('/')
    emit(parseInt(x[x.length - 1], 10))
  },
  reduce: '_count'
}
