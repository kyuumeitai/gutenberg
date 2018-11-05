"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockTypes = blockTypes;
exports.createBlockNameSetterReducer = createBlockNameSetterReducer;
exports.categories = categories;
exports.default = exports.unregisteredFallbackBlockName = exports.freeformFallbackBlockName = exports.defaultBlockName = exports.DEFAULT_CATEGORIES = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Module Constants
 */
var DEFAULT_CATEGORIES = [{
  slug: 'common',
  title: (0, _i18n.__)('Common Blocks')
}, {
  slug: 'formatting',
  title: (0, _i18n.__)('Formatting')
}, {
  slug: 'layout',
  title: (0, _i18n.__)('Layout Elements')
}, {
  slug: 'widgets',
  title: (0, _i18n.__)('Widgets')
}, {
  slug: 'embed',
  title: (0, _i18n.__)('Embeds')
}, {
  slug: 'reusable',
  title: (0, _i18n.__)('Reusable Blocks')
}];
/**
 * Reducer managing the block types
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

exports.DEFAULT_CATEGORIES = DEFAULT_CATEGORIES;

function blockTypes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_BLOCK_TYPES':
      return (0, _objectSpread2.default)({}, state, (0, _lodash.keyBy)(action.blockTypes, 'name'));

    case 'REMOVE_BLOCK_TYPES':
      return (0, _lodash.omit)(state, action.names);
  }

  return state;
}
/**
 * Higher-order Reducer creating a reducer keeping track of given block name.
 *
 * @param {string} setActionType  Action type.
 *
 * @return {function} Reducer.
 */


function createBlockNameSetterReducer(setActionType) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'REMOVE_BLOCK_TYPES':
        if (action.names.indexOf(state) !== -1) {
          return null;
        }

        return state;

      case setActionType:
        return action.name || null;
    }

    return state;
  };
}

var defaultBlockName = createBlockNameSetterReducer('SET_DEFAULT_BLOCK_NAME');
exports.defaultBlockName = defaultBlockName;
var freeformFallbackBlockName = createBlockNameSetterReducer('SET_FREEFORM_FALLBACK_BLOCK_NAME');
exports.freeformFallbackBlockName = freeformFallbackBlockName;
var unregisteredFallbackBlockName = createBlockNameSetterReducer('SET_UNREGISTERED_FALLBACK_BLOCK_NAME');
/**
 * Reducer managing the categories
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

exports.unregisteredFallbackBlockName = unregisteredFallbackBlockName;

function categories() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CATEGORIES;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'SET_CATEGORIES') {
    return action.categories || [];
  }

  return state;
}

var _default = (0, _data.combineReducers)({
  blockTypes: blockTypes,
  defaultBlockName: defaultBlockName,
  freeformFallbackBlockName: freeformFallbackBlockName,
  unregisteredFallbackBlockName: unregisteredFallbackBlockName,
  categories: categories
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map