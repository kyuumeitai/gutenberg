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
var _createSlotFill = (0, _components.createSlotFill)('PluginPostPublishPanel'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var PluginPostPublishPanel = function PluginPostPublishPanel(_ref) {
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

PluginPostPublishPanel.Slot = Slot;
var _default = PluginPostPublishPanel;
exports.default = _default;
//# sourceMappingURL=index.js.map