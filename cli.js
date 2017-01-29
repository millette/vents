'use strict'

// npm
const updateNotifier = require('update-notifier')

updateNotifier({ pkg: require('./package.json') }).notify()

// self
const utils = require('./lib/utils')

const bulk = (data) => data && data.length ? utils.bulk(data, { onlyBody: true, auth: true }) : false
const display = (values) => console.log(JSON.stringify(values, null, ' '))

utils.fetch()
  .then(utils.diff)
  .then(bulk)
  .then(display)
  .catch(console.error)
