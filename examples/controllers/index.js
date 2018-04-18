import {springMiddleware} from '@koaspring/spring'

import UsersController from './users'

export default function () {
  return springMiddleware({
    controllers: [UsersController]
  })
}
