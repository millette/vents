/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.time) { return }
    emit([doc.time, doc.group.name, doc.name])
  },
  reduce: '_count'
}
