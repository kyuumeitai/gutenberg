"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasEditorUndo = hasEditorUndo;
exports.hasEditorRedo = hasEditorRedo;
exports.isEditedPostNew = isEditedPostNew;
exports.isEditedPostDirty = isEditedPostDirty;
exports.isCleanNewPost = isCleanNewPost;
exports.getCurrentPost = getCurrentPost;
exports.getCurrentPostType = getCurrentPostType;
exports.getCurrentPostId = getCurrentPostId;
exports.getCurrentPostRevisionsCount = getCurrentPostRevisionsCount;
exports.getCurrentPostLastRevisionId = getCurrentPostLastRevisionId;
exports.getPostEdits = getPostEdits;
exports.getCurrentPostAttribute = getCurrentPostAttribute;
exports.getEditedPostAttribute = getEditedPostAttribute;
exports.getAutosaveAttribute = getAutosaveAttribute;
exports.getEditedPostVisibility = getEditedPostVisibility;
exports.isCurrentPostPending = isCurrentPostPending;
exports.isCurrentPostPublished = isCurrentPostPublished;
exports.isCurrentPostScheduled = isCurrentPostScheduled;
exports.isEditedPostPublishable = isEditedPostPublishable;
exports.isEditedPostSaveable = isEditedPostSaveable;
exports.isEditedPostEmpty = isEditedPostEmpty;
exports.isEditedPostAutosaveable = isEditedPostAutosaveable;
exports.getAutosave = getAutosave;
exports.hasAutosave = hasAutosave;
exports.isEditedPostBeingScheduled = isEditedPostBeingScheduled;
exports.isEditedPostDateFloating = isEditedPostDateFloating;
exports.getBlockName = getBlockName;
exports.getBlockCount = getBlockCount;
exports.getBlockSelectionStart = getBlockSelectionStart;
exports.getBlockSelectionEnd = getBlockSelectionEnd;
exports.getSelectedBlockCount = getSelectedBlockCount;
exports.hasSelectedBlock = hasSelectedBlock;
exports.getSelectedBlockClientId = getSelectedBlockClientId;
exports.getSelectedBlock = getSelectedBlock;
exports.getAdjacentBlockClientId = getAdjacentBlockClientId;
exports.getPreviousBlockClientId = getPreviousBlockClientId;
exports.getNextBlockClientId = getNextBlockClientId;
exports.getSelectedBlocksInitialCaretPosition = getSelectedBlocksInitialCaretPosition;
exports.getFirstMultiSelectedBlockClientId = getFirstMultiSelectedBlockClientId;
exports.getLastMultiSelectedBlockClientId = getLastMultiSelectedBlockClientId;
exports.isFirstMultiSelectedBlock = isFirstMultiSelectedBlock;
exports.isBlockMultiSelected = isBlockMultiSelected;
exports.getMultiSelectedBlocksStartClientId = getMultiSelectedBlocksStartClientId;
exports.getMultiSelectedBlocksEndClientId = getMultiSelectedBlocksEndClientId;
exports.getBlockOrder = getBlockOrder;
exports.getBlockIndex = getBlockIndex;
exports.isBlockSelected = isBlockSelected;
exports.hasSelectedInnerBlock = hasSelectedInnerBlock;
exports.isBlockWithinSelection = isBlockWithinSelection;
exports.hasMultiSelection = hasMultiSelection;
exports.isMultiSelecting = isMultiSelecting;
exports.isSelectionEnabled = isSelectionEnabled;
exports.getBlockMode = getBlockMode;
exports.isTyping = isTyping;
exports.isCaretWithinFormattedText = isCaretWithinFormattedText;
exports.getBlockInsertionPoint = getBlockInsertionPoint;
exports.isBlockInsertionPointVisible = isBlockInsertionPointVisible;
exports.isValidTemplate = isValidTemplate;
exports.getTemplate = getTemplate;
exports.getTemplateLock = getTemplateLock;
exports.isSavingPost = isSavingPost;
exports.didPostSaveRequestSucceed = didPostSaveRequestSucceed;
exports.didPostSaveRequestFail = didPostSaveRequestFail;
exports.isAutosavingPost = isAutosavingPost;
exports.getSuggestedPostFormat = getSuggestedPostFormat;
exports.getBlocksForSerialization = getBlocksForSerialization;
exports.__experimentalIsSavingReusableBlock = __experimentalIsSavingReusableBlock;
exports.__experimentalIsFetchingReusableBlock = __experimentalIsFetchingReusableBlock;
exports.__experimentalGetReusableBlocks = __experimentalGetReusableBlocks;
exports.getStateBeforeOptimisticTransaction = getStateBeforeOptimisticTransaction;
exports.isPublishingPost = isPublishingPost;
exports.isPermalinkEditable = isPermalinkEditable;
exports.getPermalink = getPermalink;
exports.getPermalinkParts = getPermalinkParts;
exports.inSomeHistory = inSomeHistory;
exports.getBlockListSettings = getBlockListSettings;
exports.getEditorSettings = getEditorSettings;
exports.getTokenSettings = getTokenSettings;
exports.isPostLocked = isPostLocked;
exports.isPostSavingLocked = isPostSavingLocked;
exports.isPostLockTakeover = isPostLockTakeover;
exports.getPostLockUser = getPostLockUser;
exports.getActivePostLock = getActivePostLock;
exports.canUserUseUnfilteredHTML = canUserUseUnfilteredHTML;
exports.isPublishSidebarEnabled = isPublishSidebarEnabled;
exports.getNotices = getNotices;
exports.getReusableBlock = getReusableBlock;
exports.isSavingReusableBlock = isSavingReusableBlock;
exports.isFetchingReusableBlock = isFetchingReusableBlock;
exports.getReusableBlocks = getReusableBlocks;
exports.__experimentalGetReusableBlock = exports.getInserterItems = exports.canInsertBlockType = exports.getEditedPostContent = exports.isAncestorMultiSelected = exports.getMultiSelectedBlocks = exports.getMultiSelectedBlockClientIds = exports.getBlockHierarchyRootClientId = exports.getBlockRootClientId = exports.getBlocksByClientId = exports.getGlobalBlockCount = exports.getClientIdsWithDescendants = exports.getClientIdsOfDescendants = exports.getBlocks = exports.getBlock = exports.getBlockDependantsCacheBust = exports.getReferenceByDistinctEdits = exports.INSERTER_UTILITY_NONE = exports.INSERTER_UTILITY_LOW = exports.INSERTER_UTILITY_MEDIUM = exports.INSERTER_UTILITY_HIGH = exports.POST_UPDATE_TRANSACTION_ID = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _rememo = _interopRequireDefault(require("rememo"));

var _blocks = require("@wordpress/blocks");

var _date = require("@wordpress/date");

var _autop = require("@wordpress/autop");

var _data = require("@wordpress/data");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _defaults = require("./defaults");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Dependencies
 */

/***
 * Module constants
 */
var POST_UPDATE_TRANSACTION_ID = 'post-update';
exports.POST_UPDATE_TRANSACTION_ID = POST_UPDATE_TRANSACTION_ID;
var PERMALINK_POSTNAME_REGEX = /%(?:postname|pagename)%/;
var INSERTER_UTILITY_HIGH = 3;
exports.INSERTER_UTILITY_HIGH = INSERTER_UTILITY_HIGH;
var INSERTER_UTILITY_MEDIUM = 2;
exports.INSERTER_UTILITY_MEDIUM = INSERTER_UTILITY_MEDIUM;
var INSERTER_UTILITY_LOW = 1;
exports.INSERTER_UTILITY_LOW = INSERTER_UTILITY_LOW;
var INSERTER_UTILITY_NONE = 0;
exports.INSERTER_UTILITY_NONE = INSERTER_UTILITY_NONE;
var MILLISECONDS_PER_HOUR = 3600 * 1000;
var MILLISECONDS_PER_DAY = 24 * 3600 * 1000;
var MILLISECONDS_PER_WEEK = 7 * 24 * 3600 * 1000;
/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation, as in a connected or
 * other pure component which performs `shouldComponentUpdate` check on props.
 * This should be used as a last resort, since the normalized data should be
 * maintained by the reducer result in state.
 *
 * @type {Array}
 */

var EMPTY_ARRAY = [];
/**
 * Returns true if any past editor history snapshots exist, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether undo history exists.
 */

function hasEditorUndo(state) {
  return state.editor.past.length > 0;
}
/**
 * Returns true if any future editor history snapshots exist, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether redo history exists.
 */


function hasEditorRedo(state) {
  return state.editor.future.length > 0;
}
/**
 * Returns true if the currently edited post is yet to be saved, or false if
 * the post has been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is new.
 */


function isEditedPostNew(state) {
  return getCurrentPost(state).status === 'auto-draft';
}
/**
 * Returns true if there are unsaved values for the current edit session, or
 * false if the editing state matches the saved or new post.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether unsaved values exist.
 */


function isEditedPostDirty(state) {
  return state.editor.isDirty || inSomeHistory(state, isEditedPostDirty);
}
/**
 * Returns true if there are no unsaved values for the current edit session and
 * if the currently edited post is new (has never been saved before).
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether new post and unsaved values exist.
 */


function isCleanNewPost(state) {
  return !isEditedPostDirty(state) && isEditedPostNew(state);
}
/**
 * Returns the post currently being edited in its last known saved state, not
 * including unsaved edits. Returns an object containing relevant default post
 * values if the post has not yet been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Post object.
 */


function getCurrentPost(state) {
  return state.currentPost;
}
/**
 * Returns the post type of the post currently being edited.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post type.
 */


function getCurrentPostType(state) {
  return state.currentPost.type;
}
/**
 * Returns the ID of the post currently being edited, or null if the post has
 * not yet been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {?number} ID of current post.
 */


function getCurrentPostId(state) {
  return getCurrentPost(state).id || null;
}
/**
 * Returns the number of revisions of the post currently being edited.
 *
 * @param {Object} state Global application state.
 *
 * @return {number} Number of revisions.
 */


function getCurrentPostRevisionsCount(state) {
  return (0, _lodash.get)(getCurrentPost(state), ['_links', 'version-history', 0, 'count'], 0);
}
/**
 * Returns the last revision ID of the post currently being edited,
 * or null if the post has no revisions.
 *
 * @param {Object} state Global application state.
 *
 * @return {?number} ID of the last revision.
 */


function getCurrentPostLastRevisionId(state) {
  return (0, _lodash.get)(getCurrentPost(state), ['_links', 'predecessor-version', 0, 'id'], null);
}
/**
 * Returns any post values which have been changed in the editor but not yet
 * been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Object of key value pairs comprising unsaved edits.
 */


function getPostEdits(state) {
  return state.editor.present.edits;
}
/**
 * Returns a new reference when edited values have changed. This is useful in
 * inferring where an edit has been made between states by comparison of the
 * return values using strict equality.
 *
 * @example
 *
 * ```
 * const hasEditOccurred = (
 *    getReferenceByDistinctEdits( beforeState ) !==
 *    getReferenceByDistinctEdits( afterState )
 * );
 * ```
 *
 * @param {Object} state Editor state.
 *
 * @return {*} A value whose reference will change only when an edit occurs.
 */


var getReferenceByDistinctEdits = (0, _rememo.default)(function () {
  return [];
}, function (state) {
  return [state.editor];
});
/**
 * Returns an attribute value of the saved post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Post attribute name.
 *
 * @return {*} Post attribute value.
 */

exports.getReferenceByDistinctEdits = getReferenceByDistinctEdits;

function getCurrentPostAttribute(state, attributeName) {
  var post = getCurrentPost(state);

  if (post.hasOwnProperty(attributeName)) {
    return post[attributeName];
  }
}
/**
 * Returns a single attribute of the post being edited, preferring the unsaved
 * edit if one exists, but falling back to the attribute for the last known
 * saved state of the post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Post attribute name.
 *
 * @return {*} Post attribute value.
 */


function getEditedPostAttribute(state, attributeName) {
  var edits = getPostEdits(state); // Special cases

  switch (attributeName) {
    case 'content':
      return getEditedPostContent(state);
  }

  if (!edits.hasOwnProperty(attributeName)) {
    return getCurrentPostAttribute(state, attributeName);
  }

  return edits[attributeName];
}
/**
 * Returns an attribute value of the current autosave revision for a post, or
 * null if there is no autosave for the post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Autosave attribute name.
 *
 * @return {*} Autosave attribute value.
 */


function getAutosaveAttribute(state, attributeName) {
  if (!hasAutosave(state)) {
    return null;
  }

  var autosave = getAutosave(state);

  if (autosave.hasOwnProperty(attributeName)) {
    return autosave[attributeName];
  }
}
/**
 * Returns the current visibility of the post being edited, preferring the
 * unsaved value if different than the saved post. The return value is one of
 * "private", "password", or "public".
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post visibility.
 */


function getEditedPostVisibility(state) {
  var status = getEditedPostAttribute(state, 'status');
  var password = getEditedPostAttribute(state, 'password');

  if (status === 'private') {
    return 'private';
  } else if (password) {
    return 'password';
  }

  return 'public';
}
/**
 * Returns true if post is pending review.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether current post is pending review.
 */


function isCurrentPostPending(state) {
  return getCurrentPost(state).status === 'pending';
}
/**
 * Return true if the current post has already been published.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post has been published.
 */


function isCurrentPostPublished(state) {
  var post = getCurrentPost(state);
  return ['publish', 'private'].indexOf(post.status) !== -1 || post.status === 'future' && (0, _date.moment)(post.date).isBefore((0, _date.moment)());
}
/**
 * Returns true if post is already scheduled.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether current post is scheduled to be posted.
 */


function isCurrentPostScheduled(state) {
  return getCurrentPost(state).status === 'future' && !isCurrentPostPublished(state);
}
/**
 * Return true if the post being edited can be published.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post can been published.
 */


function isEditedPostPublishable(state) {
  var post = getCurrentPost(state); // TODO: Post being publishable should be superset of condition of post
  // being saveable. Currently this restriction is imposed at UI.
  //
  //  See: <PostPublishButton /> (`isButtonEnabled` assigned by `isSaveable`)

  return isEditedPostDirty(state) || ['publish', 'private', 'future'].indexOf(post.status) === -1;
}
/**
 * Returns true if the post can be saved, or false otherwise. A post must
 * contain a title, an excerpt, or non-empty content to be valid for save.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post can be saved.
 */


function isEditedPostSaveable(state) {
  if (isSavingPost(state)) {
    return false;
  } // TODO: Post should not be saveable if not dirty. Cannot be added here at
  // this time since posts where meta boxes are present can be saved even if
  // the post is not dirty. Currently this restriction is imposed at UI, but
  // should be moved here.
  //
  //  See: `isEditedPostPublishable` (includes `isEditedPostDirty` condition)
  //  See: <PostSavedState /> (`forceIsDirty` prop)
  //  See: <PostPublishButton /> (`forceIsDirty` prop)
  //  See: https://github.com/WordPress/gutenberg/pull/4184


  return !!getEditedPostAttribute(state, 'title') || !!getEditedPostAttribute(state, 'excerpt') || !isEditedPostEmpty(state);
}
/**
 * Returns true if the edited post has content. A post has content if it has at
 * least one saveable block or otherwise has a non-empty content property
 * assigned.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post has content.
 */


function isEditedPostEmpty(state) {
  var blocks = getBlocksForSerialization(state); // While the condition of truthy content string is sufficient to determine
  // emptiness, testing saveable blocks length is a trivial operation. Since
  // this function can be called frequently, optimize for the fast case as a
  // condition of the mere existence of blocks. Note that the value of edited
  // content is used in place of blocks, thus allowed to fall through.

  if (blocks.length && !('content' in getPostEdits(state))) {
    // Pierce the abstraction of the serializer in knowing that blocks are
    // joined with with newlines such that even if every individual block
    // produces an empty save result, the serialized content is non-empty.
    if (blocks.length > 1) {
      return false;
    } // Freeform and unregistered blocks omit comment delimiters in their
    // output. The freeform block specifically may produce an empty string
    // to save. In the case of a single freeform block, fall through to the
    // full serialize. Otherwise, the single block is assumed non-empty by
    // virtue of its comment delimiters.


    if (blocks[0].name !== (0, _blocks.getFreeformContentHandlerName)()) {
      return false;
    }
  }

  return !getEditedPostContent(state);
}
/**
 * Returns true if the post can be autosaved, or false otherwise.
 *
 * @param  {Object}  state Global application state.
 *
 * @return {boolean} Whether the post can be autosaved.
 */


function isEditedPostAutosaveable(state) {
  // A post must contain a title, an excerpt, or non-empty content to be valid for autosaving.
  if (!isEditedPostSaveable(state)) {
    return false;
  } // If we don't already have an autosave, the post is autosaveable.


  if (!hasAutosave(state)) {
    return true;
  } // If the title, excerpt or content has changed, the post is autosaveable.


  var autosave = getAutosave(state);
  return ['title', 'excerpt', 'content'].some(function (field) {
    return autosave[field] !== getEditedPostAttribute(state, field);
  });
}
/**
 * Returns the current autosave, or null if one is not set (i.e. if the post
 * has yet to be autosaved, or has been saved or published since the last
 * autosave).
 *
 * @param {Object} state Editor state.
 *
 * @return {?Object} Current autosave, if exists.
 */


function getAutosave(state) {
  return state.autosave;
}
/**
 * Returns the true if there is an existing autosave, otherwise false.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether there is an existing autosave.
 */


function hasAutosave(state) {
  return !!getAutosave(state);
}
/**
 * Return true if the post being edited is being scheduled. Preferring the
 * unsaved status values.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post has been published.
 */


function isEditedPostBeingScheduled(state) {
  var date = (0, _date.moment)(getEditedPostAttribute(state, 'date')); // Adding 1 minute as an error threshold between the server and the client dates.

  var now = (0, _date.moment)().add(1, 'minute');
  return date.isAfter(now);
}
/**
 * Returns whether the current post should be considered to have a "floating"
 * date (i.e. that it would publish "Immediately" rather than at a set time).
 *
 * Unlike in the PHP backend, the REST API returns a full date string for posts
 * where the 0000-00-00T00:00:00 placeholder is present in the database. To
 * infer that a post is set to publish "Immediately" we check whether the date
 * and modified date are the same.
 *
 * @param  {Object}  state Editor state.
 *
 * @return {boolean} Whether the edited post has a floating date value.
 */


function isEditedPostDateFloating(state) {
  var date = getEditedPostAttribute(state, 'date');
  var modified = getEditedPostAttribute(state, 'modified');
  var status = getEditedPostAttribute(state, 'status');

  if (status === 'draft' || status === 'auto-draft') {
    return date === modified;
  }

  return false;
}
/**
 * Returns a new reference when the inner blocks of a given block client ID
 * change. This is used exclusively as a memoized selector dependant, relying
 * on this selector's shared return value and recursively those of its inner
 * blocks defined as dependencies. This abuses mechanics of the selector
 * memoization to return from the original selector function only when
 * dependants change.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {*} A value whose reference will change only when inner blocks of
 *             the given block client ID change.
 */


var getBlockDependantsCacheBust = (0, _rememo.default)(function () {
  return [];
}, function (state, clientId) {
  return (0, _lodash.map)(getBlockOrder(state, clientId), function (innerBlockClientId) {
    return getBlock(state, innerBlockClientId);
  });
});
/**
 * Returns a block's name given its client ID, or null if no block exists with
 * the client ID.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {string} Block name.
 */

exports.getBlockDependantsCacheBust = getBlockDependantsCacheBust;

function getBlockName(state, clientId) {
  var block = state.editor.present.blocks.byClientId[clientId];
  return block ? block.name : null;
}
/**
 * Returns a block given its client ID. This is a parsed copy of the block,
 * containing its `blockName`, `clientId`, and current `attributes` state. This
 * is not the block's registration settings, which must be retrieved from the
 * blocks module registration store.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {Object} Parsed block object.
 */


var getBlock = (0, _rememo.default)(function (state, clientId) {
  var block = state.editor.present.blocks.byClientId[clientId];

  if (!block) {
    return null;
  }

  var attributes = block.attributes; // Inject custom source attribute values.
  //
  // TODO: Create generic external sourcing pattern, not explicitly
  // targeting meta attributes.

  var type = (0, _blocks.getBlockType)(block.name);

  if (type) {
    attributes = (0, _lodash.reduce)(type.attributes, function (result, value, key) {
      if (value.source === 'meta') {
        if (result === attributes) {
          result = (0, _objectSpread2.default)({}, result);
        }

        result[key] = getPostMeta(state, value.meta);
      }

      return result;
    }, attributes);
  }

  return (0, _objectSpread2.default)({}, block, {
    attributes: attributes,
    innerBlocks: getBlocks(state, clientId)
  });
}, function (state, clientId) {
  return [state.editor.present.blocks.byClientId[clientId], getBlockDependantsCacheBust(state, clientId), state.editor.present.edits.meta, state.currentPost.meta];
});
exports.getBlock = getBlock;

function getPostMeta(state, key) {
  return (0, _lodash.has)(state, ['editor', 'present', 'edits', 'meta', key]) ? (0, _lodash.get)(state, ['editor', 'present', 'edits', 'meta', key]) : (0, _lodash.get)(state, ['currentPost', 'meta', key]);
}
/**
 * Returns all block objects for the current post being edited as an array in
 * the order they appear in the post.
 *
 * Note: It's important to memoize this selector to avoid return a new instance
 * on each call
 *
 * @param {Object}  state        Editor state.
 * @param {?String} rootClientId Optional root client ID of block list.
 *
 * @return {Object[]} Post blocks.
 */


var getBlocks = (0, _rememo.default)(function (state, rootClientId) {
  return (0, _lodash.map)(getBlockOrder(state, rootClientId), function (clientId) {
    return getBlock(state, clientId);
  });
}, function (state) {
  return [state.editor.present.blocks];
});
/**
 * Returns an array containing the clientIds of all descendants
 * of the blocks given.
 *
 * @param {Object} state Global application state.
 * @param {Array} clientIds Array of blocks to inspect.
 *
 * @return {Array} ids of descendants.
 */

exports.getBlocks = getBlocks;

var getClientIdsOfDescendants = function getClientIdsOfDescendants(state, clientIds) {
  return (0, _lodash.flatMap)(clientIds, function (clientId) {
    var descendants = getBlockOrder(state, clientId);
    return (0, _toConsumableArray2.default)(descendants).concat((0, _toConsumableArray2.default)(getClientIdsOfDescendants(state, descendants)));
  });
};
/**
 * Returns an array containing the clientIds of the top-level blocks
 * and their descendants of any depth (for nested blocks).
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} ids of top-level and descendant blocks.
 */


exports.getClientIdsOfDescendants = getClientIdsOfDescendants;
var getClientIdsWithDescendants = (0, _rememo.default)(function (state) {
  var topLevelIds = getBlockOrder(state);
  return (0, _toConsumableArray2.default)(topLevelIds).concat((0, _toConsumableArray2.default)(getClientIdsOfDescendants(state, topLevelIds)));
}, function (state) {
  return [state.editor.present.blocks.order];
});
/**
 * Returns the total number of blocks, or the total number of blocks with a specific name in a post.
 * The number returned includes nested blocks.
 *
 * @param {Object}  state     Global application state.
 * @param {?String} blockName Optional block name, if specified only blocks of that type will be counted.
 *
 * @return {number} Number of blocks in the post, or number of blocks with name equal to blockName.
 */

exports.getClientIdsWithDescendants = getClientIdsWithDescendants;
var getGlobalBlockCount = (0, _rememo.default)(function (state, blockName) {
  if (!blockName) {
    return (0, _lodash.size)(state.editor.present.blocks.byClientId);
  }

  return (0, _lodash.reduce)(state.editor.present.blocks.byClientId, function (count, block) {
    return block.name === blockName ? count + 1 : count;
  }, 0);
}, function (state) {
  return [state.editor.present.blocks.byClientId];
});
/**
 * Given an array of block client IDs, returns the corresponding array of block
 * objects.
 *
 * @param {Object}   state     Editor state.
 * @param {string[]} clientIds Client IDs for which blocks are to be returned.
 *
 * @return {WPBlock[]} Block objects.
 */

exports.getGlobalBlockCount = getGlobalBlockCount;
var getBlocksByClientId = (0, _rememo.default)(function (state, clientIds) {
  return (0, _lodash.map)((0, _lodash.castArray)(clientIds), function (clientId) {
    return getBlock(state, clientId);
  });
}, function (state) {
  return [state.editor.present.edits.meta, state.currentPost.meta, state.editor.present.blocks];
});
/**
 * Returns the number of blocks currently present in the post.
 *
 * @param {Object}  state        Editor state.
 * @param {?string} rootClientId Optional root client ID of block list.
 *
 * @return {number} Number of blocks in the post.
 */

exports.getBlocksByClientId = getBlocksByClientId;

function getBlockCount(state, rootClientId) {
  return getBlockOrder(state, rootClientId).length;
}
/**
 * Returns the current block selection start. This value may be null, and it
 * may represent either a singular block selection or multi-selection start.
 * A selection is singular if its start and end match.
 *
 * @param {Object} state Global application state.
 *
 * @return {?string} Client ID of block selection start.
 */


function getBlockSelectionStart(state) {
  return state.blockSelection.start;
}
/**
 * Returns the current block selection end. This value may be null, and it
 * may represent either a singular block selection or multi-selection end.
 * A selection is singular if its start and end match.
 *
 * @param {Object} state Global application state.
 *
 * @return {?string} Client ID of block selection end.
 */


function getBlockSelectionEnd(state) {
  return state.blockSelection.end;
}
/**
 * Returns the number of blocks currently selected in the post.
 *
 * @param {Object} state Global application state.
 *
 * @return {number} Number of blocks selected in the post.
 */


function getSelectedBlockCount(state) {
  var multiSelectedBlockCount = getMultiSelectedBlockClientIds(state).length;

  if (multiSelectedBlockCount) {
    return multiSelectedBlockCount;
  }

  return state.blockSelection.start ? 1 : 0;
}
/**
 * Returns true if there is a single selected block, or false otherwise.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether a single block is selected.
 */


function hasSelectedBlock(state) {
  var _state$blockSelection = state.blockSelection,
      start = _state$blockSelection.start,
      end = _state$blockSelection.end;
  return !!start && start === end;
}
/**
 * Returns the currently selected block client ID, or null if there is no
 * selected block.
 *
 * @param {Object} state Editor state.
 *
 * @return {?string} Selected block client ID.
 */


function getSelectedBlockClientId(state) {
  var _state$blockSelection2 = state.blockSelection,
      start = _state$blockSelection2.start,
      end = _state$blockSelection2.end;
  return start === end && start ? start : null;
}
/**
 * Returns the currently selected block, or null if there is no selected block.
 *
 * @param {Object} state Global application state.
 *
 * @return {?Object} Selected block.
 */


function getSelectedBlock(state) {
  var clientId = getSelectedBlockClientId(state);
  return clientId ? getBlock(state, clientId) : null;
}
/**
 * Given a block client ID, returns the root block from which the block is
 * nested, an empty string for top-level blocks, or null if the block does not
 * exist.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block from which to find root client ID.
 *
 * @return {?string} Root client ID, if exists
 */


var getBlockRootClientId = (0, _rememo.default)(function (state, clientId) {
  var order = state.editor.present.blocks.order;

  for (var rootClientId in order) {
    if ((0, _lodash.includes)(order[rootClientId], clientId)) {
      return rootClientId;
    }
  }

  return null;
}, function (state) {
  return [state.editor.present.blocks.order];
});
/**
 * Given a block client ID, returns the root of the hierarchy from which the block is nested, return the block itself for root level blocks.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block from which to find root client ID.
 *
 * @return {string} Root client ID
 */

exports.getBlockRootClientId = getBlockRootClientId;
var getBlockHierarchyRootClientId = (0, _rememo.default)(function (state, clientId) {
  var rootClientId = clientId;
  var current = clientId;

  while (rootClientId) {
    current = rootClientId;
    rootClientId = getBlockRootClientId(state, current);
  }

  return current;
}, function (state) {
  return [state.editor.present.blocks.order];
});
/**
 * Returns the client ID of the block adjacent one at the given reference
 * startClientId and modifier directionality. Defaults start startClientId to
 * the selected block, and direction as next block. Returns null if there is no
 * adjacent block.
 *
 * @param {Object}  state         Editor state.
 * @param {?string} startClientId Optional client ID of block from which to
 *                                search.
 * @param {?number} modifier      Directionality multiplier (1 next, -1
 *                                previous).
 *
 * @return {?string} Return the client ID of the block, or null if none exists.
 */

exports.getBlockHierarchyRootClientId = getBlockHierarchyRootClientId;

function getAdjacentBlockClientId(state, startClientId) {
  var modifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  // Default to selected block.
  if (startClientId === undefined) {
    startClientId = getSelectedBlockClientId(state);
  } // Try multi-selection starting at extent based on modifier.


  if (startClientId === undefined) {
    if (modifier < 0) {
      startClientId = getFirstMultiSelectedBlockClientId(state);
    } else {
      startClientId = getLastMultiSelectedBlockClientId(state);
    }
  } // Validate working start client ID.


  if (!startClientId) {
    return null;
  } // Retrieve start block root client ID, being careful to allow the falsey
  // empty string top-level root by explicitly testing against null.


  var rootClientId = getBlockRootClientId(state, startClientId);

  if (rootClientId === null) {
    return null;
  }

  var order = state.editor.present.blocks.order;
  var orderSet = order[rootClientId];
  var index = orderSet.indexOf(startClientId);
  var nextIndex = index + 1 * modifier; // Block was first in set and we're attempting to get previous.

  if (nextIndex < 0) {
    return null;
  } // Block was last in set and we're attempting to get next.


  if (nextIndex === orderSet.length) {
    return null;
  } // Assume incremented index is within the set.


  return orderSet[nextIndex];
}
/**
 * Returns the previous block's client ID from the given reference start ID.
 * Defaults start to the selected block. Returns null if there is no previous
 * block.
 *
 * @param {Object}  state         Editor state.
 * @param {?string} startClientId Optional client ID of block from which to
 *                                search.
 *
 * @return {?string} Adjacent block's client ID, or null if none exists.
 */


function getPreviousBlockClientId(state, startClientId) {
  return getAdjacentBlockClientId(state, startClientId, -1);
}
/**
 * Returns the next block's client ID from the given reference start ID.
 * Defaults start to the selected block. Returns null if there is no next
 * block.
 *
 * @param {Object}  state         Editor state.
 * @param {?string} startClientId Optional client ID of block from which to
 *                                search.
 *
 * @return {?string} Adjacent block's client ID, or null if none exists.
 */


function getNextBlockClientId(state, startClientId) {
  return getAdjacentBlockClientId(state, startClientId, 1);
}
/**
 * Returns the initial caret position for the selected block.
 * This position is to used to position the caret properly when the selected block changes.
 *
 * @param {Object} state Global application state.
 *
 * @return {?Object} Selected block.
 */


function getSelectedBlocksInitialCaretPosition(state) {
  var _state$blockSelection3 = state.blockSelection,
      start = _state$blockSelection3.start,
      end = _state$blockSelection3.end;

  if (start !== end || !start) {
    return null;
  }

  return state.blockSelection.initialPosition;
}
/**
 * Returns the current multi-selection set of block client IDs, or an empty
 * array if there is no multi-selection.
 *
 * @param {Object} state Editor state.
 *
 * @return {Array} Multi-selected block client IDs.
 */


var getMultiSelectedBlockClientIds = (0, _rememo.default)(function (state) {
  var _state$blockSelection4 = state.blockSelection,
      start = _state$blockSelection4.start,
      end = _state$blockSelection4.end;

  if (start === end) {
    return [];
  } // Retrieve root client ID to aid in retrieving relevant nested block
  // order, being careful to allow the falsey empty string top-level root
  // by explicitly testing against null.


  var rootClientId = getBlockRootClientId(state, start);

  if (rootClientId === null) {
    return [];
  }

  var blockOrder = getBlockOrder(state, rootClientId);
  var startIndex = blockOrder.indexOf(start);
  var endIndex = blockOrder.indexOf(end);

  if (startIndex > endIndex) {
    return blockOrder.slice(endIndex, startIndex + 1);
  }

  return blockOrder.slice(startIndex, endIndex + 1);
}, function (state) {
  return [state.editor.present.blocks.order, state.blockSelection.start, state.blockSelection.end];
});
/**
 * Returns the current multi-selection set of blocks, or an empty array if
 * there is no multi-selection.
 *
 * @param {Object} state Editor state.
 *
 * @return {Array} Multi-selected block objects.
 */

exports.getMultiSelectedBlockClientIds = getMultiSelectedBlockClientIds;
var getMultiSelectedBlocks = (0, _rememo.default)(function (state) {
  var multiSelectedBlockClientIds = getMultiSelectedBlockClientIds(state);

  if (!multiSelectedBlockClientIds.length) {
    return EMPTY_ARRAY;
  }

  return multiSelectedBlockClientIds.map(function (clientId) {
    return getBlock(state, clientId);
  });
}, function (state) {
  return [state.editor.present.blocks.order, state.blockSelection.start, state.blockSelection.end, state.editor.present.blocks.byClientId, state.editor.present.edits.meta, state.currentPost.meta];
});
/**
 * Returns the client ID of the first block in the multi-selection set, or null
 * if there is no multi-selection.
 *
 * @param {Object} state Editor state.
 *
 * @return {?string} First block client ID in the multi-selection set.
 */

exports.getMultiSelectedBlocks = getMultiSelectedBlocks;

function getFirstMultiSelectedBlockClientId(state) {
  return (0, _lodash.first)(getMultiSelectedBlockClientIds(state)) || null;
}
/**
 * Returns the client ID of the last block in the multi-selection set, or null
 * if there is no multi-selection.
 *
 * @param {Object} state Editor state.
 *
 * @return {?string} Last block client ID in the multi-selection set.
 */


function getLastMultiSelectedBlockClientId(state) {
  return (0, _lodash.last)(getMultiSelectedBlockClientIds(state)) || null;
}
/**
 * Returns true if a multi-selection exists, and the block corresponding to the
 * specified client ID is the first block of the multi-selection set, or false
 * otherwise.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {boolean} Whether block is first in multi-selection.
 */


function isFirstMultiSelectedBlock(state, clientId) {
  return getFirstMultiSelectedBlockClientId(state) === clientId;
}
/**
 * Returns true if the client ID occurs within the block multi-selection, or
 * false otherwise.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {boolean} Whether block is in multi-selection set.
 */


function isBlockMultiSelected(state, clientId) {
  return getMultiSelectedBlockClientIds(state).indexOf(clientId) !== -1;
}
/**
 * Returns true if an ancestor of the block is multi-selected, or false
 * otherwise.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {boolean} Whether an ancestor of the block is in multi-selection
 *                   set.
 */


var isAncestorMultiSelected = (0, _rememo.default)(function (state, clientId) {
  var ancestorClientId = clientId;
  var isMultiSelected = false;

  while (ancestorClientId && !isMultiSelected) {
    ancestorClientId = getBlockRootClientId(state, ancestorClientId);
    isMultiSelected = isBlockMultiSelected(state, ancestorClientId);
  }

  return isMultiSelected;
}, function (state) {
  return [state.editor.present.blocks.order, state.blockSelection.start, state.blockSelection.end];
});
/**
 * Returns the client ID of the block which begins the multi-selection set, or
 * null if there is no multi-selection.
 *
 * This is not necessarily the first client ID in the selection.
 *
 * @see getFirstMultiSelectedBlockClientId
 *
 * @param {Object} state Editor state.
 *
 * @return {?string} Client ID of block beginning multi-selection.
 */

exports.isAncestorMultiSelected = isAncestorMultiSelected;

function getMultiSelectedBlocksStartClientId(state) {
  var _state$blockSelection5 = state.blockSelection,
      start = _state$blockSelection5.start,
      end = _state$blockSelection5.end;

  if (start === end) {
    return null;
  }

  return start || null;
}
/**
 * Returns the client ID of the block which ends the multi-selection set, or
 * null if there is no multi-selection.
 *
 * This is not necessarily the last client ID in the selection.
 *
 * @see getLastMultiSelectedBlockClientId
 *
 * @param {Object} state Editor state.
 *
 * @return {?string} Client ID of block ending multi-selection.
 */


function getMultiSelectedBlocksEndClientId(state) {
  var _state$blockSelection6 = state.blockSelection,
      start = _state$blockSelection6.start,
      end = _state$blockSelection6.end;

  if (start === end) {
    return null;
  }

  return end || null;
}
/**
 * Returns an array containing all block client IDs in the editor in the order
 * they appear. Optionally accepts a root client ID of the block list for which
 * the order should be returned, defaulting to the top-level block order.
 *
 * @param {Object}  state        Editor state.
 * @param {?string} rootClientId Optional root client ID of block list.
 *
 * @return {Array} Ordered client IDs of editor blocks.
 */


function getBlockOrder(state, rootClientId) {
  return state.editor.present.blocks.order[rootClientId || ''] || EMPTY_ARRAY;
}
/**
 * Returns the index at which the block corresponding to the specified client
 * ID occurs within the block order, or `-1` if the block does not exist.
 *
 * @param {Object}  state        Editor state.
 * @param {string}  clientId     Block client ID.
 * @param {?string} rootClientId Optional root client ID of block list.
 *
 * @return {number} Index at which block exists in order.
 */


function getBlockIndex(state, clientId, rootClientId) {
  return getBlockOrder(state, rootClientId).indexOf(clientId);
}
/**
 * Returns true if the block corresponding to the specified client ID is
 * currently selected and no multi-selection exists, or false otherwise.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {boolean} Whether block is selected and multi-selection exists.
 */


function isBlockSelected(state, clientId) {
  var _state$blockSelection7 = state.blockSelection,
      start = _state$blockSelection7.start,
      end = _state$blockSelection7.end;

  if (start !== end) {
    return false;
  }

  return start === clientId;
}
/**
 * Returns true if one of the block's inner blocks is selected.
 *
 * @param {Object}  state    Editor state.
 * @param {string}  clientId Block client ID.
 * @param {boolean} deep     Perform a deep check.
 *
 * @return {boolean} Whether the block as an inner block selected
 */


function hasSelectedInnerBlock(state, clientId) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return (0, _lodash.some)(getBlockOrder(state, clientId), function (innerClientId) {
    return isBlockSelected(state, innerClientId) || isBlockMultiSelected(state, innerClientId) || deep && hasSelectedInnerBlock(state, innerClientId, deep);
  });
}
/**
 * Returns true if the block corresponding to the specified client ID is
 * currently selected but isn't the last of the selected blocks. Here "last"
 * refers to the block sequence in the document, _not_ the sequence of
 * multi-selection, which is why `state.blockSelection.end` isn't used.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {boolean} Whether block is selected and not the last in the
 *                   selection.
 */


function isBlockWithinSelection(state, clientId) {
  if (!clientId) {
    return false;
  }

  var clientIds = getMultiSelectedBlockClientIds(state);
  var index = clientIds.indexOf(clientId);
  return index > -1 && index < clientIds.length - 1;
}
/**
 * Returns true if a multi-selection has been made, or false otherwise.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether multi-selection has been made.
 */


function hasMultiSelection(state) {
  var _state$blockSelection8 = state.blockSelection,
      start = _state$blockSelection8.start,
      end = _state$blockSelection8.end;
  return start !== end;
}
/**
 * Whether in the process of multi-selecting or not. This flag is only true
 * while the multi-selection is being selected (by mouse move), and is false
 * once the multi-selection has been settled.
 *
 * @see hasMultiSelection
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} True if multi-selecting, false if not.
 */


function isMultiSelecting(state) {
  return state.blockSelection.isMultiSelecting;
}
/**
 * Whether is selection disable or not.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} True if multi is disable, false if not.
 */


function isSelectionEnabled(state) {
  return state.blockSelection.isEnabled;
}
/**
 * Returns the block's editing mode, defaulting to "visual" if not explicitly
 * assigned.
 *
 * @param {Object} state    Editor state.
 * @param {string} clientId Block client ID.
 *
 * @return {Object} Block editing mode.
 */


function getBlockMode(state, clientId) {
  return state.blocksMode[clientId] || 'visual';
}
/**
 * Returns true if the user is typing, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether user is typing.
 */


function isTyping(state) {
  return state.isTyping;
}
/**
 * Returns true if the caret is within formatted text, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the caret is within formatted text.
 */


function isCaretWithinFormattedText(state) {
  return state.isCaretWithinFormattedText;
}
/**
 * Returns the insertion point, the index at which the new inserted block would
 * be placed. Defaults to the last index.
 *
 * @param {Object} state Editor state.
 *
 * @return {Object} Insertion point object with `rootClientId`, `index`.
 */


function getBlockInsertionPoint(state) {
  var rootClientId, index;
  var insertionPoint = state.insertionPoint,
      blockSelection = state.blockSelection;

  if (insertionPoint !== null) {
    return insertionPoint;
  }

  var end = blockSelection.end;

  if (end) {
    rootClientId = getBlockRootClientId(state, end) || undefined;
    index = getBlockIndex(state, end, rootClientId) + 1;
  } else {
    index = getBlockOrder(state).length;
  }

  return {
    rootClientId: rootClientId,
    index: index
  };
}
/**
 * Returns true if we should show the block insertion point.
 *
 * @param {Object} state Global application state.
 *
 * @return {?boolean} Whether the insertion point is visible or not.
 */


function isBlockInsertionPointVisible(state) {
  return state.insertionPoint !== null;
}
/**
 * Returns whether the blocks matches the template or not.
 *
 * @param {boolean} state
 * @return {?boolean} Whether the template is valid or not.
 */


function isValidTemplate(state) {
  return state.template.isValid;
}
/**
 * Returns the defined block template
 *
 * @param {boolean} state
 * @return {?Array}        Block Template
 */


function getTemplate(state) {
  return state.settings.template;
}
/**
 * Returns the defined block template lock. Optionally accepts a root block
 * client ID as context, otherwise defaulting to the global context.
 *
 * @param {Object}  state        Editor state.
 * @param {?string} rootClientId Optional block root client ID.
 *
 * @return {?string} Block Template Lock
 */


function getTemplateLock(state, rootClientId) {
  if (!rootClientId) {
    return state.settings.templateLock;
  }

  var blockListSettings = getBlockListSettings(state, rootClientId);

  if (!blockListSettings) {
    return null;
  }

  return blockListSettings.templateLock;
}
/**
 * Returns true if the post is currently being saved, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post is being saved.
 */


function isSavingPost(state) {
  return state.saving.requesting;
}
/**
 * Returns true if a previous post save was attempted successfully, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post was saved successfully.
 */


function didPostSaveRequestSucceed(state) {
  return state.saving.successful;
}
/**
 * Returns true if a previous post save was attempted but failed, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post save failed.
 */


function didPostSaveRequestFail(state) {
  return !!state.saving.error;
}
/**
 * Returns true if the post is autosaving, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is autosaving.
 */


function isAutosavingPost(state) {
  return isSavingPost(state) && state.saving.isAutosave;
}
/**
 * Returns a suggested post format for the current post, inferred only if there
 * is a single block within the post and it is of a type known to match a
 * default post format. Returns null if the format cannot be determined.
 *
 * @param {Object} state Global application state.
 *
 * @return {?string} Suggested post format.
 */


function getSuggestedPostFormat(state) {
  var blocks = getBlockOrder(state);
  var name; // If there is only one block in the content of the post grab its name
  // so we can derive a suitable post format from it.

  if (blocks.length === 1) {
    name = getBlock(state, blocks[0]).name;
  } // If there are two blocks in the content and the last one is a text blocks
  // grab the name of the first one to also suggest a post format from it.


  if (blocks.length === 2) {
    if (getBlock(state, blocks[1]).name === 'core/paragraph') {
      name = getBlock(state, blocks[0]).name;
    }
  } // We only convert to default post formats in core.


  switch (name) {
    case 'core/image':
      return 'image';

    case 'core/quote':
    case 'core/pullquote':
      return 'quote';

    case 'core/gallery':
      return 'gallery';

    case 'core/video':
    case 'core-embed/youtube':
    case 'core-embed/vimeo':
      return 'video';

    case 'core/audio':
    case 'core-embed/spotify':
    case 'core-embed/soundcloud':
      return 'audio';
  }

  return null;
}
/**
 * Returns a set of blocks which are to be used in consideration of the post's
 * generated save content.
 *
 * @param {Object} state Editor state.
 *
 * @return {WPBlock[]} Filtered set of blocks for save.
 */


function getBlocksForSerialization(state) {
  var blocks = getBlocks(state); // A single unmodified default block is assumed to be equivalent to an
  // empty post.

  var isSingleUnmodifiedDefaultBlock = blocks.length === 1 && (0, _blocks.isUnmodifiedDefaultBlock)(blocks[0]);

  if (isSingleUnmodifiedDefaultBlock) {
    return [];
  }

  return blocks;
}
/**
 * Returns the content of the post being edited, preferring raw string edit
 * before falling back to serialization of block state.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post content.
 */


var getEditedPostContent = (0, _rememo.default)(function (state) {
  var edits = getPostEdits(state);

  if ('content' in edits) {
    return edits.content;
  }

  var blocks = getBlocksForSerialization(state);
  var content = (0, _blocks.serialize)(blocks); // For compatibility purposes, treat a post consisting of a single
  // freeform block as legacy content and downgrade to a pre-block-editor
  // removep'd content format.

  var isSingleFreeformBlock = blocks.length === 1 && blocks[0].name === (0, _blocks.getFreeformContentHandlerName)();

  if (isSingleFreeformBlock) {
    return (0, _autop.removep)(content);
  }

  return content;
}, function (state) {
  return [state.editor.present.edits.content, state.editor.present.blocks];
});
/**
 * Determines if the given block type is allowed to be inserted into the block list.
 *
 * @param {Object}  state        Editor state.
 * @param {string}  blockName    The name of the block type, e.g.' core/paragraph'.
 * @param {?string} rootClientId Optional root client ID of block list.
 *
 * @return {boolean} Whether the given block type is allowed to be inserted.
 */

exports.getEditedPostContent = getEditedPostContent;
var canInsertBlockType = (0, _rememo.default)(function (state, blockName) {
  var rootClientId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var checkAllowList = function checkAllowList(list, item) {
    var defaultResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if ((0, _lodash.isBoolean)(list)) {
      return list;
    }

    if ((0, _lodash.isArray)(list)) {
      return (0, _lodash.includes)(list, item);
    }

    return defaultResult;
  };

  var blockType = (0, _blocks.getBlockType)(blockName);

  if (!blockType) {
    return false;
  }

  var _getEditorSettings = getEditorSettings(state),
      allowedBlockTypes = _getEditorSettings.allowedBlockTypes;

  var isBlockAllowedInEditor = checkAllowList(allowedBlockTypes, blockName, true);

  if (!isBlockAllowedInEditor) {
    return false;
  }

  var isLocked = !!getTemplateLock(state, rootClientId);

  if (isLocked) {
    return false;
  }

  var parentBlockListSettings = getBlockListSettings(state, rootClientId);
  var parentAllowedBlocks = (0, _lodash.get)(parentBlockListSettings, ['allowedBlocks']);
  var hasParentAllowedBlock = checkAllowList(parentAllowedBlocks, blockName);
  var blockAllowedParentBlocks = blockType.parent;
  var parentName = getBlockName(state, rootClientId);
  var hasBlockAllowedParent = checkAllowList(blockAllowedParentBlocks, parentName);

  if (hasParentAllowedBlock !== null && hasBlockAllowedParent !== null) {
    return hasParentAllowedBlock || hasBlockAllowedParent;
  } else if (hasParentAllowedBlock !== null) {
    return hasParentAllowedBlock;
  } else if (hasBlockAllowedParent !== null) {
    return hasBlockAllowedParent;
  }

  return true;
}, function (state, blockName, rootClientId) {
  return [state.blockListSettings[rootClientId], state.editor.present.blocks.byClientId[rootClientId], state.settings.allowedBlockTypes, state.settings.templateLock];
});
/**
 * Returns information about how recently and frequently a block has been inserted.
 *
 * @param {Object} state Global application state.
 * @param {string} id    A string which identifies the insert, e.g. 'core/block/12'
 *
 * @return {?{ time: number, count: number }} An object containing `time` which is when the last
 *                                            insert occured as a UNIX epoch, and `count` which is
 *                                            the number of inserts that have occurred.
 */

exports.canInsertBlockType = canInsertBlockType;

function getInsertUsage(state, id) {
  return state.preferences.insertUsage[id] || null;
}
/**
 * Determines the items that appear in the inserter. Includes both static
 * items (e.g. a regular block type) and dynamic items (e.g. a reusable block).
 *
 * Each item object contains what's necessary to display a button in the
 * inserter and handle its selection.
 *
 * The 'utility' property indicates how useful we think an item will be to the
 * user. There are 4 levels of utility:
 *
 * 1. Blocks that are contextually useful (utility = 3)
 * 2. Blocks that have been previously inserted (utility = 2)
 * 3. Blocks that are in the common category (utility = 1)
 * 4. All other blocks (utility = 0)
 *
 * The 'frecency' property is a heuristic (https://en.wikipedia.org/wiki/Frecency)
 * that combines block usage frequenty and recency.
 *
 * Items are returned ordered descendingly by their 'utility' and 'frecency'.
 *
 * @param {Object}  state        Editor state.
 * @param {?string} rootClientId Optional root client ID of block list.
 *
 * @return {Editor.InserterItem[]} Items that appear in inserter.
 *
 * @typedef {Object} Editor.InserterItem
 * @property {string}   id                Unique identifier for the item.
 * @property {string}   name              The type of block to create.
 * @property {Object}   initialAttributes Attributes to pass to the newly created block.
 * @property {string}   title             Title of the item, as it appears in the inserter.
 * @property {string}   icon              Dashicon for the item, as it appears in the inserter.
 * @property {string}   category          Block category that the item is associated with.
 * @property {string[]} keywords          Keywords that can be searched to find this item.
 * @property {boolean}  isDisabled        Whether or not the user should be prevented from inserting
 *                                        this item.
 * @property {number}   utility           How useful we think this item is, between 0 and 3.
 * @property {number}   frecency          Hueristic that combines frequency and recency.
 */


var getInserterItems = (0, _rememo.default)(function (state) {
  var rootClientId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var calculateUtility = function calculateUtility(category, count, isContextual) {
    if (isContextual) {
      return INSERTER_UTILITY_HIGH;
    } else if (count > 0) {
      return INSERTER_UTILITY_MEDIUM;
    } else if (category === 'common') {
      return INSERTER_UTILITY_LOW;
    }

    return INSERTER_UTILITY_NONE;
  };

  var calculateFrecency = function calculateFrecency(time, count) {
    if (!time) {
      return count;
    } // The selector is cached, which means Date.now() is the last time that the
    // relevant state changed. This suits our needs.


    var duration = Date.now() - time;

    switch (true) {
      case duration < MILLISECONDS_PER_HOUR:
        return count * 4;

      case duration < MILLISECONDS_PER_DAY:
        return count * 2;

      case duration < MILLISECONDS_PER_WEEK:
        return count / 2;

      default:
        return count / 4;
    }
  };

  var shouldIncludeBlockType = function shouldIncludeBlockType(blockType) {
    if (!(0, _blocks.hasBlockSupport)(blockType, 'inserter', true)) {
      return false;
    }

    return canInsertBlockType(state, blockType.name, rootClientId);
  };

  var buildBlockTypeInserterItem = function buildBlockTypeInserterItem(blockType) {
    var id = blockType.name;
    var isDisabled = false;

    if (!(0, _blocks.hasBlockSupport)(blockType.name, 'multiple', true)) {
      isDisabled = (0, _lodash.some)(getBlocksByClientId(state, getClientIdsWithDescendants(state)), {
        name: blockType.name
      });
    }

    var isContextual = (0, _lodash.isArray)(blockType.parent);

    var _ref = getInsertUsage(state, id) || {},
        time = _ref.time,
        _ref$count = _ref.count,
        count = _ref$count === void 0 ? 0 : _ref$count;

    return {
      id: id,
      name: blockType.name,
      initialAttributes: {},
      title: blockType.title,
      icon: blockType.icon,
      category: blockType.category,
      keywords: blockType.keywords,
      isDisabled: isDisabled,
      utility: calculateUtility(blockType.category, count, isContextual),
      frecency: calculateFrecency(time, count),
      hasChildBlocksWithInserterSupport: (0, _blocks.hasChildBlocksWithInserterSupport)(blockType.name)
    };
  };

  var shouldIncludeReusableBlock = function shouldIncludeReusableBlock(reusableBlock) {
    if (!canInsertBlockType(state, 'core/block', rootClientId)) {
      return false;
    }

    var referencedBlock = getBlock(state, reusableBlock.clientId);

    if (!referencedBlock) {
      return false;
    }

    var referencedBlockType = (0, _blocks.getBlockType)(referencedBlock.name);

    if (!referencedBlockType) {
      return false;
    }

    if (!canInsertBlockType(state, referencedBlockType.name, rootClientId)) {
      return false;
    }

    return true;
  };

  var buildReusableBlockInserterItem = function buildReusableBlockInserterItem(reusableBlock) {
    var id = "core/block/".concat(reusableBlock.id);
    var referencedBlock = getBlock(state, reusableBlock.clientId);
    var referencedBlockType = (0, _blocks.getBlockType)(referencedBlock.name);

    var _ref2 = getInsertUsage(state, id) || {},
        time = _ref2.time,
        _ref2$count = _ref2.count,
        count = _ref2$count === void 0 ? 0 : _ref2$count;

    var utility = calculateUtility('reusable', count, false);
    var frecency = calculateFrecency(time, count);
    return {
      id: id,
      name: 'core/block',
      initialAttributes: {
        ref: reusableBlock.id
      },
      title: reusableBlock.title,
      icon: referencedBlockType.icon,
      category: 'reusable',
      keywords: [],
      isDisabled: false,
      utility: utility,
      frecency: frecency
    };
  };

  var blockTypeInserterItems = (0, _blocks.getBlockTypes)().filter(shouldIncludeBlockType).map(buildBlockTypeInserterItem);

  var reusableBlockInserterItems = __experimentalGetReusableBlocks(state).filter(shouldIncludeReusableBlock).map(buildReusableBlockInserterItem);

  return (0, _lodash.orderBy)((0, _toConsumableArray2.default)(blockTypeInserterItems).concat((0, _toConsumableArray2.default)(reusableBlockInserterItems)), ['utility', 'frecency'], ['desc', 'desc']);
}, function (state, rootClientId) {
  return [state.blockListSettings[rootClientId], state.editor.present.blocks, state.preferences.insertUsage, state.settings.allowedBlockTypes, state.settings.templateLock, state.reusableBlocks.data, (0, _blocks.getBlockTypes)()];
});
/**
 * Returns the reusable block with the given ID.
 *
 * @param {Object}        state Global application state.
 * @param {number|string} ref   The reusable block's ID.
 *
 * @return {Object} The reusable block, or null if none exists.
 */

exports.getInserterItems = getInserterItems;

var __experimentalGetReusableBlock = (0, _rememo.default)(function (state, ref) {
  var block = state.reusableBlocks.data[ref];

  if (!block) {
    return null;
  }

  var isTemporary = isNaN(parseInt(ref));
  return (0, _objectSpread2.default)({}, block, {
    id: isTemporary ? ref : +ref,
    isTemporary: isTemporary
  });
}, function (state, ref) {
  return [state.reusableBlocks.data[ref]];
});
/**
 * Returns whether or not the reusable block with the given ID is being saved.
 *
 * @param {Object} state Global application state.
 * @param {string} ref   The reusable block's ID.
 *
 * @return {boolean} Whether or not the reusable block is being saved.
 */


exports.__experimentalGetReusableBlock = __experimentalGetReusableBlock;

function __experimentalIsSavingReusableBlock(state, ref) {
  return state.reusableBlocks.isSaving[ref] || false;
}
/**
 * Returns true if the reusable block with the given ID is being fetched, or
 * false otherwise.
 *
 * @param {Object} state Global application state.
 * @param {string} ref   The reusable block's ID.
 *
 * @return {boolean} Whether the reusable block is being fetched.
 */


function __experimentalIsFetchingReusableBlock(state, ref) {
  return !!state.reusableBlocks.isFetching[ref];
}
/**
 * Returns an array of all reusable blocks.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} An array of all reusable blocks.
 */


function __experimentalGetReusableBlocks(state) {
  return (0, _lodash.map)(state.reusableBlocks.data, function (value, ref) {
    return __experimentalGetReusableBlock(state, ref);
  });
}
/**
 * Returns state object prior to a specified optimist transaction ID, or `null`
 * if the transaction corresponding to the given ID cannot be found.
 *
 * @param {Object} state         Current global application state.
 * @param {Object} transactionId Optimist transaction ID.
 *
 * @return {Object} Global application state prior to transaction.
 */


function getStateBeforeOptimisticTransaction(state, transactionId) {
  var transaction = (0, _lodash.find)(state.optimist, function (entry) {
    return entry.beforeState && (0, _lodash.get)(entry.action, ['optimist', 'id']) === transactionId;
  });
  return transaction ? transaction.beforeState : null;
}
/**
 * Returns true if the post is being published, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post is being published.
 */


function isPublishingPost(state) {
  if (!isSavingPost(state)) {
    return false;
  } // Saving is optimistic, so assume that current post would be marked as
  // published if publishing


  if (!isCurrentPostPublished(state)) {
    return false;
  } // Use post update transaction ID to retrieve the state prior to the
  // optimistic transaction


  var stateBeforeRequest = getStateBeforeOptimisticTransaction(state, POST_UPDATE_TRANSACTION_ID); // Consider as publishing when current post prior to request was not
  // considered published

  return !!stateBeforeRequest && !isCurrentPostPublished(stateBeforeRequest);
}
/**
 * Returns whether the permalink is editable or not.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether or not the permalink is editable.
 */


function isPermalinkEditable(state) {
  var permalinkTemplate = getEditedPostAttribute(state, 'permalink_template');
  return PERMALINK_POSTNAME_REGEX.test(permalinkTemplate);
}
/**
 * Returns the permalink for the post.
 *
 * @param {Object} state Editor state.
 *
 * @return {string} The permalink.
 */


function getPermalink(state) {
  var _getPermalinkParts = getPermalinkParts(state),
      prefix = _getPermalinkParts.prefix,
      postName = _getPermalinkParts.postName,
      suffix = _getPermalinkParts.suffix;

  if (isPermalinkEditable(state)) {
    return prefix + postName + suffix;
  }

  return prefix;
}
/**
 * Returns the permalink for a post, split into it's three parts: the prefix, the postName, and the suffix.
 *
 * @param {Object} state Editor state.
 *
 * @return {Object} The prefix, postName, and suffix for the permalink.
 */


function getPermalinkParts(state) {
  var permalinkTemplate = getEditedPostAttribute(state, 'permalink_template');
  var postName = getEditedPostAttribute(state, 'slug') || getEditedPostAttribute(state, 'generated_slug');

  var _permalinkTemplate$sp = permalinkTemplate.split(PERMALINK_POSTNAME_REGEX),
      _permalinkTemplate$sp2 = (0, _slicedToArray2.default)(_permalinkTemplate$sp, 2),
      prefix = _permalinkTemplate$sp2[0],
      suffix = _permalinkTemplate$sp2[1];

  return {
    prefix: prefix,
    postName: postName,
    suffix: suffix
  };
}
/**
 * Returns true if an optimistic transaction is pending commit, for which the
 * before state satisfies the given predicate function.
 *
 * @param {Object}   state     Editor state.
 * @param {Function} predicate Function given state, returning true if match.
 *
 * @return {boolean} Whether predicate matches for some history.
 */


function inSomeHistory(state, predicate) {
  var optimist = state.optimist; // In recursion, optimist state won't exist. Assume exhausted options.

  if (!optimist) {
    return false;
  }

  return optimist.some(function (_ref3) {
    var beforeState = _ref3.beforeState;
    return beforeState && predicate(beforeState);
  });
}
/**
 * Returns the Block List settings of a block, if any exist.
 *
 * @param {Object}  state    Editor state.
 * @param {?string} clientId Block client ID.
 *
 * @return {?Object} Block settings of the block if set.
 */


function getBlockListSettings(state, clientId) {
  return state.blockListSettings[clientId];
}
/**
 * Returns the editor settings.
 *
 * @param {Object} state Editor state.
 *
 * @return {Object} The editor settings object.
 */


function getEditorSettings(state) {
  return state.settings;
}
/**
 * Returns the token settings.
 *
 * @param {Object} state Editor state.
 * @param {?string} name Token name.
 *
 * @return {Object} Token settings object, or the named token settings object if set.
 */


function getTokenSettings(state, name) {
  if (!name) {
    return state.tokens;
  }

  return state.tokens[name];
}
/**
 * Returns whether the post is locked.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is locked.
 */


function isPostLocked(state) {
  return state.postLock.isLocked;
}
/**
 * Returns whether post saving is locked.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is locked.
 */


function isPostSavingLocked(state) {
  return state.postSavingLock.length > 0;
}
/**
 * Returns whether the edition of the post has been taken over.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is post lock takeover.
 */


function isPostLockTakeover(state) {
  return state.postLock.isTakeover;
}
/**
 * Returns details about the post lock user.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} A user object.
 */


function getPostLockUser(state) {
  return state.postLock.user;
}
/**
 * Returns the active post lock.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} The lock object.
 */


function getActivePostLock(state) {
  return state.postLock.activePostLock;
}
/**
 * Returns whether or not the user has the unfiltered_html capability.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether the user can or can't post unfiltered HTML.
 */


function canUserUseUnfilteredHTML(state) {
  return (0, _lodash.has)(getCurrentPost(state), ['_links', 'wp:action-unfiltered-html']);
}
/**
 * Returns whether the pre-publish panel should be shown
 * or skipped when the user clicks the "publish" button.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the pre-publish panel should be shown or not.
 */


function isPublishSidebarEnabled(state) {
  if (state.preferences.hasOwnProperty('isPublishSidebarEnabled')) {
    return state.preferences.isPublishSidebarEnabled;
  }

  return _defaults.PREFERENCES_DEFAULTS.isPublishSidebarEnabled;
} //
// Deprecated
//


function getNotices() {
  (0, _deprecated.default)('getNotices selector (`core/editor` store)', {
    alternative: 'getNotices selector (`core/notices` store)',
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return (0, _data.select)('core/notices').getNotices();
}

function getReusableBlock(state, ref) {
  (0, _deprecated.default)("wp.data.select( 'core/editor' ).getReusableBlock( ref )", {
    alternative: "wp.data.select( 'core' ).getEntityRecord( 'postType', 'wp_block', ref )",
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return __experimentalGetReusableBlock(state, ref);
}

function isSavingReusableBlock(state, ref) {
  (0, _deprecated.default)('isSavingReusableBlock selector (`core/editor` store)', {
    alternative: '__experimentalIsSavingReusableBlock selector (`core/edtior` store)',
    plugin: 'Gutenberg',
    version: '4.4.0',
    hint: 'Using experimental APIs is strongly discouraged as they are subject to removal without notice.'
  });
  return __experimentalIsSavingReusableBlock(state, ref);
}

function isFetchingReusableBlock(state, ref) {
  (0, _deprecated.default)("wp.data.select( 'core/editor' ).isFetchingReusableBlock( ref )", {
    alternative: "wp.data.select( 'core' ).isResolving( 'getEntityRecord', 'wp_block', ref )",
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return __experimentalIsFetchingReusableBlock(state, ref);
}

function getReusableBlocks(state) {
  (0, _deprecated.default)("wp.data.select( 'core/editor' ).getReusableBlocks( ref )", {
    alternative: "wp.data.select( 'core' ).getEntityRecords( 'postType', 'wp_block' )",
    plugin: 'Gutenberg',
    version: '4.4.0'
  });
  return __experimentalGetReusableBlocks(state);
}
//# sourceMappingURL=selectors.js.map