"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
function TextEditor(_ref) {
  var onExit = _ref.onExit;
  return (0, _element.createElement)("div", {
    className: "edit-post-text-editor"
  }, (0, _element.createElement)("div", {
    className: "edit-post-text-editor__toolbar"
  }, (0, _element.createElement)("h2", null, (0, _i18n.__)('Editing Code')), (0, _element.createElement)(_components.IconButton, {
    onClick: onExit,
    icon: "no-alt",
    shortcut: _keycodes.displayShortcut.secondary('m')
  }, (0, _i18n.__)('Exit Code Editor'))), (0, _element.createElement)("div", {
    className: "edit-post-text-editor__body"
  }, (0, _element.createElement)(_editor.PostTitle, null), (0, _element.createElement)(_editor.PostTextEditor, null)));
}

var _default = (0, _data.withDispatch)(function (dispatch) {
  return {
    onExit: function onExit() {
      dispatch('core/edit-post').switchEditorMode('visual');
    }
  };
})(TextEditor);

exports.default = _default;
//# sourceMappingURL=index.js.map