
const store = new Map()

export function hasMetadata (metadataKey, target) {
  if (!store.has(metadataKey)) {
    return false
  } else {
    const metaStore = store.get(metadataKey)
    return metaStore.has(target)
  }
}

export function setMetadata (metadataKey, metadataValue, target) {
  let metaStore = null
  if (store.has(metadataKey)) {
    metaStore = store.get(metadataKey)
  } else {
    metaStore = new WeakMap()
  }

  metaStore.set(target, metadataValue)
  store.set(metadataKey, metaStore)
}

export function getMetadata (metadataKey, target) {
  if (store.has(metadataKey)) {
    const metaStore = store.get(metadataKey)
    return metaStore.get(target)
  }
}

export function deleteMetadata (metadataKey, target) {
  if (store.has(metadataKey)) {
    const metaStore = store.get(metadataKey)
    return metaStore.delete(target)
  }
}

export default {
  hasMetadata,
  setMetadata,
  getMetadata,
  deleteMetadata
}
