"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

var _styles = _interopRequireDefault(require("./styles.scss"));

/**
 * External dependencies
 */
function MediaPlaceholder(props) {
  return (0, _element.createElement)(_reactNative.View, {
    style: _styles.default.emptyStateContainer
  }, (0, _element.createElement)(_reactNative.Text, {
    style: _styles.default.emptyStateTitle
  }, "Image"), (0, _element.createElement)(_reactNative.Text, {
    style: _styles.default.emptyStateDescription
  }, "Upload a new image or select a file from your library."), (0, _element.createElement)(_reactNative.View, {
    style: _styles.default.emptyStateButtonsContainer
  }, (0, _element.createElement)(_reactNative.Button, {
    title: "Upload",
    onPress: props.onUploadPress
  }), (0, _element.createElement)(_reactNative.Button, {
    title: "Media Library",
    onPress: props.onMediaLibraryPress
  })));
}

var _default = MediaPlaceholder;
exports.default = _default;
//# sourceMappingURL=index.native.js.map