"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostPublishButtonOrToggle = PostPublishButtonOrToggle;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _editor = require("@wordpress/editor");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _viewport = require("@wordpress/viewport");

/**
 * External Dependencies
 */

/**
 * WordPress dependencies.
 */
function PostPublishButtonOrToggle(_ref) {
  var forceIsDirty = _ref.forceIsDirty,
      forceIsSaving = _ref.forceIsSaving,
      hasPublishAction = _ref.hasPublishAction,
      isBeingScheduled = _ref.isBeingScheduled,
      isLessThanMediumViewport = _ref.isLessThanMediumViewport,
      isPending = _ref.isPending,
      isPublished = _ref.isPublished,
      isPublishSidebarEnabled = _ref.isPublishSidebarEnabled,
      isPublishSidebarOpened = _ref.isPublishSidebarOpened,
      isScheduled = _ref.isScheduled,
      togglePublishSidebar = _ref.togglePublishSidebar;
  var button = (0, _element.createElement)(_editor.PostPublishButton, {
    forceIsDirty: forceIsDirty,
    forceIsSaving: forceIsSaving
  });
  var toggle = (0, _element.createElement)(_editor.PostPublishPanelToggle, {
    isOpen: isPublishSidebarOpened,
    onToggle: togglePublishSidebar,
    forceIsSaving: forceIsSaving
  });
  /**
   * We want to show a BUTTON when the post status is at the _final stage_
   * for a particular role (see https://codex.wordpress.org/Post_Status):
   *
   * - is published
   * - is scheduled to be published
   * - is pending and can't be published (but only for viewports >= medium)
   *
   * Originally we considered showing a button for pending posts
   * that couldn't be published (for ex, for a contributor role).
   * Some languages can have really long translations for "Submit for review",
   * so given the lack of UI real state we decided to take into account the viewport
   * in that particular case.
   */

  if (isPublished || isScheduled && isBeingScheduled || isPending && !hasPublishAction && !isLessThanMediumViewport) {
    return button;
  }
  /**
   * Then, we take other things into account:
   *
   * - Show TOGGLE if it is small viewport.
   * - Otherwise, use publish sidebar status to decide - TOGGLE if enabled, BUTTON if not.
   */


  if (isLessThanMediumViewport) {
    return toggle;
  }

  return isPublishSidebarEnabled ? toggle : button;
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  return {
    hasPublishAction: (0, _lodash.get)(select('core/editor').getCurrentPost(), ['_links', 'wp:action-publish'], false),
    isBeingScheduled: select('core/editor').isEditedPostBeingScheduled(),
    isPending: select('core/editor').isCurrentPostPending(),
    isPublished: select('core/editor').isCurrentPostPublished(),
    isPublishSidebarEnabled: select('core/editor').isPublishSidebarEnabled(),
    isPublishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
    isScheduled: select('core/editor').isCurrentPostScheduled()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      togglePublishSidebar = _dispatch.togglePublishSidebar;

  return {
    togglePublishSidebar: togglePublishSidebar
  };
}), (0, _viewport.withViewportMatch)({
  isLessThanMediumViewport: '< medium'
}))(PostPublishButtonOrToggle);

exports.default = _default;
//# sourceMappingURL=post-publish-button-or-toggle.js.map