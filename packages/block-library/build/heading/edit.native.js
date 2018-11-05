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

var _headingToolbar = _interopRequireDefault(require("./heading-toolbar"));

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _blocks = require("@wordpress/blocks");

require("./editor.scss");

/**
 * Internal dependencies
 */

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var minHeight = 50;

var HeadingEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(HeadingEdit, _Component);

  function HeadingEdit() {
    (0, _classCallCheck2.default)(this, HeadingEdit);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HeadingEdit).apply(this, arguments));
  }

  (0, _createClass2.default)(HeadingEdit, [{
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
      return (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_headingToolbar.default, {
        minLevel: 2,
        maxLevel: 5,
        selectedLevel: level,
        onChange: function onChange(newLevel) {
          return setAttributes({
            level: newLevel
          });
        }
      }), (0, _element.createElement)(_editor.RichText, {
        tagName: tagName,
        value: content,
        style: {
          minHeight: Math.max(minHeight, typeof attributes.aztecHeight === 'undefined' ? 0 : attributes.aztecHeight)
        },
        onChange: function onChange(event) {
          // Create a React Tree from the new HTML
          var newParaBlock = (0, _blocks.parse)("<!-- wp:heading {\"level\":".concat(level, "} --><").concat(tagName, ">").concat(event.content, "</").concat(tagName, "><!-- /wp:heading -->"))[0];
          setAttributes((0, _objectSpread2.default)({}, _this.props.attributes, {
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

          insertBlocksAfter(blocks.concat([(0, _blocks.createBlock)('core/paragraph', {
            content: after
          })]));
        } : undefined,
        onContentSizeChange: function onContentSizeChange(event) {
          setAttributes({
            aztecHeight: event.aztecHeight
          });
        },
        placeholder: placeholder || (0, _i18n.__)('Write heading…')
      }));
    }
  }]);
  return HeadingEdit;
}(_element.Component);

var _default = HeadingEdit;
exports.default = _default;
//# sourceMappingURL=edit.native.js.map