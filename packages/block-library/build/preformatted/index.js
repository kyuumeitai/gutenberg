"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

/**
 * WordPress
 */
var name = 'core/preformatted';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Preformatted'),
  description: (0, _i18n.__)('Add text that respects your spacing and tabs, and also allows styling.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Path, {
    d: "M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,18H4V6h16V18z"
  }), (0, _element.createElement)(_components.Rect, {
    x: "6",
    y: "10",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "6",
    y: "14",
    width: "8",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "16",
    y: "14",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "10",
    y: "10",
    width: "8",
    height: "2"
  })),
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'pre',
      default: ''
    }
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/code', 'core/paragraph'],
      transform: function transform(_ref) {
        var content = _ref.content;
        return (0, _blocks.createBlock)('core/preformatted', {
          content: content
        });
      }
    }, {
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'PRE' && !(node.children.length === 1 && node.firstChild.nodeName === 'CODE');
      },
      schema: {
        pre: {
          children: (0, _blocks.getPhrasingContentSchema)()
        }
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/paragraph', attributes);
      }
    }]
  },
  edit: function edit(_ref2) {
    var attributes = _ref2.attributes,
        mergeBlocks = _ref2.mergeBlocks,
        setAttributes = _ref2.setAttributes,
        className = _ref2.className;
    var content = attributes.content;
    return (0, _element.createElement)(_editor.RichText, {
      tagName: "pre",
      value: content,
      onChange: function onChange(nextContent) {
        setAttributes({
          content: nextContent
        });
      },
      placeholder: (0, _i18n.__)('Write preformatted text…'),
      wrapperClassName: className,
      onMerge: mergeBlocks
    });
  },
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    var content = attributes.content;
    return (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "pre",
      value: content
    });
  },
  merge: function merge(attributes, attributesToMerge) {
    return {
      content: attributes.content + attributesToMerge.content
    };
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map