import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { TextInput } from 'react-native';
/**
 * Internal dependencies
 */

import styles from './style.scss';

function PlainText(_ref) {
  var onChange = _ref.onChange,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["onChange", "className"]);

  return createElement(TextInput, _extends({
    className: [styles['editor-plain-text'], className],
    onChangeText: function onChangeText(text) {
      return onChange(text);
    }
  }, props));
}

export default PlainText;
//# sourceMappingURL=index.native.js.map