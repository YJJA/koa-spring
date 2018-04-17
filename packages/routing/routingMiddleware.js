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
export function getRoutesWithController (control) {
  const prefix = getRoutingPrefix(control)
  const routingOptions = getRoutingOptions(control)

  return routingOptions.map(({path, method, property}) => {
    const paramsOptions = getParamsOptionsByProperty(control, property)
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
export function routingMiddleware ({Controllers}) {
  const router = new Router()
  Controllers.map(Controller => {
    const serviceInstances = getServiceInstances(Controller)
    const control = new Controller(...serviceInstances)
    const routes = getRoutesWithController(control)

    routes.forEach(({method, path, handlers}) => {
      router[method](path, ...handlers)
    })
  })

  return router.routes()
}
