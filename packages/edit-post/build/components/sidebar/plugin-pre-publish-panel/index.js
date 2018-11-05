"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('PluginPrePublishPanel'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var PluginPrePublishPanel = function PluginPrePublishPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      title = _ref.title,
      _ref$initialOpen = _ref.initialOpen,
      initialOpen = _ref$initialOpen === void 0 ? false : _ref$initialOpen;
  return (0, _element.createElement)(Fill, null, (0, _element.createElement)(_components.PanelBody, {
    className: className,
    initialOpen: initialOpen || !title,
    title: title
  }, children));
};

PluginPrePublishPanel.Slot = Slot;
var _default = PluginPrePublishPanel;
exports.default = _default;
//# sourceMappingURL=index.js.map