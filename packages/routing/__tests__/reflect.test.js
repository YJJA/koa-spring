import 'reflect-metadata'

const key = Symbol('key')
function Type (type) {
  return function (target, property) {
    if (typeof property !== 'string') {
      target = target.prototype
    }
    let types = []
    if (Reflect.hasMetadata(key, target, property)) {
      types = Reflect.getMetadata(key, target, property)
    }
    types.push(type)
    Reflect.defineMetadata(key, types, target, property)
  }
}

@Type('c')
class List {
  @Type('b')
  @Type('a')
  async find () {
    return 'find method'
  }
}

const list = new List()

// console.log(Reflect.getMetadata(key, list, 'find'))

console.log(List.prototype === List)

console.log('getMetadata............')
console.log(Reflect.getMetadata(key, List))
console.log(Reflect.getMetadata(key, List, 'find'))
console.log(Reflect.getMetadata(key, list))
console.log(Reflect.getMetadata(key, list, 'find'))

console.log('getOwnMetadata............')
console.log(Reflect.getOwnMetadata(key, List))
console.log(Reflect.getOwnMetadata(key, List, 'find'))
console.log(Reflect.getOwnMetadata(key, list))
console.log(Reflect.getOwnMetadata(key, list, 'find'))

console.log('getMetadataKeys............')
console.log(Reflect.getMetadataKeys(List))
console.log(Reflect.getMetadataKeys(List, 'find'))
console.log(Reflect.getMetadataKeys(list))
console.log(Reflect.getMetadataKeys(list, 'find'))

console.log('getOwnMetadataKeys............')
console.log(Reflect.getOwnMetadataKeys(List))
console.log(Reflect.getOwnMetadataKeys(List, 'find'))
console.log(Reflect.getOwnMetadataKeys(list))
console.log(Reflect.getOwnMetadataKeys(list, 'find'))
