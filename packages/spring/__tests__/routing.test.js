import {Controller, Routing, Methods, getRoutingOptions, getRoutingPrefix} from '../controller'
// import Methods from '../Methods'

test('test routing', () => {
  @Controller('/list')
  class List {
    @Routing('/abc', Methods.POST)
    find (ctx, next) {
      return 'abc'
    }
  }

  const list = new List()
  const a = getRoutingOptions(list)
  const b = getRoutingPrefix(list)
  console.log(a)
  console.log(b)
})
