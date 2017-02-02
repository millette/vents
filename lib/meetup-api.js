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
const methods = ['similar_groups', 'events']
const finds = ['groups']

const get = (method, group) => {
  const baseUrl = parseUrl('https://api.meetup.com')
  const paths = [group]
  if (method && typeof method === 'string') { paths.push(method) }
  baseUrl.pathname = paths.join('/')
  baseUrl.query = {
    page: PER_PAGE,
    key: Config.get('/meetup/key')
  }
  return got(formatUrl(baseUrl), { json: true })
}

const find = (what, options) => {
  const baseUrl = parseUrl('https://api.meetup.com')
  const paths = ['find']
  if (!options) { options = {} }
  if (!what || typeof what !== 'string') { Promise.reject(new Error('Bad what.')) }
  paths.push(what)
  baseUrl.pathname = paths.join('/')
  baseUrl.query = Object.assign(options, {
    page: PER_PAGE,
    key: Config.get('/meetup/key')
  })
  return got(formatUrl(baseUrl), { json: true })
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
    category: 34
  }
  return exports.findGroups(Object.assign(defaults, options)).then(za)
}

const waitFor = (elapsed, x) => Math.max(50, Math.round(1000 * x.headers['x-ratelimit-reset'] / x.headers['x-ratelimit-remaining']) - elapsed)

const linkNext = (x) => {
}

const recursor = (methods) => new Promise((resolve, reject) => {
  let all = []
  const rec = (page) => {
    const now = Date.now()
    return methods.query(page)
      .then((x) => {
        all = all.concat(x.body)
        if (methods.isDone(x, page)) { return resolve({ headers: x.headers, body: all }) }
        setTimeout((p) => rec(p), waitFor(Date.now() - now, x), methods.makeNext(x, page))
      })
  }
  return rec(methods.makeFirst())
})

methods.forEach((method) => { exports[_.camelCase(method)] = get.bind(this, method) })
finds.forEach((what) => { exports[_.camelCase('find-' + what)] = (options) => find(what, options) })

exports.getGroup = get.bind(this, null)

exports.findQcGroups = () => recursor({
  query: findQcGroupsPage,
  isDone: (x) => !x.body.length,
  makeNext: (x, page) => page + 1,
  makeFirst: () => 0
})

/*
exports.allEvents = (group) => recursor({
  query: exports.events.bind(this, group),
  isDone: (x, page) => {
    console.log(x.headers)
    return page >= 2
  },
  makeNext: (x, page) => page + 1,
  makeFirst: () => 0
})
*/
