"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * WordPress Dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('Sidebar'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;
/**
 * Renders a sidebar with its content.
 *
 * @return {Object} The rendered sidebar.
 */


var Sidebar = function Sidebar(_ref) {
  var children = _ref.children,
      label = _ref.label;
  return (0, _element.createElement)(Fill, null, (0, _element.createElement)("div", {
    className: "edit-post-sidebar",
    role: "region",
    "aria-label": label,
    tabIndex: "-1"
  }, children));
};

var WrappedSidebar = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
  var name = _ref2.name;
  return {
    isActive: select('core/edit-post').getActiveGeneralSidebarName() === name
  };
}), (0, _compose.ifCondition)(function (_ref3) {
  var isActive = _ref3.isActive;
  return isActive;
}), _components.withFocusReturn)(Sidebar);
WrappedSidebar.Slot = Slot;
var _default = WrappedSidebar;
exports.default = _default;
//# sourceMappingURL=index.js.map