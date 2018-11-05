"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var name = 'core/text-columns';
exports.name = name;
var settings = {
  // Disable insertion as this block is deprecated and ultimately replaced by the Columns block.
  supports: {
    inserter: false
  },
  title: (0, _i18n.__)('Text Columns (deprecated)'),
  description: (0, _i18n.__)('This block is deprecated. Please use the Columns block instead.'),
  icon: 'columns',
  category: 'layout',
  attributes: {
    content: {
      type: 'array',
      source: 'query',
      selector: 'p',
      query: {
        children: {
          type: 'string',
          source: 'html'
        }
      },
      default: [{}, {}]
    },
    columns: {
      type: 'number',
      default: 2
    },
    width: {
      type: 'string'
    }
  },
  transforms: {
    to: [{
      type: 'block',
      blocks: ['core/columns'],
      transform: function transform(_ref) {
        var className = _ref.className,
            columns = _ref.columns,
            content = _ref.content,
            width = _ref.width;
        return (0, _blocks.createBlock)('core/columns', {
          align: 'wide' === width || 'full' === width ? width : undefined,
          className: className,
          columns: columns
        }, content.map(function (_ref2) {
          var children = _ref2.children;
          return (0, _blocks.createBlock)('core/column', {}, [(0, _blocks.createBlock)('core/paragraph', {
            content: children
          })]);
        }));
      }
    }]
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var width = attributes.width;

    if ('wide' === width || 'full' === width) {
      return {
        'data-align': width
      };
    }
  },
  edit: function edit(_ref3) {
    var attributes = _ref3.attributes,
        setAttributes = _ref3.setAttributes,
        className = _ref3.className;
    var width = attributes.width,
        content = attributes.content,
        columns = attributes.columns;
    (0, _deprecated.default)('The Text Columns block', {
      alternative: 'the Columns block',
      plugin: 'Gutenberg'
    });
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_editor.BlockAlignmentToolbar, {
      value: width,
      onChange: function onChange(nextWidth) {
        return setAttributes({
          width: nextWidth
        });
      },
      controls: ['center', 'wide', 'full']
    })), (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, null, (0, _element.createElement)(_components.RangeControl, {
      label: (0, _i18n.__)('Columns'),
      value: columns,
      onChange: function onChange(value) {
        return setAttributes({
          columns: value
        });
      },
      min: 2,
      max: 4
    }))), (0, _element.createElement)("div", {
      className: "".concat(className, " align").concat(width, " columns-").concat(columns)
    }, (0, _lodash.times)(columns, function (index) {
      return (0, _element.createElement)("div", {
        className: "wp-block-column",
        key: "column-".concat(index)
      }, (0, _element.createElement)(_editor.RichText, {
        tagName: "p",
        value: (0, _lodash.get)(content, [index, 'children']),
        onChange: function onChange(nextContent) {
          setAttributes({
            content: (0, _toConsumableArray2.default)(content.slice(0, index)).concat([{
              children: nextContent
            }], (0, _toConsumableArray2.default)(content.slice(index + 1)))
          });
        },
        placeholder: (0, _i18n.__)('New Column')
      }));
    })));
  },
  save: function save(_ref4) {
    var attributes = _ref4.attributes;
    var width = attributes.width,
        content = attributes.content,
        columns = attributes.columns;
    return (0, _element.createElement)("div", {
      className: "align".concat(width, " columns-").concat(columns)
    }, (0, _lodash.times)(columns, function (index) {
      return (0, _element.createElement)("div", {
        className: "wp-block-column",
        key: "column-".concat(index)
      }, (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "p",
        value: (0, _lodash.get)(content, [index, 'children'])
      }));
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map