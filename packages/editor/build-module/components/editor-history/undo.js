import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { displayShortcut } from '@wordpress/keycodes';

function EditorHistoryUndo(_ref) {
  var hasUndo = _ref.hasUndo,
      undo = _ref.undo;
  return createElement(IconButton, {
    icon: "undo",
    label: __('Undo'),
    shortcut: displayShortcut.primary('z'),
    "aria-disabled": !hasUndo,
    onClick: undo,
    className: "editor-history__undo"
  });
}

export default compose([withSelect(function (select) {
  return {
    hasUndo: select('core/editor').hasEditorUndo()
  };
}), withDispatch(function (dispatch, ownProps) {
  return {
    undo: function undo() {
      // If there are no undo levels this is a no-op, because we don't actually
      // disable the button.
      // See: https://github.com/WordPress/gutenberg/issues/3486
      if (ownProps.hasUndo) {
        dispatch('core/editor').undo();
      }
    }
  };
})])(EditorHistoryUndo);
//# sourceMappingURL=undo.js.map