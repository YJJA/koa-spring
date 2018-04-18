# Koa-spring

## 项目生命周期
### 控制器实例化之前 controllerWillMounted
可对控制传入参数，如 server

### 控制器实例化之后 controllerDidMounted
查找控制器中的路由，开始创建路由

## 访问生命周期
### 单个路由回调 routeWillRequest
在路由回调函数之前，如果数据较验，权限校验

