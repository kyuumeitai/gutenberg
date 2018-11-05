"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiFetch = apiFetch;
exports.select = select;
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */

/**
 * Trigger an API Fetch request.
 *
 * @param {Object} request API Fetch Request Object.
 * @return {Object} control descriptor.
 */
function apiFetch(request) {
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


function select(selectorName) {
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
    return (0, _apiFetch.default)(request);
  },
  SELECT: function SELECT(_ref2) {
    var _selectData;

    var selectorName = _ref2.selectorName,
        args = _ref2.args;
    return (_selectData = (0, _data.select)('core'))[selectorName].apply(_selectData, (0, _toConsumableArray2.default)(args));
  }
};
var _default = controls;
exports.default = _default;
//# sourceMappingURL=controls.js.map