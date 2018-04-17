import 'reflect-metadata'

const serviceKey = Symbol('serviceKey')

// Service
export function Service (...Services) {
  return function (target) {
    Reflect.defineMetadata(serviceKey, Services, target)
  }
}

// getServiceOptions
export function getServiceOptions (target) {
  return Reflect.getMetadata(serviceKey, target)
}

// getServiceInstances
const serviceStore = new WeakMap()

export function getServiceInstances (Controller) {
  const serviceOptions = getServiceOptions(Controller)
  return serviceOptions.map(Service => {
    if (serviceStore.has(Service)) {
      return serviceStore.has(Service)
    } else {
      const instance = new Service()
      serviceStore.set(Service, instance)
      return instance
    }
  })
}
