import { createElement } from "@wordpress/element";

/**
 * WordPress Dependencies
 */
import { MenuGroup } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { ifViewportMatches } from '@wordpress/viewport';
/**
 * Internal dependencies
 */

import FeatureToggle from '../feature-toggle';

function WritingMenu(_ref) {
  var onClose = _ref.onClose;
  return createElement(MenuGroup, {
    label: _x('View', 'noun')
  }, createElement(FeatureToggle, {
    feature: "fixedToolbar",
    label: __('Unified Toolbar'),
    info: __('Access all block and document tools in a single place'),
    onToggle: onClose
  }), createElement(FeatureToggle, {
    feature: "focusMode",
    label: __('Spotlight Mode'),
    info: __('Focus on one block at a time'),
    onToggle: onClose
  }), createElement(FeatureToggle, {
    feature: "fullscreenMode",
    label: __('Fullscreen Mode'),
    info: __('Work without distraction'),
    onToggle: onClose
  }));
}

export default ifViewportMatches('medium')(WritingMenu);
//# sourceMappingURL=index.js.map