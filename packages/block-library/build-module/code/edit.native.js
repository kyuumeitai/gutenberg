import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { PlainText } from '@wordpress/editor'; // Note: styling is applied directly to the (nested) PlainText component. Web-side components
// apply it to the container 'div' but we don't have a proper proposal for cascading styling yet.

export default function CodeEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      style = _ref.style;
  return createElement(View, null, createElement(PlainText, {
    value: attributes.content,
    style: style,
    multiline: true,
    underlineColorAndroid: "transparent",
    onChange: function onChange(content) {
      return setAttributes({
        content: content
      });
    },
    placeholder: __('Write code…'),
    "aria-label": __('Code')
  }));
}
//# sourceMappingURL=edit.native.js.map