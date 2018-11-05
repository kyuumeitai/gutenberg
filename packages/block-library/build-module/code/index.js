import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { Path, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/code';
export var settings = {
  title: __('Code'),
  description: __('Display code snippets that respect your spacing and tabs.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), createElement(Path, {
    d: "M9.4,16.6L4.8,12l4.6-4.6L8,6l-6,6l6,6L9.4,16.6z M14.6,16.6l4.6-4.6l-4.6-4.6L16,6l6,6l-6,6L14.6,16.6z"
  })),
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'text',
      selector: 'code'
    }
  },
  supports: {
    html: false
  },
  transforms: {
    from: [{
      type: 'pattern',
      trigger: 'enter',
      regExp: /^```$/,
      transform: function transform() {
        return createBlock('core/code');
      }
    }, {
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'PRE' && node.children.length === 1 && node.firstChild.nodeName === 'CODE';
      },
      schema: {
        pre: {
          children: {
            code: {
              children: {
                '#text': {}
              }
            }
          }
        }
      }
    }]
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return createElement("pre", null, createElement("code", null, attributes.content));
  }
};
//# sourceMappingURL=index.js.map