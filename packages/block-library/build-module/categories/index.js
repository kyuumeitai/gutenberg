import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SVG, Path } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/categories';
export var settings = {
  title: __('Categories'),
  description: __('Display a list of all categories.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), createElement(Path, {
    d: "M12,2l-5.5,9h11L12,2z M12,5.84L13.93,9h-3.87L12,5.84z"
  }), createElement(Path, {
    d: "m17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
  }), createElement(Path, {
    d: "m3 21.5h8v-8h-8v8zm2-6h4v4h-4v-4z"
  })),
  category: 'widgets',
  attributes: {
    align: {
      type: 'string'
    },
    displayAsDropdown: {
      type: 'boolean',
      default: false
    },
    showHierarchy: {
      type: 'boolean',
      default: false
    },
    showPostCounts: {
      type: 'boolean',
      default: false
    }
  },
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align;

    if (['left', 'center', 'right', 'full'].includes(align)) {
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