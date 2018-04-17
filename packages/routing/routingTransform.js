import Router from 'koa-router'
import {getRoutingOptions, getRoutingPrefix} from './routing/routing'
import {getParamsOptionsByProperty} from './params/params'
import {getParamsDataByType} from './params/paramsData'
import {validate} from 'validator-decorators'

// getRouterWithController
export function getRouterWithController (Controller) {
  const routingOptions = getRoutingOptions(Controller)
  const prefix = getRoutingPrefix(Controller)
  const router = new Router({prefix})
  const control = new Controller()

  routingOptions.forEach(({path, method, property}) => {
    const paramsOptions = getParamsOptionsByProperty(Controller, property)
    router[method](path, async (ctx, next) => {
      ctx.dto = {}
      for (let option of paramsOptions) {
        const {Dto, group, type} = option
        const data = getParamsDataByType(type, ctx)
        ctx.dto[type] = await validate(Dto, data, group)
      }
      await control[property](ctx, next)
    })
  })

  return router
}

export function httpMiddleware (Controllers) {
  Controllers.map()
}
