import {Body, Params, Query, Headers} from '../params'
import {getRoutingMiddlewares} from '../middleware'

class AbcDto {}

test('test routing', () => {
  class List {
    @Body(AbcDto)
    @Query(AbcDto)
    @Params(AbcDto)
    @Headers(AbcDto)
    find (ctx, next) {
      return 'abc'
    }
  }

  const list = new List()
  const result = getRoutingMiddlewares(list, 'find')
  console.log(result)
})
