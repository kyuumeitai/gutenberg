"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _element = require("@wordpress/element");

var _blocks = require("@wordpress/blocks");

var _dom = require("@wordpress/dom");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var CopyHandler =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CopyHandler, _Component);

  function CopyHandler() {
    var _this;

    (0, _classCallCheck2.default)(this, CopyHandler);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CopyHandler).apply(this, arguments));
    _this.onCopy = _this.onCopy.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onCut = _this.onCut.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(CopyHandler, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('copy', this.onCopy);
      document.addEventListener('cut', this.onCut);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('copy', this.onCopy);
      document.removeEventListener('cut', this.onCut);
    }
  }, {
    key: "onCopy",
    value: function onCopy(event) {
      var _this$props = this.props,
          multiSelectedBlocks = _this$props.multiSelectedBlocks,
          selectedBlock = _this$props.selectedBlock;

      if (!multiSelectedBlocks.length && !selectedBlock) {
        return;
      } // Let native copy behaviour take over in input fields.


      if (selectedBlock && (0, _dom.documentHasSelection)()) {
        return;
      }

      var serialized = (0, _blocks.serialize)(selectedBlock || multiSelectedBlocks);
      event.clipboardData.setData('text/plain', serialized);
      event.clipboardData.setData('text/html', serialized);
      event.preventDefault();
    }
  }, {
    key: "onCut",
    value: function onCut(event) {
      var multiSelectedBlockClientIds = this.props.multiSelectedBlockClientIds;
      this.onCopy(event);

      if (multiSelectedBlockClientIds.length) {
        this.props.onRemove(multiSelectedBlockClientIds);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return CopyHandler;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getMultiSelectedBlocks = _select.getMultiSelectedBlocks,
      getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
      getSelectedBlock = _select.getSelectedBlock;

  return {
    multiSelectedBlocks: getMultiSelectedBlocks(),
    multiSelectedBlockClientIds: getMultiSelectedBlockClientIds(),
    selectedBlock: getSelectedBlock()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onRemove: dispatch('core/editor').removeBlocks
  };
})])(CopyHandler);

exports.default = _default;
//# sourceMappingURL=index.js.map