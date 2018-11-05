"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupEditor = setupEditor;
exports.resetPost = resetPost;
exports.resetAutosave = resetAutosave;
exports.updatePost = updatePost;
exports.setupEditorState = setupEditorState;
exports.resetBlocks = resetBlocks;
exports.receiveBlocks = receiveBlocks;
exports.updateBlockAttributes = updateBlockAttributes;
exports.updateBlock = updateBlock;
exports.selectBlock = selectBlock;
exports.startMultiSelect = startMultiSelect;
exports.stopMultiSelect = stopMultiSelect;
exports.multiSelect = multiSelect;
exports.clearSelectedBlock = clearSelectedBlock;
exports.toggleSelection = toggleSelection;
exports.replaceBlocks = replaceBlocks;
exports.replaceBlock = replaceBlock;
exports.moveBlockToPosition = moveBlockToPosition;
exports.insertBlock = insertBlock;
exports.insertBlocks = insertBlocks;
exports.showInsertionPoint = showInsertionPoint;
exports.hideInsertionPoint = hideInsertionPoint;
exports.setTemplateValidity = setTemplateValidity;
exports.synchronizeTemplate = synchronizeTemplate;
exports.editPost = editPost;
exports.savePost = savePost;
exports.refreshPost = refreshPost;
exports.trashPost = trashPost;
exports.mergeBlocks = mergeBlocks;
exports.autosave = autosave;
exports.redo = redo;
exports.undo = undo;
exports.createUndoLevel = createUndoLevel;
exports.removeBlocks = removeBlocks;
exports.removeBlock = removeBlock;
exports.toggleBlockMode = toggleBlockMode;
exports.startTyping = startTyping;
exports.stopTyping = stopTyping;
exports.enterFormattedText = enterFormattedText;
exports.exitFormattedText = exitFormattedText;
exports.updatePostLock = updatePostLock;
exports.__experimentalFetchReusableBlocks = __experimentalFetchReusableBlocks;
exports.__experimentalReceiveReusableBlocks = __experimentalReceiveReusableBlocks;
exports.__experimentalSaveReusableBlock = __experimentalSaveReusableBlock;
exports.__experimentalDeleteReusableBlock = __experimentalDeleteReusableBlock;
exports.__experimentalUpdateReusableBlockTitle = __experimentalUpdateReusableBlockTitle;
exports.__experimentalConvertBlockToStatic = __experimentalConvertBlockToStatic;
exports.__experimentalConvertBlockToReusable = __experimentalConvertBlockToReusable;
exports.insertDefaultBlock = insertDefaultBlock;
exports.updateBlockListSettings = updateBlockListSettings;
exports.updateEditorSettings = updateEditorSettings;
exports.enablePublishSidebar = enablePublishSidebar;
exports.disablePublishSidebar = disablePublishSidebar;
exports.lockPostSaving = lockPostSaving;
exports.unlockPostSaving = unlockPostSaving;
exports.createNotice = createNotice;
exports.removeNotice = removeNotice;
exports.fetchReusableBlocks = fetchReusableBlocks;
exports.receiveReusableBlocks = receiveReusableBlocks;
exports.saveReusableBlock = saveReusableBlock;
exports.deleteReusableBlock = deleteReusableBlock;
exports.updateReusableBlockTitle = updateReusableBlockTitle;
exports.convertBlockToStatic = convertBlockToStatic;
exports.convertBlockToReusable = convertBlockToReusable;
exports.createWarningNotice = exports.createErrorNotice = exports.createInfoNotice = exports.createSuccessNotice = exports.moveBlocksUp = exports.moveBlocksDown = void 0;

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _data = require("@wordpress/data");

/**
 * External Dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Returns an action object used in signalling that editor has initialized with
 * the specified post object and editor settings.
 *
 * @param {Object} post Post object.
 *
 * @return {Object} Action object.
 */
function setupEditor(post) {
  return {
    type: 'SETUP_EDITOR',
    post: post
  };
}
/**
 * Returns an action object used in signalling that the latest version of the
 * post has been received, either by initialization or save.
 *
 * @param {Object} post Post object.
 *
 * @return {Object} Action object.
 */


function resetPost(post) {
  return {
    type: 'RESET_POST',
    post: post
  };
}
/**
 * Returns an action object used in signalling that the latest autosave of the
 * post has been received, by initialization or autosave.
 *
 * @param {Object} post Autosave post object.
 *
 * @return {Object} Action object.
 */


function resetAutosave(post) {
  return {
    type: 'RESET_AUTOSAVE',
    post: post
  };
}
/**
 * Returns an action object used in signalling that a patch of updates for the
 * latest version of the post have been received.
 *
 * @param {Object} edits Updated post fields.
 *
 * @return {Object} Action object.
 */


function updatePost(edits) {
  return {
    type: 'UPDATE_POST',
    edits: edits
  };
}
/**
 * Returns an action object used to setup the editor state when first opening an editor.
 *
 * @param {Object}  post            Post object.
 * @param {Array}   blocks          Array of blocks.
 * @param {Object}  edits           Initial edited attributes object.
 *
 * @return {Object} Action object.
 */


function setupEditorState(post, blocks, edits) {
  return {
    type: 'SETUP_EDITOR_STATE',
    post: post,
    blocks: blocks,
    edits: edits
  };
}
/**
 * Returns an action object used in signalling that blocks state should be
 * reset to the specified array of blocks, taking precedence over any other
 * content reflected as an edit in state.
 *
 * @param {Array} blocks Array of blocks.
 *
 * @return {Object} Action object.
 */


function resetBlocks(blocks) {
  return {
    type: 'RESET_BLOCKS',
    blocks: blocks
  };
}
/**
 * Returns an action object used in signalling that blocks have been received.
 * Unlike resetBlocks, these should be appended to the existing known set, not
 * replacing.
 *
 * @param {Object[]} blocks Array of block objects.
 *
 * @return {Object} Action object.
 */


function receiveBlocks(blocks) {
  return {
    type: 'RECEIVE_BLOCKS',
    blocks: blocks
  };
}
/**
 * Returns an action object used in signalling that the block attributes with
 * the specified client ID has been updated.
 *
 * @param {string} clientId   Block client ID.
 * @param {Object} attributes Block attributes to be merged.
 *
 * @return {Object} Action object.
 */


function updateBlockAttributes(clientId, attributes) {
  return {
    type: 'UPDATE_BLOCK_ATTRIBUTES',
    clientId: clientId,
    attributes: attributes
  };
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID has been updated.
 *
 * @param {string} clientId Block client ID.
 * @param {Object} updates  Block attributes to be merged.
 *
 * @return {Object} Action object.
 */


function updateBlock(clientId, updates) {
  return {
    type: 'UPDATE_BLOCK',
    clientId: clientId,
    updates: updates
  };
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID has been selected, optionally accepting a position
 * value reflecting its selection directionality. An initialPosition of -1
 * reflects a reverse selection.
 *
 * @param {string}  clientId        Block client ID.
 * @param {?number} initialPosition Optional initial position. Pass as -1 to
 *                                  reflect reverse selection.
 *
 * @return {Object} Action object.
 */


function selectBlock(clientId) {
  var initialPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    type: 'SELECT_BLOCK',
    initialPosition: initialPosition,
    clientId: clientId
  };
}

function startMultiSelect() {
  return {
    type: 'START_MULTI_SELECT'
  };
}

function stopMultiSelect() {
  return {
    type: 'STOP_MULTI_SELECT'
  };
}

function multiSelect(start, end) {
  return {
    type: 'MULTI_SELECT',
    start: start,
    end: end
  };
}

function clearSelectedBlock() {
  return {
    type: 'CLEAR_SELECTED_BLOCK'
  };
}
/**
 * Returns an action object that enables or disables block selection.
 *
 * @param {boolean} [isSelectionEnabled=true] Whether block selection should
 *                                            be enabled.

 * @return {Object} Action object.
 */


function toggleSelection() {
  var isSelectionEnabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: 'TOGGLE_SELECTION',
    isSelectionEnabled: isSelectionEnabled
  };
}
/**
 * Returns an action object signalling that a blocks should be replaced with
 * one or more replacement blocks.
 *
 * @param {(string|string[])} clientIds Block client ID(s) to replace.
 * @param {(Object|Object[])} blocks    Replacement block(s).
 *
 * @return {Object} Action object.
 */


function replaceBlocks(clientIds, blocks) {
  return {
    type: 'REPLACE_BLOCKS',
    clientIds: (0, _lodash.castArray)(clientIds),
    blocks: (0, _lodash.castArray)(blocks),
    time: Date.now()
  };
}
/**
 * Returns an action object signalling that a single block should be replaced
 * with one or more replacement blocks.
 *
 * @param {(string|string[])} clientId Block client ID to replace.
 * @param {(Object|Object[])} block    Replacement block(s).
 *
 * @return {Object} Action object.
 */


function replaceBlock(clientId, block) {
  return replaceBlocks(clientId, block);
}
/**
 * Higher-order action creator which, given the action type to dispatch creates
 * an action creator for managing block movement.
 *
 * @param {string} type Action type to dispatch.
 *
 * @return {Function} Action creator.
 */


function createOnMove(type) {
  return function (clientIds, rootClientId) {
    return {
      clientIds: (0, _lodash.castArray)(clientIds),
      type: type,
      rootClientId: rootClientId
    };
  };
}

var moveBlocksDown = createOnMove('MOVE_BLOCKS_DOWN');
exports.moveBlocksDown = moveBlocksDown;
var moveBlocksUp = createOnMove('MOVE_BLOCKS_UP');
/**
 * Returns an action object signalling that an indexed block should be moved
 * to a new index.
 *
 * @param  {?string} clientId         The client ID of the block.
 * @param  {?string} fromRootClientId Root client ID source.
 * @param  {?string} toRootClientId   Root client ID destination.
 * @param  {number}  index            The index to move the block into.
 *
 * @return {Object} Action object.
 */

exports.moveBlocksUp = moveBlocksUp;

function moveBlockToPosition(clientId, fromRootClientId, toRootClientId, index) {
  return {
    type: 'MOVE_BLOCK_TO_POSITION',
    fromRootClientId: fromRootClientId,
    toRootClientId: toRootClientId,
    clientId: clientId,
    index: index
  };
}
/**
 * Returns an action object used in signalling that a single block should be
 * inserted, optionally at a specific index respective a root block list.
 *
 * @param {Object}  block        Block object to insert.
 * @param {?number} index        Index at which block should be inserted.
 * @param {?string} rootClientId Optional root client ID of block list on which
 *                               to insert.
 *
 * @return {Object} Action object.
 */


function insertBlock(block, index, rootClientId) {
  return insertBlocks([block], index, rootClientId);
}
/**
 * Returns an action object used in signalling that an array of blocks should
 * be inserted, optionally at a specific index respective a root block list.
 *
 * @param {Object[]} blocks       Block objects to insert.
 * @param {?number}  index        Index at which block should be inserted.
 * @param {?string}  rootClientId Optional root client ID of block list on
 *                                which to insert.
 *
 * @return {Object} Action object.
 */


function insertBlocks(blocks, index, rootClientId) {
  return {
    type: 'INSERT_BLOCKS',
    blocks: (0, _lodash.castArray)(blocks),
    index: index,
    rootClientId: rootClientId,
    time: Date.now()
  };
}
/**
 * Returns an action object used in signalling that the insertion point should
 * be shown.
 *
 * @param {?string} rootClientId Optional root client ID of block list on
 *                               which to insert.
 * @param {?number} index        Index at which block should be inserted.
 *
 * @return {Object} Action object.
 */


function showInsertionPoint(rootClientId, index) {
  return {
    type: 'SHOW_INSERTION_POINT',
    rootClientId: rootClientId,
    index: index
  };
}
/**
 * Returns an action object hiding the insertion point.
 *
 * @return {Object} Action object.
 */


function hideInsertionPoint() {
  return {
    type: 'HIDE_INSERTION_POINT'
  };
}
/**
 * Returns an action object resetting the template validity.
 *
 * @param {boolean}  isValid  template validity flag.
 *
 * @return {Object} Action object.
 */


function setTemplateValidity(isValid) {
  return {
    type: 'SET_TEMPLATE_VALIDITY',
    isValid: isValid
  };
}
/**
 * Returns an action object synchronize the template with the list of blocks
 *
 * @return {Object} Action object.
 */


function synchronizeTemplate() {
  return {
    type: 'SYNCHRONIZE_TEMPLATE'
  };
}

function editPost(edits) {
  return {
    type: 'EDIT_POST',
    edits: edits
  };
}
/**
 * Returns an action object to save the post.
 *
 * @param {Object}  options          Options for the save.
 * @param {boolean} options.autosave Perform an autosave if true.
 *
 * @return {Object} Action object.
 */


function savePost() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: 'REQUEST_POST_UPDATE',
    options: options
  };
}

function refreshPost() {
  return {
    type: 'REFRESH_POST'
  };
}

function trashPost(postId, postType) {
  return {
    type: 'TRASH_POST',
    postId: postId,
    postType: postType
  };
}
/**
 * Returns an action object used in signalling that two blocks should be merged
 *
 * @param {string} firstBlockClientId  Client ID of the first block to merge.
 * @param {string} secondBlockClientId Client ID of the second block to merge.
 *
 * @return {Object} Action object.
 */


function mergeBlocks(firstBlockClientId, secondBlockClientId) {
  return {
    type: 'MERGE_BLOCKS',
    blocks: [firstBlockClientId, secondBlockClientId]
  };
}
/**
 * Returns an action object used in signalling that the post should autosave.
 *
 * @return {Object} Action object.
 */


function autosave() {
  return savePost({
    autosave: true
  });
}
/**
 * Returns an action object used in signalling that undo history should
 * restore last popped state.
 *
 * @return {Object} Action object.
 */


function redo() {
  return {
    type: 'REDO'
  };
}
/**
 * Returns an action object used in signalling that undo history should pop.
 *
 * @return {Object} Action object.
 */


function undo() {
  return {
    type: 'UNDO'
  };
}
/**
 * Returns an action object used in signalling that undo history record should
 * be created.
 *
 * @return {Object} Action object.
 */


function createUndoLevel() {
  return {
    type: 'CREATE_UNDO_LEVEL'
  };
}
/**
 * Returns an action object used in signalling that the blocks corresponding to
 * the set of specified client IDs are to be removed.
 *
 * @param {string|string[]} clientIds      Client IDs of blocks to remove.
 * @param {boolean}         selectPrevious True if the previous block should be
 *                                         selected when a block is removed.
 *
 * @return {Object} Action object.
 */


function removeBlocks(clientIds) {
  var selectPrevious = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return {
    type: 'REMOVE_BLOCKS',
    clientIds: (0, _lodash.castArray)(clientIds),
    selectPrevious: selectPrevious
  };
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID is to be removed.
 *
 * @param {string}  clientId       Client ID of block to remove.
 * @param {boolean} selectPrevious True if the previous block should be
 *                                 selected when a block is removed.
 *
 * @return {Object} Action object.
 */


function removeBlock(clientId, selectPrevious) {
  return removeBlocks([clientId], selectPrevious);
}
/**
 * Returns an action object used to toggle the block editing mode between
 * visual and HTML modes.
 *
 * @param {string} clientId Block client ID.
 *
 * @return {Object} Action object.
 */


function toggleBlockMode(clientId) {
  return {
    type: 'TOGGLE_BLOCK_MODE',
    clientId: clientId
  };
}
/**
 * Returns an action object used in signalling that the user has begun to type.
 *
 * @return {Object} Action object.
 */


function startTyping() {
  return {
    type: 'START_TYPING'
  };
}
/**
 * Returns an action object used in signalling that the user has stopped typing.
 *
 * @return {Object} Action object.
 */


function stopTyping() {
  return {
    type: 'STOP_TYPING'
  };
}
/**
 * Returns an action object used in signalling that the caret has entered formatted text.
 *
 * @return {Object} Action object.
 */


function enterFormattedText() {
  return {
    type: 'ENTER_FORMATTED_TEXT'
  };
}
/**
 * Returns an action object used in signalling that the user caret has exited formatted text.
 *
 * @return {Object} Action object.
 */


function exitFormattedText() {
  return {
    type: 'EXIT_FORMATTED_TEXT'
  };
}
/**
 * Returns an action object used to lock the editor.
 *
 * @param {Object}  lock Details about the post lock status, user, and nonce.
 *
 * @return {Object} Action object.
 */


function updatePostLock(lock) {
  return {
    type: 'UPDATE_POST_LOCK',
    lock: lock
  };
}
/**
 * Returns an action object used to fetch a single reusable block or all
 * reusable blocks from the REST API into the store.
 *
 * @param {?string} id If given, only a single reusable block with this ID will
 *                     be fetched.
 *
 * @return {Object} Action object.
 */


function __experimentalFetchReusableBlocks(id) {
  return {
    type: 'FETCH_REUSABLE_BLOCKS',
    id: id
  };
}
/**
 * Returns an action object used in signalling that reusable blocks have been
 * received. `results` is an array of objects containing:
 *  - `reusableBlock` - Details about how the reusable block is persisted.
 *  - `parsedBlock` - The original block.
 *
 * @param {Object[]} results Reusable blocks received.
 *
 * @return {Object} Action object.
 */


function __experimentalReceiveReusableBlocks(results) {
  return {
    type: 'RECEIVE_REUSABLE_BLOCKS',
    results: results
  };
}
/**
 * Returns an action object used to save a reusable block that's in the store to
 * the REST API.
 *
 * @param {Object} id The ID of the reusable block to save.
 *
 * @return {Object} Action object.
 */


function __experimentalSaveReusableBlock(id) {
  return {
    type: 'SAVE_REUSABLE_BLOCK',
    id: id
  };
}
/**
 * Returns an action object used to delete a reusable block via the REST API.
 *
 * @param {number} id The ID of the reusable block to delete.
 *
 * @return {Object} Action object.
 */


function __experimentalDeleteReusableBlock(id) {
  return {
    type: 'DELETE_REUSABLE_BLOCK',
    id: id
  };
}
/**
 * Returns an action object used in signalling that a reusable block's title is
 * to be updated.
 *
 * @param {number} id    The ID of the reusable block to update.
 * @param {string} title The new title.
 *
 * @return {Object} Action object.
 */


function __experimentalUpdateReusableBlockTitle(id, title) {
  return {
    type: 'UPDATE_REUSABLE_BLOCK_TITLE',
    id: id,
    title: title
  };
}
/**
 * Returns an action object used to convert a reusable block into a static block.
 *
 * @param {string} clientId The client ID of the block to attach.
 *
 * @return {Object} Action object.
 */


function __experimentalConvertBlockToStatic(clientId) {
  return {
    type: 'CONVERT_BLOCK_TO_STATIC',
    clientId: clientId
  };
}
/**
 * Returns an action object used to convert a static block into a reusable block.
 *
 * @param {string} clientIds The client IDs of the block to detach.
 *
 * @return {Object} Action object.
 */


function __experimentalConvertBlockToReusable(clientIds) {
  return {
    type: 'CONVERT_BLOCK_TO_REUSABLE',
    clientIds: (0, _lodash.castArray)(clientIds)
  };
}
/**
 * Returns an action object used in signalling that a new block of the default
 * type should be added to the block list.
 *
 * @param {?Object} attributes   Optional attributes of the block to assign.
 * @param {?string} rootClientId Optional root client ID of block list on which
 *                               to append.
 * @param {?number} index        Optional index where to insert the default block
 *
 * @return {Object} Action object
 */


function insertDefaultBlock(attributes, rootClientId, index) {
  var block = (0, _blocks.createBlock)((0, _blocks.getDefaultBlockName)(), attributes);
  return insertBlock(block, index, rootClientId);
}
/**
 * Returns an action object that changes the nested settings of a given block.
 *
 * @param {string} clientId Client ID of the block whose nested setting are
 *                          being received.
 * @param {Object} settings Object with the new settings for the nested block.
 *
 * @return {Object} Action object
 */


function updateBlockListSettings(clientId, settings) {
  return {
    type: 'UPDATE_BLOCK_LIST_SETTINGS',
    clientId: clientId,
    settings: settings
  };
}
/*
 * Returns an action object used in signalling that the editor settings have been updated.
 *
 * @param {Object} settings Updated settings
 *
 * @return {Object} Action object
 */


function updateEditorSettings(settings) {
  return {
    type: 'UPDATE_EDITOR_SETTINGS',
    settings: settings
  };
}
/**
 * Returns an action object used in signalling that the user has enabled the publish sidebar.
 *
 * @return {Object} Action object
 */


function enablePublishSidebar() {
  return {
    type: 'ENABLE_PUBLISH_SIDEBAR'
  };
}
/**
 * Returns an action object used in signalling that the user has disabled the publish sidebar.
 *
 * @return {Object} Action object
 */


function disablePublishSidebar() {
  return {
    type: 'DISABLE_PUBLISH_SIDEBAR'
  };
}
/**
 * Returns an action object used to signal that post saving is locked.
 *
 * @param  {string} lockName The lock name.
 *
 * @return {Object} Action object
 */


function lockPostSaving(lockName) {
  return {
    type: 'LOCK_POST_SAVING',
    lockName: lockName
  };
}
/**
 * Returns an action object used to signal that post saving is unlocked.
 *
 * @param  {string} lockName The lock name.
 *
 * @return {Object} Action object
 */


function unlockPostSaving(lockName) {
  return {
    type: 'UNLOCK_POST_SAVING',
    lockName: lockName
  };
} //
// Deprecated
//


function createNotice(status, content, options) {
  (0, _deprecated.default)('createNotice action (`core/editor` store)', {
    alternative: 'createNotice action (`core/notices` store)',
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  (0, _data.dispatch)('core/notices').createNotice(status, content, options);
  return {
    type: '__INERT__'
  };
}

function removeNotice(id) {
  (0, _deprecated.default)('removeNotice action (`core/editor` store)', {
    alternative: 'removeNotice action (`core/notices` store)',
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  (0, _data.dispatch)('core/notices').removeNotice(id);
  return {
    type: '__INERT__'
  };
}

var createSuccessNotice = (0, _lodash.partial)(createNotice, 'success');
exports.createSuccessNotice = createSuccessNotice;
var createInfoNotice = (0, _lodash.partial)(createNotice, 'info');
exports.createInfoNotice = createInfoNotice;
var createErrorNotice = (0, _lodash.partial)(createNotice, 'error');
exports.createErrorNotice = createErrorNotice;
var createWarningNotice = (0, _lodash.partial)(createNotice, 'warning'); //
// Deprecated
//

exports.createWarningNotice = createWarningNotice;

function fetchReusableBlocks(id) {
  (0, _deprecated.default)("wp.data.dispatch( 'core/editor' ).fetchReusableBlocks( id )", {
    alternative: "wp.data.select( 'core' ).getEntityRecords( 'postType', 'wp_block' )",
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return __experimentalFetchReusableBlocks(id);
}

function receiveReusableBlocks(results) {
  (0, _deprecated.default)("wp.data.dispatch( 'core/editor' ).receiveReusableBlocks( results )", {
    alternative: "wp.data.select( 'core' ).getEntityRecords( 'postType', 'wp_block' )",
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return __experimentalReceiveReusableBlocks(results);
}

function saveReusableBlock(id) {
  (0, _deprecated.default)("wp.data.dispatch( 'core/editor' ).saveReusableBlock( id )", {
    alternative: "wp.data.dispatch( 'core' ).saveEntityRecord( 'postType', 'wp_block', reusableBlock )",
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return __experimentalSaveReusableBlock(id);
}

function deleteReusableBlock(id) {
  (0, _deprecated.default)('deleteReusableBlock action (`core/editor` store)', {
    alternative: '__experimentalDeleteReusableBlock action (`core/edtior` store)',
    plugin: 'Gutenberg',
    version: '4.4.0',
    hint: 'Using experimental APIs is strongly discouraged as they are subject to removal without notice.'
  });
  return __experimentalDeleteReusableBlock(id);
}

function updateReusableBlockTitle(id, title) {
  (0, _deprecated.default)("wp.data.dispatch( 'core/editor' ).updateReusableBlockTitle( id, title )", {
    alternative: "wp.data.dispatch( 'core' ).saveEntityRecord( 'postType', 'wp_block', reusableBlock )",
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return __experimentalUpdateReusableBlockTitle(id, title);
}

function convertBlockToStatic(id) {
  (0, _deprecated.default)('convertBlockToStatic action (`core/editor` store)', {
    alternative: '__experimentalConvertBlockToStatic action (`core/edtior` store)',
    plugin: 'Gutenberg',
    version: '4.4.0',
    hint: 'Using experimental APIs is strongly discouraged as they are subject to removal without notice.'
  });
  return __experimentalConvertBlockToStatic(id);
}

function convertBlockToReusable(id) {
  (0, _deprecated.default)('convertBlockToReusable action (`core/editor` store)', {
    alternative: '__experimentalConvertBlockToReusable action (`core/edtior` store)',
    plugin: 'Gutenberg',
    version: '4.4.0',
    hint: 'Using experimental APIs is strongly discouraged as they are subject to removal without notice.'
  });
  return __experimentalConvertBlockToReusable(id);
}
//# sourceMappingURL=actions.js.map