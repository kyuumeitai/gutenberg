"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reinitializeEditor = reinitializeEditor;
exports.initializeEditor = initializeEditor;
Object.defineProperty(exports, "PluginBlockSettingsMenuItem", {
  enumerable: true,
  get: function get() {
    return _pluginBlockSettingsMenuItem.default;
  }
});
Object.defineProperty(exports, "PluginPostPublishPanel", {
  enumerable: true,
  get: function get() {
    return _pluginPostPublishPanel.default;
  }
});
Object.defineProperty(exports, "PluginPostStatusInfo", {
  enumerable: true,
  get: function get() {
    return _pluginPostStatusInfo.default;
  }
});
Object.defineProperty(exports, "PluginPrePublishPanel", {
  enumerable: true,
  get: function get() {
    return _pluginPrePublishPanel.default;
  }
});
Object.defineProperty(exports, "PluginSidebar", {
  enumerable: true,
  get: function get() {
    return _pluginSidebar.default;
  }
});
Object.defineProperty(exports, "PluginSidebarMoreMenuItem", {
  enumerable: true,
  get: function get() {
    return _pluginSidebarMoreMenuItem.default;
  }
});

var _element = require("@wordpress/element");

require("@wordpress/core-data");

require("@wordpress/editor");

require("@wordpress/nux");

require("@wordpress/viewport");

var _blockLibrary = require("@wordpress/block-library");

var _data = require("@wordpress/data");

require("./hooks");

require("./plugins");

require("./store");

var _editor2 = _interopRequireDefault(require("./editor"));

var _pluginBlockSettingsMenuItem = _interopRequireDefault(require("./components/block-settings-menu/plugin-block-settings-menu-item"));

var _pluginPostPublishPanel = _interopRequireDefault(require("./components/sidebar/plugin-post-publish-panel"));

var _pluginPostStatusInfo = _interopRequireDefault(require("./components/sidebar/plugin-post-status-info"));

var _pluginPrePublishPanel = _interopRequireDefault(require("./components/sidebar/plugin-pre-publish-panel"));

var _pluginSidebar = _interopRequireDefault(require("./components/sidebar/plugin-sidebar"));

var _pluginSidebarMoreMenuItem = _interopRequireDefault(require("./components/header/plugin-sidebar-more-menu-item"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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
function reinitializeEditor(postType, postId, target, settings, overridePost) {
  (0, _element.unmountComponentAtNode)(target);
  var reboot = reinitializeEditor.bind(null, postType, postId, target, settings, overridePost);
  (0, _element.render)((0, _element.createElement)(_editor2.default, {
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


function initializeEditor(id, postType, postId, settings, overridePost) {
  var target = document.getElementById(id);
  var reboot = reinitializeEditor.bind(null, postType, postId, target, settings, overridePost);
  (0, _blockLibrary.registerCoreBlocks)();
  (0, _data.dispatch)('core/nux').triggerGuide(['core/editor.inserter', 'core/editor.settings', 'core/editor.preview', 'core/editor.publish']);
  (0, _element.render)((0, _element.createElement)(_editor2.default, {
    settings: settings,
    onError: reboot,
    postId: postId,
    postType: postType,
    overridePost: overridePost
  }), target);
}
//# sourceMappingURL=index.js.map