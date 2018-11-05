import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { parse, createBlock } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';
var minHeight = 50;
var name = 'core/paragraph';

var ParagraphEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(ParagraphEdit, _Component);

  function ParagraphEdit() {
    var _this;

    _classCallCheck(this, ParagraphEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ParagraphEdit).apply(this, arguments));
    _this.splitBlock = _this.splitBlock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * Split handler for RichText value, namely when content is pasted or the
   * user presses the Enter key.
   *
   * @param {?Array}     before Optional before value, to be used as content
   *                            in place of what exists currently for the
   *                            block. If undefined, the block is deleted.
   * @param {?Array}     after  Optional after value, to be appended in a new
   *                            paragraph block to the set of blocks passed
   *                            as spread.
   * @param {...WPBlock} blocks Optional blocks inserted between the before
   *                            and after value blocks.
   */


  _createClass(ParagraphEdit, [{
    key: "splitBlock",
    value: function splitBlock(before, after) {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          insertBlocksAfter = _this$props.insertBlocksAfter,
          setAttributes = _this$props.setAttributes;

      for (var _len = arguments.length, blocks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        blocks[_key - 2] = arguments[_key];
      }

      if (after !== null) {
        // Append "After" content as a new paragraph block to the end of
        // any other blocks being inserted after the current paragraph.
        var newBlock = createBlock(name, {
          content: after
        });
        blocks.push(newBlock);
      }

      if (blocks.length && insertBlocksAfter) {
        insertBlocksAfter(blocks);
      }

      var content = attributes.content;

      if (before === null) {// TODO : If before content is omitted, treat as intent to delete block.
        // onReplace( [] );
      } else if (content !== before) {
        // Only update content if it has in-fact changed. In case that user
        // has created a new paragraph at end of an existing one, the value
        // of before will be strictly equal to the current content.
        setAttributes({
          content: before
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes,
          style = _this$props2.style,
          mergeBlocks = _this$props2.mergeBlocks;
      var placeholder = attributes.placeholder,
          content = attributes.content;
      return createElement(View, null, createElement(RichText, {
        tagName: "p",
        value: content,
        style: _objectSpread({}, style, {
          minHeight: Math.max(minHeight, typeof attributes.aztecHeight === 'undefined' ? 0 : attributes.aztecHeight)
        }),
        onChange: function onChange(event) {
          // Create a React Tree from the new HTML
          var newParaBlock = parse('<!-- wp:paragraph --><p>' + event.content + '</p><!-- /wp:paragraph -->')[0];
          setAttributes(_objectSpread({}, _this2.props.attributes, {
            content: newParaBlock.attributes.content
          }));
        },
        onSplit: this.splitBlock,
        onMerge: mergeBlocks,
        onContentSizeChange: function onContentSizeChange(event) {
          setAttributes(_objectSpread({}, _this2.props.attributes, {
            aztecHeight: event.aztecHeight
          }));
        },
        placeholder: placeholder || __('Add text or type / to add content')
      }));
    }
  }]);

  return ParagraphEdit;
}(Component);

export default ParagraphEdit;
//# sourceMappingURL=edit.native.js.map