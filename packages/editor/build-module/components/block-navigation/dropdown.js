import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { IconButton, Dropdown, SVG, Path, KeyboardShortcuts } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import BlockNavigation from './';
var MenuIcon = createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "20",
  height: "20"
}, createElement(Path, {
  d: "M5 5H3v2h2V5zm3 8h11v-2H8v2zm9-8H6v2h11V5zM7 11H5v2h2v-2zm0 8h2v-2H7v2zm3-2v2h11v-2H10z"
}));

function BlockNavigationDropdown() {
  return createElement(Dropdown, {
    renderToggle: function renderToggle(_ref) {
      var isOpen = _ref.isOpen,
          onToggle = _ref.onToggle;
      return createElement(Fragment, null, createElement(KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: _defineProperty({}, rawShortcut.access('o'), onToggle)
      }), createElement(IconButton, {
        icon: MenuIcon,
        "aria-expanded": isOpen,
        onClick: onToggle,
        label: __('Block Navigation'),
        className: "editor-block-navigation",
        shortcut: displayShortcut.access('o')
      }));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return createElement(BlockNavigation, {
        onSelect: onClose
      });
    }
  });
}

export default BlockNavigationDropdown;
//# sourceMappingURL=dropdown.js.map