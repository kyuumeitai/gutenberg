"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Circle;
  }
});
Object.defineProperty(exports, "G", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.G;
  }
});
Object.defineProperty(exports, "Path", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Path;
  }
});
Object.defineProperty(exports, "Polygon", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Polygon;
  }
});
Object.defineProperty(exports, "Rect", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Rect;
  }
});
exports.SVG = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _reactNativeSvg = require("react-native-svg");

var _style = _interopRequireDefault(require("../../dashicon/style.scss"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
var SVG = function SVG(props) {
  // We're using the react-native-classname-to-style plugin, so when a `className` prop is passed it gets converted to `style` here.
  // Given it carries a string (as it was originally className) but an object is expected for `style`,
  // we need to check whether `style` exists and is a string, and convert it to an object
  var styleKeys = new Array();
  var styleValues = new Array();

  if (typeof props.style === 'string' || props.style instanceof String) {
    styleKeys = props.style.split(' ');
    styleKeys.forEach(function (element) {
      var oneStyle = _style.default[element];

      if (oneStyle !== undefined) {
        styleValues.push(oneStyle);
      }
    });
  }

  var safeProps = styleValues.length === 0 ? (0, _objectSpread2.default)({}, (0, _lodash.omit)(props, ['style'])) : (0, _objectSpread2.default)({}, props, {
    style: styleValues
  });
  return (0, _element.createElement)(_reactNativeSvg.Svg, (0, _extends2.default)({
    height: "100%",
    width: "100%"
  }, safeProps));
};

exports.SVG = SVG;
//# sourceMappingURL=index.native.js.map