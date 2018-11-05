"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _richText = require("@wordpress/rich-text");

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var blockAttributes = {
  value: {
    type: 'string',
    source: 'html',
    selector: 'blockquote',
    multiline: 'p',
    default: ''
  },
  citation: {
    type: 'string',
    source: 'html',
    selector: 'cite',
    default: ''
  },
  align: {
    type: 'string'
  }
};
var name = 'core/quote';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Quote'),
  description: (0, _i18n.__)('Give quoted text visual emphasis. "In quoting others, we cite ourselves." — Julio Cortázar'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M19 18h-6l2-4h-2V6h8v7l-2 5zm-2-2l2-3V8h-4v4h4l-2 4zm-8 2H3l2-4H3V6h8v7l-2 5zm-2-2l2-3V8H5v4h4l-2 4z"
  }))),
  category: 'common',
  keywords: [(0, _i18n.__)('blockquote')],
  attributes: blockAttributes,
  styles: [{
    name: 'default',
    label: (0, _i18n._x)('Regular', 'block style'),
    isDefault: true
  }, {
    name: 'large',
    label: (0, _i18n._x)('Large', 'block style')
  }],
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/quote', {
          value: (0, _richText.toHTMLString)({
            value: (0, _richText.join)(attributes.map(function (_ref) {
              var content = _ref.content;
              return (0, _richText.create)({
                html: content
              });
            }), "\u2028"),
            multilineTag: 'p'
          })
        });
      }
    }, {
      type: 'block',
      blocks: ['core/heading'],
      transform: function transform(_ref2) {
        var content = _ref2.content;
        return (0, _blocks.createBlock)('core/quote', {
          value: "<p>".concat(content, "</p>")
        });
      }
    }, {
      type: 'block',
      blocks: ['core/pullquote'],
      transform: function transform(_ref3) {
        var value = _ref3.value,
            citation = _ref3.citation;
        return (0, _blocks.createBlock)('core/quote', {
          value: value,
          citation: citation
        });
      }
    }, {
      type: 'pattern',
      regExp: /^>\s/,
      transform: function transform(_ref4) {
        var content = _ref4.content;
        return (0, _blocks.createBlock)('core/quote', {
          value: "<p>".concat(content, "</p>")
        });
      }
    }, {
      type: 'raw',
      selector: 'blockquote',
      schema: {
        blockquote: {
          children: {
            p: {
              children: (0, _blocks.getPhrasingContentSchema)()
            }
          }
        }
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref5) {
        var value = _ref5.value,
            citation = _ref5.citation;
        var paragraphs = [];

        if (value && value !== '<p></p>') {
          paragraphs.push.apply(paragraphs, (0, _toConsumableArray2.default)((0, _richText.split)((0, _richText.create)({
            html: value,
            multilineTag: 'p'
          }), "\u2028").map(function (piece) {
            return (0, _blocks.createBlock)('core/paragraph', {
              content: (0, _richText.toHTMLString)({
                value: piece
              })
            });
          })));
        }

        if (citation && citation !== '<p></p>') {
          paragraphs.push((0, _blocks.createBlock)('core/paragraph', {
            content: citation
          }));
        }

        if (paragraphs.length === 0) {
          return (0, _blocks.createBlock)('core/paragraph', {
            content: ''
          });
        }

        return paragraphs;
      }
    }, {
      type: 'block',
      blocks: ['core/heading'],
      transform: function transform(_ref6) {
        var value = _ref6.value,
            citation = _ref6.citation,
            attrs = (0, _objectWithoutProperties2.default)(_ref6, ["value", "citation"]);

        // If there is no quote content, use the citation as the
        // content of the resulting heading. A nonexistent citation
        // will result in an empty heading.
        if (value === '<p></p>') {
          return (0, _blocks.createBlock)('core/heading', {
            content: citation
          });
        }

        var pieces = (0, _richText.split)((0, _richText.create)({
          html: value,
          multilineTag: 'p'
        }), "\u2028");
        var quotePieces = pieces.slice(1);
        return [(0, _blocks.createBlock)('core/heading', {
          content: (0, _richText.toHTMLString)({
            value: pieces[0]
          })
        }), (0, _blocks.createBlock)('core/quote', (0, _objectSpread2.default)({}, attrs, {
          citation: citation,
          value: (0, _richText.toHTMLString)({
            value: quotePieces.length ? (0, _richText.join)(pieces.slice(1), "\u2028") : (0, _richText.create)(),
            multilineTag: 'p'
          })
        }))];
      }
    }, {
      type: 'block',
      blocks: ['core/pullquote'],
      transform: function transform(_ref7) {
        var value = _ref7.value,
            citation = _ref7.citation;
        return (0, _blocks.createBlock)('core/pullquote', {
          value: value,
          citation: citation
        });
      }
    }]
  },
  edit: function edit(_ref8) {
    var attributes = _ref8.attributes,
        setAttributes = _ref8.setAttributes,
        isSelected = _ref8.isSelected,
        mergeBlocks = _ref8.mergeBlocks,
        onReplace = _ref8.onReplace,
        className = _ref8.className;
    var align = attributes.align,
        value = attributes.value,
        citation = attributes.citation;
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_editor.AlignmentToolbar, {
      value: align,
      onChange: function onChange(nextAlign) {
        setAttributes({
          align: nextAlign
        });
      }
    })), (0, _element.createElement)("blockquote", {
      className: className,
      style: {
        textAlign: align
      }
    }, (0, _element.createElement)(_editor.RichText, {
      multiline: true,
      value: value,
      onChange: function onChange(nextValue) {
        return setAttributes({
          value: nextValue
        });
      },
      onMerge: mergeBlocks,
      onRemove: function onRemove(forward) {
        var hasEmptyCitation = !citation || citation.length === 0;

        if (!forward && hasEmptyCitation) {
          onReplace([]);
        }
      }
      /* translators: the text of the quotation */
      ,
      placeholder: (0, _i18n.__)('Write quote…')
    }), (!_editor.RichText.isEmpty(citation) || isSelected) && (0, _element.createElement)(_editor.RichText, {
      value: citation,
      onChange: function onChange(nextCitation) {
        return setAttributes({
          citation: nextCitation
        });
      }
      /* translators: the individual or entity quoted */
      ,
      placeholder: (0, _i18n.__)('Write citation…'),
      className: "wp-block-quote__citation"
    })));
  },
  save: function save(_ref9) {
    var attributes = _ref9.attributes;
    var align = attributes.align,
        value = attributes.value,
        citation = attributes.citation;
    return (0, _element.createElement)("blockquote", {
      style: {
        textAlign: align ? align : null
      }
    }, (0, _element.createElement)(_editor.RichText.Content, {
      multiline: true,
      value: value
    }), !_editor.RichText.isEmpty(citation) && (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "cite",
      value: citation
    }));
  },
  merge: function merge(attributes, _ref10) {
    var value = _ref10.value,
        citation = _ref10.citation;

    if (!value || value === '<p></p>') {
      return (0, _objectSpread2.default)({}, attributes, {
        citation: attributes.citation + citation
      });
    }

    return (0, _objectSpread2.default)({}, attributes, {
      value: attributes.value + value,
      citation: attributes.citation + citation
    });
  },
  deprecated: [{
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
      style: {
        type: 'number',
        default: 1
      }
    }),
    migrate: function migrate(attributes) {
      if (attributes.style === 2) {
        return (0, _objectSpread2.default)({}, (0, _lodash.omit)(attributes, ['style']), {
          className: attributes.className ? attributes.className + ' is-style-large' : 'is-style-large'
        });
      }

      return attributes;
    },
    save: function save(_ref11) {
      var attributes = _ref11.attributes;
      var align = attributes.align,
          value = attributes.value,
          citation = attributes.citation,
          style = attributes.style;
      return (0, _element.createElement)("blockquote", {
        className: style === 2 ? 'is-large' : '',
        style: {
          textAlign: align ? align : null
        }
      }, (0, _element.createElement)(_editor.RichText.Content, {
        multiline: true,
        value: value
      }), !_editor.RichText.isEmpty(citation) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "cite",
        value: citation
      }));
    }
  }, {
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
      citation: {
        type: 'string',
        source: 'html',
        selector: 'footer',
        default: ''
      },
      style: {
        type: 'number',
        default: 1
      }
    }),
    save: function save(_ref12) {
      var attributes = _ref12.attributes;
      var align = attributes.align,
          value = attributes.value,
          citation = attributes.citation,
          style = attributes.style;
      return (0, _element.createElement)("blockquote", {
        className: "blocks-quote-style-".concat(style),
        style: {
          textAlign: align ? align : null
        }
      }, (0, _element.createElement)(_editor.RichText.Content, {
        multiline: true,
        value: value
      }), !_editor.RichText.isEmpty(citation) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "footer",
        value: citation
      }));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map