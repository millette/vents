'use strict'

// self
const Config = require('./config')
const ddocManager = require('./ddoc/index')

ddocManager(Config, function (err, resp) {
  if (err) { console.log('Push error:', err) }
  console.log('Pushing:', resp)
})
