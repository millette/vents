/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.url) { return }
    var x = doc.url.split('/')
    if (x[2] !== 'agendadulibre.qc.ca') { return }
    emit(parseInt(x[x.length - 1], 10))
  },
  reduce: '_count'
}
