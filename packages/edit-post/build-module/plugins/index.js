import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
/**
 * Internal dependencies
 */

import CopyContentMenuItem from './copy-content-menu-item';
import KeyboardShortcutsHelpMenuItem from './keyboard-shortcuts-help-menu-item';
import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';
registerPlugin('edit-post', {
  render: function render() {
    return createElement(Fragment, null, createElement(ToolsMoreMenuGroup, null, function (_ref) {
      var onClose = _ref.onClose;
      return createElement(Fragment, null, createElement(MenuItem, {
        role: "menuitem",
        href: "edit.php?post_type=wp_block"
      }, __('Manage All Reusable Blocks')), createElement(KeyboardShortcutsHelpMenuItem, {
        onSelect: onClose
      }), createElement(CopyContentMenuItem, null));
    }));
  }
});
//# sourceMappingURL=index.js.map