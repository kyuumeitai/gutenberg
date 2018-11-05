"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
function EditorHistoryRedo(_ref) {
  var hasRedo = _ref.hasRedo,
      redo = _ref.redo;
  return (0, _element.createElement)(_components.IconButton, {
    icon: "redo",
    label: (0, _i18n.__)('Redo'),
    shortcut: _keycodes.displayShortcut.primaryShift('z'),
    "aria-disabled": !hasRedo,
    onClick: redo,
    className: "editor-history__redo"
  });
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    hasRedo: select('core/editor').hasEditorRedo()
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  return {
    redo: function redo() {
      // If there are no redo levels this is a no-op, because we don't actually
      // disable the button.
      // See: https://github.com/WordPress/gutenberg/issues/3486
      if (ownProps.hasRedo) {
        dispatch('core/editor').redo();
      }
    }
  };
})])(EditorHistoryRedo);

exports.default = _default;
//# sourceMappingURL=redo.js.map