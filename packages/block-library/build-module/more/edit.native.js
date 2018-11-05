import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, Text } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { PlainText } from '@wordpress/editor';
import styles from './editor.scss';
export default function MoreEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var customText = attributes.customText;

  var defaultText = __('Read more');

  var value = customText !== undefined ? customText : defaultText;
  return createElement(View, {
    className: styles['block-library-more__container']
  }, createElement(View, {
    className: styles['block-library-more__sub-container']
  }, createElement(Text, {
    className: styles['block-library-more__left-marker']
  }, "<!--"), createElement(PlainText, {
    className: styles['block-library-more__plain-text'],
    value: value,
    multiline: true,
    underlineColorAndroid: "transparent",
    onChange: function onChange(newValue) {
      return setAttributes({
        customText: newValue
      });
    },
    placeholder: defaultText
  }), createElement(Text, {
    className: styles['block-library-more__right-marker']
  }, "-->")));
}
//# sourceMappingURL=edit.native.js.map