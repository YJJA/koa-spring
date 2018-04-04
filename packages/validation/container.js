import Reflect from 'reflect-metadata'
import Metadata from './Metadata'

const metadataKey = Symbol('validation')

export function setDecoratorContainer (argv) {
  let Metadatas = null
  if (Reflect.hasMetadata(metadataKey, argv.target)) {
    Metadatas = Reflect.getMetadata(metadataKey, argv.target)
  } else {
    Metadatas = []
  }

  Metadatas.push(new Metadata(argv))
  Reflect.setMetadata(metadataKey, Metadatas, argv.target)
}

export function getDecoratorContainer (target) {
  if (Reflect.hasMetadata(metadataKey, target)) {
    return Reflect.getMetadata(metadataKey, target)
  } else {
    return []
  }
}
