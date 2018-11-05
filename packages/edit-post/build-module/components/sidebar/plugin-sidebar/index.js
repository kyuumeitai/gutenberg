import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { IconButton, Panel } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withPluginContext } from '@wordpress/plugins';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import PinnedPlugins from '../../header/pinned-plugins';
import Sidebar from '../';
import SidebarHeader from '../sidebar-header';
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
  return createElement(Fragment, null, isPinnable && createElement(PinnedPlugins, null, isPinned && createElement(IconButton, {
    icon: icon,
    label: title,
    onClick: toggleSidebar,
    isToggled: isActive,
    "aria-expanded": isActive
  })), createElement(Sidebar, {
    name: sidebarName,
    label: __('Editor plugins')
  }, createElement(SidebarHeader, {
    closeLabel: __('Close plugin')
  }, createElement("strong", null, title), isPinnable && createElement(IconButton, {
    icon: isPinned ? 'star-filled' : 'star-empty',
    label: isPinned ? __('Unpin from toolbar') : __('Pin to toolbar'),
    onClick: togglePin,
    isToggled: isPinned,
    "aria-expanded": isPinned
  })), createElement(Panel, null, children)));
}

export default compose(withPluginContext(function (context, ownProps) {
  return {
    icon: ownProps.icon || context.icon,
    sidebarName: "".concat(context.name, "/").concat(ownProps.name)
  };
}), withSelect(function (select, _ref) {
  var sidebarName = _ref.sidebarName;

  var _select = select('core/edit-post'),
      getActiveGeneralSidebarName = _select.getActiveGeneralSidebarName,
      isPluginItemPinned = _select.isPluginItemPinned;

  return {
    isActive: getActiveGeneralSidebarName() === sidebarName,
    isPinned: isPluginItemPinned(sidebarName)
  };
}), withDispatch(function (dispatch, _ref2) {
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
//# sourceMappingURL=index.js.map