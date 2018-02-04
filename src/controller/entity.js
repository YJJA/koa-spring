export function entity(entityName) {
  return function(target, key, descriptor) {
    if (!target._entities) {
      Object.defineProperty(target, '_entities', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: {}
      })
    }

    console.log(target._routes)

    target._entities[key] = entityName

    return descriptor
  }
}
