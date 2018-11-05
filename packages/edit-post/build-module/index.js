import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/editor';
import '@wordpress/nux';
import '@wordpress/viewport';
import { registerCoreBlocks } from '@wordpress/block-library';
import { render, unmountComponentAtNode } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import './hooks';
import './plugins';
import './store';
import Editor from './editor';
/**
 * Reinitializes the editor after the user chooses to reboot the editor after
 * an unhandled error occurs, replacing previously mounted editor element using
 * an initial state from prior to the crash.
 *
 * @param {Object}  postType       Post type of the post to edit.
 * @param {Object}  postId         ID of the post to edit.
 * @param {Element} target         DOM node in which editor is rendered.
 * @param {?Object} settings       Editor settings object.
 * @param {Object}  overridePost   Post properties to override.
 */

export function reinitializeEditor(postType, postId, target, settings, overridePost) {
  unmountComponentAtNode(target);
  var reboot = reinitializeEditor.bind(null, postType, postId, target, settings, overridePost);
  render(createElement(Editor, {
    settings: settings,
    onError: reboot,
    postId: postId,
    postType: postType,
    overridePost: overridePost,
    recovery: true
  }), target);
}
/**
 * Initializes and returns an instance of Editor.
 *
 * The return value of this function is not necessary if we change where we
 * call initializeEditor(). This is due to metaBox timing.
 *
 * @param {string}  id            Unique identifier for editor instance.
 * @param {Object}  postType      Post type of the post to edit.
 * @param {Object}  postId        ID of the post to edit.
 * @param {?Object} settings      Editor settings object.
 * @param {Object}  overridePost  Post properties to override.
 */

export function initializeEditor(id, postType, postId, settings, overridePost) {
  var target = document.getElementById(id);
  var reboot = reinitializeEditor.bind(null, postType, postId, target, settings, overridePost);
  registerCoreBlocks();
  dispatch('core/nux').triggerGuide(['core/editor.inserter', 'core/editor.settings', 'core/editor.preview', 'core/editor.publish']);
  render(createElement(Editor, {
    settings: settings,
    onError: reboot,
    postId: postId,
    postType: postType,
    overridePost: overridePost
  }), target);
}
export { default as PluginBlockSettingsMenuItem } from './components/block-settings-menu/plugin-block-settings-menu-item';
export { default as PluginPostPublishPanel } from './components/sidebar/plugin-post-publish-panel';
export { default as PluginPostStatusInfo } from './components/sidebar/plugin-post-status-info';
export { default as PluginPrePublishPanel } from './components/sidebar/plugin-pre-publish-panel';
export { default as PluginSidebar } from './components/sidebar/plugin-sidebar';
export { default as PluginSidebarMoreMenuItem } from './components/header/plugin-sidebar-more-menu-item';
//# sourceMappingURL=index.js.map