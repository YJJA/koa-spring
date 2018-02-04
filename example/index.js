import Koa from 'koa'
import {spring} from '../src'
import * as controllers from './controllers'
import * as services from './services'
import * as entities from './entities'

const app = new Koa()

spring(app, {
  entities,
  services,
  controllers
})

app.listen(3000)
