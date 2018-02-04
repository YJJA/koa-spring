"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _src = require("../src");

var controllers = _interopRequireWildcard(require("./controllers"));

var services = _interopRequireWildcard(require("./services"));

const app = new _koa.default();
console.log(services);
(0, _src.spring)(app, {
  services,
  controllers
});
app.listen(3000);