"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var name = 'core/subhead';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Subheading (deprecated)'),
  description: (0, _i18n.__)('This block is deprecated. Please use the Paragraph block instead.'),
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.Path, {
    d: "M7.1 6l-.5 3h4.5L9.4 19h3l1.8-10h4.5l.5-3H7.1z"
  })),
  category: 'common',
  supports: {
    // Hide from inserter as this block is deprecated.
    inserter: false,
    multiple: false
  },
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'p'
    },
    align: {
      type: 'string'
    }
  },
  transforms: {
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/paragraph', attributes);
      }
    }]
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var align = attributes.align,
        content = attributes.content,
        placeholder = attributes.placeholder;
    (0, _deprecated.default)('The Subheading block', {
      alternative: 'the Paragraph block',
      plugin: 'Gutenberg'
    });
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_editor.AlignmentToolbar, {
      value: align,
      onChange: function onChange(nextAlign) {
        setAttributes({
          align: nextAlign
        });
      }
    })), (0, _element.createElement)(_editor.RichText, {
      tagName: "p",
      value: content,
      onChange: function onChange(nextContent) {
        setAttributes({
          content: nextContent
        });
      },
      style: {
        textAlign: align
      },
      className: className,
      placeholder: placeholder || (0, _i18n.__)('Write subheading…')
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var align = attributes.align,
        content = attributes.content;
    return (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "p",
      className: className,
      style: {
        textAlign: align
      },
      value: content
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map