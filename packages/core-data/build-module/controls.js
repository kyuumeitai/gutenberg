import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * WordPress dependencies
 */
import { default as triggerApiFetch } from '@wordpress/api-fetch';
import { select as selectData } from '@wordpress/data';
/**
 * Trigger an API Fetch request.
 *
 * @param {Object} request API Fetch Request Object.
 * @return {Object} control descriptor.
 */

export function apiFetch(request) {
  return {
    type: 'API_FETCH',
    request: request
  };
}
/**
 * Calls a selector using the current state.
 * @param {string} selectorName Selector name.
 * @param  {Array} args         Selector arguments.
 *
 * @return {Object} control descriptor.
 */

export function select(selectorName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return {
    type: 'SELECT',
    selectorName: selectorName,
    args: args
  };
}
var controls = {
  API_FETCH: function API_FETCH(_ref) {
    var request = _ref.request;
    return triggerApiFetch(request);
  },
  SELECT: function SELECT(_ref2) {
    var _selectData;

    var selectorName = _ref2.selectorName,
        args = _ref2.args;
    return (_selectData = selectData('core'))[selectorName].apply(_selectData, _toConsumableArray(args));
  }
};
export default controls;
//# sourceMappingURL=controls.js.map