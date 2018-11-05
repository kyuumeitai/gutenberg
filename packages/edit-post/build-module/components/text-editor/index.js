import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PostTextEditor, PostTitle } from '@wordpress/editor';
import { IconButton } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { displayShortcut } from '@wordpress/keycodes';

function TextEditor(_ref) {
  var onExit = _ref.onExit;
  return createElement("div", {
    className: "edit-post-text-editor"
  }, createElement("div", {
    className: "edit-post-text-editor__toolbar"
  }, createElement("h2", null, __('Editing Code')), createElement(IconButton, {
    onClick: onExit,
    icon: "no-alt",
    shortcut: displayShortcut.secondary('m')
  }, __('Exit Code Editor'))), createElement("div", {
    className: "edit-post-text-editor__body"
  }, createElement(PostTitle, null), createElement(PostTextEditor, null)));
}

export default withDispatch(function (dispatch) {
  return {
    onExit: function onExit() {
      dispatch('core/edit-post').switchEditorMode('visual');
    }
  };
})(TextEditor);
//# sourceMappingURL=index.js.map