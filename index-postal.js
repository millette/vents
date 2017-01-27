'use strict'

// npm
const marked = require('marked')
const got = require('got')
const he = require('he')
const ical = require('ical')
// const postal = require('node-postal')
// const _ = require('lodash')

he.decode.options.isAttributeValue = true
he.decode.options.strict = true

const fix = (str) => he.decode(str).trim()

const sorter = (a, b) => {
  if (a.start > b.start) { return 1 }
  if (a.start < b.start) { return -1 }
  return 0
}

const makeLocation = (source) => {
  source = source.trim()
  const parts = source.split(', ')
  return {
    source: source,
    given: parts.slice(0, -1).join(', ').trim(),
    city: parts[parts.length - 1]
  }
}

/*
const preLoc = (location) => {
  let yo = _.deburr(location.toLowerCase())
  const parts = yo.split(', ')
  const p0 = parts.slice(0, -1).join(', ')
  if (p0.indexOf(parts[parts.length - 1]) !== -1) {
    yo = _.deburr(p0.toLowerCase())
  }

  const ret = yo
    .replace(/\betage\b/, ' ')
    .replace(/coin pie *ix/, ' ')
    .replace(/universite laval/, ' ')
    .replace(/ville de\b/, ' ')
    .replace(/angle peel/, ' ')

  return ret
}

const makeLocation = (source) => {
  const ret = { source }
  postal.parser.parse_address(preLoc(source)).forEach((loc) => {
    if (ret[loc.component]) {
      if (typeof ret[loc.component] === 'string') {
        if (ret[loc.component] !== loc.value) {
          ret[loc.component] = [ret[loc.component], loc.value]
        }
      } else {
        ret[loc.component].push(loc.value)
      }
    } else {
      ret[loc.component] = loc.value
    }
  })

  const parts = source.split(', ')
  ret.given_city = parts[parts.length - 1]

  switch (ret.city) {
    case ', montreal':
    case 'montreal':
      ret.city = 'Montréal'
      break;

    case 'quebec':
      ret.city = 'Québec'
      break;

    case 'la pocatiere':
      ret.city = 'La Pocatière'
      break;

    case 'laval':
    case 'saguenay':
    case 'sherbrooke':
      ret.city = ret.city[0].toUpperCase() + ret.city.slice(1)
      break;
  }
  return ret
}
*/

module.exports = () => got('http://agendadulibre.qc.ca/events.ics')
  .then((x) => {
    const z = ical.parseICS(x.body.replace(/\r/g, '\\n').replace(/&amp;/g, '&').replace(/&gt;/g, '>'))
    const values = []
    let description
    let location
    for (let r in z) {
      if (z[r].type !== 'VEVENT') { continue }
      description = fix(z[r].description)
      location = makeLocation(fix(z[r].location))
      values.push({
        start: new Date(z[r].start).toISOString(),
        end: new Date(z[r].end).toISOString(),
        _id: 'alq:' + (1e7 + parseInt(z[r].uid, 10)).toString().slice(1),
        summary: fix(z[r].summary),
        url: z[r].url.trim(),
        description: description,
        html: marked(he.escape(description)),
        location: location
      })
    }
    return values.sort(sorter)
  })
