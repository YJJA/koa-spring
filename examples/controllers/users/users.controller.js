import {Routing, Methods, Service, Params, Body} from '@koaspring/routing'
import {UserBodyDto, UserParamsDto} from './users.dto'
import {UsersService} from '../../services/users.service'

@Service(UsersService)
@Routing('/users')
class Users {
  constructor (usersService) {
    this.usersService = usersService
  }

  @Routing('')
  async find (ctx, next) {
    const list = await this.usersService.find()
    ctx.body = list
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
