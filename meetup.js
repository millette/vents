'use strict'

// self
const meetupApi = require('./lib/meetup-api')
const utils = require('./lib/utils')

/*
meetupApi.getGroup('Linux-Montreal')
  .then((x) => {
    console.log('h:', x.headers)
    console.log('b:', JSON.stringify(x.body, null, '  '))
  })
  .catch(console.error)
*/

/*
meetupApi.similarGroups('Linux-Montreal')
  .then((x) => {
    console.log('sim h:', x.headers)
    console.log('sim l:', x.body.length)
    console.log('sim b:', JSON.stringify(x.body, null, '  '))
  })
  .catch(console.error)
*/

/*
meetupApi.findQcGroups()
  .then((x) => x.body.map((row) => {
    delete row.score
    row._id = ['mc', row.id].join(':')
    return row
  }))
  .then(utils.bulk)
  .then((x) => console.log(JSON.stringify(x.body, null, '  ')))
  .catch(console.error)
*/

/*
meetupApi.findQcGroups()
  .then((x) => console.log(JSON.stringify(x.headers, null, '  ')))
  .catch(console.error)
*/

/*
meetupApi.events({ group: 'Linux-Montreal', status: 'past' })
  .then((x) => {
    console.log('sim h:', x.headers)
    console.log('sim l:', x.body.length)
    console.log('sim first:', JSON.stringify(x.body[0], null, '  '))
    console.log('sim last:', JSON.stringify(x.body[x.body.length - 1], null, '  '))
  })
  .catch(console.error)
*/

/*
meetupApi.events({ group: 'Linux-Montreal', status: 'upcoming' })
  .then((x) => {
    console.log('sim h:', x.headers)
    console.log('sim l:', x.body.length)
    console.log('sim first:', JSON.stringify(x.body[0], null, '  '))
    console.log('sim last:', JSON.stringify(x.body[x.body.length - 1], null, '  '))
  })
  .catch(console.error)
*/

/*
meetupApi.events({ group: 'Linux-Montreal', status: 'past' })
  .then((x) => x.body.map((y) => {
    y._id = 'mce:' + y.id
    delete y.status
    return y
  }))
  .then(utils.bulk)
  .then((x) => console.log(JSON.stringify(x.body, null, '  ')))
  .catch(console.error)
*/

utils.knownMeetups()
  .then((a) => {
    console.log(typeof a, a.length, a[0], typeof a[0])
  })
  .catch(console.error)
