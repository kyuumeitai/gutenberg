"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Slot = exports.Fill = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * Defines as extensibility slot for the Status & Visibility panel.
 */

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('PluginPostStatusInfo'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

exports.Slot = Slot;
exports.Fill = Fill;

var PluginPostStatusInfo = function PluginPostStatusInfo(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return (0, _element.createElement)(Fill, null, (0, _element.createElement)(_components.PanelRow, {
    className: className
  }, children));
};

PluginPostStatusInfo.Slot = Slot;
var _default = PluginPostStatusInfo;
exports.default = _default;
//# sourceMappingURL=index.js.map