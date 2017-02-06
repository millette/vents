/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (doc.time && doc.name && doc.group && doc.group.name) {
      return emit(new Date(doc.time).toISOString().split('T').concat([doc.name, doc.group.name]))
    }
    if (doc.start && doc.summary) {
      return emit(doc.start.split('T').concat([doc.summary]))
    }
  },
  reduce: '_count'
}
