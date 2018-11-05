import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { Button } from '@wordpress/components';
import { Component, createRef } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import PublishButtonLabel from './label';
export var PostPublishButton =
/*#__PURE__*/
function (_Component) {
  _inherits(PostPublishButton, _Component);

  function PostPublishButton(props) {
    var _this;

    _classCallCheck(this, PostPublishButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostPublishButton).call(this, props));
    _this.buttonNode = createRef();
    return _this;
  }

  _createClass(PostPublishButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.buttonNode.current.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isSaving = _this$props.isSaving,
          onStatusChange = _this$props.onStatusChange,
          onSave = _this$props.onSave,
          isBeingScheduled = _this$props.isBeingScheduled,
          visibility = _this$props.visibility,
          isPublishable = _this$props.isPublishable,
          isSaveable = _this$props.isSaveable,
          hasPublishAction = _this$props.hasPublishAction,
          _this$props$onSubmit = _this$props.onSubmit,
          onSubmit = _this$props$onSubmit === void 0 ? noop : _this$props$onSubmit,
          forceIsSaving = _this$props.forceIsSaving;
      var isButtonEnabled = isPublishable && isSaveable;
      var publishStatus;

      if (!hasPublishAction) {
        publishStatus = 'pending';
      } else if (isBeingScheduled) {
        publishStatus = 'future';
      } else if (visibility === 'private') {
        publishStatus = 'private';
      } else {
        publishStatus = 'publish';
      }

      var onClick = function onClick() {
        onSubmit();
        onStatusChange(publishStatus);
        onSave();
      };

      return createElement(Button, {
        ref: this.buttonNode,
        className: "editor-post-publish-button",
        isPrimary: true,
        isLarge: true,
        onClick: onClick,
        disabled: !isButtonEnabled,
        isBusy: isSaving
      }, createElement(PublishButtonLabel, {
        forceIsSaving: forceIsSaving
      }));
    }
  }]);

  return PostPublishButton;
}(Component);
export default compose([withSelect(function (select, _ref) {
  var forceIsSaving = _ref.forceIsSaving,
      forceIsDirty = _ref.forceIsDirty;

  var _select = select('core/editor'),
      isSavingPost = _select.isSavingPost,
      isEditedPostBeingScheduled = _select.isEditedPostBeingScheduled,
      getEditedPostVisibility = _select.getEditedPostVisibility,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      isEditedPostPublishable = _select.isEditedPostPublishable,
      isPostSavingLocked = _select.isPostSavingLocked,
      getCurrentPost = _select.getCurrentPost,
      getCurrentPostType = _select.getCurrentPostType;

  return {
    isSaving: forceIsSaving || isSavingPost(),
    isBeingScheduled: isEditedPostBeingScheduled(),
    visibility: getEditedPostVisibility(),
    isSaveable: isEditedPostSaveable() && !isPostSavingLocked(),
    isPublishable: forceIsDirty || isEditedPostPublishable(),
    hasPublishAction: get(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    postType: getCurrentPostType()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost,
      savePost = _dispatch.savePost;

  return {
    onStatusChange: function onStatusChange(status) {
      return editPost({
        status: status
      });
    },
    onSave: savePost
  };
})])(PostPublishButton);
//# sourceMappingURL=index.js.map