
export function service (serviceName) {
  return function (target, key, descriptor) {
    if (!target._services) {
      Object.defineProperty(target, '_services', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {}
      })
    }

    target._services[key] = serviceName
    return {
      enumerable: true,
      configurable: true,
      get () {
        return this[key]
      },
      set (value) {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value
        })
      }
    }
  }
}
