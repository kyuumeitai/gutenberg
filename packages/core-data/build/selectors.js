"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestingEmbedPreview = isRequestingEmbedPreview;
exports.getAuthors = getAuthors;
exports.getEntitiesByKind = getEntitiesByKind;
exports.getEntity = getEntity;
exports.getEntityRecord = getEntityRecord;
exports.getEntityRecords = getEntityRecords;
exports.getThemeSupports = getThemeSupports;
exports.getEmbedPreview = getEmbedPreview;
exports.isPreviewEmbedFallback = isPreviewEmbedFallback;
exports.getUserQueryResults = void 0;

var _rememo = _interopRequireDefault(require("rememo"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _name = require("./name");

var _queriedData = require("./queried-data");

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
 * Returns true if resolution is in progress for the core selector of the given
 * name and arguments.
 *
 * @param {string} selectorName Core data selector name.
 * @param {...*}   args         Arguments passed to selector.
 *
 * @return {boolean} Whether resolution is in progress.
 */
function isResolving(selectorName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return (0, _data.select)('core/data').isResolving(_name.REDUCER_KEY, selectorName, args);
}
/**
 * Returns true if a request is in progress for embed preview data, or false
 * otherwise.
 *
 * @param {Object} state Data state.
 * @param {string} url   URL the preview would be for.
 *
 * @return {boolean} Whether a request is in progress for an embed preview.
 */


function isRequestingEmbedPreview(state, url) {
  return isResolving('getEmbedPreview', url);
}
/**
 * Returns all available authors.
 *
 * @param {Object} state Data state.
 *
 * @return {Array} Authors list.
 */


function getAuthors(state) {
  return getUserQueryResults(state, 'authors');
}
/**
 * Returns all the users returned by a query ID.
 *
 * @param {Object} state   Data state.
 * @param {string} queryID Query ID.
 *
 * @return {Array} Users list.
 */


var getUserQueryResults = (0, _rememo.default)(function (state, queryID) {
  var queryResults = state.users.queries[queryID];
  return (0, _lodash.map)(queryResults, function (id) {
    return state.users.byId[id];
  });
}, function (state, queryID) {
  return [state.users.queries[queryID], state.users.byId];
});
/**
 * Returns whether the entities for the give kind are loaded.
 *
 * @param {Object} state   Data state.
 * @param {string} kind  Entity kind.
 *
 * @return {boolean} Whether the entities are loaded
 */

exports.getUserQueryResults = getUserQueryResults;

function getEntitiesByKind(state, kind) {
  return (0, _lodash.filter)(state.entities.config, {
    kind: kind
  });
}
/**
 * Returns the entity object given its kind and name.
 *
 * @param {Object} state   Data state.
 * @param {string} kind  Entity kind.
 * @param {string} name  Entity name.
 *
 * @return {Object} Entity
 */


function getEntity(state, kind, name) {
  return (0, _lodash.find)(state.entities.config, {
    kind: kind,
    name: name
  });
}
/**
 * Returns the Entity's record object by key.
 *
 * @param {Object} state  State tree
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 * @param {number} key    Record's key
 *
 * @return {Object?} Record.
 */


function getEntityRecord(state, kind, name, key) {
  return (0, _lodash.get)(state.entities.data, [kind, name, 'items', key]);
}
/**
 * Returns the Entity's records.
 *
 * @param {Object}  state  State tree
 * @param {string}  kind   Entity kind.
 * @param {string}  name   Entity name.
 * @param {?Object} query  Optional terms query.
 *
 * @return {Array} Records.
 */


function getEntityRecords(state, kind, name, query) {
  var queriedState = (0, _lodash.get)(state.entities.data, [kind, name]);

  if (!queriedState) {
    return [];
  }

  return (0, _queriedData.getQueriedItems)(queriedState, query);
}
/**
 * Return theme supports data in the index.
 *
 * @param {Object} state Data state.
 *
 * @return {*}           Index data.
 */


function getThemeSupports(state) {
  return state.themeSupports;
}
/**
 * Returns the embed preview for the given URL.
 *
 * @param {Object} state    Data state.
 * @param {string} url      Embedded URL.
 *
 * @return {*} Undefined if the preview has not been fetched, otherwise, the preview fetched from the embed preview API.
 */


function getEmbedPreview(state, url) {
  return state.embedPreviews[url];
}
/**
 * Determines if the returned preview is an oEmbed link fallback.
 *
 * WordPress can be configured to return a simple link to a URL if it is not embeddable.
 * We need to be able to determine if a URL is embeddable or not, based on what we
 * get back from the oEmbed preview API.
 *
 * @param {Object} state    Data state.
 * @param {string} url      Embedded URL.
 *
 * @return {booleans} Is the preview for the URL an oEmbed link fallback.
 */


function isPreviewEmbedFallback(state, url) {
  var preview = state.embedPreviews[url];
  var oEmbedLinkCheck = '<a href="' + url + '">' + url + '</a>';

  if (!preview) {
    return false;
  }

  return preview.html === oEmbedLinkCheck;
}
//# sourceMappingURL=selectors.js.map