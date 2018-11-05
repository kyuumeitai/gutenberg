"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var minHeight = 50;
var name = 'core/paragraph';

var ParagraphEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ParagraphEdit, _Component);

  function ParagraphEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, ParagraphEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ParagraphEdit).apply(this, arguments));
    _this.splitBlock = _this.splitBlock.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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


  (0, _createClass2.default)(ParagraphEdit, [{
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
        var newBlock = (0, _blocks.createBlock)(name, {
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
      return (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_editor.RichText, {
        tagName: "p",
        value: content,
        style: (0, _objectSpread2.default)({}, style, {
          minHeight: Math.max(minHeight, typeof attributes.aztecHeight === 'undefined' ? 0 : attributes.aztecHeight)
        }),
        onChange: function onChange(event) {
          // Create a React Tree from the new HTML
          var newParaBlock = (0, _blocks.parse)('<!-- wp:paragraph --><p>' + event.content + '</p><!-- /wp:paragraph -->')[0];
          setAttributes((0, _objectSpread2.default)({}, _this2.props.attributes, {
            content: newParaBlock.attributes.content
          }));
        },
        onSplit: this.splitBlock,
        onMerge: mergeBlocks,
        onContentSizeChange: function onContentSizeChange(event) {
          setAttributes((0, _objectSpread2.default)({}, _this2.props.attributes, {
            aztecHeight: event.aztecHeight
          }));
        },
        placeholder: placeholder || (0, _i18n.__)('Add text or type / to add content')
      }));
    }
  }]);
  return ParagraphEdit;
}(_element.Component);

var _default = ParagraphEdit;
exports.default = _default;
//# sourceMappingURL=edit.native.js.map