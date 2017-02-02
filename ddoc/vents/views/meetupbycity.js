/* globals emit */

'use strict'

module.exports = {
  map: function (doc) {
    if (!doc.city || !doc.name) { return }
    if (!doc.next_event) { return emit([doc.city], { name: doc.name }) }
    emit([doc.city, 'event'], {
      name: doc.name,
      event: doc.next_event.name,
      rsvp: doc.next_event.yes_rsvp_count,
      date: new Date(doc.next_event.time).toISOString()
    })
  },
  reduce: '_count'
}
