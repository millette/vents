'use strict'

// npm
const updateNotifier = require('update-notifier')

updateNotifier({ pkg: require('./package.json') }).notify()

// self
const bla = require('.')
const utils = require('./lib/utils')

const bulk = (data) => data && data.length ? utils.bulk(data, { auth: true }) : { body: false }
const display = (values) => console.log(JSON.stringify(values.body, null, ' '))

bla()
  .then(utils.diff)
  .then(bulk)
  .then(display)
  .catch(console.error)
