"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isURL = isURL;
exports.addQueryArgs = addQueryArgs;
exports.getQueryArg = getQueryArg;
exports.hasQueryArg = hasQueryArg;
exports.removeQueryArgs = removeQueryArgs;
exports.prependHTTP = prependHTTP;
exports.safeDecodeURI = safeDecodeURI;
exports.filterURLForDisplay = filterURLForDisplay;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _qs = require("qs");

/**
 * External dependencies
 */
var URL_REGEXP = /^(?:https?:)?\/\/\S+$/i;
var EMAIL_REGEXP = /^(mailto:)?[a-z0-9._%+-]+@[a-z0-9][a-z0-9.-]*\.[a-z]{2,63}$/i;
var USABLE_HREF_REGEXP = /^(?:[a-z]+:|#|\?|\.|\/)/i;
/**
 * Determines whether the given string looks like a URL.
 *
 * @param {string} url The string to scrutinise.
 *
 * @return {boolean} Whether or not it looks like a URL.
 */

function isURL(url) {
  return URL_REGEXP.test(url);
}
/**
 * Appends arguments to the query string of the url
 *
 * @param {string} url  URL
 * @param {Object} args Query Args
 *
 * @return {string} Updated URL
 */


function addQueryArgs(url, args) {
  var queryStringIndex = url.indexOf('?');
  var query = queryStringIndex !== -1 ? (0, _qs.parse)(url.substr(queryStringIndex + 1)) : {};
  var baseUrl = queryStringIndex !== -1 ? url.substr(0, queryStringIndex) : url;
  return baseUrl + '?' + (0, _qs.stringify)((0, _objectSpread2.default)({}, query, args));
}
/**
 * Returns a single query argument of the url
 *
 * @param {string} url URL
 * @param {string} arg Query arg name
 *
 * @return {Array|string} Query arg value.
 */


function getQueryArg(url, arg) {
  var queryStringIndex = url.indexOf('?');
  var query = queryStringIndex !== -1 ? (0, _qs.parse)(url.substr(queryStringIndex + 1)) : {};
  return query[arg];
}
/**
 * Determines whether the URL contains a given query arg.
 *
 * @param {string} url URL
 * @param {string} arg Query arg name
 *
 * @return {boolean} Whether or not the URL contains the query aeg.
 */


function hasQueryArg(url, arg) {
  return getQueryArg(url, arg) !== undefined;
}
/**
 * Removes arguments from the query string of the url
 *
 * @param {string} url  URL
 * @param {...string} args Query Args
 *
 * @return {string} Updated URL
 */


function removeQueryArgs(url) {
  var queryStringIndex = url.indexOf('?');
  var query = queryStringIndex !== -1 ? (0, _qs.parse)(url.substr(queryStringIndex + 1)) : {};
  var baseUrl = queryStringIndex !== -1 ? url.substr(0, queryStringIndex) : url;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  args.forEach(function (arg) {
    return delete query[arg];
  });
  return baseUrl + '?' + (0, _qs.stringify)(query);
}
/**
 * Prepends "http://" to a url, if it looks like something that is meant to be a TLD.
 *
 * @param  {string} url The URL to test
 *
 * @return {string}     The updated URL
 */


function prependHTTP(url) {
  if (!USABLE_HREF_REGEXP.test(url) && !EMAIL_REGEXP.test(url)) {
    return 'http://' + url;
  }

  return url;
}
/**
 * Safely decodes a URI with `decodeURI`. Returns the URI unmodified if
 * `decodeURI` throws an error.
 *
 * @param {string} uri URI to decode.
 *
 * @return {string} Decoded URI if possible.
 */


function safeDecodeURI(uri) {
  try {
    return decodeURI(uri);
  } catch (uriError) {
    return uri;
  }
}
/**
 * Returns a URL for display.
 *
 * @param {string} url Original URL.
 *
 * @return {string} Displayed URL.
 */


function filterURLForDisplay(url) {
  // Remove protocol and www prefixes.
  var filteredURL = url.replace(/^(?:https?:)\/\/(?:www\.)?/, ''); // Ends with / and only has that single slash, strip it.

  if (filteredURL.match(/^[^\/]+\/$/)) {
    return filteredURL.replace('/', '');
  }

  return filteredURL;
}
//# sourceMappingURL=index.js.map