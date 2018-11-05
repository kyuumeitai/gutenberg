"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _ = _interopRequireDefault(require("./"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MenuIcon = (0, _element.createElement)(_components.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "20",
  height: "20"
}, (0, _element.createElement)(_components.Path, {
  d: "M5 5H3v2h2V5zm3 8h11v-2H8v2zm9-8H6v2h11V5zM7 11H5v2h2v-2zm0 8h2v-2H7v2zm3-2v2h11v-2H10z"
}));

function BlockNavigationDropdown() {
  return (0, _element.createElement)(_components.Dropdown, {
    renderToggle: function renderToggle(_ref) {
      var isOpen = _ref.isOpen,
          onToggle = _ref.onToggle;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: (0, _defineProperty2.default)({}, _keycodes.rawShortcut.access('o'), onToggle)
      }), (0, _element.createElement)(_components.IconButton, {
        icon: MenuIcon,
        "aria-expanded": isOpen,
        onClick: onToggle,
        label: (0, _i18n.__)('Block Navigation'),
        className: "editor-block-navigation",
        shortcut: _keycodes.displayShortcut.access('o')
      }));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return (0, _element.createElement)(_.default, {
        onSelect: onClose
      });
    }
  });
}

var _default = BlockNavigationDropdown;
exports.default = _default;
//# sourceMappingURL=dropdown.js.map