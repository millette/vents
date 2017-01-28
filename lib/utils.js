'use strict'

// core
const parseUrl = require('url').parse
const formatUrl = require('url').format

// npm
const marked = require('marked')
const he = require('he')
const ical = require('ical')
const _ = require('lodash')
const got = require('got')

// self
const Config = require('./../config')

he.decode.options.isAttributeValue = true
he.decode.options.strict = true

const idField = (z) => z.id || z._id

const decode = (str) => he.decode(str).trim()

const sorter = (a, b) => {
  if (a.start > b.start) { return 1 }
  if (a.start < b.start) { return -1 }
  return 0
}

const makeLocation = (source) => {
  source = source.trim()
  const parts = source.split(', ')
  if (parts.length < 2) { return { source } }
  return {
    source: source,
    given: parts.slice(0, -1).join(', ').trim(),
    city: parts[parts.length - 1]
  }
}

exports.makeId = (uid) => 'alq:' + (1e7 + parseInt(uid, 10)).toString().slice(1)

exports.getView = (ddoc, view, options) => {
  const gotOptions = { json: true }
  const dbUrl = parseUrl(Config.get('/db/url'))
  if (options && typeof options === 'object') {
    if (options.auth) {
      if (options.auth === true) { gotOptions.auth = [Config.get('/db/admin'), Config.get('/db/password')].join(':') }
      if (typeof options.auth === 'string') { gotOptions.auth = options.auth }
      delete options.auth
    }
    Object.assign(dbUrl, options)
  }
  dbUrl.pathname = [Config.get('/db/name'), '_design', ddoc, '_view', view].join('/')
  return got(formatUrl(dbUrl), gotOptions)
}

exports.getIds = () => exports.getView('vents', 'ids', { query: { reduce: false } })

exports.diff = (d) => exports.getIds().then((x) => _.differenceBy(d, x.body.rows, idField))

exports.fetch = () => got('http://agendadulibre.qc.ca/events.ics')
  .then((x) => {
    const values = []
    const z = ical.parseICS(x.body.replace(/\r/g, '\\n').replace(/&amp;/g, '&').replace(/&gt;/g, '>'))
    let description
    for (let r in z) {
      if (z[r].type !== 'VEVENT') { continue }
      description = decode(z[r].description)
      values.push({
        start: new Date(z[r].start).toISOString(),
        end: new Date(z[r].end).toISOString(),
        _id: exports.makeId(z[r].uid),
        summary: decode(z[r].summary),
        url: z[r].url.trim(),
        description: description,
        html: marked(he.escape(description)),
        location: makeLocation(z[r].location)
      })
    }
    return values.sort(sorter)
  })
