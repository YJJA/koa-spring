import 'reflect-metadata'

test('reflect-metadata', () => {
  function Type (type, options) {
    return function (target, property) {
      const opt = {type, options}
      if (typeof property === 'string') {
        target = target.constructor
      }
      let opts = []
      if (Reflect.hasMetadata('abc', target, property)) {
        opts = Reflect.getMetadata('abc', target, property)
      }
      opts.push(opt)
      return Reflect.defineMetadata('abc', opts, target, property)
    }
  }

  class List {
    @Type('body', {
      message: 'pppp'
    })
    @Type('query', {
      message: 'query'
    })
    find() {

    }
  }

  const list = new List()
  const res = Reflect.getMetadata('abc', List, 'find')
  console.log(res)
})
