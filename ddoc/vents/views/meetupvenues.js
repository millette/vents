/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.venue || !doc.venue.name || !doc.venue.id) { return }
    emit([doc.venue.name, doc.venue.id])
  },
  reduce: '_count'
}
