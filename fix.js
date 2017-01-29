'use strict'

const DRY_RUN = true

// self
const utils = require('./lib/utils')

let bulk
let fixDocs

if (DRY_RUN) {
  bulk = (data) => `Dry run. Found ${data.length} events in db.`
  fixDocs = (x) => x
} else {
  bulk = (data) => utils.bulk(data, { onlyBody: true, auth: true })
  fixDocs = (x) => x.map((doc) => {
    doc.html = utils.makeHtml(doc.description)
    doc.location = utils.makeLocation(doc.location.source)
    return doc
  })
}

utils.getIds({ onlyDocs: true, query: { include_docs: true, reduce: false } })
  .then(fixDocs)
  .then(bulk)
  .then((x) => {
    console.log(x)
  })
  .catch(console.error)
