'use strict'

const DRY_RUN = true

// self
const utils = require('./lib/utils')

let fixDocs
let bulk

if (DRY_RUN) {
  fixDocs = (x) => {
    const missingCities = x.filter((doc) => !doc.location.city).length
    if (missingCities) {
      console.log(`${missingCities} missing cities.
You should probably run it with DRY_RUN = false`)
    }
    return x
  }
  bulk = (data) => `Dry run. Found ${data.length} events in db.`
} else {
  fixDocs = (x) => x.map((doc) => {
    doc.html = utils.makeHtml(doc.description)
    doc.location = utils.makeLocation(doc.location.source)
    return doc
  })
  bulk = (data) => utils.bulk(data, { onlyBody: true, auth: true })
}

utils.getIds({ onlyDocs: true, query: { include_docs: true, reduce: false } })
  .then(fixDocs)
  .then(bulk)
  .then(console.log)
  .catch(console.error)
