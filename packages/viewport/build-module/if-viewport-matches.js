/**
 * WordPress dependencies
 */
import { ifCondition, compose, createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import withViewportMatch from './with-viewport-match';
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
  return createHigherOrderComponent(compose([withViewportMatch({
    isViewportMatch: query
  }), ifCondition(function (props) {
    return props.isViewportMatch;
  })]), 'ifViewportMatches');
};

export default ifViewportMatches;
//# sourceMappingURL=if-viewport-matches.js.map