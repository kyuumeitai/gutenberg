"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWPAdminURL = getWPAdminURL;

var _url = require("@wordpress/url");

/**
 * WordPress dependencies
 */

/**
 * Returns the URL of a WPAdmin Page.
 *
 * TODO: This should be moved to a module less specific to the editor.
 *
 * @param {string} page  Page to navigate to.
 * @param {Object} query Query Args.
 *
 * @return {string} WPAdmin URL.
 */
function getWPAdminURL(page, query) {
  return (0, _url.addQueryArgs)(page, query);
}
//# sourceMappingURL=url.js.map