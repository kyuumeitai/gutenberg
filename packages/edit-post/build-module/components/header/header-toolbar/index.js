import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withViewportMatch } from '@wordpress/viewport';
import { DotTip } from '@wordpress/nux';
import { __ } from '@wordpress/i18n';
import { Inserter, BlockToolbar, TableOfContents, EditorHistoryRedo, EditorHistoryUndo, NavigableToolbar, BlockNavigationDropdown } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import FullscreenModeClose from '../fullscreen-mode-close';

function HeaderToolbar(_ref) {
  var hasFixedToolbar = _ref.hasFixedToolbar,
      isLargeViewport = _ref.isLargeViewport,
      mode = _ref.mode;
  var toolbarAriaLabel = hasFixedToolbar ? __('Document and block tools') : __('Document tools');
  return createElement(NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, createElement(FullscreenModeClose, null), createElement("div", null, createElement(Inserter, {
    disabled: mode !== 'visual',
    position: "bottom right"
  }), createElement(DotTip, {
    tipId: "core/editor.inserter"
  }, __('Welcome to the wonderful world of blocks! Click the “+” (“Add block”) button to add a new block. There are blocks available for all kinds of content: you can insert text, headings, images, lists, and lots more!'))), createElement(EditorHistoryUndo, null), createElement(EditorHistoryRedo, null), createElement(TableOfContents, null), createElement(BlockNavigationDropdown, null), hasFixedToolbar && isLargeViewport && createElement("div", {
    className: "edit-post-header-toolbar__block-toolbar"
  }, createElement(BlockToolbar, null)));
}

export default compose([withSelect(function (select) {
  return {
    hasFixedToolbar: select('core/edit-post').isFeatureActive('fixedToolbar'),
    mode: select('core/edit-post').getEditorMode()
  };
}), withViewportMatch({
  isLargeViewport: 'medium'
})])(HeaderToolbar);
//# sourceMappingURL=index.js.map