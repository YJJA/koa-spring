function validateEntity (entity, data) {
  return new Promise((resolve, reject) => {
    try {
      entity.set(data)
      resolve(entity.get())
    } catch (e) {
      reject(e)
    }
  })
}

export function entitiesMiddleware (entity) {
  return async (ctx, next) => {
    if (entity) {
      ctx.entity = await validateEntity(entity, {
        username: 'YJJA',
        password: '1212'
      })
    }
    await next()
  }
}
