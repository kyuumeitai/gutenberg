import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import NavigableToolbar from '../navigable-toolbar';
import { BlockToolbar } from '../';

function BlockContextualToolbar() {
  return createElement(NavigableToolbar, {
    className: "editor-block-contextual-toolbar",
    "aria-label": __('Block Toolbar')
  }, createElement(BlockToolbar, null));
}

export default BlockContextualToolbar;
//# sourceMappingURL=block-contextual-toolbar.js.map