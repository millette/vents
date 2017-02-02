/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.next_event) { return }
    emit(new Date(doc.next_event.time).toISOString().split('T'), { name: doc.name, event: doc.next_event.name, rsvp: doc.next_event.yes_rsvp_count })
  },
  reduce: '_count'
}
