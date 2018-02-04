const path = require('path')
const http = require('http')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const morgan = require('koa-morgan')
const proxy = require('koa-proxies')
const session = require('koa-session')
const serve = require('koa-static')

// createApp
module.exports = function createApp(app, options) {

  return app
}
