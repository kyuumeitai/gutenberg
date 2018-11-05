import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, Text, Button } from 'react-native';
import styles from './styles.scss';

function MediaPlaceholder(props) {
  return createElement(View, {
    style: styles.emptyStateContainer
  }, createElement(Text, {
    style: styles.emptyStateTitle
  }, "Image"), createElement(Text, {
    style: styles.emptyStateDescription
  }, "Upload a new image or select a file from your library."), createElement(View, {
    style: styles.emptyStateButtonsContainer
  }, createElement(Button, {
    title: "Upload",
    onPress: props.onUploadPress
  }), createElement(Button, {
    title: "Media Library",
    onPress: props.onMediaLibraryPress
  })));
}

export default MediaPlaceholder;
//# sourceMappingURL=index.native.js.map