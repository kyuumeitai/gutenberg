import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { BlockList, CopyHandler, PostTitle, WritingFlow, ObserveTyping, EditorGlobalKeyboardShortcuts, BlockSelectionClearer, MultiSelectScrollIntoView, _BlockSettingsMenuFirstItem, _BlockSettingsMenuPluginsExtension } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import BlockInspectorButton from './block-inspector-button';
import PluginBlockSettingsMenuGroup from '../block-settings-menu/plugin-block-settings-menu-group';

function VisualEditor() {
  return createElement(BlockSelectionClearer, {
    className: "edit-post-visual-editor editor-styles-wrapper"
  }, createElement(EditorGlobalKeyboardShortcuts, null), createElement(CopyHandler, null), createElement(MultiSelectScrollIntoView, null), createElement(WritingFlow, null, createElement(ObserveTyping, null, createElement(PostTitle, null), createElement(BlockList, null))), createElement(_BlockSettingsMenuFirstItem, null, function (_ref) {
    var onClose = _ref.onClose;
    return createElement(BlockInspectorButton, {
      onClick: onClose
    });
  }), createElement(_BlockSettingsMenuPluginsExtension, null, function (_ref2) {
    var clientIds = _ref2.clientIds,
        onClose = _ref2.onClose;
    return createElement(PluginBlockSettingsMenuGroup.Slot, {
      fillProps: {
        clientIds: clientIds,
        onClose: onClose
      }
    });
  }));
}

export default VisualEditor;
//# sourceMappingURL=index.js.map