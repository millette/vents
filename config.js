'use strict'

require('dotenv-safe').load()

const Confidence = require('confidence')
const criteria = { env: process.env.NODE_ENV }

const defFalse = {
  $filter: 'env',
  production: true,
  $default: false
}

const config = {
  $meta: 'This file configures GlassJaw.',
  projectName: 'glassjaw-v2',
  app: { siteTitle: process.env.SITETITLE },
  calais: { key: process.env.CALAIS },
  meetup: { key: process.env.MEETUPCOM },
  db: {
    url: process.env.DBURL,
    name: process.env.DBNAME,
    admin: process.env.DBADMIN,
    password: process.env.DBPASSWORD
  },
  cookie: {
    password: 'password-should-be-32-characters',
    secure: defFalse
  },
  teaser: { length: 1000 },
  cache: { web: defFalse },
  port: {
    web: {
      $filter: 'env',
      test: 9090,
      $default: 8300
    }
  }
}

const store = new Confidence.Store(config)
exports.get = (key) => store.get(key, criteria)
exports.meta = (key) => store.meta(key, criteria)
