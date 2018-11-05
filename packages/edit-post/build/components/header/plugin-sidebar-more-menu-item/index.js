"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _plugins = require("@wordpress/plugins");

var _pluginsMoreMenuGroup = _interopRequireDefault(require("../plugins-more-menu-group"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PluginSidebarMoreMenuItem = function PluginSidebarMoreMenuItem(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick;
  return (0, _element.createElement)(_pluginsMoreMenuGroup.default, null, function (fillProps) {
    return (0, _element.createElement)(_components.MenuItem, {
      icon: isSelected ? 'yes' : icon,
      isSelected: isSelected,
      role: "menuitemcheckbox",
      onClick: (0, _compose.compose)(onClick, fillProps.onClose)
    }, children);
  });
};

var _default = (0, _compose.compose)((0, _plugins.withPluginContext)(function (context, ownProps) {
  return {
    icon: ownProps.icon || context.icon,
    sidebarName: "".concat(context.name, "/").concat(ownProps.target)
  };
}), (0, _data.withSelect)(function (select, _ref2) {
  var sidebarName = _ref2.sidebarName;

  var _select = select('core/edit-post'),
      getActiveGeneralSidebarName = _select.getActiveGeneralSidebarName;

  return {
    isSelected: getActiveGeneralSidebarName() === sidebarName
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var isSelected = _ref3.isSelected,
      sidebarName = _ref3.sidebarName;

  var _dispatch = dispatch('core/edit-post'),
      closeGeneralSidebar = _dispatch.closeGeneralSidebar,
      openGeneralSidebar = _dispatch.openGeneralSidebar;

  var onClick = isSelected ? closeGeneralSidebar : function () {
    return openGeneralSidebar(sidebarName);
  };
  return {
    onClick: onClick
  };
}))(PluginSidebarMoreMenuItem);

exports.default = _default;
//# sourceMappingURL=index.js.map