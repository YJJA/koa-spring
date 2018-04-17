// getParamsDataByType
export function getParamsDataByType (type, ctx) {
  switch (type) {
    case 'body':
      return ctx.request.body

    case 'params':
      return ctx.request.params

    case 'query':
      return ctx.request.query

    case 'headers':
      return ctx.request.headers

    default:
      return null
  }
}
