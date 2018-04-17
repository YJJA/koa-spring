import {Routing, Methods, Params, Body} from '@koaspring/routing'
import {UserBodyDto, UserParamsDto} from './users.dto'

@Routing('/users')
class Users {
  @Routing('')
  async find (ctx, next) {
    ctx.body = {message: 'success'}
  }

  @Params(UserParamsDto)
  @Routing('/:id')
  async findOne (ctx, next) {
    const {params} = ctx.dto
    ctx.body = params
  }

  @Params(UserParamsDto)
  @Body(UserBodyDto)
  @Routing('/:id', Methods.POST)
  async updateOne (ctx, next) {
    const {body} = ctx.dto
    ctx.body = body
  }
}

export default Users
