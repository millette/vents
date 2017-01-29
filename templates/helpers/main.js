'use strict'

const helpers = {
  pretty: (context) => JSON.stringify(context, null, '  '),
  duration: (doc) => {
    const duration = new Date(Date.parse(doc.end) - Date.parse(doc.start))
    const days = duration.getUTCDate() - 1
    const hours = duration.toISOString()
      .split('T')[1]
      .split(':')
      .slice(0, 2)
      .join('H')
      .replace(/^0/, '')
    doc.duration = days ? `${days} jours et ${hours}` : hours
    return doc.duration
  }
}

module.exports = () => 'Available in main: ' + Object.keys(helpers).join(', ')

for (let r in helpers) { module.exports[r] = helpers[r] }
