var _Promise = require("@babel/runtime/core-js/promise");

var _applyDecoratedDescriptor = require("@babel/runtime/helpers/applyDecoratedDescriptor");

var _initializerWarningHelper = require("@babel/runtime/helpers/initializerWarningHelper");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _extends = require("@babel/runtime/helpers/extends");

var _dec, _dec2, _class, _descriptor, _descriptor2;

function toInt(target, property, descriptor) {}

function string() {
  return function string(target, key, descriptor) {
    if (!target._entity) {
      Object.defineProperty(target, '_entity', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: {}
      });
    }

    target._entity[key] = {
      type: 'string',
      value: descriptor.value
    };
    return {
      enumerable: true,
      configurable: true,

      get() {
        return this._entity[key].value;
      },

      set(value) {
        if (typeof value === 'string') {
          this._entity[key] = _extends({}, this._entity[key], {
            value
          });
        } else {
          throw new Error('请输入字符串类型的值');
        }
      }

    };
  };
}

class BaseEntity {
  set(props) {
    _Object$keys(props).forEach(key => {
      if (this._entity[key]) {
        this[key] = props[key];
      }
    });
  }

  get() {
    return _Object$keys(this._entity).reduce((result, key) => {
      result[key] = this[key];
      return result;
    }, {});
  }

  toJSON() {
    return this.get();
  }

}

let UserEntity = (_dec = string(), _dec2 = string(), (_class = class UserEntity extends BaseEntity {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), Object.defineProperty(this, "username", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: _initializerWarningHelper(_descriptor, this)
    }), Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: _initializerWarningHelper(_descriptor2, this)
    }), _temp;
  }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "username", [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "password", [_dec2], {
  enumerable: true,
  initializer: null
})), _class));

function validateEntity(data) {
  return new _Promise((resolve, reject) => {
    let entity = null;
    let error = null;

    try {
      entity = new UserEntity();
      entity.set(data);
    } catch (e) {
      error = e;
    }

    return error ? reject(error) : resolve(entity);
  });
}

validateEntity({
  username: 'YJJA',
  password: '1212'
}).then(data => {
  console.log(data.toJSON());
}).catch(err => {
  console.error(err);
});