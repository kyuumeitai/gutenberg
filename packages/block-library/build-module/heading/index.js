import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { createBlock, getPhrasingContentSchema, getBlockAttributes, getBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';
import { Path, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
/**
 * Given a node name string for a heading node, returns its numeric level.
 *
 * @param {string} nodeName Heading node name.
 *
 * @return {number} Heading level.
 */

export function getLevelFromHeadingNodeName(nodeName) {
  return Number(nodeName.substr(1));
}
var supports = {
  className: false,
  anchor: true
};
var schema = {
  content: {
    type: 'string',
    source: 'html',
    selector: 'h1,h2,h3,h4,h5,h6',
    default: ''
  },
  level: {
    type: 'number',
    default: 2
  },
  align: {
    type: 'string'
  },
  placeholder: {
    type: 'string'
  }
};
export var name = 'core/heading';
export var settings = {
  title: __('Heading'),
  description: __('Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.'),
  icon: createElement(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement(Path, {
    d: "M5 4v3h5.5v12h3V7H19V4z"
  }), createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  })),
  category: 'common',
  keywords: [__('title'), __('subtitle')],
  supports: supports,
  attributes: schema,
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref) {
        var content = _ref.content;
        return createBlock('core/heading', {
          content: content
        });
      }
    }, {
      type: 'raw',
      selector: 'h1,h2,h3,h4,h5,h6',
      schema: {
        h1: {
          children: getPhrasingContentSchema()
        },
        h2: {
          children: getPhrasingContentSchema()
        },
        h3: {
          children: getPhrasingContentSchema()
        },
        h4: {
          children: getPhrasingContentSchema()
        },
        h5: {
          children: getPhrasingContentSchema()
        },
        h6: {
          children: getPhrasingContentSchema()
        }
      },
      transform: function transform(node) {
        return createBlock('core/heading', _objectSpread({}, getBlockAttributes(getBlockType('core/heading'), node.outerHTML), {
          level: getLevelFromHeadingNodeName(node.nodeName)
        }));
      }
    }, {
      type: 'pattern',
      regExp: /^(#{2,6})\s/,
      transform: function transform(_ref2) {
        var content = _ref2.content,
            match = _ref2.match;
        var level = match[1].length;
        return createBlock('core/heading', {
          level: level,
          content: content
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref3) {
        var content = _ref3.content;
        return createBlock('core/paragraph', {
          content: content
        });
      }
    }]
  },
  deprecated: [{
    supports: supports,
    attributes: _objectSpread({}, omit(schema, ['level']), {
      nodeName: {
        type: 'string',
        source: 'property',
        selector: 'h1,h2,h3,h4,h5,h6',
        property: 'nodeName',
        default: 'H2'
      }
    }),
    migrate: function migrate(attributes) {
      var nodeName = attributes.nodeName,
          migratedAttributes = _objectWithoutProperties(attributes, ["nodeName"]);

      return _objectSpread({}, migratedAttributes, {
        level: getLevelFromHeadingNodeName(nodeName)
      });
    },
    save: function save(_ref4) {
      var attributes = _ref4.attributes;
      var align = attributes.align,
          nodeName = attributes.nodeName,
          content = attributes.content;
      return createElement(RichText.Content, {
        tagName: nodeName.toLowerCase(),
        style: {
          textAlign: align
        },
        value: content
      });
    }
  }],
  merge: function merge(attributes, attributesToMerge) {
    return {
      content: attributes.content + attributesToMerge.content
    };
  },
  edit: edit,
  save: function save(_ref5) {
    var attributes = _ref5.attributes;
    var align = attributes.align,
        level = attributes.level,
        content = attributes.content;
    var tagName = 'h' + level;
    return createElement(RichText.Content, {
      tagName: tagName,
      style: {
        textAlign: align
      },
      value: content
    });
  }
};
//# sourceMappingURL=index.js.map