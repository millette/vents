'use strict'

// core
const parseUrl = require('url').parse
const formatUrl = require('url').format

// npm
const got = require('got')
const _ = require('lodash')

// self
const Config = require('../config')

const PER_PAGE = 200
const TECH_CATEGORY = 34
const methods = ['similar_groups', 'events']
const finds = ['groups']

const get = (method, options) => {
  const baseUrl = parseUrl('https://api.meetup.com')
  if (typeof options === 'string') { options = { group: options } }

  if (!options) { options = {} }
  if (!options.group) { return Promise.reject(new Error('Bad options')) }
  const paths = [options.group]
  delete options.group
  if (method && typeof method === 'string') { paths.push(method) }
  baseUrl.pathname = paths.join('/')
  baseUrl.query = Object.assign(options, {
    key: Config.get('/meetup/key'),
    page: PER_PAGE
  })
  const u = formatUrl(baseUrl)
  // console.log('get:', u)
  return got(u, { json: true })
}

const find = (what, options) => {
  const baseUrl = parseUrl('https://api.meetup.com')
  const paths = ['find']
  if (!options) { options = {} }
  if (!what || typeof what !== 'string') { return Promise.reject(new Error('Bad what.')) }
  paths.push(what)
  baseUrl.pathname = paths.join('/')
  baseUrl.query = Object.assign(options, {
    key: Config.get('/meetup/key'),
    page: PER_PAGE
  })
  const u = formatUrl(baseUrl)
  return got(u, { json: true })
}

const findQcGroupsPage = (options) => {
  const za = (x) => {
    return {
      headers: x.headers,
      body: x.body.filter((event) => event.country === 'CA' && event.state === 'QC')
    }
  }
  if (typeof options === 'number') { options = { offset: options } }
  if (!options) { options = {} }
  const defaults = {
    // upcoming_events: true,
    order: 'distance',
    radius: 'global',
    lat: 48.378383, // saguenay
    lon: -71.2736192, // saguenay
    category: TECH_CATEGORY
  }
  return exports.findGroups(Object.assign(defaults, options)).then(za)
}

const waitFor = (elapsed, x) => {
  if (x && x.headers && x.headers['x-ratelimit-reset']) {
    return Math.max(150, Math.round(1000 * x.headers['x-ratelimit-reset'] / x.headers['x-ratelimit-remaining']) - elapsed)
  }
  // console.log('no headers...')
  return 500
}

const parseLink = (link) => {
  const rek = /rel=['"](\w+)['"]/
  const rev = /<(http.+)>/
  const parts = link.split(',')
  let ret = false
  if (!parts.length) { return ret }
  parts.forEach((p) => {
    const p2 = p.split(';')
    if (p2.length !== 2) { return }
    const k = p2[1].match(rek)
    if (!k || !k[1]) { return }
    const v = p2[0].match(rev)
    if (!v || !v[1]) { return }
    let val = v[1]
    if (!ret) { ret = {} }
    ret[k[1]] = val
  })
  return ret
}

const linkNext = (x) => {
  const n = parseLink(x.headers.link)
  return n && n.next
}

const getNext = (x, field) => {
  const nl = linkNext(x)
  if (!nl) { return false }
  const u = parseUrl(nl, true)
  if (!u || !u.query || !u.query[field]) { return false }
  const v = u.query[field]
  return isFinite(v) ? parseInt(v, 10) : v
}

/**
 * Methods keys (values are functions)
 * query(page)
 * next(x, page)
 * first()
 */
exports.recursor = (methods) => new Promise((resolve, reject) => {
  let all = []
  const rec = (page) => {
    const now = Date.now()
    methods.query(page)
      .then((x) => {
        all = all.concat(x.body)
        const next = methods.next(x, page)
        if (next === false) { return resolve({ headers: x.headers, body: all }) }
        setTimeout((p) => rec(p), waitFor(Date.now() - now, x), next)
      })
      .catch((e) => reject(e))
  }
  const first = methods.first()
  if (first === false) { return resolve({ body: [] }) }
  return rec(first)
})

finds.forEach((what) => { exports[_.camelCase('find-' + what)] = (options) => find(what, options) })
methods.forEach((method) => { exports[_.camelCase(method)] = get.bind(this, method) })

exports.findQcGroups = () => exports.recursor({
  query: findQcGroupsPage,
  next: (x) => x.body.length ? getNext(x, 'offset') : false,
  first: () => 0
})

exports.getGroup = get.bind(this, null)

// exports.pastEventsPage = (options) => {
const pastEventsPage = (options) => {
  if (typeof options === 'string') { options = { group: options } }
  if (!options) { options = {} }
  options.status = 'past'
  return exports.events(options)
    .then((x) => {
      // console.log(x.body[0])
      x.body = x.body.filter((y) => y.status === 'past')
      return x
    })
}

const isPast = (l) => Date.parse(l.slice(6)) < Date.now()

exports.pastEvents = (group) => exports.recursor({
  query: pastEventsPage,
  next: (x, page) => {
    console.log('len:', group, x.body.length)
    if (x.body.length !== 200) { return false }
    const scroll = getNext(x, 'scroll')
    console.log('scroll', group, scroll)
    if (scroll === false) { return false }
    return isPast(scroll) ? { group, scroll } : false
  },
  first: () => group
})
