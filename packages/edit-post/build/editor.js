"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _data = require("@wordpress/data");

var _editor = require("@wordpress/editor");

var _layout = _interopRequireDefault(require("./components/layout"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Editor(_ref) {
  var settings = _ref.settings,
      hasFixedToolbar = _ref.hasFixedToolbar,
      focusMode = _ref.focusMode,
      post = _ref.post,
      overridePost = _ref.overridePost,
      onError = _ref.onError,
      props = (0, _objectWithoutProperties2.default)(_ref, ["settings", "hasFixedToolbar", "focusMode", "post", "overridePost", "onError"]);

  if (!post) {
    return null;
  }

  var editorSettings = (0, _objectSpread2.default)({}, settings, {
    hasFixedToolbar: hasFixedToolbar,
    focusMode: focusMode
  });
  return (0, _element.createElement)(_element.StrictMode, null, (0, _element.createElement)(_editor.EditorProvider, (0, _extends2.default)({
    settings: editorSettings,
    post: (0, _objectSpread2.default)({}, post, overridePost)
  }, props), (0, _element.createElement)(_editor.ErrorBoundary, {
    onError: onError
  }, (0, _element.createElement)(_layout.default, null)), (0, _element.createElement)(_editor.PostLockedModal, null)));
}

var _default = (0, _data.withSelect)(function (select, _ref2) {
  var postId = _ref2.postId,
      postType = _ref2.postType;
  return {
    hasFixedToolbar: select('core/edit-post').isFeatureActive('fixedToolbar'),
    focusMode: select('core/edit-post').isFeatureActive('focusMode'),
    post: select('core').getEntityRecord('postType', postType, postId)
  };
})(Editor);

exports.default = _default;
//# sourceMappingURL=editor.js.map