import {routing, getRoutingOptions, getRoutingPrefix} from '../routing'
// import Methods from '../Methods'

test('test routing', () => {
  @routing('/list')
  class List {
    @routing('/abc')
    find (ctx, next) {
      return 'abc'
    }
  }

  const a = getRoutingOptions(List)
  const b = getRoutingPrefix(List)
  console.log(a)
  console.log(b)
})
