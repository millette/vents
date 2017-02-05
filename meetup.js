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
const pastEvents = (group) => {
  let headers
  return meetupApi.events({ group: group, status: 'past' })
    .then((x) => {
      headers = x.headers
      return x.body.map((y) => {
        y._id = 'mce:' + y.id
        delete y.status
        return y
      })
    })
    .then(utils.bulk)
    .then((x) => {
      x.headers = headers
      return x
    })
    .catch((e) => console.error('pastEvents err:', e))
}

const fetchAllGroupEvents = () => utils.knownMeetups()
  .then((groups) => {
    meetupApi.recursor({
      query: pastEvents,
      next: () => groups.pop() || false,
      first: () => groups.pop() || false
    })
  })
  .catch((e) => console.error('fetchAllGroupEvents err:', e))

fetchAllGroupEvents()
  .then((x) => console.log(JSON.stringify(x, null, '  ')))
  .catch((e) => console.error('err:', e))
*/

/*
utils.knownMeetups()
  .then((a) => {
    // console.log(typeof a, a.length, a[0], typeof a[0])
    console.log(a.join('\n'))
  })
  .catch(console.error)
*/

/*
utils.getView('vents', 'meetupevents', { onlyRows: true, query: { group: true } })
  .then((x) => x.filter((y) => y.value === 200).map((y) => y.key))
  .then((groups) =>
    meetupApi.recursor({
      query: meetupApi.pastEvents,
      next: () => groups.pop() || false,
      first: () => groups.pop() || false
    })
  )
  .then((a) => {
    console.log(a.headers)
    console.log(a.body.length)
  })
  .catch(console.error)
*/

/*
meetupApi.pastEventsPage({
// scroll=since%3A2014-12-20T17%3A00%3A00.000-05%3A00
  // scroll: 'since:2014-12-20T17:00:00.000-05:00',
  scroll: 'since:2017-02-18T14:00:00.000-05:00',
  group: 'compgames'
})
*/

// meetupApi.pastEvents('compgames')
meetupApi.pastEvents('montrealfrancais')
// meetupApi.pastEvents('pitonneux')
  .then((x) => {
    console.log(x.headers)
    console.log(x.body.length)
  })

/*
utils.getView('vents', 'meetupevents', { onlyRows: true, query: { group: true } })
  .then((x) => x.filter((y) => y.value === 200).map((y) => y.key))
  .then(console.log)
*/
