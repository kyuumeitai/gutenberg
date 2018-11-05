"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _plugins = require("@wordpress/plugins");

var _copyContentMenuItem = _interopRequireDefault(require("./copy-content-menu-item"));

var _keyboardShortcutsHelpMenuItem = _interopRequireDefault(require("./keyboard-shortcuts-help-menu-item"));

var _toolsMoreMenuGroup = _interopRequireDefault(require("../components/header/tools-more-menu-group"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
(0, _plugins.registerPlugin)('edit-post', {
  render: function render() {
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_toolsMoreMenuGroup.default, null, function (_ref) {
      var onClose = _ref.onClose;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuItem, {
        role: "menuitem",
        href: "edit.php?post_type=wp_block"
      }, (0, _i18n.__)('Manage All Reusable Blocks')), (0, _element.createElement)(_keyboardShortcutsHelpMenuItem.default, {
        onSelect: onClose
      }), (0, _element.createElement)(_copyContentMenuItem.default, null));
    }));
  }
});
//# sourceMappingURL=index.js.map