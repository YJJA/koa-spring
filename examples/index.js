import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import morgan from 'koa-morgan'
import proxy from 'koa-proxies'
import session from 'koa-session'
import serve from 'koa-static'
import Boom from 'boom'
import controllers from './controllers'

const app = new Koa()
const router = new Router()

// error
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 400
    ctx.body = {message: err.message}
    ctx.app.emit('error', err, ctx)
  }
})

app.on('error', (err) => {
  console.error(err)
})

app.use(helmet())

app.use(morgan('dev'))

app.use(serve(path.resolve(__dirname, 'public')))

app.use(session({
  maxAge: 3 * 60 * 60 * 1000,
  rolling: true,
  renew: true
}, app))

app.use(proxy('/proxy', {
  target: 'http://www.example.com',
  changeOrigin: true
}))

app.use(bodyParser())

// controllers
app.use(controllers())

app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => Boom.notImplemented(),
  methodNotAllowed: () => Boom.methodNotAllowed()
}))

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`)
})
