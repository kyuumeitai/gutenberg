"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _plugins = require("@wordpress/plugins");

var _compose = require("@wordpress/compose");

var _pinnedPlugins = _interopRequireDefault(require("../../header/pinned-plugins"));

var _ = _interopRequireDefault(require("../"));

var _sidebarHeader = _interopRequireDefault(require("../sidebar-header"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Renders the plugin sidebar component.
 *
 * @param {Object} props Element props.
 *
 * @return {WPElement} Plugin sidebar component.
 */
function PluginSidebar(props) {
  var children = props.children,
      icon = props.icon,
      isActive = props.isActive,
      _props$isPinnable = props.isPinnable,
      isPinnable = _props$isPinnable === void 0 ? true : _props$isPinnable,
      isPinned = props.isPinned,
      sidebarName = props.sidebarName,
      title = props.title,
      togglePin = props.togglePin,
      toggleSidebar = props.toggleSidebar;
  return (0, _element.createElement)(_element.Fragment, null, isPinnable && (0, _element.createElement)(_pinnedPlugins.default, null, isPinned && (0, _element.createElement)(_components.IconButton, {
    icon: icon,
    label: title,
    onClick: toggleSidebar,
    isToggled: isActive,
    "aria-expanded": isActive
  })), (0, _element.createElement)(_.default, {
    name: sidebarName,
    label: (0, _i18n.__)('Editor plugins')
  }, (0, _element.createElement)(_sidebarHeader.default, {
    closeLabel: (0, _i18n.__)('Close plugin')
  }, (0, _element.createElement)("strong", null, title), isPinnable && (0, _element.createElement)(_components.IconButton, {
    icon: isPinned ? 'star-filled' : 'star-empty',
    label: isPinned ? (0, _i18n.__)('Unpin from toolbar') : (0, _i18n.__)('Pin to toolbar'),
    onClick: togglePin,
    isToggled: isPinned,
    "aria-expanded": isPinned
  })), (0, _element.createElement)(_components.Panel, null, children)));
}

var _default = (0, _compose.compose)((0, _plugins.withPluginContext)(function (context, ownProps) {
  return {
    icon: ownProps.icon || context.icon,
    sidebarName: "".concat(context.name, "/").concat(ownProps.name)
  };
}), (0, _data.withSelect)(function (select, _ref) {
  var sidebarName = _ref.sidebarName;

  var _select = select('core/edit-post'),
      getActiveGeneralSidebarName = _select.getActiveGeneralSidebarName,
      isPluginItemPinned = _select.isPluginItemPinned;

  return {
    isActive: getActiveGeneralSidebarName() === sidebarName,
    isPinned: isPluginItemPinned(sidebarName)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref2) {
  var isActive = _ref2.isActive,
      sidebarName = _ref2.sidebarName;

  var _dispatch = dispatch('core/edit-post'),
      closeGeneralSidebar = _dispatch.closeGeneralSidebar,
      openGeneralSidebar = _dispatch.openGeneralSidebar,
      togglePinnedPluginItem = _dispatch.togglePinnedPluginItem;

  return {
    togglePin: function togglePin() {
      togglePinnedPluginItem(sidebarName);
    },
    toggleSidebar: function toggleSidebar() {
      if (isActive) {
        closeGeneralSidebar();
      } else {
        openGeneralSidebar(sidebarName);
      }
    }
  };
}))(PluginSidebar);

exports.default = _default;
//# sourceMappingURL=index.js.map