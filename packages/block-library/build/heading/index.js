"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLevelFromHeadingNodeName = getLevelFromHeadingNodeName;
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Given a node name string for a heading node, returns its numeric level.
 *
 * @param {string} nodeName Heading node name.
 *
 * @return {number} Heading level.
 */
function getLevelFromHeadingNodeName(nodeName) {
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
var name = 'core/heading';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Heading'),
  description: (0, _i18n.__)('Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.'),
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.Path, {
    d: "M5 4v3h5.5v12h3V7H19V4z"
  }), (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  })),
  category: 'common',
  keywords: [(0, _i18n.__)('title'), (0, _i18n.__)('subtitle')],
  supports: supports,
  attributes: schema,
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref) {
        var content = _ref.content;
        return (0, _blocks.createBlock)('core/heading', {
          content: content
        });
      }
    }, {
      type: 'raw',
      selector: 'h1,h2,h3,h4,h5,h6',
      schema: {
        h1: {
          children: (0, _blocks.getPhrasingContentSchema)()
        },
        h2: {
          children: (0, _blocks.getPhrasingContentSchema)()
        },
        h3: {
          children: (0, _blocks.getPhrasingContentSchema)()
        },
        h4: {
          children: (0, _blocks.getPhrasingContentSchema)()
        },
        h5: {
          children: (0, _blocks.getPhrasingContentSchema)()
        },
        h6: {
          children: (0, _blocks.getPhrasingContentSchema)()
        }
      },
      transform: function transform(node) {
        return (0, _blocks.createBlock)('core/heading', (0, _objectSpread2.default)({}, (0, _blocks.getBlockAttributes)((0, _blocks.getBlockType)('core/heading'), node.outerHTML), {
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
        return (0, _blocks.createBlock)('core/heading', {
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
        return (0, _blocks.createBlock)('core/paragraph', {
          content: content
        });
      }
    }]
  },
  deprecated: [{
    supports: supports,
    attributes: (0, _objectSpread2.default)({}, (0, _lodash.omit)(schema, ['level']), {
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
          migratedAttributes = (0, _objectWithoutProperties2.default)(attributes, ["nodeName"]);
      return (0, _objectSpread2.default)({}, migratedAttributes, {
        level: getLevelFromHeadingNodeName(nodeName)
      });
    },
    save: function save(_ref4) {
      var attributes = _ref4.attributes;
      var align = attributes.align,
          nodeName = attributes.nodeName,
          content = attributes.content;
      return (0, _element.createElement)(_editor.RichText.Content, {
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
  edit: _edit.default,
  save: function save(_ref5) {
    var attributes = _ref5.attributes;
    var align = attributes.align,
        level = attributes.level,
        content = attributes.content;
    var tagName = 'h' + level;
    return (0, _element.createElement)(_editor.RichText.Content, {
      tagName: tagName,
      style: {
        textAlign: align
      },
      value: content
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map