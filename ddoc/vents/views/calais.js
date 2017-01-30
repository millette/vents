/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    var r
    if (!doc.calais) { return }

    if (doc.calais.doc && doc.calais.doc.meta && doc.calais.doc.meta.language) {
      emit(['language', 'meta', doc.calais.doc.meta.language])
    }

    for (r in doc.calais) {
      if (doc.calais[r].language) {
        emit(['language', r, doc.calais[r].language, doc.calais[r].relevance])
      }

      if (doc.calais[r].name) {
        emit(['name', doc.calais[r]._type || r, doc.calais[r].name, doc.calais[r].relevance])
      }
    }
  },
  reduce: '_count'
}
