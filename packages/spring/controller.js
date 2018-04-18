import 'reflect-metadata'

const routingKey = Symbol('routingKey')
const prefixKey = Symbol('prefixKey')
const routeWillRequest = Symbol('routeWillRequest')

// Methods
export const Methods = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE']
  .reduce((result, method) => {
    result[method] = method.toLowerCase()
    return result
  }, {})

// Routing
export function Routing (path, method = Methods.GET) {
  return function (target, property, descriptor) {
    let routes = []
    if (Reflect.hasMetadata(routingKey, target)) {
      routes = Reflect.getMetadata(routingKey, target)
    }
    routes.push({property, path, method})
    Reflect.defineMetadata(routingKey, routes, target)
  }
}

// Controller
export function Controller (prefix) {
  return function (target) {
    Reflect.defineMetadata(prefixKey, prefix, target.prototype)
  }
}

// getRoutingOptions
export function getRoutingOptions (target) {
  return Reflect.getMetadata(routingKey, target)
}

// getRoutingMethods
export function getRoutingPrefix (target) {
  return Reflect.getMetadata(prefixKey, target)
}

// getRouterRequestBefore
export function getRoutingRequestBefore (control, property) {
  return Reflect.getMetadata(routeWillRequest, control, property) || []
}

// setRoutingRequestBefor
export function setRoutingRequestBefore (target, property, handler) {
  let handlers = []
  if (Reflect.hasMetadata(routeWillRequest, target, property)) {
    handlers = Reflect.getMetadata(routeWillRequest, target, property)
  }
  handlers.push(handler)
  Reflect.defineMetadata(routeWillRequest, handlers, target, property)
}
