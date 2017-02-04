/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.group || !doc.group.urlname) { return }
    emit(doc.group.urlname)
  },
  reduce: '_count'
}
