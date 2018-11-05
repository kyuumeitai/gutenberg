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
var name = 'core/verse';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Verse'),
  description: (0, _i18n.__)('Insert poetry. Use special spacing formats. Or quote song lyrics.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M3 17v4h4l11-11-4-4L3 17zm3 2H5v-1l9-9 1 1-9 9zM21 6l-3-3h-1l-2 2 4 4 2-2V6z"
  })),
  category: 'formatting',
  keywords: [(0, _i18n.__)('poetry')],
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'pre',
      default: ''
    },
    textAlign: {
      type: 'string'
    }
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/verse', attributes);
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
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className,
        mergeBlocks = _ref.mergeBlocks;
    var textAlign = attributes.textAlign,
        content = attributes.content;
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_editor.AlignmentToolbar, {
      value: textAlign,
      onChange: function onChange(nextAlign) {
        setAttributes({
          textAlign: nextAlign
        });
      }
    })), (0, _element.createElement)(_editor.RichText, {
      tagName: "pre",
      value: content,
      onChange: function onChange(nextContent) {
        setAttributes({
          content: nextContent
        });
      },
      style: {
        textAlign: textAlign
      },
      placeholder: (0, _i18n.__)('Write…'),
      wrapperClassName: className,
      onMerge: mergeBlocks
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var textAlign = attributes.textAlign,
        content = attributes.content;
    return (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "pre",
      className: className,
      style: {
        textAlign: textAlign
      },
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