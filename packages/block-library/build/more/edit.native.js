"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoreEdit;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _editor2 = _interopRequireDefault(require("./editor.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function MoreEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var customText = attributes.customText;
  var defaultText = (0, _i18n.__)('Read more');
  var value = customText !== undefined ? customText : defaultText;
  return (0, _element.createElement)(_reactNative.View, {
    className: _editor2.default['block-library-more__container']
  }, (0, _element.createElement)(_reactNative.View, {
    className: _editor2.default['block-library-more__sub-container']
  }, (0, _element.createElement)(_reactNative.Text, {
    className: _editor2.default['block-library-more__left-marker']
  }, "<!--"), (0, _element.createElement)(_editor.PlainText, {
    className: _editor2.default['block-library-more__plain-text'],
    value: value,
    multiline: true,
    underlineColorAndroid: "transparent",
    onChange: function onChange(newValue) {
      return setAttributes({
        customText: newValue
      });
    },
    placeholder: defaultText
  }), (0, _element.createElement)(_reactNative.Text, {
    className: _editor2.default['block-library-more__right-marker']
  }, "-->")));
}
//# sourceMappingURL=edit.native.js.map