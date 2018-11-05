"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Dashicon: true,
  Toolbar: true,
  withSpokenMessages: true
};
Object.defineProperty(exports, "Dashicon", {
  enumerable: true,
  get: function get() {
    return _dashicon.default;
  }
});
Object.defineProperty(exports, "Toolbar", {
  enumerable: true,
  get: function get() {
    return _toolbar.default;
  }
});
Object.defineProperty(exports, "withSpokenMessages", {
  enumerable: true,
  get: function get() {
    return _withSpokenMessages.default;
  }
});

var _primitives = require("./primitives");

Object.keys(_primitives).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _primitives[key];
    }
  });
});

var _dashicon = _interopRequireDefault(require("./dashicon"));

var _toolbar = _interopRequireDefault(require("./toolbar"));

var _withSpokenMessages = _interopRequireDefault(require("./higher-order/with-spoken-messages"));
//# sourceMappingURL=index.native.js.map