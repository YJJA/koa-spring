import {Controller, Routing, Methods, Service, Params, Body} from '@koaspring/spring'
import {UserBodyDto, UserParamsDto} from './users.dto'
import {UsersService} from '../../services/users.service'

@Service(UsersService)
@Controller('/users')
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
    const {params} = ctx.state
    ctx.body = params
  }

  @Params(UserParamsDto)
  @Body(UserBodyDto)
  @Routing('/:id', Methods.POST)
  async updateOne (ctx, next) {
    const {body} = ctx.state
    ctx.body = body
  }
}

export default Users
