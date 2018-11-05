import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { difference } from 'lodash';
/**
 * WordPress dependencies
 */

import { IconButton } from '@wordpress/components';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import PluginBlockSettingsMenuGroup from './plugin-block-settings-menu-group';

var isEverySelectedBlockAllowed = function isEverySelectedBlockAllowed(selected, allowed) {
  return difference(selected, allowed).length === 0;
};
/**
 * Plugins may want to add an item to the menu either for every block
 * or only for the specific ones provided in the `allowedBlocks` component property.
 *
 * If there are multiple blocks selected the item will be rendered if every block
 * is of one allowed type (not necessarily the same).
 *
 * @param {string[]} selectedBlockNames Array containing the names of the blocks selected
 * @param {string[]} allowedBlockNames Array containing the names of the blocks allowed
 * @return {boolean} Whether the item will be rendered or not.
 */


var shouldRenderItem = function shouldRenderItem(selectedBlockNames, allowedBlockNames) {
  return !Array.isArray(allowedBlockNames) || isEverySelectedBlockAllowed(selectedBlockNames, allowedBlockNames);
};

var PluginBlockSettingsMenuItem = function PluginBlockSettingsMenuItem(_ref) {
  var allowedBlocks = _ref.allowedBlocks,
      icon = _ref.icon,
      label = _ref.label,
      onClick = _ref.onClick,
      small = _ref.small,
      role = _ref.role;
  return createElement(PluginBlockSettingsMenuGroup, null, function (_ref2) {
    var selectedBlocks = _ref2.selectedBlocks,
        onClose = _ref2.onClose;

    if (!shouldRenderItem(selectedBlocks, allowedBlocks)) {
      return null;
    }

    return createElement(IconButton, {
      className: "editor-block-settings-menu__control",
      onClick: compose(onClick, onClose),
      icon: icon || 'admin-plugins',
      label: small ? label : undefined,
      role: role
    }, !small && label);
  });
};

export default PluginBlockSettingsMenuItem;
//# sourceMappingURL=plugin-block-settings-menu-item.js.map