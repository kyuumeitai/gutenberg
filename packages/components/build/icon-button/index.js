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

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _button = _interopRequireDefault(require("../button"));

var _dashicon = _interopRequireDefault(require("../dashicon"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
// This is intentionally a Component class, not a function component because it
// is common to apply a ref to the button element (only supported in class)
var IconButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(IconButton, _Component);

  function IconButton() {
    (0, _classCallCheck2.default)(this, IconButton);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(IconButton).apply(this, arguments));
  }

  (0, _createClass2.default)(IconButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icon = _this$props.icon,
          children = _this$props.children,
          label = _this$props.label,
          className = _this$props.className,
          tooltip = _this$props.tooltip,
          shortcut = _this$props.shortcut,
          additionalProps = (0, _objectWithoutProperties2.default)(_this$props, ["icon", "children", "label", "className", "tooltip", "shortcut"]);
      var classes = (0, _classnames.default)('components-icon-button', className);
      var tooltipText = tooltip || label; // Should show the tooltip if...

      var showTooltip = !additionalProps.disabled && ( // an explicit tooltip is passed or...
      tooltip || // there's a shortcut or...
      shortcut || // there's a label and...
      !!label && ( // the children are empty and...
      !children || (0, _lodash.isArray)(children) && !children.length) && // the tooltip is not explicitly disabled.
      false !== tooltip);
      var element = (0, _element.createElement)(_button.default, (0, _extends2.default)({
        "aria-label": label
      }, additionalProps, {
        className: classes
      }), (0, _lodash.isString)(icon) ? (0, _element.createElement)(_dashicon.default, {
        icon: icon
      }) : icon, children);

      if (showTooltip) {
        element = (0, _element.createElement)(_tooltip.default, {
          text: tooltipText,
          shortcut: shortcut
        }, element);
      }

      return element;
    }
  }]);
  return IconButton;
}(_element.Component);

var _default = IconButton;
exports.default = _default;
//# sourceMappingURL=index.js.map