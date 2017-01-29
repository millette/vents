/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.summary) { return }
    emit(doc.summary)
  },
  reduce: '_count'
}
