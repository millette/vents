'use strict'

console.log('We ran this already, but thanks.')

/*
// npm
const updateNotifier = require('update-notifier')

updateNotifier({ pkg: require('./package.json') }).notify()

// self
const utils = require('./lib/utils')

const bulk = (data) => utils.bulk(data, { onlyBody: true, auth: true })

const fixDoc = (doc) => {
  doc.html = utils.makeHtml(doc.description)
  doc.location = utils.makeLocation(doc.location.source)
  return doc
}

// limit: 3, startkey: 1533,
utils.getIds({ onlyDocs: true, query: { include_docs: true, reduce: false } })
  .then((x) => x.map(fixDoc))
  .then(bulk)
  .then((x) => {
    console.log(x)
  })
  .catch(console.error)
*/
