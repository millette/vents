'use strict'

// npm
const marked = require('marked')
const got = require('got')
const he = require('he')
const ical = require('ical')

he.decode.options.isAttributeValue = true
he.decode.options.strict = true

const fix = (str) => he.decode(str).trim()

const sorter = (a, b) => {
  if (a.start > b.start) { return 1 }
  if (a.start < b.start) { return -1 }
  return 0
}

const makeLocation = (source) => {
  const parts = source.split(', ')
  if (parts.length < 2) { return { source } }
  return {
    source: source,
    given: parts.slice(0, -1).join(', ').trim(),
    city: parts[parts.length - 1]
  }
}

module.exports = () => got('http://agendadulibre.qc.ca/events.ics')
  .then((x) => {
    const z = ical.parseICS(x.body.replace(/\r/g, '\\n').replace(/&amp;/g, '&').replace(/&gt;/g, '>'))
    const values = []
    let description
    for (let r in z) {
      if (z[r].type !== 'VEVENT') { continue }
      description = fix(z[r].description)
      values.push({
        start: new Date(z[r].start).toISOString(),
        end: new Date(z[r].end).toISOString(),
        _id: 'alq:' + (1e7 + parseInt(z[r].uid, 10)).toString().slice(1),
        summary: fix(z[r].summary),
        url: z[r].url.trim(),
        description: description,
        html: marked(he.escape(description)),
        location: makeLocation(z[r].location)
      })
    }
    return values.sort(sorter)
  })
