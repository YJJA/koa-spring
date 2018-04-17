import {routingMiddleware} from '@koaspring/routing'

import UsersController from './users'

export default function () {
  return routingMiddleware({
    controllers: [UsersController]
  })
}
