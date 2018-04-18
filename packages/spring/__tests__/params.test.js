import {Body, Params, Query, Headers, getParamsOptionsByProperty} from '../params'

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

  const result = getParamsOptionsByProperty(List, 'find')
  console.log(result)
})
