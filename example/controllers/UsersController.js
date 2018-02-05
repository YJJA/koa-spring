import {routing, service, entity} from '../../src'

@routing('/users')
export class UsersController {
  @service('UsersService')
  Users

  @entity('UserEntity')
  @routing('')
  async find (ctx, next) {
    const entity = ctx.entity
    const result = this.Users.find(entity)
    ctx.body = result
  }

  @entity('UserEntity')
  @routing('/:userId')
  async findOne (ctx, next) {
    ctx.body = ctx.entity || 'sdfadfsadf'
  }
}
