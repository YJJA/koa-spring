import Router from 'koa-router'
import {getServiceInstances} from './service'
import {getRoutesWithController} from './router'

// springMiddleware
export function springMiddleware ({controllers}) {
  const router = new Router()
  controllers.map(Controller => {
    const serviceInstances = getServiceInstances(Controller)
    const control = new Controller(...serviceInstances)
    const routes = getRoutesWithController(control)

    routes.forEach(({method, path, handlers}) => {
      router[method](path, ...handlers)
    })
  })

  return router.routes()
}
