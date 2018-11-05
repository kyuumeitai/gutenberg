import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { MenuItem } from '@wordpress/components';
import { withPluginContext } from '@wordpress/plugins';
/**
 * Internal dependencies
 */

import PluginsMoreMenuGroup from '../plugins-more-menu-group';

var PluginSidebarMoreMenuItem = function PluginSidebarMoreMenuItem(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick;
  return createElement(PluginsMoreMenuGroup, null, function (fillProps) {
    return createElement(MenuItem, {
      icon: isSelected ? 'yes' : icon,
      isSelected: isSelected,
      role: "menuitemcheckbox",
      onClick: compose(onClick, fillProps.onClose)
    }, children);
  });
};

export default compose(withPluginContext(function (context, ownProps) {
  return {
    icon: ownProps.icon || context.icon,
    sidebarName: "".concat(context.name, "/").concat(ownProps.target)
  };
}), withSelect(function (select, _ref2) {
  var sidebarName = _ref2.sidebarName;

  var _select = select('core/edit-post'),
      getActiveGeneralSidebarName = _select.getActiveGeneralSidebarName;

  return {
    isSelected: getActiveGeneralSidebarName() === sidebarName
  };
}), withDispatch(function (dispatch, _ref3) {
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
//# sourceMappingURL=index.js.map