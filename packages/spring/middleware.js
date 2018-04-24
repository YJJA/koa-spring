import 'reflect-metadata'

const routingMiddlewareKey = Symbol('routingMiddlewareKey')

// setRoutingMiddleware
function setRoutingMiddleware (target, property, handler) {
  let handlers = []
  if (Reflect.hasMetadata(routingMiddlewareKey, target, property)) {
    handlers = Reflect.getMetadata(routingMiddlewareKey, target, property)
  }
  handlers.push(handler)
  Reflect.defineMetadata(routingMiddlewareKey, handlers, target, property)
}

// getRoutingMiddleware
export function getRoutingMiddlewares (control, property) {
  return Reflect.getMetadata(routingMiddlewareKey, control, property) || []
}

// createMiddleware
export function createRoutingMiddleware (handlerCreater) {
  return function (...args) {
    return function (target, property) {
      const handler = handlerCreater(...args)
      setRoutingMiddleware(target, property, handler)
    }
  }
}
