import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { G, Path, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/archives';
export var settings = {
  title: __('Archives'),
  description: __('Display a monthly archive of your posts.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(G, null, createElement(Path, {
    d: "M7 11h2v2H7v-2zm14-5v14l-2 2H5l-2-2V6l2-2h1V2h2v2h8V2h2v2h1l2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"
  }))),
  category: 'widgets',
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align;

    if (['left', 'center', 'right'].includes(align)) {
      return {
        'data-align': align
      };
    }
  },
  edit: edit,
  save: function save() {
    // Handled by PHP.
    return null;
  }
};
//# sourceMappingURL=index.js.map