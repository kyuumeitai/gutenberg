"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compose = require("@wordpress/compose");

var _withViewportMatch = _interopRequireDefault(require("./with-viewport-match"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Higher-order component creator, creating a new component which renders if
 * the viewport query is satisfied.
 *
 * @param {string} query Viewport query.
 *
 * @see withViewportMatches
 *
 * @return {Function} Higher-order component.
 */
var ifViewportMatches = function ifViewportMatches(query) {
  return (0, _compose.createHigherOrderComponent)((0, _compose.compose)([(0, _withViewportMatch.default)({
    isViewportMatch: query
  }), (0, _compose.ifCondition)(function (props) {
    return props.isViewportMatch;
  })]), 'ifViewportMatches');
};

var _default = ifViewportMatches;
exports.default = _default;
//# sourceMappingURL=if-viewport-matches.js.map