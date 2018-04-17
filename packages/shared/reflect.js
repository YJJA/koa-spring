
const store = new Map()

// hasMetadata
export function hasMetadata (metadataKey, target, property) {
  if (!store.has(metadataKey)) {
    return false
  }

  const metaStore = store.get(metadataKey)
  if (!metaStore.has(target)) {
    return false
  }

  console.log('hasMetadata:', metadataKey, target, property)
  if (typeof property === 'string') {
    const propertyStore = metaStore.get(target)
    return propertyStore.has(property)
  } else {
    return true
  }
}

// setMetadata
export function setMetadata (metadataKey, metadataValue, target, property) {
  let metaStore = null
  if (store.has(metadataKey)) {
    metaStore = store.get(metadataKey)
  } else {
    metaStore = new WeakMap()
  }

  if (typeof property === 'string') {
    let propertyStore = null
    if (metaStore.has(property)) {
      propertyStore = metaStore.get(property)
    } else {
      propertyStore = new Map()
    }

    propertyStore.set(property, metadataValue)
    metaStore.set(target, propertyStore)
  } else {
    metaStore.set(target, metadataValue)
  }

  store.set(metadataKey, metaStore)
}

// getMetadata
export function getMetadata (metadataKey, target, property) {
  if (!store.has(metadataKey)) {
    return null
  }

  const metaStore = store.get(metadataKey)
  if (!metaStore.has(target)) {
    return null
  }

  if (typeof property === 'string') {
    const propertyStore = metaStore.get(target)
    return propertyStore.get(property)
  } else {
    return metaStore.get(target)
  }
}

export default {
  hasMetadata,
  setMetadata,
  getMetadata
}
