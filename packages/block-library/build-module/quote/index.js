import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { createBlock, getPhrasingContentSchema } from '@wordpress/blocks';
import { BlockControls, AlignmentToolbar, RichText } from '@wordpress/editor';
import { join, split, create, toHTMLString } from '@wordpress/rich-text';
import { G, Path, SVG } from '@wordpress/components';
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
export var name = 'core/quote';
export var settings = {
  title: __('Quote'),
  description: __('Give quoted text visual emphasis. "In quoting others, we cite ourselves." — Julio Cortázar'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(G, null, createElement(Path, {
    d: "M19 18h-6l2-4h-2V6h8v7l-2 5zm-2-2l2-3V8h-4v4h4l-2 4zm-8 2H3l2-4H3V6h8v7l-2 5zm-2-2l2-3V8H5v4h4l-2 4z"
  }))),
  category: 'common',
  keywords: [__('blockquote')],
  attributes: blockAttributes,
  styles: [{
    name: 'default',
    label: _x('Regular', 'block style'),
    isDefault: true
  }, {
    name: 'large',
    label: _x('Large', 'block style')
  }],
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return createBlock('core/quote', {
          value: toHTMLString({
            value: join(attributes.map(function (_ref) {
              var content = _ref.content;
              return create({
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
        return createBlock('core/quote', {
          value: "<p>".concat(content, "</p>")
        });
      }
    }, {
      type: 'block',
      blocks: ['core/pullquote'],
      transform: function transform(_ref3) {
        var value = _ref3.value,
            citation = _ref3.citation;
        return createBlock('core/quote', {
          value: value,
          citation: citation
        });
      }
    }, {
      type: 'pattern',
      regExp: /^>\s/,
      transform: function transform(_ref4) {
        var content = _ref4.content;
        return createBlock('core/quote', {
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
              children: getPhrasingContentSchema()
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
          paragraphs.push.apply(paragraphs, _toConsumableArray(split(create({
            html: value,
            multilineTag: 'p'
          }), "\u2028").map(function (piece) {
            return createBlock('core/paragraph', {
              content: toHTMLString({
                value: piece
              })
            });
          })));
        }

        if (citation && citation !== '<p></p>') {
          paragraphs.push(createBlock('core/paragraph', {
            content: citation
          }));
        }

        if (paragraphs.length === 0) {
          return createBlock('core/paragraph', {
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
            attrs = _objectWithoutProperties(_ref6, ["value", "citation"]);

        // If there is no quote content, use the citation as the
        // content of the resulting heading. A nonexistent citation
        // will result in an empty heading.
        if (value === '<p></p>') {
          return createBlock('core/heading', {
            content: citation
          });
        }

        var pieces = split(create({
          html: value,
          multilineTag: 'p'
        }), "\u2028");
        var quotePieces = pieces.slice(1);
        return [createBlock('core/heading', {
          content: toHTMLString({
            value: pieces[0]
          })
        }), createBlock('core/quote', _objectSpread({}, attrs, {
          citation: citation,
          value: toHTMLString({
            value: quotePieces.length ? join(pieces.slice(1), "\u2028") : create(),
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
        return createBlock('core/pullquote', {
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
    return createElement(Fragment, null, createElement(BlockControls, null, createElement(AlignmentToolbar, {
      value: align,
      onChange: function onChange(nextAlign) {
        setAttributes({
          align: nextAlign
        });
      }
    })), createElement("blockquote", {
      className: className,
      style: {
        textAlign: align
      }
    }, createElement(RichText, {
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
      placeholder: __('Write quote…')
    }), (!RichText.isEmpty(citation) || isSelected) && createElement(RichText, {
      value: citation,
      onChange: function onChange(nextCitation) {
        return setAttributes({
          citation: nextCitation
        });
      }
      /* translators: the individual or entity quoted */
      ,
      placeholder: __('Write citation…'),
      className: "wp-block-quote__citation"
    })));
  },
  save: function save(_ref9) {
    var attributes = _ref9.attributes;
    var align = attributes.align,
        value = attributes.value,
        citation = attributes.citation;
    return createElement("blockquote", {
      style: {
        textAlign: align ? align : null
      }
    }, createElement(RichText.Content, {
      multiline: true,
      value: value
    }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
      tagName: "cite",
      value: citation
    }));
  },
  merge: function merge(attributes, _ref10) {
    var value = _ref10.value,
        citation = _ref10.citation;

    if (!value || value === '<p></p>') {
      return _objectSpread({}, attributes, {
        citation: attributes.citation + citation
      });
    }

    return _objectSpread({}, attributes, {
      value: attributes.value + value,
      citation: attributes.citation + citation
    });
  },
  deprecated: [{
    attributes: _objectSpread({}, blockAttributes, {
      style: {
        type: 'number',
        default: 1
      }
    }),
    migrate: function migrate(attributes) {
      if (attributes.style === 2) {
        return _objectSpread({}, omit(attributes, ['style']), {
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
      return createElement("blockquote", {
        className: style === 2 ? 'is-large' : '',
        style: {
          textAlign: align ? align : null
        }
      }, createElement(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
        tagName: "cite",
        value: citation
      }));
    }
  }, {
    attributes: _objectSpread({}, blockAttributes, {
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
      return createElement("blockquote", {
        className: "blocks-quote-style-".concat(style),
        style: {
          textAlign: align ? align : null
        }
      }, createElement(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
        tagName: "footer",
        value: citation
      }));
    }
  }]
};
//# sourceMappingURL=index.js.map