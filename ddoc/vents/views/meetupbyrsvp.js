/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.next_event) { return }
    emit(doc.next_event.yes_rsvp_count, { name: doc.name, event: doc.next_event.name, date: new Date(doc.next_event.time).toISOString() })
  }
}
