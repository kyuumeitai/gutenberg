/**
 * Parse the given HTML into a body element.
 *
 * @param {HTMLDocument} document The HTML document to use to parse.
 * @param {string}       html     The HTML to parse.
 *
 * @return {HTMLBodyElement} Body element with parsed HTML.
 */
export function createElement(_ref, html) {
  var implementation = _ref.implementation;

  var _implementation$creat = implementation.createHTMLDocument(''),
      body = _implementation$creat.body;

  body.innerHTML = html;
  return body;
}
//# sourceMappingURL=create-element.js.map