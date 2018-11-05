"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CodeEdit;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
// Note: styling is applied directly to the (nested) PlainText component. Web-side components
// apply it to the container 'div' but we don't have a proper proposal for cascading styling yet.
function CodeEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      style = _ref.style;
  return (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_editor.PlainText, {
    value: attributes.content,
    style: style,
    multiline: true,
    underlineColorAndroid: "transparent",
    onChange: function onChange(content) {
      return setAttributes({
        content: content
      });
    },
    placeholder: (0, _i18n.__)('Write code…'),
    "aria-label": (0, _i18n.__)('Code')
  }));
}
//# sourceMappingURL=edit.native.js.map