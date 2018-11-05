import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, Image, TextInput } from 'react-native';
/**
 * Internal dependencies
 */

import { MediaPlaceholder } from '@wordpress/editor';
export default function ImageEdit(props) {
  var attributes = props.attributes,
      isSelected = props.isSelected,
      setAttributes = props.setAttributes;
  var url = attributes.url,
      caption = attributes.caption;

  var onUploadPress = function onUploadPress() {// This method should present an image picker from
    // the device.
    //TODO: Implement upload image method.
  };

  var onMediaLibraryPress = function onMediaLibraryPress() {// This method should present an image picker from
    // the WordPress media library.
    //TODO: Implement media library method.
  };

  if (!url) {
    return createElement(MediaPlaceholder, {
      onUploadPress: onUploadPress,
      onMediaLibraryPress: onMediaLibraryPress
    });
  }

  return createElement(View, {
    style: {
      flex: 1
    }
  }, createElement(Image, {
    style: {
      width: '100%',
      height: 200
    },
    resizeMethod: "scale",
    source: {
      uri: url
    }
  }), (caption.length > 0 || isSelected) && createElement(View, {
    style: {
      padding: 12,
      flex: 1
    }
  }, createElement(TextInput, {
    style: {
      textAlign: 'center'
    },
    underlineColorAndroid: "transparent",
    value: caption,
    placeholder: 'Write caption…',
    onChangeText: function onChangeText(newCaption) {
      return setAttributes({
        caption: newCaption
      });
    }
  })));
}
//# sourceMappingURL=edit.native.js.map