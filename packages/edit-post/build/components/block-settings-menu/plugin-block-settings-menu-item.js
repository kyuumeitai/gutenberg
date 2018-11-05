"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _pluginBlockSettingsMenuGroup = _interopRequireDefault(require("./plugin-block-settings-menu-group"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var isEverySelectedBlockAllowed = function isEverySelectedBlockAllowed(selected, allowed) {
  return (0, _lodash.difference)(selected, allowed).length === 0;
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
  return (0, _element.createElement)(_pluginBlockSettingsMenuGroup.default, null, function (_ref2) {
    var selectedBlocks = _ref2.selectedBlocks,
        onClose = _ref2.onClose;

    if (!shouldRenderItem(selectedBlocks, allowedBlocks)) {
      return null;
    }

    return (0, _element.createElement)(_components.IconButton, {
      className: "editor-block-settings-menu__control",
      onClick: (0, _compose.compose)(onClick, onClose),
      icon: icon || 'admin-plugins',
      label: small ? label : undefined,
      role: role
    }, !small && label);
  });
};

var _default = PluginBlockSettingsMenuItem;
exports.default = _default;
//# sourceMappingURL=plugin-block-settings-menu-item.js.map