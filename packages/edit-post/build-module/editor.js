import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { EditorProvider, ErrorBoundary, PostLockedModal } from '@wordpress/editor';
import { StrictMode } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Layout from './components/layout';

function Editor(_ref) {
  var settings = _ref.settings,
      hasFixedToolbar = _ref.hasFixedToolbar,
      focusMode = _ref.focusMode,
      post = _ref.post,
      overridePost = _ref.overridePost,
      onError = _ref.onError,
      props = _objectWithoutProperties(_ref, ["settings", "hasFixedToolbar", "focusMode", "post", "overridePost", "onError"]);

  if (!post) {
    return null;
  }

  var editorSettings = _objectSpread({}, settings, {
    hasFixedToolbar: hasFixedToolbar,
    focusMode: focusMode
  });

  return createElement(StrictMode, null, createElement(EditorProvider, _extends({
    settings: editorSettings,
    post: _objectSpread({}, post, overridePost)
  }, props), createElement(ErrorBoundary, {
    onError: onError
  }, createElement(Layout, null)), createElement(PostLockedModal, null)));
}

export default withSelect(function (select, _ref2) {
  var postId = _ref2.postId,
      postType = _ref2.postType;
  return {
    hasFixedToolbar: select('core/edit-post').isFeatureActive('fixedToolbar'),
    focusMode: select('core/edit-post').isFeatureActive('focusMode'),
    post: select('core').getEntityRecord('postType', postType, postId)
  };
})(Editor);
//# sourceMappingURL=editor.js.map