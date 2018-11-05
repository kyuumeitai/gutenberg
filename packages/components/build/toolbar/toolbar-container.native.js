"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

/**
 * External dependencies
 */
var _default = function _default(props) {
  return (0, _element.createElement)(_reactNative.View, {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  }, props.children);
};

exports.default = _default;
//# sourceMappingURL=toolbar-container.native.js.map