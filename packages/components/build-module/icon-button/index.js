import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isArray, isString } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Tooltip from '../tooltip';
import Button from '../button';
import Dashicon from '../dashicon'; // This is intentionally a Component class, not a function component because it
// is common to apply a ref to the button element (only supported in class)

var IconButton =
/*#__PURE__*/
function (_Component) {
  _inherits(IconButton, _Component);

  function IconButton() {
    _classCallCheck(this, IconButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(IconButton).apply(this, arguments));
  }

  _createClass(IconButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icon = _this$props.icon,
          children = _this$props.children,
          label = _this$props.label,
          className = _this$props.className,
          tooltip = _this$props.tooltip,
          shortcut = _this$props.shortcut,
          additionalProps = _objectWithoutProperties(_this$props, ["icon", "children", "label", "className", "tooltip", "shortcut"]);

      var classes = classnames('components-icon-button', className);
      var tooltipText = tooltip || label; // Should show the tooltip if...

      var showTooltip = !additionalProps.disabled && ( // an explicit tooltip is passed or...
      tooltip || // there's a shortcut or...
      shortcut || // there's a label and...
      !!label && ( // the children are empty and...
      !children || isArray(children) && !children.length) && // the tooltip is not explicitly disabled.
      false !== tooltip);
      var element = createElement(Button, _extends({
        "aria-label": label
      }, additionalProps, {
        className: classes
      }), isString(icon) ? createElement(Dashicon, {
        icon: icon
      }) : icon, children);

      if (showTooltip) {
        element = createElement(Tooltip, {
          text: tooltipText,
          shortcut: shortcut
        }, element);
      }

      return element;
    }
  }]);

  return IconButton;
}(Component);

export default IconButton;
//# sourceMappingURL=index.js.map