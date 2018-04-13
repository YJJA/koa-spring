import Router from 'koa-router'
import {getRoutingOptions, getRoutingPrefix} from './routing'

function getRouterWithController (Controller) {
  const options = getRoutingOptions(Controller)
  const prefix = getRoutingPrefix(Controller)
  const router = new Router({prefix})
  const control = new Controller()

  options.forEach(({path, method, property}) => {
    router[method](path, async (ctx, next) => {
      await control[property](ctx, next)
    })
  })

  return router
}

export default getRouterWithController
