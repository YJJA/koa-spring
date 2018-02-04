import koaRouter from 'koa-router'
import {parseController} from './controller'
import {entitiesMiddleware} from './middlewares/entitiesMiddleware'

// spring
export function spring(app, {controllers = {}, services = {}, entities = {}}) {
  const router = koaRouter()
  const servicesMap = Object.keys(services).reduce((result, key) => {
    const Service = services[key]
    result[key] = new Service()
    return result
  }, {})
  const entitiesMap = Object.keys(entities).reduce((result, key) => {
    const Entity = entities[key]
    result[key] = new Entity()
    return result
  }, {})

  Object.values(controllers).forEach(Controller => {
    const _entities = Controller.prototype._entities
    const _services = Controller.prototype._services
    const _routes = Controller.prototype._routes
    if (_routes) {
      const control = new Controller()
      Object.keys(_services).forEach((key) => {
        control[key] = servicesMap[_services[key]]
      })
      Object.keys(_routes).forEach(key => {
        const fun = _routes[key]
        const [method, path] = key.split(' ')
        const entityKey = _entities[fun]
        const entity = entitiesMap[entityKey]
        router[method](path, entitiesMiddleware(entity), control[fun].bind(control))
      })
    }

    delete Controller.prototype._entities
    delete Controller.prototype._services
    delete Controller.prototype._routes
  })

  app.use(router.routes())

  return app
}
