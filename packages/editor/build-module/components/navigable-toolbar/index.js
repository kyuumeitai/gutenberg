import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
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
import { cond, matchesProperty } from 'lodash';
/**
 * WordPress dependencies
 */

import { NavigableMenu, KeyboardShortcuts } from '@wordpress/components';
import { Component, findDOMNode } from '@wordpress/element';
import { focus } from '@wordpress/dom';
import { ESCAPE } from '@wordpress/keycodes';
/**
 * Browser dependencies
 */

var _window = window,
    Node = _window.Node,
    getSelection = _window.getSelection;

var NavigableToolbar =
/*#__PURE__*/
function (_Component) {
  _inherits(NavigableToolbar, _Component);

  function NavigableToolbar() {
    var _this;

    _classCallCheck(this, NavigableToolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavigableToolbar).apply(this, arguments));
    _this.bindNode = _this.bindNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusToolbar = _this.focusToolbar.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusSelection = _this.focusSelection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.switchOnKeyDown = cond([[matchesProperty(['keyCode'], ESCAPE), _this.focusSelection]]);
    return _this;
  }

  _createClass(NavigableToolbar, [{
    key: "bindNode",
    value: function bindNode(ref) {
      // Disable reason: Need DOM node for finding first focusable element
      // on keyboard interaction to shift to toolbar.
      // eslint-disable-next-line react/no-find-dom-node
      this.toolbar = findDOMNode(ref);
    }
  }, {
    key: "focusToolbar",
    value: function focusToolbar() {
      var tabbables = focus.tabbable.find(this.toolbar);

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
          props = _objectWithoutProperties(_this$props, ["children"]);

      return createElement(NavigableMenu, _extends({
        orientation: "horizontal",
        role: "toolbar",
        ref: this.bindNode,
        onKeyDown: this.switchOnKeyDown
      }, props), createElement(KeyboardShortcuts, {
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
}(Component);

export default NavigableToolbar;
//# sourceMappingURL=index.js.map