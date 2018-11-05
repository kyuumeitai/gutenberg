import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { PostPreviewButton, PostSavedState } from '@wordpress/editor';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { DotTip } from '@wordpress/nux';
/**
 * Internal dependencies
 */

import MoreMenu from './more-menu';
import HeaderToolbar from './header-toolbar';
import PinnedPlugins from './pinned-plugins';
import shortcuts from '../../keyboard-shortcuts';
import PostPublishButtonOrToggle from './post-publish-button-or-toggle';

function Header(_ref) {
  var closeGeneralSidebar = _ref.closeGeneralSidebar,
      hasActiveMetaboxes = _ref.hasActiveMetaboxes,
      isEditorSidebarOpened = _ref.isEditorSidebarOpened,
      isPublishSidebarOpened = _ref.isPublishSidebarOpened,
      isSaving = _ref.isSaving,
      openGeneralSidebar = _ref.openGeneralSidebar;
  var toggleGeneralSidebar = isEditorSidebarOpened ? closeGeneralSidebar : openGeneralSidebar;
  return createElement("div", {
    role: "region"
    /* translators: accessibility text for the top bar landmark region. */
    ,
    "aria-label": __('Editor top bar'),
    className: "edit-post-header",
    tabIndex: "-1"
  }, createElement(HeaderToolbar, null), !isPublishSidebarOpened && createElement("div", {
    className: "edit-post-header__settings"
  }, createElement(PostSavedState, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving
  }), createElement(PostPreviewButton, null), createElement(PostPublishButtonOrToggle, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving
  }), createElement("div", null, createElement(IconButton, {
    icon: "admin-generic",
    label: __('Settings'),
    onClick: toggleGeneralSidebar,
    isToggled: isEditorSidebarOpened,
    "aria-expanded": isEditorSidebarOpened,
    shortcut: shortcuts.toggleSidebar
  }), createElement(DotTip, {
    tipId: "core/editor.settings"
  }, __('You’ll find more settings for your page and blocks in the sidebar. Click “Settings” to open it.'))), createElement(PinnedPlugins.Slot, null), createElement(MoreMenu, null)));
}

export default compose(withSelect(function (select) {
  return {
    hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
    hasBlockSelection: !!select('core/editor').getBlockSelectionStart(),
    isEditorSidebarOpened: select('core/edit-post').isEditorSidebarOpened(),
    isPublishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
    isSaving: select('core/edit-post').isSavingMetaBoxes()
  };
}), withDispatch(function (dispatch, _ref2) {
  var hasBlockSelection = _ref2.hasBlockSelection;

  var _dispatch = dispatch('core/edit-post'),
      _openGeneralSidebar = _dispatch.openGeneralSidebar,
      closeGeneralSidebar = _dispatch.closeGeneralSidebar;

  var sidebarToOpen = hasBlockSelection ? 'edit-post/block' : 'edit-post/document';
  return {
    openGeneralSidebar: function openGeneralSidebar() {
      return _openGeneralSidebar(sidebarToOpen);
    },
    closeGeneralSidebar: closeGeneralSidebar,
    hasBlockSelection: undefined
  };
}))(Header);
//# sourceMappingURL=index.js.map