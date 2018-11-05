"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reactNative = require("react-native");

var _style = _interopRequireDefault(require("./style.scss"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
function PlainText(_ref) {
  var onChange = _ref.onChange,
      className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["onChange", "className"]);
  return (0, _element.createElement)(_reactNative.TextInput, (0, _extends2.default)({
    className: [_style.default['editor-plain-text'], className],
    onChangeText: function onChangeText(text) {
      return onChange(text);
    }
  }, props));
}

var _default = PlainText;
exports.default = _default;
//# sourceMappingURL=index.native.js.map