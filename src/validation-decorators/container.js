import {Metadata} from './Metadata'

let containerStore = null

export function setDecoratorContainer (argv) {
  if (!containerStore) {
    containerStore = new WeakMap()
  }

  if (!containerStore.has(argv.target)) {
    containerStore.set(argv.target, new Map())
  }

  const targetStore = containerStore.get(argv.target)
  if (!targetStore.has(argv.propertyName)) {
    targetStore.set(argv.propertyName, new Metadata(argv.target, argv.propertyName))
  }

  const propertyMetadata = targetStore.get(argv.propertyName)
  propertyMetadata.update(argv)

  return propertyMetadata
}

export function getDecoratorContainer (target) {
  if (!containerStore) {
    containerStore = new WeakMap()
  }

  if (!containerStore.has(target)) {
    containerStore.set(target, new Map())
  }

  return containerStore.get(target)
}
