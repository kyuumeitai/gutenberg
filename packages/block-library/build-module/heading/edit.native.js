import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import HeadingToolbar from './heading-toolbar';
/**
 * External dependencies
 */

import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/editor';
import { parse, createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import './editor.scss';
var minHeight = 50;

var HeadingEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(HeadingEdit, _Component);

  function HeadingEdit() {
    _classCallCheck(this, HeadingEdit);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeadingEdit).apply(this, arguments));
  }

  _createClass(HeadingEdit, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes,
          mergeBlocks = _this$props.mergeBlocks,
          insertBlocksAfter = _this$props.insertBlocksAfter;
      var level = attributes.level,
          placeholder = attributes.placeholder,
          content = attributes.content;
      var tagName = 'h' + level;
      return createElement(View, null, createElement(HeadingToolbar, {
        minLevel: 2,
        maxLevel: 5,
        selectedLevel: level,
        onChange: function onChange(newLevel) {
          return setAttributes({
            level: newLevel
          });
        }
      }), createElement(RichText, {
        tagName: tagName,
        value: content,
        style: {
          minHeight: Math.max(minHeight, typeof attributes.aztecHeight === 'undefined' ? 0 : attributes.aztecHeight)
        },
        onChange: function onChange(event) {
          // Create a React Tree from the new HTML
          var newParaBlock = parse("<!-- wp:heading {\"level\":".concat(level, "} --><").concat(tagName, ">").concat(event.content, "</").concat(tagName, "><!-- /wp:heading -->"))[0];
          setAttributes(_objectSpread({}, _this.props.attributes, {
            content: newParaBlock.attributes.content
          }));
        },
        onMerge: mergeBlocks,
        onSplit: insertBlocksAfter ? function (before, after) {
          setAttributes({
            content: before
          });

          for (var _len = arguments.length, blocks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            blocks[_key - 2] = arguments[_key];
          }

          insertBlocksAfter(blocks.concat([createBlock('core/paragraph', {
            content: after
          })]));
        } : undefined,
        onContentSizeChange: function onContentSizeChange(event) {
          setAttributes({
            aztecHeight: event.aztecHeight
          });
        },
        placeholder: placeholder || __('Write heading…')
      }));
    }
  }]);

  return HeadingEdit;
}(Component);

export default HeadingEdit;
//# sourceMappingURL=edit.native.js.map