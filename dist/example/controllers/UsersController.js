"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersController = void 0;

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime/core-js/object/get-own-property-descriptor"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _src = require("../../src");

var _dec, _dec2, _dec3, _class, _class2, _descriptor;

let UsersController = (_dec = (0, _src.routing)('/users'), _dec2 = (0, _src.service)('UsersService'), _dec3 = (0, _src.routing)('/'), _dec(_class = (_class2 = class UsersController {
  constructor() {
    Object.defineProperty(this, "Users", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: (0, _initializerWarningHelper2.default)(_descriptor, this)
    });
  }

  async find(ctx, next) {
    console.log('test....');
    ctx.body = {
      message: 'this.state.abc'
    };
  }

}, (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "Users", [_dec2], {
  enumerable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "find", [_dec3], (0, _getOwnPropertyDescriptor.default)(_class2.prototype, "find"), _class2.prototype)), _class2)) || _class);
exports.UsersController = UsersController;