import {NotEmpty} from '../decorators'

class Post {
  @NotEmpty({
    message: '不能为空'
  })
  name
}
