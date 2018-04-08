import {DataType, NotEmpty} from '../decorators'
import validate from '../validate'

test('decorators test', () => {
  class Post {
    @NotEmpty({
      message: '不能为空'
    })
    @DataType(Date, {
      default: '2012/10/10'
    }, {
      message: '日期格式不正确'
    })
    dateTitme
  }

  validate(Post, {
    name: 'afsdafada'
  }).then(data => {
    console.log(data)
  }).catch(err => {
    console.log(err)
  })
})
