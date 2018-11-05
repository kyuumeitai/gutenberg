import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get, times } from 'lodash';
/**
 * WordPress dependencies
 */

import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { BlockControls, BlockAlignmentToolbar, InspectorControls, RichText } from '@wordpress/editor';
import deprecated from '@wordpress/deprecated';
export var name = 'core/text-columns';
export var settings = {
  // Disable insertion as this block is deprecated and ultimately replaced by the Columns block.
  supports: {
    inserter: false
  },
  title: __('Text Columns (deprecated)'),
  description: __('This block is deprecated. Please use the Columns block instead.'),
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
        return createBlock('core/columns', {
          align: 'wide' === width || 'full' === width ? width : undefined,
          className: className,
          columns: columns
        }, content.map(function (_ref2) {
          var children = _ref2.children;
          return createBlock('core/column', {}, [createBlock('core/paragraph', {
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
    deprecated('The Text Columns block', {
      alternative: 'the Columns block',
      plugin: 'Gutenberg'
    });
    return createElement(Fragment, null, createElement(BlockControls, null, createElement(BlockAlignmentToolbar, {
      value: width,
      onChange: function onChange(nextWidth) {
        return setAttributes({
          width: nextWidth
        });
      },
      controls: ['center', 'wide', 'full']
    })), createElement(InspectorControls, null, createElement(PanelBody, null, createElement(RangeControl, {
      label: __('Columns'),
      value: columns,
      onChange: function onChange(value) {
        return setAttributes({
          columns: value
        });
      },
      min: 2,
      max: 4
    }))), createElement("div", {
      className: "".concat(className, " align").concat(width, " columns-").concat(columns)
    }, times(columns, function (index) {
      return createElement("div", {
        className: "wp-block-column",
        key: "column-".concat(index)
      }, createElement(RichText, {
        tagName: "p",
        value: get(content, [index, 'children']),
        onChange: function onChange(nextContent) {
          setAttributes({
            content: _toConsumableArray(content.slice(0, index)).concat([{
              children: nextContent
            }], _toConsumableArray(content.slice(index + 1)))
          });
        },
        placeholder: __('New Column')
      }));
    })));
  },
  save: function save(_ref4) {
    var attributes = _ref4.attributes;
    var width = attributes.width,
        content = attributes.content,
        columns = attributes.columns;
    return createElement("div", {
      className: "align".concat(width, " columns-").concat(columns)
    }, times(columns, function (index) {
      return createElement("div", {
        className: "wp-block-column",
        key: "column-".concat(index)
      }, createElement(RichText.Content, {
        tagName: "p",
        value: get(content, [index, 'children'])
      }));
    }));
  }
};
//# sourceMappingURL=index.js.map