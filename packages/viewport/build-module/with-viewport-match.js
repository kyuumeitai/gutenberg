/**
 * External dependencies
 */
import { mapValues } from 'lodash';
/**
 * WordPress dependencies
 */

import { createHigherOrderComponent } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
/**
 * Higher-order component creator, creating a new component which renders with
 * the given prop names, where the value passed to the underlying component is
 * the result of the query assigned as the object's value.
 *
 * @param {Object} queries  Object of prop name to viewport query.
 *
 * @see isViewportMatch
 *
 * @return {Function} Higher-order component.
 */

var withViewportMatch = function withViewportMatch(queries) {
  return createHigherOrderComponent(withSelect(function (select) {
    return mapValues(queries, function (query) {
      return select('core/viewport').isViewportMatch(query);
    });
  }), 'withViewportMatch');
};

export default withViewportMatch;
//# sourceMappingURL=with-viewport-match.js.map