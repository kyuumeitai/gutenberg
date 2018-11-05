"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _colorPalette = _interopRequireDefault(require("../color-palette"));

var _withColorContext = _interopRequireDefault(require("../color-palette/with-color-context"));

var _colors = require("../colors");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function PanelColor(_ref) {
  var colors = _ref.colors,
      title = _ref.title,
      colorValue = _ref.colorValue,
      initialOpen = _ref.initialOpen,
      props = (0, _objectWithoutProperties2.default)(_ref, ["colors", "title", "colorValue", "initialOpen"]);
  (0, _deprecated.default)('wp.editor.PanelColor', {
    version: '4.3',
    alternative: 'wp.editor.PanelColorSettings',
    plugin: 'Gutenberg'
  });
  var colorObject = (0, _colors.getColorObjectByColorValue)(colors, colorValue);
  var colorName = colorObject && colorObject.name;
  return (0, _element.createElement)(_components.PanelColor, {
    title: title,
    colorName: colorName,
    colorValue: colorValue,
    initialOpen: initialOpen
  }, (0, _element.createElement)(_colorPalette.default, (0, _extends2.default)({
    value: colorValue
  }, (0, _lodash.omit)(props, ['disableCustomColors']))));
}

var _default = (0, _compose.compose)([_withColorContext.default, (0, _compose.ifCondition)(function (_ref2) {
  var hasColorsToChoose = _ref2.hasColorsToChoose;
  return hasColorsToChoose;
})])(PanelColor);

exports.default = _default;
//# sourceMappingURL=index.js.map