'use strict'

const DRY_RUN = true

// self
const utils = require('./lib/utils')

// npm
const Throttle = require('promise-parallel-throttle')
const delay = require('delay')

/*
const str = `Contribuez à l’enrichissement de Wikisource, une bibliothèque numérique mondiale, par l’édition de textes québécois en format wiki. Encadrement et formation offerts sur place gratuitement!

Non seulement nous vous donnerons un aperçu du projet et de ses objectifs lors de ces ateliers, mais nous vous montrerons sur place à faire la correction des textes et de la mise-en-page, et ainsi, vous pourrez contribuer à ce grand projet de diffusion de notre patrimoine littéraire national à l’échelle mondiale grâce à l’interface de Wikisource... Venez passer 30 minutes, 1 heure ou bien 3 heures! L’important, c’est de trouver une tâche qui vous intéresse et dans laquelle vous vous sentez à l’aise. Chaque mois, nous aurons comme objectif de publier un livre complet lors de ces ateliers.

En collaboration avec Wikimédia Canada`

const str2 = `ConFoo is a multi-technology conference for web developers.

150 presentations by popular international speakers.
Focused on pragmatic solutions for web developers.
Great content and amazing experience.`

utils.calais(str2)
  .then((x) => {
    console.log(x.headers)
    console.log(JSON.stringify(x.body, null, '  '))
  })
  .catch(console.error)
*/

let fixDocs
let bulk

const filterDocs = (x) => x.filter((doc) => !doc.calais)

const woot = (doc) => {
  console.log(Date(), 'woot!')
  return delay(2000)
    .then(() => utils.calais(doc.description))
    .then((calais) => {
      console.log(doc._id, calais.headers.date, Date())
      doc.calais = calais.body
      return doc
    })
    .catch((e) => {
      console.log('oups', doc._id, e)
      return doc
    })
}

if (DRY_RUN) {
  // fixDocs = (x) => x
  fixDocs = (x) => Throttle.all(x.map((doc) => {
    // doc.calais = utils.calais(doc.description)
    // return doc
    return woot.bind(null, doc)
    // return utils.calais.bind(null, doc.description)

/*
      .then((calais) => {
        console.log(doc._id, calais.headers.date)
        doc.calais = calais.body
        return doc
      })
      .catch((e) => {
        console.log('oups', doc._id)
        return doc
      })
*/
  }), 1)
  bulk = (data) => {
    console.log(data[1].calais)
    console.log(data[2].calais)
    return `Dry run. Found ${data.length} events without calais in db.`
  }
} else {
  fixDocs = (x) => x.map((doc) => {
    doc.html = utils.makeHtml(doc.description)
    doc.location = utils.makeLocation(doc.location.source)
    return doc
  })
  bulk = (data) => utils.bulk(data, { onlyBody: true, auth: true })
}

utils.getIds({ onlyDocs: true, query: { limit: 3, include_docs: true, reduce: false } })
  .then(filterDocs)
  .then(fixDocs)
  .then(bulk)
  .then(console.log)
  .catch(console.error)
