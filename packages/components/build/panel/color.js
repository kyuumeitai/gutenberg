"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _i18n = require("@wordpress/i18n");

var _body = _interopRequireDefault(require("./body"));

var _colorIndicator = _interopRequireDefault(require("../color-indicator"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function PanelColor(_ref) {
  var colorValue = _ref.colorValue,
      colorName = _ref.colorName,
      title = _ref.title,
      props = (0, _objectWithoutProperties2.default)(_ref, ["colorValue", "colorName", "title"]);
  (0, _deprecated.default)('wp.components.PanelColor', {
    version: '4.3',
    alternative: 'wp.editor.PanelColorSettings',
    plugin: 'Gutenberg'
  }); // translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".

  var currentColorLabel = (0, _i18n.sprintf)((0, _i18n.__)('(current color: %s)'), colorName || colorValue);
  return (0, _element.createElement)(_body.default, (0, _extends2.default)({}, props, {
    title: [(0, _element.createElement)("span", {
      className: "components-panel__color-title",
      key: "title"
    }, title), colorValue && (0, _element.createElement)(_colorIndicator.default, {
      key: "color",
      className: "components-panel__color-indicator",
      "aria-label": currentColorLabel,
      colorValue: colorValue
    })]
  }));
}

var _default = PanelColor;
exports.default = _default;
//# sourceMappingURL=color.js.map