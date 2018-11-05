"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isViewportMatch = isViewportMatch;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Returns true if the viewport matches the given query, or false otherwise.
 *
 * @param {Object} state Viewport state object.
 * @param {string} query Query string. Includes operator and breakpoint name,
 *                       space separated. Operator defaults to >=.
 *
 * @example
 *
 * ```js
 * isViewportMatch( state, '< huge' );
 * isViewPortMatch( state, 'medium' );
 * ```
 *
 * @return {boolean} Whether viewport matches query.
 */
function isViewportMatch(state, query) {
  // Pad to _at least_ two elements to take from the right, effectively
  // defaulting the left-most value.
  var key = (0, _lodash.takeRight)(['>='].concat((0, _toConsumableArray2.default)(query.split(' '))), 2).join(' ');
  return !!state[key];
}
//# sourceMappingURL=selectors.js.map