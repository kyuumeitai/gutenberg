import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get, omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { IconButton, Spinner, CheckboxControl, withConstrainedTabbing } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal Dependencies
 */

import PostPublishButton from '../post-publish-button';
import PostPublishPanelPrepublish from './prepublish';
import PostPublishPanelPostpublish from './postpublish';
export var PostPublishPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(PostPublishPanel, _Component);

  function PostPublishPanel() {
    var _this;

    _classCallCheck(this, PostPublishPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostPublishPanel).apply(this, arguments));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PostPublishPanel, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Automatically collapse the publish sidebar when a post
      // is published and the user makes an edit.
      if (prevProps.isPublished && !this.props.isSaving && this.props.isDirty) {
        this.props.onClose();
      }
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this$props = this.props,
          onClose = _this$props.onClose,
          hasPublishAction = _this$props.hasPublishAction;

      if (!hasPublishAction) {
        onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          forceIsDirty = _this$props2.forceIsDirty,
          forceIsSaving = _this$props2.forceIsSaving,
          isBeingScheduled = _this$props2.isBeingScheduled,
          isPublished = _this$props2.isPublished,
          isPublishSidebarEnabled = _this$props2.isPublishSidebarEnabled,
          isScheduled = _this$props2.isScheduled,
          isSaving = _this$props2.isSaving,
          onClose = _this$props2.onClose,
          onTogglePublishSidebar = _this$props2.onTogglePublishSidebar,
          PostPublishExtension = _this$props2.PostPublishExtension,
          PrePublishExtension = _this$props2.PrePublishExtension,
          additionalProps = _objectWithoutProperties(_this$props2, ["forceIsDirty", "forceIsSaving", "isBeingScheduled", "isPublished", "isPublishSidebarEnabled", "isScheduled", "isSaving", "onClose", "onTogglePublishSidebar", "PostPublishExtension", "PrePublishExtension"]);

      var isPublishedOrScheduled = isPublished || isScheduled && isBeingScheduled;
      var propsForPanel = omit(additionalProps, ['hasPublishAction', 'isDirty']);
      return createElement("div", _extends({
        className: "editor-post-publish-panel"
      }, propsForPanel), createElement("div", {
        className: "editor-post-publish-panel__header"
      }, isPublishedOrScheduled && !isSaving ? createElement("div", {
        className: "editor-post-publish-panel__header-published"
      }, isScheduled ? __('Scheduled') : __('Published')) : createElement("div", {
        className: "editor-post-publish-panel__header-publish-button"
      }, createElement(PostPublishButton, {
        focusOnMount: true,
        onSubmit: this.onSubmit,
        forceIsDirty: forceIsDirty,
        forceIsSaving: forceIsSaving
      }), createElement("span", {
        className: "editor-post-publish-panel__spacer"
      })), createElement(IconButton, {
        "aria-expanded": true,
        onClick: onClose,
        icon: "no-alt",
        label: __('Close panel')
      })), createElement("div", {
        className: "editor-post-publish-panel__content"
      }, !isSaving && !isPublishedOrScheduled && createElement(PostPublishPanelPrepublish, null, PrePublishExtension && createElement(PrePublishExtension, null)), !isSaving && isPublishedOrScheduled && createElement(PostPublishPanelPostpublish, null, PostPublishExtension && createElement(PostPublishExtension, null)), isSaving && createElement(Spinner, null)), createElement("div", {
        className: "editor-post-publish-panel__footer"
      }, createElement(CheckboxControl, {
        label: __('Always show pre-publish checks.'),
        checked: isPublishSidebarEnabled,
        onChange: onTogglePublishSidebar
      })));
    }
  }]);

  return PostPublishPanel;
}(Component);
export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      getCurrentPost = _select.getCurrentPost,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      isCurrentPostScheduled = _select.isCurrentPostScheduled,
      isEditedPostBeingScheduled = _select.isEditedPostBeingScheduled,
      isEditedPostDirty = _select.isEditedPostDirty,
      isSavingPost = _select.isSavingPost;

  var _select2 = select('core/editor'),
      isPublishSidebarEnabled = _select2.isPublishSidebarEnabled;

  return {
    hasPublishAction: get(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    isBeingScheduled: isEditedPostBeingScheduled(),
    isDirty: isEditedPostDirty(),
    isPublished: isCurrentPostPublished(),
    isPublishSidebarEnabled: isPublishSidebarEnabled(),
    isSaving: isSavingPost(),
    isScheduled: isCurrentPostScheduled()
  };
}), withDispatch(function (dispatch, _ref) {
  var isPublishSidebarEnabled = _ref.isPublishSidebarEnabled;

  var _dispatch = dispatch('core/editor'),
      disablePublishSidebar = _dispatch.disablePublishSidebar,
      enablePublishSidebar = _dispatch.enablePublishSidebar;

  return {
    onTogglePublishSidebar: function onTogglePublishSidebar() {
      if (isPublishSidebarEnabled) {
        disablePublishSidebar();
      } else {
        enablePublishSidebar();
      }
    }
  };
}), withConstrainedTabbing])(PostPublishPanel);
//# sourceMappingURL=index.js.map