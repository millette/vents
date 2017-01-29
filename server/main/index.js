'use strict'

const utils = require('../../lib/utils')
const Boom = require('boom')

const getWeek = (week) => utils.week(week, { onlyBody: true }).catch((e) => Boom.badRequest(e))

const fetchWeek = function (request, reply) {
  reply(getWeek(request.params.week))
}

const fetchPreviousWeek = function (request, reply) {
  reply(getWeek(new Date(Date.parse(request.params.week) - utils.weekms)
    .toISOString()
    .split('T')[0]))
}

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) { reply('hi') }
  })

  server.route({
    method: 'GET',
    path: '/week/{week}',
    config: { pre: [{ method: fetchWeek, assign: 'week' }] },
    handler: function (request, reply) {
      reply.view('ack', { partial: 'event', pre: request.pre })
    }
  })

  server.route({
    method: 'GET',
    path: '/newsletter/{week}',
    config: {
      pre: [
        { method: fetchWeek, assign: 'week' },
        { method: fetchPreviousWeek, assign: 'previousWeek' }
      ]
    },
    handler: function (request, reply) {
      reply.view('ack', { partial: 'event', pre: request.pre })
    }
  })

  next()
}

exports.register.attributes = { name: 'main' }
