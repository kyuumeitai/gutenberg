"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPostRawValue = getPostRawValue;
exports.hasSameKeys = hasSameKeys;
exports.isUpdatingSameBlockAttribute = isUpdatingSameBlockAttribute;
exports.isUpdatingSamePostProperty = isUpdatingSamePostProperty;
exports.shouldOverwriteState = shouldOverwriteState;
exports.currentPost = currentPost;
exports.isTyping = isTyping;
exports.isCaretWithinFormattedText = isCaretWithinFormattedText;
exports.blockSelection = blockSelection;
exports.blocksMode = blocksMode;
exports.insertionPoint = insertionPoint;
exports.template = template;
exports.settings = settings;
exports.preferences = preferences;
exports.saving = saving;
exports.postLock = postLock;
exports.postSavingLock = postSavingLock;
exports.autosave = autosave;
exports.default = exports.blockListSettings = exports.reusableBlocks = exports.editor = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread17 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _reduxOptimist = _interopRequireDefault(require("redux-optimist"));

var _lodash = require("lodash");

var _blocks2 = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _withHistory = _interopRequireDefault(require("../utils/with-history"));

var _withChangeDetection = _interopRequireDefault(require("../utils/with-change-detection"));

var _defaults = require("./defaults");

var _array = require("./array");

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
 * Returns a post attribute value, flattening nested rendered content using its
 * raw value in place of its original object form.
 *
 * @param {*} value Original value.
 *
 * @return {*} Raw value.
 */
function getPostRawValue(value) {
  if (value && 'object' === (0, _typeof2.default)(value) && 'raw' in value) {
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
  var result = (0, _defineProperty2.default)({}, rootClientId, []);
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
  var stack = (0, _toConsumableArray2.default)(blocks);

  while (stack.length) {
    // `innerBlocks` is redundant data which can fall out of sync, since
    // this is reflected in `blocks.order`, so exclude from appended block.
    var _stack$shift = stack.shift(),
        innerBlocks = _stack$shift.innerBlocks,
        block = (0, _objectWithoutProperties2.default)(_stack$shift, ["innerBlocks"]);

    stack.push.apply(stack, (0, _toConsumableArray2.default)(innerBlocks));
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


function hasSameKeys(a, b) {
  return (0, _lodash.isEqual)((0, _lodash.keys)(a), (0, _lodash.keys)(b));
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


function isUpdatingSameBlockAttribute(action, previousAction) {
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


function isUpdatingSamePostProperty(action, previousAction) {
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


function shouldOverwriteState(action, previousAction) {
  if (!previousAction || action.type !== previousAction.type) {
    return false;
  }

  return (0, _lodash.overSome)([isUpdatingSameBlockAttribute, isUpdatingSamePostProperty])(action, previousAction);
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
      var clientIds = (0, _toConsumableArray2.default)(action.clientIds); // For each removed client ID, include its inner blocks to remove,
      // recursing into those so long as inner blocks exist.

      for (var i = 0; i < clientIds.length; i++) {
        clientIds.push.apply(clientIds, (0, _toConsumableArray2.default)(state.blocks.order[clientIds[i]]));
      }

      action = (0, _objectSpread17.default)({}, action, {
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


var editor = (0, _lodash.flow)([_data.combineReducers, withInnerBlocksRemoveCascade, // Track undo history, starting at editor initialization.
(0, _withHistory.default)({
  resetTypes: ['SETUP_EDITOR_STATE'],
  ignoreTypes: ['RECEIVE_BLOCKS', 'RESET_POST', 'UPDATE_POST'],
  shouldOverwriteState: shouldOverwriteState
}), // Track whether changes exist, resetting at each post save. Relies on
// editor initialization firing post reset as an effect.
(0, _withChangeDetection.default)({
  resetTypes: ['SETUP_EDITOR_STATE', 'REQUEST_POST_UPDATE_START'],
  ignoreTypes: ['RECEIVE_BLOCKS', 'RESET_POST', 'UPDATE_POST']
})])({
  edits: function edits() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'EDIT_POST':
      case 'SETUP_EDITOR_STATE':
        return (0, _lodash.reduce)(action.edits, function (result, value, key) {
          // Only assign into result if not already same value
          if (value !== state[key]) {
            // Avoid mutating original state by creating shallow
            // clone. Should only occur once per reduce.
            if (result === state) {
              result = (0, _objectSpread17.default)({}, state);
            }

            result[key] = value;
          }

          return result;
        }, state);

      case 'RESET_BLOCKS':
        if ('content' in state) {
          return (0, _lodash.omit)(state, 'content');
        }

        return state;

      case 'DIRTY_ARTIFICIALLY':
        return (0, _objectSpread17.default)({}, state);

      case 'UPDATE_POST':
      case 'RESET_POST':
        var getCanonicalValue = action.type === 'UPDATE_POST' ? function (key) {
          return action.edits[key];
        } : function (key) {
          return getPostRawValue(action.post[key]);
        };
        return (0, _lodash.reduce)(state, function (result, value, key) {
          if (value !== getCanonicalValue(key)) {
            return result;
          }

          if (state === result) {
            result = (0, _objectSpread17.default)({}, state);
          }

          delete result[key];
          return result;
        }, state);
    }

    return state;
  },
  blocks: (0, _data.combineReducers)({
    byClientId: function byClientId() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 ? arguments[1] : undefined;

      switch (action.type) {
        case 'RESET_BLOCKS':
        case 'SETUP_EDITOR_STATE':
          return getFlattenedBlocks(action.blocks);

        case 'RECEIVE_BLOCKS':
          return (0, _objectSpread17.default)({}, state, getFlattenedBlocks(action.blocks));

        case 'UPDATE_BLOCK_ATTRIBUTES':
          // Ignore updates if block isn't known
          if (!state[action.clientId]) {
            return state;
          } // Consider as updates only changed values


          var nextAttributes = (0, _lodash.reduce)(action.attributes, function (result, value, key) {
            if (value !== result[key]) {
              // Avoid mutating original block by creating shallow clone
              if (result === state[action.clientId].attributes) {
                result = (0, _objectSpread17.default)({}, result);
              }

              result[key] = value;
            }

            return result;
          }, state[action.clientId].attributes); // Skip update if nothing has been changed. The reference will
          // match the original block if `reduce` had no changed values.

          if (nextAttributes === state[action.clientId].attributes) {
            return state;
          } // Otherwise merge attributes into state


          return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, action.clientId, (0, _objectSpread17.default)({}, state[action.clientId], {
            attributes: nextAttributes
          })));

        case 'UPDATE_BLOCK':
          // Ignore updates if block isn't known
          if (!state[action.clientId]) {
            return state;
          }

          return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, action.clientId, (0, _objectSpread17.default)({}, state[action.clientId], action.updates)));

        case 'INSERT_BLOCKS':
          return (0, _objectSpread17.default)({}, state, getFlattenedBlocks(action.blocks));

        case 'REPLACE_BLOCKS':
          if (!action.blocks) {
            return state;
          }

          return (0, _objectSpread17.default)({}, (0, _lodash.omit)(state, action.clientIds), getFlattenedBlocks(action.blocks));

        case 'REMOVE_BLOCKS':
          return (0, _lodash.omit)(state, action.clientIds);

        case 'SAVE_REUSABLE_BLOCK_SUCCESS':
          {
            var id = action.id,
                updatedId = action.updatedId; // If a temporary reusable block is saved, we swap the temporary id with the final one

            if (id === updatedId) {
              return state;
            }

            return (0, _lodash.mapValues)(state, function (block) {
              if (block.name === 'core/block' && block.attributes.ref === id) {
                return (0, _objectSpread17.default)({}, block, {
                  attributes: (0, _objectSpread17.default)({}, block.attributes, {
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
          return (0, _objectSpread17.default)({}, state, (0, _lodash.omit)(mapBlockOrder(action.blocks), ''));

        case 'INSERT_BLOCKS':
          {
            var _action$rootClientId = action.rootClientId,
                rootClientId = _action$rootClientId === void 0 ? '' : _action$rootClientId,
                blocks = action.blocks;
            var subState = state[rootClientId] || [];
            var mappedBlocks = mapBlockOrder(blocks, rootClientId);
            var _action$index = action.index,
                index = _action$index === void 0 ? subState.length : _action$index;
            return (0, _objectSpread17.default)({}, state, mappedBlocks, (0, _defineProperty2.default)({}, rootClientId, (0, _array.insertAt)(subState, mappedBlocks[rootClientId], index)));
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

              return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, toRootClientId, (0, _array.moveTo)(state[toRootClientId], fromIndex, _index)));
            } // Moving from a parent block to another


            return (0, _objectSpread17.default)({}, state, (_objectSpread6 = {}, (0, _defineProperty2.default)(_objectSpread6, fromRootClientId, (0, _lodash.without)(state[fromRootClientId], clientId)), (0, _defineProperty2.default)(_objectSpread6, toRootClientId, (0, _array.insertAt)(state[toRootClientId], clientId, _index)), _objectSpread6));
          }

        case 'MOVE_BLOCKS_UP':
          {
            var clientIds = action.clientIds,
                _action$rootClientId2 = action.rootClientId,
                _rootClientId = _action$rootClientId2 === void 0 ? '' : _action$rootClientId2;

            var firstClientId = (0, _lodash.first)(clientIds);
            var _subState2 = state[_rootClientId];

            if (!_subState2.length || firstClientId === (0, _lodash.first)(_subState2)) {
              return state;
            }

            var firstIndex = _subState2.indexOf(firstClientId);

            return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, _rootClientId, (0, _array.moveTo)(_subState2, firstIndex, firstIndex - 1, clientIds.length)));
          }

        case 'MOVE_BLOCKS_DOWN':
          {
            var _clientIds = action.clientIds,
                _action$rootClientId3 = action.rootClientId,
                _rootClientId2 = _action$rootClientId3 === void 0 ? '' : _action$rootClientId3;

            var _firstClientId = (0, _lodash.first)(_clientIds);

            var lastClientId = (0, _lodash.last)(_clientIds);
            var _subState3 = state[_rootClientId2];

            if (!_subState3.length || lastClientId === (0, _lodash.last)(_subState3)) {
              return state;
            }

            var _firstIndex = _subState3.indexOf(_firstClientId);

            return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, _rootClientId2, (0, _array.moveTo)(_subState3, _firstIndex, _firstIndex + 1, _clientIds.length)));
          }

        case 'REPLACE_BLOCKS':
          {
            var _blocks = action.blocks,
                _clientIds2 = action.clientIds;

            if (!_blocks) {
              return state;
            }

            var _mappedBlocks = mapBlockOrder(_blocks);

            return (0, _lodash.flow)([function (nextState) {
              return (0, _lodash.omit)(nextState, _clientIds2);
            }, function (nextState) {
              return (0, _objectSpread17.default)({}, nextState, (0, _lodash.omit)(_mappedBlocks, ''));
            }, function (nextState) {
              return (0, _lodash.mapValues)(nextState, function (subState) {
                return (0, _lodash.reduce)(subState, function (result, clientId) {
                  if (clientId === _clientIds2[0]) {
                    return (0, _toConsumableArray2.default)(result).concat((0, _toConsumableArray2.default)(_mappedBlocks['']));
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
          return (0, _lodash.flow)([// Remove inner block ordering for removed blocks
          function (nextState) {
            return (0, _lodash.omit)(nextState, action.clientIds);
          }, // Remove deleted blocks from other blocks' orderings
          function (nextState) {
            return (0, _lodash.mapValues)(nextState, function (subState) {
              return _lodash.without.apply(void 0, [subState].concat((0, _toConsumableArray2.default)(action.clientIds)));
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

exports.editor = editor;

function currentPost() {
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
        post = (0, _objectSpread17.default)({}, state, action.edits);
      } else {
        return state;
      }

      return (0, _lodash.mapValues)(post, getPostRawValue);
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


function isTyping() {
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


function isCaretWithinFormattedText() {
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


function blockSelection() {
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

      return (0, _objectSpread17.default)({}, state, {
        start: null,
        end: null,
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'START_MULTI_SELECT':
      if (state.isMultiSelecting) {
        return state;
      }

      return (0, _objectSpread17.default)({}, state, {
        isMultiSelecting: true,
        initialPosition: null
      });

    case 'STOP_MULTI_SELECT':
      if (!state.isMultiSelecting) {
        return state;
      }

      return (0, _objectSpread17.default)({}, state, {
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'MULTI_SELECT':
      return (0, _objectSpread17.default)({}, state, {
        start: action.start,
        end: action.end,
        initialPosition: null
      });

    case 'SELECT_BLOCK':
      if (action.clientId === state.start && action.clientId === state.end) {
        return state;
      }

      return (0, _objectSpread17.default)({}, state, {
        start: action.clientId,
        end: action.clientId,
        initialPosition: action.initialPosition
      });

    case 'INSERT_BLOCKS':
      return (0, _objectSpread17.default)({}, state, {
        start: action.blocks[0].clientId,
        end: action.blocks[0].clientId,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'REMOVE_BLOCKS':
      if (!action.clientIds || !action.clientIds.length || action.clientIds.indexOf(state.start) === -1) {
        return state;
      }

      return (0, _objectSpread17.default)({}, state, {
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


      var nextSelectedBlockClientId = (0, _lodash.get)(action.blocks, [0, 'clientId'], null);
      return (0, _objectSpread17.default)({}, state, {
        start: nextSelectedBlockClientId,
        end: nextSelectedBlockClientId,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'TOGGLE_SELECTION':
      return (0, _objectSpread17.default)({}, state, {
        isEnabled: action.isSelectionEnabled
      });
  }

  return state;
}

function blocksMode() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'TOGGLE_BLOCK_MODE') {
    var clientId = action.clientId;
    return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, clientId, state[clientId] && state[clientId] === 'html' ? 'visual' : 'html'));
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


function insertionPoint() {
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


function template() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isValid: true
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_TEMPLATE_VALIDITY':
      return (0, _objectSpread17.default)({}, state, {
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


function settings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.EDITOR_SETTINGS_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_EDITOR_SETTINGS':
      return (0, _objectSpread17.default)({}, state, action.settings);
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


function preferences() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.PREFERENCES_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'INSERT_BLOCKS':
    case 'REPLACE_BLOCKS':
      return action.blocks.reduce(function (prevState, block) {
        var id = block.name;
        var insert = {
          name: block.name
        };

        if ((0, _blocks2.isReusableBlock)(block)) {
          insert.ref = block.attributes.ref;
          id += '/' + block.attributes.ref;
        }

        return (0, _objectSpread17.default)({}, prevState, {
          insertUsage: (0, _objectSpread17.default)({}, prevState.insertUsage, (0, _defineProperty2.default)({}, id, {
            time: action.time,
            count: prevState.insertUsage[id] ? prevState.insertUsage[id].count + 1 : 1,
            insert: insert
          }))
        });
      }, state);

    case 'REMOVE_REUSABLE_BLOCK':
      return (0, _objectSpread17.default)({}, state, {
        insertUsage: (0, _lodash.omitBy)(state.insertUsage, function (_ref) {
          var insert = _ref.insert;
          return insert.ref === action.id;
        })
      });

    case 'ENABLE_PUBLISH_SIDEBAR':
      return (0, _objectSpread17.default)({}, state, {
        isPublishSidebarEnabled: true
      });

    case 'DISABLE_PUBLISH_SIDEBAR':
      return (0, _objectSpread17.default)({}, state, {
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


function saving() {
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


function postLock() {
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


function postSavingLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOCK_POST_SAVING':
      return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, action.lockName, true));

    case 'UNLOCK_POST_SAVING':
      return (0, _lodash.omit)(state, action.lockName);
  }

  return state;
}

var reusableBlocks = (0, _data.combineReducers)({
  data: function data() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RECEIVE_REUSABLE_BLOCKS':
        {
          return (0, _lodash.reduce)(action.results, function (nextState, result) {
            var _result$reusableBlock = result.reusableBlock,
                id = _result$reusableBlock.id,
                title = _result$reusableBlock.title;
            var clientId = result.parsedBlock.clientId;
            var value = {
              clientId: clientId,
              title: title
            };

            if (!(0, _lodash.isEqual)(nextState[id], value)) {
              if (nextState === state) {
                nextState = (0, _objectSpread17.default)({}, nextState);
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

          return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, id, (0, _objectSpread17.default)({}, state[id], {
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
          return (0, _objectSpread17.default)({}, (0, _lodash.omit)(state, _id), (0, _defineProperty2.default)({}, updatedId, value));
        }

      case 'REMOVE_REUSABLE_BLOCK':
        {
          var _id2 = action.id;
          return (0, _lodash.omit)(state, _id2);
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

          return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, id, true));
        }

      case 'FETCH_REUSABLE_BLOCKS_SUCCESS':
      case 'FETCH_REUSABLE_BLOCKS_FAILURE':
        {
          var _id3 = action.id;
          return (0, _lodash.omit)(state, _id3);
        }
    }

    return state;
  },
  isSaving: function isSaving() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SAVE_REUSABLE_BLOCK':
        return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, action.id, true));

      case 'SAVE_REUSABLE_BLOCK_SUCCESS':
      case 'SAVE_REUSABLE_BLOCK_FAILURE':
        {
          var id = action.id;
          return (0, _lodash.omit)(state, id);
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

exports.reusableBlocks = reusableBlocks;

var blockListSettings = function blockListSettings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // Even if the replaced blocks have the same client ID, our logic
    // should correct the state.
    case 'REPLACE_BLOCKS':
    case 'REMOVE_BLOCKS':
      {
        return (0, _lodash.omit)(state, action.clientIds);
      }

    case 'UPDATE_BLOCK_LIST_SETTINGS':
      {
        var clientId = action.clientId;

        if (!action.settings) {
          if (state.hasOwnProperty(clientId)) {
            return (0, _lodash.omit)(state, clientId);
          }

          return state;
        }

        if ((0, _lodash.isEqual)(state[clientId], action.settings)) {
          return state;
        }

        return (0, _objectSpread17.default)({}, state, (0, _defineProperty2.default)({}, clientId, action.settings));
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


exports.blockListSettings = blockListSettings;

function autosave() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RESET_AUTOSAVE':
      var post = action.post;

      var _map = ['title', 'excerpt', 'content'].map(function (field) {
        return getPostRawValue(post[field]);
      }),
          _map2 = (0, _slicedToArray2.default)(_map, 3),
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
        return (0, _lodash.omit)(state, 'preview_link');
      }

      break;
  }

  return state;
}

var _default = (0, _reduxOptimist.default)((0, _data.combineReducers)({
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

exports.default = _default;
//# sourceMappingURL=reducer.js.map