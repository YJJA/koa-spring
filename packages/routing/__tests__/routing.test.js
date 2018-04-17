import {Routing, Methods, getRoutingOptions, getRoutingPrefix} from '../routing'
// import Methods from '../Methods'

test('test routing', () => {
  @Routing('/list')
  class List {
    @Routing('/abc', Methods.POST)
    find (ctx, next) {
      return 'abc'
    }
  }

  const a = getRoutingOptions(List)
  const b = getRoutingPrefix(List)
  console.log(a)
  console.log(b)
})
