"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormatType = getFormatType;
exports.getFormatTypes = void 0;

var _rememo = _interopRequireDefault(require("rememo"));

/**
 * External dependencies
 */

/**
 * Returns all the available format types.
 *
 * @param {Object} state Data state.
 *
 * @return {Array} Format types.
 */
var getFormatTypes = (0, _rememo.default)(function (state) {
  return Object.values(state.formatTypes);
}, function (state) {
  return [state.formatTypes];
});
/**
 * Returns a format type by name.
 *
 * @param {Object} state Data state.
 * @param {string} name Format type name.
 *
 * @return {Object?} Format type.
 */

exports.getFormatTypes = getFormatTypes;

function getFormatType(state, name) {
  return state.formatTypes[name];
}
//# sourceMappingURL=selectors.js.map