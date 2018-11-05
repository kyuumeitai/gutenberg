"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhrasingContentSchema = getPhrasingContentSchema;
exports.isPhrasingContent = isPhrasingContent;

var _lodash = require("lodash");

/**
 * External dependencies
 */
var phrasingContentSchema = {
  strong: {},
  em: {},
  del: {},
  ins: {},
  a: {
    attributes: ['href', 'target', 'rel']
  },
  code: {},
  abbr: {
    attributes: ['title']
  },
  sub: {},
  sup: {},
  br: {},
  '#text': {}
}; // Recursion is needed.
// Possible: strong > em > strong.
// Impossible: strong > strong.

['strong', 'em', 'del', 'ins', 'a', 'code', 'abbr', 'sub', 'sup'].forEach(function (tag) {
  phrasingContentSchema[tag].children = (0, _lodash.omit)(phrasingContentSchema, tag);
});
/**
 * Get schema of possible paths for phrasing content.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
 *
 * @return {Object} Schema.
 */

function getPhrasingContentSchema() {
  return phrasingContentSchema;
}
/**
 * Find out whether or not the given node is phrasing content.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
 *
 * @param {Element} node The node to test.
 *
 * @return {boolean} True if phrasing content, false if not.
 */


function isPhrasingContent(node) {
  var tag = node.nodeName.toLowerCase();
  return getPhrasingContentSchema().hasOwnProperty(tag) || tag === 'span';
}
//# sourceMappingURL=phrasing-content.js.map