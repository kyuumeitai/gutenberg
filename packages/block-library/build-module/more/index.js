import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { compact } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { Path, G, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/more';
export var settings = {
  title: _x('More', 'block name'),
  description: __('Want to show only an excerpt of this post on your home page? Use this block to define where you want the separation.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(G, null, createElement(Path, {
    d: "M2 9v2h19V9H2zm0 6h5v-2H2v2zm7 0h5v-2H9v2zm7 0h5v-2h-5v2z"
  }))),
  category: 'layout',
  supports: {
    customClassName: false,
    className: false,
    html: false,
    multiple: false
  },
  attributes: {
    customText: {
      type: 'string'
    },
    noTeaser: {
      type: 'boolean',
      default: false
    }
  },
  transforms: {
    from: [{
      type: 'raw',
      schema: {
        'wp-block': {
          attributes: ['data-block']
        }
      },
      isMatch: function isMatch(node) {
        return node.dataset && node.dataset.block === 'core/more';
      },
      transform: function transform(node) {
        var _node$dataset = node.dataset,
            customText = _node$dataset.customText,
            noTeaser = _node$dataset.noTeaser;
        var attrs = {}; // Don't copy unless defined and not an empty string

        if (customText) {
          attrs.customText = customText;
        } // Special handling for boolean


        if (noTeaser === '') {
          attrs.noTeaser = true;
        }

        return createBlock('core/more', attrs);
      }
    }]
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var customText = attributes.customText,
        noTeaser = attributes.noTeaser;
    var moreTag = customText ? "<!--more ".concat(customText, "-->") : '<!--more-->';
    var noTeaserTag = noTeaser ? '<!--noteaser-->' : '';
    return createElement(RawHTML, null, compact([moreTag, noTeaserTag]).join('\n'));
  }
};
//# sourceMappingURL=index.js.map