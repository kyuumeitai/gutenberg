import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { serialize } from '@wordpress/blocks';
import { documentHasSelection } from '@wordpress/dom';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

var CopyHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(CopyHandler, _Component);

  function CopyHandler() {
    var _this;

    _classCallCheck(this, CopyHandler);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CopyHandler).apply(this, arguments));
    _this.onCopy = _this.onCopy.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onCut = _this.onCut.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CopyHandler, [{
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


      if (selectedBlock && documentHasSelection()) {
        return;
      }

      var serialized = serialize(selectedBlock || multiSelectedBlocks);
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
}(Component);

export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      getMultiSelectedBlocks = _select.getMultiSelectedBlocks,
      getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
      getSelectedBlock = _select.getSelectedBlock;

  return {
    multiSelectedBlocks: getMultiSelectedBlocks(),
    multiSelectedBlockClientIds: getMultiSelectedBlockClientIds(),
    selectedBlock: getSelectedBlock()
  };
}), withDispatch(function (dispatch) {
  return {
    onRemove: dispatch('core/editor').removeBlocks
  };
})])(CopyHandler);
//# sourceMappingURL=index.js.map