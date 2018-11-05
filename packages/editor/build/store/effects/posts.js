"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshPost = exports.trashPostFailure = exports.trashPost = exports.requestPostUpdateFailure = exports.requestPostUpdateSuccess = exports.requestPostUpdate = exports.SAVE_POST_NOTICE_ID = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reduxOptimist = require("redux-optimist");

var _lodash = require("lodash");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _actions = require("../actions");

var _selectors = require("../selectors");

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
// TODO: Ideally this would be the only dispatch in scope. This requires either
// refactoring editor actions to yielded controls, or replacing direct dispatch
// on the editor store with action creators (e.g. `REQUEST_POST_UPDATE_START`).

/**
 * Internal dependencies
 */

/**
 * Module Constants
 */
var SAVE_POST_NOTICE_ID = 'SAVE_POST_NOTICE_ID';
exports.SAVE_POST_NOTICE_ID = SAVE_POST_NOTICE_ID;
var TRASH_POST_NOTICE_ID = 'TRASH_POST_NOTICE_ID';
/**
 * Request Post Update Effect handler
 *
 * @param {Object} action  the fetchReusableBlocks action object.
 * @param {Object} store   Redux Store.
 */

var requestPostUpdate =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(action, store) {
    var dispatch, getState, state, post, isAutosave, isSaveable, edits, toSend, postType, request, newPost, reset, isRevision;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch = store.dispatch, getState = store.getState;
            state = getState();
            post = (0, _selectors.getCurrentPost)(state);
            isAutosave = !!action.options.autosave; // Prevent save if not saveable.

            isSaveable = isAutosave ? _selectors.isEditedPostAutosaveable : _selectors.isEditedPostSaveable;

            if (isSaveable(state)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            edits = (0, _selectors.getPostEdits)(state);

            if (isAutosave) {
              edits = (0, _lodash.pick)(edits, ['title', 'content', 'excerpt']);
            } // New posts (with auto-draft status) must be explicitly assigned draft
            // status if there is not already a status assigned in edits (publish).
            // Otherwise, they are wrongly left as auto-draft. Status is not always
            // respected for autosaves, so it cannot simply be included in the pick
            // above. This behavior relies on an assumption that an auto-draft post
            // would never be saved by anyone other than the owner of the post, per
            // logic within autosaves REST controller to save status field only for
            // draft/auto-draft by current user.
            //
            // See: https://core.trac.wordpress.org/ticket/43316#comment:88
            // See: https://core.trac.wordpress.org/ticket/43316#comment:89


            if ((0, _selectors.isEditedPostNew)(state)) {
              edits = (0, _objectSpread2.default)({
                status: 'draft'
              }, edits);
            }

            toSend = (0, _objectSpread2.default)({}, edits, {
              content: (0, _selectors.getEditedPostContent)(state),
              id: post.id
            });
            _context.next = 13;
            return (0, _utils.resolveSelector)('core', 'getPostType', (0, _selectors.getCurrentPostType)(state));

          case 13:
            postType = _context.sent;
            dispatch({
              type: 'REQUEST_POST_UPDATE_START',
              optimist: {
                type: _reduxOptimist.BEGIN,
                id: _selectors.POST_UPDATE_TRANSACTION_ID
              },
              isAutosave: isAutosave
            }); // Optimistically apply updates under the assumption that the post
            // will be updated. See below logic in success resolution for revert
            // if the autosave is applied as a revision.

            dispatch((0, _objectSpread2.default)({}, (0, _actions.updatePost)(toSend), {
              optimist: {
                id: _selectors.POST_UPDATE_TRANSACTION_ID
              }
            }));

            if (isAutosave) {
              // Ensure autosaves contain all expected fields, using autosave or
              // post values as fallback if not otherwise included in edits.
              toSend = (0, _objectSpread2.default)({}, (0, _lodash.pick)(post, ['title', 'content', 'excerpt']), (0, _selectors.getAutosave)(state), toSend, {
                parent: post.id
              });
              request = (0, _apiFetch.default)({
                path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id, "/autosaves"),
                method: 'POST',
                data: toSend
              });
            } else {
              (0, _data.dispatch)('core/notices').removeNotice(SAVE_POST_NOTICE_ID);
              (0, _data.dispatch)('core/notices').removeNotice('autosave-exists');
              request = (0, _apiFetch.default)({
                path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id),
                method: 'PUT',
                data: toSend
              });
            }

            _context.prev = 17;
            _context.next = 20;
            return request;

          case 20:
            newPost = _context.sent;
            reset = isAutosave ? _actions.resetAutosave : _actions.resetPost;
            dispatch(reset(newPost)); // An autosave may be processed by the server as a regular save
            // when its update is requested by the author and the post was
            // draft or auto-draft.

            isRevision = newPost.id !== post.id;
            dispatch({
              type: 'REQUEST_POST_UPDATE_SUCCESS',
              previousPost: post,
              post: newPost,
              optimist: {
                // Note: REVERT is not a failure case here. Rather, it
                // is simply reversing the assumption that the updates
                // were applied to the post proper, such that the post
                // treated as having unsaved changes.
                type: isRevision ? _reduxOptimist.REVERT : _reduxOptimist.COMMIT,
                id: _selectors.POST_UPDATE_TRANSACTION_ID
              },
              isAutosave: isAutosave,
              postType: postType
            });
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](17);
            dispatch({
              type: 'REQUEST_POST_UPDATE_FAILURE',
              optimist: {
                type: _reduxOptimist.REVERT,
                id: _selectors.POST_UPDATE_TRANSACTION_ID
              },
              post: post,
              edits: edits,
              error: _context.t0
            });

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[17, 27]]);
  }));

  return function requestPostUpdate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Request Post Update Success Effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */


exports.requestPostUpdate = requestPostUpdate;

var requestPostUpdateSuccess = function requestPostUpdateSuccess(action, store) {
  var previousPost = action.previousPost,
      post = action.post,
      isAutosave = action.isAutosave,
      postType = action.postType;
  var dispatch = store.dispatch,
      getState = store.getState; // TEMPORARY: If edits remain after a save completes, the user must be
  // prompted about unsaved changes. This should be refactored as part of
  // the `isEditedPostDirty` selector instead.
  //
  // See: https://github.com/WordPress/gutenberg/issues/7409

  if (Object.keys((0, _selectors.getPostEdits)(getState())).length) {
    dispatch({
      type: 'DIRTY_ARTIFICIALLY'
    });
  } // Autosaves are neither shown a notice nor redirected.


  if (isAutosave) {
    return;
  }

  var publishStatus = ['publish', 'private', 'future'];
  var isPublished = (0, _lodash.includes)(publishStatus, previousPost.status);
  var willPublish = (0, _lodash.includes)(publishStatus, post.status);
  var noticeMessage;
  var shouldShowLink = true;

  if (!isPublished && !willPublish) {
    // If saving a non-published post, don't show notice.
    noticeMessage = null;
  } else if (isPublished && !willPublish) {
    // If undoing publish status, show specific notice
    noticeMessage = postType.labels.item_reverted_to_draft;
    shouldShowLink = false;
  } else if (!isPublished && willPublish) {
    // If publishing or scheduling a post, show the corresponding
    // publish message
    noticeMessage = {
      publish: postType.labels.item_published,
      private: postType.labels.item_published_privately,
      future: postType.labels.item_scheduled
    }[post.status];
  } else {
    // Generic fallback notice
    noticeMessage = postType.labels.item_updated;
  }

  if (noticeMessage) {
    var actions = [];

    if (shouldShowLink) {
      actions.push({
        label: postType.labels.view_item,
        url: post.link
      });
    }

    (0, _data.dispatch)('core/notices').createSuccessNotice(noticeMessage, {
      id: SAVE_POST_NOTICE_ID,
      actions: actions
    });
  }
};
/**
 * Request Post Update Failure Effect handler
 *
 * @param {Object} action  action object.
 */


exports.requestPostUpdateSuccess = requestPostUpdateSuccess;

var requestPostUpdateFailure = function requestPostUpdateFailure(action) {
  var post = action.post,
      edits = action.edits,
      error = action.error;

  if (error && 'rest_autosave_no_changes' === error.code) {
    // Autosave requested a new autosave, but there were no changes. This shouldn't
    // result in an error notice for the user.
    return;
  }

  var publishStatus = ['publish', 'private', 'future'];
  var isPublished = publishStatus.indexOf(post.status) !== -1; // If the post was being published, we show the corresponding publish error message
  // Unless we publish an "updating failed" message

  var messages = {
    publish: (0, _i18n.__)('Publishing failed'),
    private: (0, _i18n.__)('Publishing failed'),
    future: (0, _i18n.__)('Scheduling failed')
  };
  var noticeMessage = !isPublished && publishStatus.indexOf(edits.status) !== -1 ? messages[edits.status] : (0, _i18n.__)('Updating failed');
  (0, _data.dispatch)('core/notices').createErrorNotice(noticeMessage, {
    id: SAVE_POST_NOTICE_ID
  });
};
/**
 * Trash Post Effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */


exports.requestPostUpdateFailure = requestPostUpdateFailure;

var trashPost =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(action, store) {
    var dispatch, getState, postId, postTypeSlug, postType, post;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch = store.dispatch, getState = store.getState;
            postId = action.postId;
            postTypeSlug = (0, _selectors.getCurrentPostType)(getState());
            _context2.next = 5;
            return (0, _utils.resolveSelector)('core', 'getPostType', postTypeSlug);

          case 5:
            postType = _context2.sent;
            (0, _data.dispatch)('core/notices').removeNotice(TRASH_POST_NOTICE_ID);
            _context2.prev = 7;
            _context2.next = 10;
            return (0, _apiFetch.default)({
              path: "/wp/v2/".concat(postType.rest_base, "/").concat(postId),
              method: 'DELETE'
            });

          case 10:
            post = (0, _selectors.getCurrentPost)(getState()); // TODO: This should be an updatePost action (updating subsets of post properties),
            // But right now editPost is tied with change detection.

            dispatch((0, _actions.resetPost)((0, _objectSpread2.default)({}, post, {
              status: 'trash'
            })));
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](7);
            dispatch((0, _objectSpread2.default)({}, action, {
              type: 'TRASH_POST_FAILURE',
              error: _context2.t0
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[7, 14]]);
  }));

  return function trashPost(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Trash Post Failure Effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */


exports.trashPost = trashPost;

var trashPostFailure = function trashPostFailure(action) {
  var message = action.error.message && action.error.code !== 'unknown_error' ? action.error.message : (0, _i18n.__)('Trashing failed');
  (0, _data.dispatch)('core/notices').createErrorNotice(message, {
    id: TRASH_POST_NOTICE_ID
  });
};
/**
 * Refresh Post Effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */


exports.trashPostFailure = trashPostFailure;

var refreshPost =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(action, store) {
    var dispatch, getState, state, post, postTypeSlug, postType, newPost;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch = store.dispatch, getState = store.getState;
            state = getState();
            post = (0, _selectors.getCurrentPost)(state);
            postTypeSlug = (0, _selectors.getCurrentPostType)(getState());
            _context3.next = 6;
            return (0, _utils.resolveSelector)('core', 'getPostType', postTypeSlug);

          case 6:
            postType = _context3.sent;
            _context3.next = 9;
            return (0, _apiFetch.default)({
              path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id),
              data: {
                context: 'edit'
              }
            });

          case 9:
            newPost = _context3.sent;
            dispatch((0, _actions.resetPost)(newPost));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function refreshPost(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.refreshPost = refreshPost;
//# sourceMappingURL=posts.js.map