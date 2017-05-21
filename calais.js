'use strict'

const DRY_RUN = false

// self
const utils = require('./lib/utils')

// npm
const Throttle = require('promise-parallel-throttle')
const delay = require('delay')

let bulk

const filterDocs = (x) => x.filter((doc) => !doc.calais)

const woot = (doc) => {
  return delay(1000)
    .then(() => utils.calais(doc.description))
    .then((calais) => {
      doc.calais = calais.body
      return doc
    })
    .catch((e) => {
      console.log('oups', doc._id, e)
      return doc
    })
}

const fixDocs = (x) => Throttle.all(
  x.map((doc) => woot.bind(null, doc)),
  {
    maxInProgress: 1,
    failFast: false,
    progressCallback: (ack) => console.log('...', Date(), ack.amountStarted, ack.amountRejected)
  }
)

if (DRY_RUN) {
  bulk = (data) => `Dry run. Found ${data.length} events without calais in db.`
} else {
  bulk = (data) => utils.bulk(data, { onlyBody: true, auth: true })
}

utils.getIds({ onlyDocs: true, query: { include_docs: true, reduce: false } })
  .then(filterDocs)
  .then(fixDocs)
  .then(bulk)
  .then(console.log)
  .catch(console.error)
