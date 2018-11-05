"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

/**
 * External dependencies
 */
function Button(props) {
  var children = props.children,
      onClick = props.onClick,
      ariaLabel = props['aria-label'],
      ariaPressed = props['aria-pressed'],
      subscript = props['data-subscript'];
  return (0, _element.createElement)(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: ariaLabel,
    onPress: onClick,
    style: {
      borderColor: ariaPressed ? 'black' : 'white',
      borderWidth: 1,
      borderRadius: 2
    }
  }, (0, _element.createElement)(_reactNative.View, {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  }, children, subscript && (0, _element.createElement)(_reactNative.Text, {
    style: {
      fontVariant: ['small-caps'],
      textAlignVertical: 'bottom'
    }
  }, subscript)));
}
//# sourceMappingURL=index.native.js.map