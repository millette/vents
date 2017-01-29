'use strict'

const Confidence = require('confidence')
const Config = require('./config')
const criteria = { env: process.env.NODE_ENV }

const manifest = {
  $meta: 'This file defines GlassJaw.',
  server: {
    app: { siteTitle: Config.get('/app/siteTitle') },
    debug: { log: ['error'] }
  },
  connections: [{
    labels: ['web'],
    port: Config.get('/port/web')
  }],
  registrations: [
    { plugin: 'inert' },
    { plugin: 'vision' },
    { plugin: './server/web/index' },
    { plugin: './server/main/index' }
  ]
}

const store = new Confidence.Store(manifest)
exports.get = (key) => store.get(key, criteria)
exports.meta = (key) => store.meta(key, criteria)
