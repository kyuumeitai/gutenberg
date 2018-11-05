import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { TouchableOpacity, Text, View } from 'react-native';
export default function Button(props) {
  var children = props.children,
      onClick = props.onClick,
      ariaLabel = props['aria-label'],
      ariaPressed = props['aria-pressed'],
      subscript = props['data-subscript'];
  return createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: ariaLabel,
    onPress: onClick,
    style: {
      borderColor: ariaPressed ? 'black' : 'white',
      borderWidth: 1,
      borderRadius: 2
    }
  }, createElement(View, {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  }, children, subscript && createElement(Text, {
    style: {
      fontVariant: ['small-caps'],
      textAlignVertical: 'bottom'
    }
  }, subscript)));
}
//# sourceMappingURL=index.native.js.map