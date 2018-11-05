"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Browser dependencies
 */
var _window = window,
    Node = _window.Node,
    getSelection = _window.getSelection;

var NavigableToolbar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(NavigableToolbar, _Component);

  function NavigableToolbar() {
    var _this;

    (0, _classCallCheck2.default)(this, NavigableToolbar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NavigableToolbar).apply(this, arguments));
    _this.bindNode = _this.bindNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.focusToolbar = _this.focusToolbar.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.focusSelection = _this.focusSelection.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.switchOnKeyDown = (0, _lodash.cond)([[(0, _lodash.matchesProperty)(['keyCode'], _keycodes.ESCAPE), _this.focusSelection]]);
    return _this;
  }

  (0, _createClass2.default)(NavigableToolbar, [{
    key: "bindNode",
    value: function bindNode(ref) {
      // Disable reason: Need DOM node for finding first focusable element
      // on keyboard interaction to shift to toolbar.
      // eslint-disable-next-line react/no-find-dom-node
      this.toolbar = (0, _element.findDOMNode)(ref);
    }
  }, {
    key: "focusToolbar",
    value: function focusToolbar() {
      var tabbables = _dom.focus.tabbable.find(this.toolbar);

      if (tabbables.length) {
        tabbables[0].focus();
      }
    }
    /**
     * Programmatically shifts focus to the element where the current selection
     * exists, if there is a selection.
     */

  }, {
    key: "focusSelection",
    value: function focusSelection() {
      // Ensure that a selection exists.
      var selection = getSelection();

      if (!selection) {
        return;
      } // Focus node may be a text node, which cannot be focused directly.
      // Find its parent element instead.


      var focusNode = selection.focusNode;
      var focusElement = focusNode;

      if (focusElement.nodeType !== Node.ELEMENT_NODE) {
        focusElement = focusElement.parentElement;
      }

      if (focusElement) {
        focusElement.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["children"]);
      return (0, _element.createElement)(_components.NavigableMenu, (0, _extends2.default)({
        orientation: "horizontal",
        role: "toolbar",
        ref: this.bindNode,
        onKeyDown: this.switchOnKeyDown
      }, props), (0, _element.createElement)(_components.KeyboardShortcuts, {
        bindGlobal: true // Use the same event that TinyMCE uses in the Classic block for its own `alt+f10` shortcut.
        ,
        eventName: "keydown",
        shortcuts: {
          'alt+f10': this.focusToolbar
        }
      }), children);
    }
  }]);
  return NavigableToolbar;
}(_element.Component);

var _default = NavigableToolbar;
exports.default = _default;
//# sourceMappingURL=index.js.map