import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { G, Path, SVG } from '@wordpress/components';
/**
 * Internal dependencies.
 */

import edit from './edit';
export var name = 'core/latest-comments';
export var settings = {
  title: __('Latest Comments'),
  description: __('Display a list of your most recent comments.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(G, null, createElement(Path, {
    d: "M22 4l-2-2H4L2 4v12l2 2h14l4 4V4zm-2 0v13l-1-1H4V4h16z"
  }), createElement(Path, {
    d: "M6 12h12v2H6zM6 9h12v2H6zM6 6h12v2H6z"
  }))),
  category: 'widgets',
  keywords: [__('recent comments')],
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align; // TODO: Use consistent values across the app;
    // see: https://github.com/WordPress/gutenberg/issues/7908.

    if (['left', 'center', 'right', 'wide', 'full'].includes(align)) {
      return {
        'data-align': align
      };
    }
  },
  edit: edit,
  save: function save() {
    return null;
  }
};
//# sourceMappingURL=index.js.map