// Methods
export const Methods = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE'].reduce((result, method) => {
  result[method] = method.toLowerCase()
  return result
}, {})
