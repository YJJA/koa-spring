import reflect from './reflect'
import Metadata from './Metadata'

const metadataKey = Symbol('validation')

export function setDecoratorContainer (argv) {
  let Metadatas = null
  if (reflect.hasMetadata(metadataKey, argv.target)) {
    Metadatas = reflect.getMetadata(metadataKey, argv.target)
  } else {
    Metadatas = []
  }

  Metadatas.push(new Metadata(argv))
  reflect.setMetadata(metadataKey, Metadatas, argv.target)
}

export function getDecoratorContainer (target) {
  if (reflect.hasMetadata(metadataKey, target)) {
    return reflect.getMetadata(metadataKey, target)
  } else {
    return []
  }
}
