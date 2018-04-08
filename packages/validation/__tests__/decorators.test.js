import {DataType, NotEmpty} from '../decorators'
import validate from '../validate'

test('decorators test', () => {
  class Post {
    @NotEmpty({
      message: '不能为空'
    })
    @DataType(Number)
    name
  }

  validate(Post, {
    name: 'afafda'
  }).then(data => {
    console.log(data)
  }).catch(err => {
    console.log(err)
  })
})
