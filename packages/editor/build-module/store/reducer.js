import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";

/**
 * External dependencies
 */
import optimist from 'redux-optimist';
import { flow, reduce, first, last, omit, without, mapValues, omitBy, keys, isEqual, overSome, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { isReusableBlock } from '@wordpress/blocks';
import { combineReducers } from '@wordpress/data';
/**
 * Internal dependencies
 */

import withHistory from '../utils/with-history';
import withChangeDetection from '../utils/with-change-detection';
import { PREFERENCES_DEFAULTS, EDITOR_SETTINGS_DEFAULTS } from './defaults';
import { insertAt, moveTo } from './array';
/**
 * Returns a post attribute value, flattening nested rendered content using its
 * raw value in place of its original object form.
 *
 * @param {*} value Original value.
 *
 * @return {*} Raw value.
 */

export function getPostRawValue(value) {
  if (value && 'object' === _typeof(value) && 'raw' in value) {
    return value.raw;
  }

  return value;
}
/**
 * Given an array of blocks, returns an object where each key is a nesting
 * context, the value of which is an array of block client IDs existing within
 * that nesting context.
 *
 * @param {Array}   blocks       Blocks to map.
 * @param {?string} rootClientId Assumed root client ID.
 *
 * @return {Object} Block order map object.
 */

function mapBlockOrder(blocks) {
  var rootClientId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var result = _defineProperty({}, rootClientId, []);

  blocks.forEach(function (block) {
    var clientId = block.clientId,
        innerBlocks = block.innerBlocks;
    result[rootClientId].push(clientId);
    Object.assign(result, mapBlockOrder(innerBlocks, clientId));
  });
  return result;
}
/**
 * Given an array of blocks, returns an object containing all blocks, recursing
 * into inner blocks. Keys correspond to the block client ID, the value of
 * which is the block object.
 *
 * @param {Array} blocks Blocks to flatten.
 *
 * @return {Object} Flattened blocks object.
 */


function getFlattenedBlocks(blocks) {
  var flattenedBlocks = {};

  var stack = _toConsumableArray(blocks);

  while (stack.length) {
    // `innerBlocks` is redundant data which can fall out of sync, since
    // this is reflected in `blocks.order`, so exclude from appended block.
    var _stack$shift = stack.shift(),
        innerBlocks = _stack$shift.innerBlocks,
        block = _objectWithoutProperties(_stack$shift, ["innerBlocks"]);

    stack.push.apply(stack, _toConsumableArray(innerBlocks));
    flattenedBlocks[block.clientId] = block;
  }

  return flattenedBlocks;
}
/**
 * Returns true if the two object arguments have the same keys, or false
 * otherwise.
 *
 * @param {Object} a First object.
 * @param {Object} b Second object.
 *
 * @return {boolean} Whether the two objects have the same keys.
 */


export function hasSameKeys(a, b) {
  return isEqual(keys(a), keys(b));
}
/**
 * Returns true if, given the currently dispatching action and the previously
 * dispatched action, the two actions are updating the same block attribute, or
 * false otherwise.
 *
 * @param {Object} action         Currently dispatching action.
 * @param {Object} previousAction Previously dispatched action.
 *
 * @return {boolean} Whether actions are updating the same block attribute.
 */

export function isUpdatingSameBlockAttribute(action, previousAction) {
  return action.type === 'UPDATE_BLOCK_ATTRIBUTES' && action.clientId === previousAction.clientId && hasSameKeys(action.attributes, previousAction.attributes);
}
/**
 * Returns true if, given the currently dispatching action and the previously
 * dispatched action, the two actions are editing the same post property, or
 * false otherwise.
 *
 * @param {Object} action         Currently dispatching action.
 * @param {Object} previousAction Previously dispatched action.
 *
 * @return {boolean} Whether actions are updating the same post property.
 */

export function isUpdatingSamePostProperty(action, previousAction) {
  return action.type === 'EDIT_POST' && hasSameKeys(action.edits, previousAction.edits);
}
/**
 * Returns true if, given the currently dispatching action and the previously
 * dispatched action, the two actions are modifying the same property such that
 * undo history should be batched.
 *
 * @param {Object} action         Currently dispatching action.
 * @param {Object} previousAction Previously dispatched action.
 *
 * @return {boolean} Whether to overwrite present state.
 */

export function shouldOverwriteState(action, previousAction) {
  if (!previousAction || action.type !== previousAction.type) {
    return false;
  }

  return overSome([isUpdatingSameBlockAttribute, isUpdatingSamePostProperty])(action, previousAction);
}
/**
 * Higher-order reducer targeting the combined editor reducer, augmenting
 * block client IDs in remove action to include cascade of inner blocks.
 *
 * @param {Function} reducer Original reducer function.
 *
 * @return {Function} Enhanced reducer function.
 */

var withInnerBlocksRemoveCascade = function withInnerBlocksRemoveCascade(reducer) {
  return function (state, action) {
    if (state && action.type === 'REMOVE_BLOCKS') {
      var clientIds = _toConsumableArray(action.clientIds); // For each removed client ID, include its inner blocks to remove,
      // recursing into those so long as inner blocks exist.


      for (var i = 0; i < clientIds.length; i++) {
        clientIds.push.apply(clientIds, _toConsumableArray(state.blocks.order[clientIds[i]]));
      }

      action = _objectSpread({}, action, {
        clientIds: clientIds
      });
    }

    return reducer(state, action);
  };
};
/**
 * Undoable reducer returning the editor post state, including blocks parsed
 * from current HTML markup.
 *
 * Handles the following state keys:
 *  - edits: an object describing changes to be made to the current post, in
 *           the format accepted by the WP REST API
 *  - blocks: post content blocks
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @returns {Object} Updated state.
 */


export var editor = flow([combineReducers, withInnerBlocksRemoveCascade, // Track undo history, starting at editor initialization.
withHistory({
  resetTypes: ['SETUP_EDITOR_STATE'],
  ignoreTypes: ['RECEIVE_BLOCKS', 'RESET_POST', 'UPDATE_POST'],
  shouldOverwriteState: shouldOverwriteState
}), // Track whether changes exist, resetting at each post save. Relies on
// editor initialization firing post reset as an effect.
withChangeDetection({
  resetTypes: ['SETUP_EDITOR_STATE', 'REQUEST_POST_UPDATE_START'],
  ignoreTypes: ['RECEIVE_BLOCKS', 'RESET_POST', 'UPDATE_POST']
})])({
  edits: function edits() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'EDIT_POST':
      case 'SETUP_EDITOR_STATE':
        return reduce(action.edits, function (result, value, key) {
          // Only assign into result if not already same value
          if (value !== state[key]) {
            // Avoid mutating original state by creating shallow
            // clone. Should only occur once per reduce.
            if (result === state) {
              result = _objectSpread({}, state);
            }

            result[key] = value;
          }

          return result;
        }, state);

      case 'RESET_BLOCKS':
        if ('content' in state) {
          return omit(state, 'content');
        }

        return state;

      case 'DIRTY_ARTIFICIALLY':
        return _objectSpread({}, state);

      case 'UPDATE_POST':
      case 'RESET_POST':
        var getCanonicalValue = action.type === 'UPDATE_POST' ? function (key) {
          return action.edits[key];
        } : function (key) {
          return getPostRawValue(action.post[key]);
        };
        return reduce(state, function (result, value, key) {
          if (value !== getCanonicalValue(key)) {
            return result;
          }

          if (state === result) {
            result = _objectSpread({}, state);
          }

          delete result[key];
          return result;
        }, state);
    }

    return state;
  },
  blocks: combineReducers({
    byClientId: function byClientId() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 ? arguments[1] : undefined;

      switch (action.type) {
        case 'RESET_BLOCKS':
        case 'SETUP_EDITOR_STATE':
          return getFlattenedBlocks(action.blocks);

        case 'RECEIVE_BLOCKS':
          return _objectSpread({}, state, getFlattenedBlocks(action.blocks));

        case 'UPDATE_BLOCK_ATTRIBUTES':
          // Ignore updates if block isn't known
          if (!state[action.clientId]) {
            return state;
          } // Consider as updates only changed values


          var nextAttributes = reduce(action.attributes, function (result, value, key) {
            if (value !== result[key]) {
              // Avoid mutating original block by creating shallow clone
              if (result === state[action.clientId].attributes) {
                result = _objectSpread({}, result);
              }

              result[key] = value;
            }

            return result;
          }, state[action.clientId].attributes); // Skip update if nothing has been changed. The reference will
          // match the original block if `reduce` had no changed values.

          if (nextAttributes === state[action.clientId].attributes) {
            return state;
          } // Otherwise merge attributes into state


          return _objectSpread({}, state, _defineProperty({}, action.clientId, _objectSpread({}, state[action.clientId], {
            attributes: nextAttributes
          })));

        case 'UPDATE_BLOCK':
          // Ignore updates if block isn't known
          if (!state[action.clientId]) {
            return state;
          }

          return _objectSpread({}, state, _defineProperty({}, action.clientId, _objectSpread({}, state[action.clientId], action.updates)));

        case 'INSERT_BLOCKS':
          return _objectSpread({}, state, getFlattenedBlocks(action.blocks));

        case 'REPLACE_BLOCKS':
          if (!action.blocks) {
            return state;
          }

          return _objectSpread({}, omit(state, action.clientIds), getFlattenedBlocks(action.blocks));

        case 'REMOVE_BLOCKS':
          return omit(state, action.clientIds);

        case 'SAVE_REUSABLE_BLOCK_SUCCESS':
          {
            var id = action.id,
                updatedId = action.updatedId; // If a temporary reusable block is saved, we swap the temporary id with the final one

            if (id === updatedId) {
              return state;
            }

            return mapValues(state, function (block) {
              if (block.name === 'core/block' && block.attributes.ref === id) {
                return _objectSpread({}, block, {
                  attributes: _objectSpread({}, block.attributes, {
                    ref: updatedId
                  })
                });
              }

              return block;
            });
          }
      }

      return state;
    },
    order: function order() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 ? arguments[1] : undefined;

      switch (action.type) {
        case 'RESET_BLOCKS':
        case 'SETUP_EDITOR_STATE':
          return mapBlockOrder(action.blocks);

        case 'RECEIVE_BLOCKS':
          return _objectSpread({}, state, omit(mapBlockOrder(action.blocks), ''));

        case 'INSERT_BLOCKS':
          {
            var _action$rootClientId = action.rootClientId,
                rootClientId = _action$rootClientId === void 0 ? '' : _action$rootClientId,
                blocks = action.blocks;
            var subState = state[rootClientId] || [];
            var mappedBlocks = mapBlockOrder(blocks, rootClientId);
            var _action$index = action.index,
                index = _action$index === void 0 ? subState.length : _action$index;
            return _objectSpread({}, state, mappedBlocks, _defineProperty({}, rootClientId, insertAt(subState, mappedBlocks[rootClientId], index)));
          }

        case 'MOVE_BLOCK_TO_POSITION':
          {
            var _objectSpread6;

            var _action$fromRootClien = action.fromRootClientId,
                fromRootClientId = _action$fromRootClien === void 0 ? '' : _action$fromRootClien,
                _action$toRootClientI = action.toRootClientId,
                toRootClientId = _action$toRootClientI === void 0 ? '' : _action$toRootClientI,
                clientId = action.clientId;

            var _action$index2 = action.index,
                _index = _action$index2 === void 0 ? state[toRootClientId].length : _action$index2; // Moving inside the same parent block


            if (fromRootClientId === toRootClientId) {
              var _subState = state[toRootClientId];

              var fromIndex = _subState.indexOf(clientId);

              return _objectSpread({}, state, _defineProperty({}, toRootClientId, moveTo(state[toRootClientId], fromIndex, _index)));
            } // Moving from a parent block to another


            return _objectSpread({}, state, (_objectSpread6 = {}, _defineProperty(_objectSpread6, fromRootClientId, without(state[fromRootClientId], clientId)), _defineProperty(_objectSpread6, toRootClientId, insertAt(state[toRootClientId], clientId, _index)), _objectSpread6));
          }

        case 'MOVE_BLOCKS_UP':
          {
            var clientIds = action.clientIds,
                _action$rootClientId2 = action.rootClientId,
                _rootClientId = _action$rootClientId2 === void 0 ? '' : _action$rootClientId2;

            var firstClientId = first(clientIds);
            var _subState2 = state[_rootClientId];

            if (!_subState2.length || firstClientId === first(_subState2)) {
              return state;
            }

            var firstIndex = _subState2.indexOf(firstClientId);

            return _objectSpread({}, state, _defineProperty({}, _rootClientId, moveTo(_subState2, firstIndex, firstIndex - 1, clientIds.length)));
          }

        case 'MOVE_BLOCKS_DOWN':
          {
            var _clientIds = action.clientIds,
                _action$rootClientId3 = action.rootClientId,
                _rootClientId2 = _action$rootClientId3 === void 0 ? '' : _action$rootClientId3;

            var _firstClientId = first(_clientIds);

            var lastClientId = last(_clientIds);
            var _subState3 = state[_rootClientId2];

            if (!_subState3.length || lastClientId === last(_subState3)) {
              return state;
            }

            var _firstIndex = _subState3.indexOf(_firstClientId);

            return _objectSpread({}, state, _defineProperty({}, _rootClientId2, moveTo(_subState3, _firstIndex, _firstIndex + 1, _clientIds.length)));
          }

        case 'REPLACE_BLOCKS':
          {
            var _blocks = action.blocks,
                _clientIds2 = action.clientIds;

            if (!_blocks) {
              return state;
            }

            var _mappedBlocks = mapBlockOrder(_blocks);

            return flow([function (nextState) {
              return omit(nextState, _clientIds2);
            }, function (nextState) {
              return _objectSpread({}, nextState, omit(_mappedBlocks, ''));
            }, function (nextState) {
              return mapValues(nextState, function (subState) {
                return reduce(subState, function (result, clientId) {
                  if (clientId === _clientIds2[0]) {
                    return _toConsumableArray(result).concat(_toConsumableArray(_mappedBlocks['']));
                  }

                  if (_clientIds2.indexOf(clientId) === -1) {
                    result.push(clientId);
                  }

                  return result;
                }, []);
              });
            }])(state);
          }

        case 'REMOVE_BLOCKS':
          return flow([// Remove inner block ordering for removed blocks
          function (nextState) {
            return omit(nextState, action.clientIds);
          }, // Remove deleted blocks from other blocks' orderings
          function (nextState) {
            return mapValues(nextState, function (subState) {
              return without.apply(void 0, [subState].concat(_toConsumableArray(action.clientIds)));
            });
          }])(state);
      }

      return state;
    }
  })
});
/**
 * Reducer returning the last-known state of the current post, in the format
 * returned by the WP REST API.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function currentPost() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SETUP_EDITOR_STATE':
    case 'RESET_POST':
    case 'UPDATE_POST':
      var post;

      if (action.post) {
        post = action.post;
      } else if (action.edits) {
        post = _objectSpread({}, state, action.edits);
      } else {
        return state;
      }

      return mapValues(post, getPostRawValue);
  }

  return state;
}
/**
 * Reducer returning typing state.
 *
 * @param {boolean} state  Current state.
 * @param {Object}  action Dispatched action.
 *
 * @return {boolean} Updated state.
 */

export function isTyping() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'START_TYPING':
      return true;

    case 'STOP_TYPING':
      return false;
  }

  return state;
}
/**
 * Reducer returning whether the caret is within formatted text.
 *
 * @param {boolean} state  Current state.
 * @param {Object}  action Dispatched action.
 *
 * @return {boolean} Updated state.
 */

export function isCaretWithinFormattedText() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ENTER_FORMATTED_TEXT':
      return true;

    case 'EXIT_FORMATTED_TEXT':
      return false;
  }

  return state;
}
/**
 * Reducer returning the block selection's state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function blockSelection() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    start: null,
    end: null,
    isMultiSelecting: false,
    isEnabled: true,
    initialPosition: null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CLEAR_SELECTED_BLOCK':
      if (state.start === null && state.end === null && !state.isMultiSelecting) {
        return state;
      }

      return _objectSpread({}, state, {
        start: null,
        end: null,
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'START_MULTI_SELECT':
      if (state.isMultiSelecting) {
        return state;
      }

      return _objectSpread({}, state, {
        isMultiSelecting: true,
        initialPosition: null
      });

    case 'STOP_MULTI_SELECT':
      if (!state.isMultiSelecting) {
        return state;
      }

      return _objectSpread({}, state, {
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'MULTI_SELECT':
      return _objectSpread({}, state, {
        start: action.start,
        end: action.end,
        initialPosition: null
      });

    case 'SELECT_BLOCK':
      if (action.clientId === state.start && action.clientId === state.end) {
        return state;
      }

      return _objectSpread({}, state, {
        start: action.clientId,
        end: action.clientId,
        initialPosition: action.initialPosition
      });

    case 'INSERT_BLOCKS':
      return _objectSpread({}, state, {
        start: action.blocks[0].clientId,
        end: action.blocks[0].clientId,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'REMOVE_BLOCKS':
      if (!action.clientIds || !action.clientIds.length || action.clientIds.indexOf(state.start) === -1) {
        return state;
      }

      return _objectSpread({}, state, {
        start: null,
        end: null,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'REPLACE_BLOCKS':
      if (action.clientIds.indexOf(state.start) === -1) {
        return state;
      } // If there is replacement block(s), assign first's client ID as
      // the next selected block. If empty replacement, reset to null.


      var nextSelectedBlockClientId = get(action.blocks, [0, 'clientId'], null);
      return _objectSpread({}, state, {
        start: nextSelectedBlockClientId,
        end: nextSelectedBlockClientId,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'TOGGLE_SELECTION':
      return _objectSpread({}, state, {
        isEnabled: action.isSelectionEnabled
      });
  }

  return state;
}
export function blocksMode() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'TOGGLE_BLOCK_MODE') {
    var clientId = action.clientId;
    return _objectSpread({}, state, _defineProperty({}, clientId, state[clientId] && state[clientId] === 'html' ? 'visual' : 'html'));
  }

  return state;
}
/**
 * Reducer returning the block insertion point visibility, either null if there
 * is not an explicit insertion point assigned, or an object of its `index` and
 * `rootClientId`.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function insertionPoint() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SHOW_INSERTION_POINT':
      var rootClientId = action.rootClientId,
          index = action.index;
      return {
        rootClientId: rootClientId,
        index: index
      };

    case 'HIDE_INSERTION_POINT':
      return null;
  }

  return state;
}
/**
 * Reducer returning whether the post blocks match the defined template or not.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {boolean} Updated state.
 */

export function template() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isValid: true
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_TEMPLATE_VALIDITY':
      return _objectSpread({}, state, {
        isValid: action.isValid
      });
  }

  return state;
}
/**
 * Reducer returning the editor setting.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function settings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EDITOR_SETTINGS_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_EDITOR_SETTINGS':
      return _objectSpread({}, state, action.settings);
  }

  return state;
}
/**
 * Reducer returning the user preferences.
 *
 * @param {Object}  state                 Current state.
 * @param {Object}  action                Dispatched action.
 *
 * @return {string} Updated state.
 */

export function preferences() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PREFERENCES_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'INSERT_BLOCKS':
    case 'REPLACE_BLOCKS':
      return action.blocks.reduce(function (prevState, block) {
        var id = block.name;
        var insert = {
          name: block.name
        };

        if (isReusableBlock(block)) {
          insert.ref = block.attributes.ref;
          id += '/' + block.attributes.ref;
        }

        return _objectSpread({}, prevState, {
          insertUsage: _objectSpread({}, prevState.insertUsage, _defineProperty({}, id, {
            time: action.time,
            count: prevState.insertUsage[id] ? prevState.insertUsage[id].count + 1 : 1,
            insert: insert
          }))
        });
      }, state);

    case 'REMOVE_REUSABLE_BLOCK':
      return _objectSpread({}, state, {
        insertUsage: omitBy(state.insertUsage, function (_ref) {
          var insert = _ref.insert;
          return insert.ref === action.id;
        })
      });

    case 'ENABLE_PUBLISH_SIDEBAR':
      return _objectSpread({}, state, {
        isPublishSidebarEnabled: true
      });

    case 'DISABLE_PUBLISH_SIDEBAR':
      return _objectSpread({}, state, {
        isPublishSidebarEnabled: false
      });
  }

  return state;
}
/**
 * Reducer returning current network request state (whether a request to
 * the WP REST API is in progress, successful, or failed).
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function saving() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'REQUEST_POST_UPDATE_START':
      return {
        requesting: true,
        successful: false,
        error: null,
        isAutosave: action.isAutosave
      };

    case 'REQUEST_POST_UPDATE_SUCCESS':
      return {
        requesting: false,
        successful: true,
        error: null
      };

    case 'REQUEST_POST_UPDATE_FAILURE':
      return {
        requesting: false,
        successful: false,
        error: action.error
      };
  }

  return state;
}
/**
 * Post Lock State.
 *
 * @typedef {Object} PostLockState
 *
 * @property {boolean} isLocked       Whether the post is locked.
 * @property {?boolean} isTakeover     Whether the post editing has been taken over.
 * @property {?boolean} activePostLock Active post lock value.
 * @property {?Object}  user           User that took over the post.
 */

/**
 * Reducer returning the post lock status.
 *
 * @param {PostLockState} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {PostLockState} Updated state.
 */

export function postLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isLocked: false
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_POST_LOCK':
      return action.lock;
  }

  return state;
}
/**
 * Post saving lock.
 *
 * When post saving is locked, the post cannot be published or updated.
 *
 * @param {PostSavingLockState} state  Current state.
 * @param {Object}              action Dispatched action.
 *
 * @return {PostLockState} Updated state.
 */

export function postSavingLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOCK_POST_SAVING':
      return _objectSpread({}, state, _defineProperty({}, action.lockName, true));

    case 'UNLOCK_POST_SAVING':
      return omit(state, action.lockName);
  }

  return state;
}
export var reusableBlocks = combineReducers({
  data: function data() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RECEIVE_REUSABLE_BLOCKS':
        {
          return reduce(action.results, function (nextState, result) {
            var _result$reusableBlock = result.reusableBlock,
                id = _result$reusableBlock.id,
                title = _result$reusableBlock.title;
            var clientId = result.parsedBlock.clientId;
            var value = {
              clientId: clientId,
              title: title
            };

            if (!isEqual(nextState[id], value)) {
              if (nextState === state) {
                nextState = _objectSpread({}, nextState);
              }

              nextState[id] = value;
            }

            return nextState;
          }, state);
        }

      case 'UPDATE_REUSABLE_BLOCK_TITLE':
        {
          var id = action.id,
              title = action.title;

          if (!state[id] || state[id].title === title) {
            return state;
          }

          return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, state[id], {
            title: title
          })));
        }

      case 'SAVE_REUSABLE_BLOCK_SUCCESS':
        {
          var _id = action.id,
              updatedId = action.updatedId; // If a temporary reusable block is saved, we swap the temporary id with the final one

          if (_id === updatedId) {
            return state;
          }

          var value = state[_id];
          return _objectSpread({}, omit(state, _id), _defineProperty({}, updatedId, value));
        }

      case 'REMOVE_REUSABLE_BLOCK':
        {
          var _id2 = action.id;
          return omit(state, _id2);
        }
    }

    return state;
  },
  isFetching: function isFetching() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'FETCH_REUSABLE_BLOCKS':
        {
          var id = action.id;

          if (!id) {
            return state;
          }

          return _objectSpread({}, state, _defineProperty({}, id, true));
        }

      case 'FETCH_REUSABLE_BLOCKS_SUCCESS':
      case 'FETCH_REUSABLE_BLOCKS_FAILURE':
        {
          var _id3 = action.id;
          return omit(state, _id3);
        }
    }

    return state;
  },
  isSaving: function isSaving() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SAVE_REUSABLE_BLOCK':
        return _objectSpread({}, state, _defineProperty({}, action.id, true));

      case 'SAVE_REUSABLE_BLOCK_SUCCESS':
      case 'SAVE_REUSABLE_BLOCK_FAILURE':
        {
          var id = action.id;
          return omit(state, id);
        }
    }

    return state;
  }
});
/**
 * Reducer returning an object where each key is a block client ID, its value
 * representing the settings for its nested blocks.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export var blockListSettings = function blockListSettings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // Even if the replaced blocks have the same client ID, our logic
    // should correct the state.
    case 'REPLACE_BLOCKS':
    case 'REMOVE_BLOCKS':
      {
        return omit(state, action.clientIds);
      }

    case 'UPDATE_BLOCK_LIST_SETTINGS':
      {
        var clientId = action.clientId;

        if (!action.settings) {
          if (state.hasOwnProperty(clientId)) {
            return omit(state, clientId);
          }

          return state;
        }

        if (isEqual(state[clientId], action.settings)) {
          return state;
        }

        return _objectSpread({}, state, _defineProperty({}, clientId, action.settings));
      }
  }

  return state;
};
/**
 * Reducer returning the most recent autosave.
 *
 * @param  {Object} state  The autosave object.
 * @param  {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function autosave() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RESET_AUTOSAVE':
      var post = action.post;

      var _map = ['title', 'excerpt', 'content'].map(function (field) {
        return getPostRawValue(post[field]);
      }),
          _map2 = _slicedToArray(_map, 3),
          title = _map2[0],
          excerpt = _map2[1],
          content = _map2[2];

      return {
        title: title,
        excerpt: excerpt,
        content: content,
        preview_link: post.preview_link
      };

    case 'REQUEST_POST_UPDATE':
      // Invalidate known preview link when autosave starts.
      if (state && action.options.autosave) {
        return omit(state, 'preview_link');
      }

      break;
  }

  return state;
}
export default optimist(combineReducers({
  editor: editor,
  currentPost: currentPost,
  isTyping: isTyping,
  isCaretWithinFormattedText: isCaretWithinFormattedText,
  blockSelection: blockSelection,
  blocksMode: blocksMode,
  blockListSettings: blockListSettings,
  insertionPoint: insertionPoint,
  preferences: preferences,
  saving: saving,
  postLock: postLock,
  reusableBlocks: reusableBlocks,
  template: template,
  autosave: autosave,
  settings: settings,
  postSavingLock: postSavingLock
}));
//# sourceMappingURL=reducer.js.map