import Router from 'koa-router'
import {getRoutingOptions, getRoutingPrefix} from './routing'
import {getParamsOptionsByProperty} from './params'
import {validate} from 'validator-decorators'

// getRouterWithController
export function getRoutesWithController (Controller) {
  const routingOptions = getRoutingOptions(Controller)
  const prefix = getRoutingPrefix(Controller)
  const control = new Controller()

  return routingOptions.map(({path, method, property}) => {
    const paramsOptions = getParamsOptionsByProperty(Controller, property)
    return {
      method,
      path: prefix + path,
      handler: async (ctx, next) => {
        ctx.dto = {}
        for (let option of paramsOptions) {
          const {Dto, group, type} = option
          const data = ctx.request[type] || {}
          ctx.dto[type] = await validate(Dto, data, group)
        }
        await control[property](ctx, next)
      }
    }
  })
}

// routingMiddleware
export function routingMiddleware ({controllers}) {
  const router = new Router()
  controllers.map(Controller => {
    const routes = getRoutesWithController(Controller)
    routes.forEach(({method, path, handler}) => {
      router[method](path, handler)
    })
  })

  return router.routes()
}
