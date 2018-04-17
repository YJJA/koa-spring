import Router from 'koa-router'
import {validate} from '@koaspring/validator'

import {getRoutingOptions, getRoutingPrefix} from './routing'
import {getParamsOptionsByProperty} from './params'
import {getServiceInstances} from './service'

// getParamsDataByType
export function getParamsDataByType (type, ctx) {
  switch (type) {
    case 'body':
      return ctx.request.body

    case 'params':
      return ctx.params

    case 'query':
      return ctx.request.query

    case 'headers':
      return ctx.request.headers

    default:
      return {}
  }
}

// pathJoin
function pathJoin (...paths) {
  return paths.reduce((result, path) => {
    if (typeof path === 'string') {
      if (path[0] !== '/') {
        path = '/' + path
      }

      result = result + path
    }
    return result
  }, '')
}

// getRouterWithController
export function getRoutesWithController (Controller) {
  const prefix = getRoutingPrefix(Controller)
  const routingOptions = getRoutingOptions(Controller)
  const serviceInstances = getServiceInstances(Controller)
  const control = new Controller(...serviceInstances)

  return routingOptions.map(({path, method, property}) => {
    const paramsOptions = getParamsOptionsByProperty(Controller, property)
    return {
      method,
      path: pathJoin(prefix, path),
      handlers: [
        async (ctx, next) => {
          ctx.dto = {}
          for (let option of paramsOptions) {
            const {Dto, group, type} = option
            const data = getParamsDataByType(type, ctx)
            ctx.dto[type] = await validate(Dto, data, group)
          }
          await next()
        },
        control[property].bind(control)
      ]
    }
  })
}

// routingMiddleware
export function routingMiddleware ({controllers}) {
  const router = new Router()
  controllers.map(Controller => {
    const routes = getRoutesWithController(Controller)
    routes.forEach(({method, path, handlers}) => {
      router[method](path, ...handlers)
    })
  })

  return router.routes()
}
