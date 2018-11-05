"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBlocksToTemplate = validateBlocksToTemplate;
exports.selectPreviousBlock = selectPreviousBlock;
exports.ensureDefaultBlock = ensureDefaultBlock;
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _actions = require("./actions");

var _selectors = require("./selectors");

var _reusableBlocks = require("./effects/reusable-blocks");

var _posts = require("./effects/posts");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Block validity is a function of blocks state (at the point of a
 * reset) and the template setting. As a compromise to its placement
 * across distinct parts of state, it is implemented here as a side-
 * effect of the block reset action.
 *
 * @param {Object} action RESET_BLOCKS action.
 * @param {Object} store  Store instance.
 *
 * @return {?Object} New validity set action if validity has changed.
 */
function validateBlocksToTemplate(action, store) {
  var state = store.getState();
  var template = (0, _selectors.getTemplate)(state);
  var templateLock = (0, _selectors.getTemplateLock)(state); // Unlocked templates are considered always valid because they act
  // as default values only.

  var isBlocksValidToTemplate = !template || templateLock !== 'all' || (0, _blocks.doBlocksMatchTemplate)(action.blocks, template); // Update if validity has changed.

  if (isBlocksValidToTemplate !== (0, _selectors.isValidTemplate)(state)) {
    return (0, _actions.setTemplateValidity)(isBlocksValidToTemplate);
  }
}
/**
 * Effect handler which will return a block select action to select the block
 * occurring before the selected block in the previous state, unless it is the
 * same block or the action includes a falsey `selectPrevious` option flag.
 *
 * @param {Object} action Action which had initiated the effect handler.
 * @param {Object} store  Store instance.
 *
 * @return {?Object} Block select action to select previous, if applicable.
 */


function selectPreviousBlock(action, store) {
  // if the action says previous block should not be selected don't do anything.
  if (!action.selectPrevious) {
    return;
  }

  var firstRemovedBlockClientId = action.clientIds[0];
  var state = store.getState();
  var currentSelectedBlock = (0, _selectors.getSelectedBlock)(state); // recreate the state before the block was removed.

  var previousState = (0, _objectSpread2.default)({}, state, {
    editor: {
      present: (0, _lodash.last)(state.editor.past)
    }
  }); // rootClientId of the removed block.

  var rootClientId = (0, _selectors.getBlockRootClientId)(previousState, firstRemovedBlockClientId); // Client ID of the block that was before the removed block or the
  // rootClientId if the removed block was first amongst its siblings.

  var blockClientIdToSelect = (0, _selectors.getPreviousBlockClientId)(previousState, firstRemovedBlockClientId) || rootClientId; // Dispatch select block action if the currently selected block
  // is not already the block we want to be selected.

  if (blockClientIdToSelect !== currentSelectedBlock) {
    return (0, _actions.selectBlock)(blockClientIdToSelect, -1);
  }
}
/**
 * Effect handler which will return a default block insertion action if there
 * are no other blocks at the root of the editor. This is expected to be used
 * in actions which may result in no blocks remaining in the editor (removal,
 * replacement, etc).
 *
 * @param {Object} action Action which had initiated the effect handler.
 * @param {Object} store  Store instance.
 *
 * @return {?Object} Default block insert action, if no other blocks exist.
 */


function ensureDefaultBlock(action, store) {
  if (!(0, _selectors.getBlockCount)(store.getState())) {
    return (0, _actions.insertDefaultBlock)();
  }
}

var _default = {
  REQUEST_POST_UPDATE: function REQUEST_POST_UPDATE(action, store) {
    (0, _posts.requestPostUpdate)(action, store);
  },
  REQUEST_POST_UPDATE_SUCCESS: _posts.requestPostUpdateSuccess,
  REQUEST_POST_UPDATE_FAILURE: _posts.requestPostUpdateFailure,
  TRASH_POST: function TRASH_POST(action, store) {
    (0, _posts.trashPost)(action, store);
  },
  TRASH_POST_FAILURE: _posts.trashPostFailure,
  REFRESH_POST: function REFRESH_POST(action, store) {
    (0, _posts.refreshPost)(action, store);
  },
  MERGE_BLOCKS: function MERGE_BLOCKS(action, store) {
    var dispatch = store.dispatch;
    var state = store.getState();

    var _action$blocks = (0, _slicedToArray2.default)(action.blocks, 2),
        firstBlockClientId = _action$blocks[0],
        secondBlockClientId = _action$blocks[1];

    var blockA = (0, _selectors.getBlock)(state, firstBlockClientId);
    var blockB = (0, _selectors.getBlock)(state, secondBlockClientId);
    var blockType = (0, _blocks.getBlockType)(blockA.name); // Only focus the previous block if it's not mergeable

    if (!blockType.merge) {
      dispatch((0, _actions.selectBlock)(blockA.clientId));
      return;
    } // We can only merge blocks with similar types
    // thus, we transform the block to merge first


    var blocksWithTheSameType = blockA.name === blockB.name ? [blockB] : (0, _blocks.switchToBlockType)(blockB, blockA.name); // If the block types can not match, do nothing

    if (!blocksWithTheSameType || !blocksWithTheSameType.length) {
      return;
    } // Calling the merge to update the attributes and remove the block to be merged


    var updatedAttributes = blockType.merge(blockA.attributes, blocksWithTheSameType[0].attributes);
    dispatch((0, _actions.selectBlock)(blockA.clientId, -1));
    dispatch((0, _actions.replaceBlocks)([blockA.clientId, blockB.clientId], [(0, _objectSpread2.default)({}, blockA, {
      attributes: (0, _objectSpread2.default)({}, blockA.attributes, updatedAttributes)
    })].concat((0, _toConsumableArray2.default)(blocksWithTheSameType.slice(1)))));
  },
  SETUP_EDITOR: function SETUP_EDITOR(action, store) {
    var post = action.post;
    var state = store.getState(); // Parse content as blocks

    var blocks = (0, _blocks.parse)(post.content.raw); // Apply a template for new posts only, if exists.

    var isNewPost = post.status === 'auto-draft';
    var template = (0, _selectors.getTemplate)(state);

    if (isNewPost && template) {
      blocks = (0, _blocks.synchronizeBlocksWithTemplate)(blocks, template);
    } // Include auto draft title in edits while not flagging post as dirty


    var edits = {};

    if (isNewPost) {
      edits.title = post.title.raw;
    }

    var setupAction = (0, _actions.setupEditorState)(post, blocks, edits);
    return (0, _lodash.compact)([setupAction, // TODO: This is temporary, necessary only so long as editor setup
    // is a separate action from block resetting.
    //
    // See: https://github.com/WordPress/gutenberg/pull/9403
    validateBlocksToTemplate(setupAction, store)]);
  },
  RESET_BLOCKS: [validateBlocksToTemplate],
  SYNCHRONIZE_TEMPLATE: function SYNCHRONIZE_TEMPLATE(action, _ref) {
    var getState = _ref.getState;
    var state = getState();
    var blocks = (0, _selectors.getBlocks)(state);
    var template = (0, _selectors.getTemplate)(state);
    var updatedBlockList = (0, _blocks.synchronizeBlocksWithTemplate)(blocks, template);
    return (0, _actions.resetBlocks)(updatedBlockList);
  },
  FETCH_REUSABLE_BLOCKS: function FETCH_REUSABLE_BLOCKS(action, store) {
    (0, _reusableBlocks.fetchReusableBlocks)(action, store);
  },
  SAVE_REUSABLE_BLOCK: function SAVE_REUSABLE_BLOCK(action, store) {
    (0, _reusableBlocks.saveReusableBlocks)(action, store);
  },
  DELETE_REUSABLE_BLOCK: function DELETE_REUSABLE_BLOCK(action, store) {
    (0, _reusableBlocks.deleteReusableBlocks)(action, store);
  },
  RECEIVE_REUSABLE_BLOCKS: _reusableBlocks.receiveReusableBlocks,
  CONVERT_BLOCK_TO_STATIC: _reusableBlocks.convertBlockToStatic,
  CONVERT_BLOCK_TO_REUSABLE: _reusableBlocks.convertBlockToReusable,
  REMOVE_BLOCKS: [selectPreviousBlock, ensureDefaultBlock],
  REPLACE_BLOCKS: [ensureDefaultBlock]
};
exports.default = _default;
//# sourceMappingURL=effects.js.map