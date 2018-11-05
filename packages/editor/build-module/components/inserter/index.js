import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dropdown, IconButton } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose, ifCondition } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import InserterMenu from './menu';

var defaultRenderToggle = function defaultRenderToggle(_ref) {
  var onToggle = _ref.onToggle,
      disabled = _ref.disabled,
      isOpen = _ref.isOpen;
  return createElement(IconButton, {
    icon: "insert",
    label: __('Add block'),
    onClick: onToggle,
    className: "editor-inserter__toggle",
    "aria-haspopup": "true",
    "aria-expanded": isOpen,
    disabled: disabled
  });
};

var Inserter =
/*#__PURE__*/
function (_Component) {
  _inherits(Inserter, _Component);

  function Inserter() {
    var _this;

    _classCallCheck(this, Inserter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Inserter).apply(this, arguments));
    _this.onToggle = _this.onToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderToggle = _this.renderToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderContent = _this.renderContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Inserter, [{
    key: "onToggle",
    value: function onToggle(isOpen) {
      var onToggle = this.props.onToggle; // Surface toggle callback to parent component

      if (onToggle) {
        onToggle(isOpen);
      }
    }
    /**
     * Render callback to display Dropdown toggle element.
     *
     * @param {Function} options.onToggle Callback to invoke when toggle is
     *                                    pressed.
     * @param {boolean}  options.isOpen   Whether dropdown is currently open.
     *
     * @return {WPElement} Dropdown toggle element.
     */

  }, {
    key: "renderToggle",
    value: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle,
          isOpen = _ref2.isOpen;
      var _this$props = this.props,
          disabled = _this$props.disabled,
          _this$props$renderTog = _this$props.renderToggle,
          renderToggle = _this$props$renderTog === void 0 ? defaultRenderToggle : _this$props$renderTog;
      return renderToggle({
        onToggle: onToggle,
        isOpen: isOpen,
        disabled: disabled
      });
    }
    /**
     * Render callback to display Dropdown content element.
     *
     * @param {Function} options.onClose Callback to invoke when dropdown is
     *                                   closed.
     *
     * @return {WPElement} Dropdown content element.
     */

  }, {
    key: "renderContent",
    value: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      var _this$props2 = this.props,
          rootClientId = _this$props2.rootClientId,
          index = _this$props2.index;
      return createElement(InserterMenu, {
        onSelect: onClose,
        rootClientId: rootClientId,
        index: index
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          position = _this$props3.position,
          title = _this$props3.title;
      return createElement(Dropdown, {
        className: "editor-inserter",
        contentClassName: "editor-inserter__popover",
        position: position,
        onToggle: this.onToggle,
        expandOnMobile: true,
        headerTitle: title,
        renderToggle: this.renderToggle,
        renderContent: this.renderContent
      });
    }
  }]);

  return Inserter;
}(Component);

export default compose([withSelect(function (select, _ref4) {
  var rootClientId = _ref4.rootClientId,
      index = _ref4.index;

  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getBlockInsertionPoint = _select.getBlockInsertionPoint,
      getInserterItems = _select.getInserterItems;

  if (rootClientId === undefined && index === undefined) {
    // Unless explicitly provided, the default insertion point provided
    // by the store occurs immediately following the selected block.
    // Otherwise, the default behavior for an undefined index is to
    // append block to the end of the rootClientId context.
    var insertionPoint = getBlockInsertionPoint();
    rootClientId = insertionPoint.rootClientId;
    index = insertionPoint.index;
  }

  return {
    title: getEditedPostAttribute('title'),
    hasItems: getInserterItems(rootClientId).length > 0,
    rootClientId: rootClientId,
    index: index
  };
}), ifCondition(function (_ref5) {
  var hasItems = _ref5.hasItems;
  return hasItems;
})])(Inserter);
//# sourceMappingURL=index.js.map