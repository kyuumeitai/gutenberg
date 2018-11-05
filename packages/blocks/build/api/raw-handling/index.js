"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rawHandler;
Object.defineProperty(exports, "getPhrasingContentSchema", {
  enumerable: true,
  get: function get() {
    return _phrasingContent.getPhrasingContentSchema;
  }
});

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _factory = require("../factory");

var _registration = require("../registration");

var _serializer = require("../serializer");

var _parser = require("../parser");

var _normaliseBlocks = _interopRequireDefault(require("./normalise-blocks"));

var _specialCommentConverter = _interopRequireDefault(require("./special-comment-converter"));

var _isInlineContent = _interopRequireDefault(require("./is-inline-content"));

var _phrasingContentReducer = _interopRequireDefault(require("./phrasing-content-reducer"));

var _headRemover = _interopRequireDefault(require("./head-remover"));

var _msListConverter = _interopRequireDefault(require("./ms-list-converter"));

var _listReducer = _interopRequireDefault(require("./list-reducer"));

var _imageCorrector = _interopRequireDefault(require("./image-corrector"));

var _blockquoteNormaliser = _interopRequireDefault(require("./blockquote-normaliser"));

var _figureContentReducer = _interopRequireDefault(require("./figure-content-reducer"));

var _shortcodeConverter = _interopRequireDefault(require("./shortcode-converter"));

var _markdownConverter = _interopRequireDefault(require("./markdown-converter"));

var _iframeRemover = _interopRequireDefault(require("./iframe-remover"));

var _phrasingContent = require("./phrasing-content");

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Browser dependencies
 */
var _window = window,
    console = _window.console;

/**
 * Filters HTML to only contain phrasing content.
 *
 * @param {string} HTML The HTML to filter.
 *
 * @return {string} HTML only containing phrasing content.
 */
function filterInlineHTML(HTML) {
  HTML = (0, _utils.deepFilterHTML)(HTML, [_phrasingContentReducer.default]);
  HTML = (0, _utils.removeInvalidHTML)(HTML, (0, _phrasingContent.getPhrasingContentSchema)(), {
    inline: true
  }); // Allows us to ask for this information when we get a report.

  console.log('Processed inline HTML:\n\n', HTML);
  return HTML;
}

function getRawTransformations() {
  return (0, _lodash.filter)((0, _factory.getBlockTransforms)('from'), {
    type: 'raw'
  }).map(function (transform) {
    return transform.isMatch ? transform : (0, _objectSpread2.default)({}, transform, {
      isMatch: function isMatch(node) {
        return transform.selector && node.matches(transform.selector);
      }
    });
  });
}
/**
 * Converts an HTML string to known blocks. Strips everything else.
 *
 * @param {string}  [options.HTML]                     The HTML to convert.
 * @param {string}  [options.plainText]                Plain text version.
 * @param {string}  [options.mode]                     Handle content as blocks or inline content.
 *                                                     * 'AUTO': Decide based on the content passed.
 *                                                     * 'INLINE': Always handle as inline content, and return string.
 *                                                     * 'BLOCKS': Always handle as blocks, and return array of blocks.
 * @param {Array}   [options.tagName]                  The tag into which content will be inserted.
 * @param {boolean} [options.canUserUseUnfilteredHTML] Whether or not the user can use unfiltered HTML.
 *
 * @return {Array|string} A list of blocks or a string, depending on `handlerMode`.
 */


function rawHandler(_ref) {
  var _ref$HTML = _ref.HTML,
      HTML = _ref$HTML === void 0 ? '' : _ref$HTML,
      _ref$plainText = _ref.plainText,
      plainText = _ref$plainText === void 0 ? '' : _ref$plainText,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'AUTO' : _ref$mode,
      tagName = _ref.tagName,
      _ref$canUserUseUnfilt = _ref.canUserUseUnfilteredHTML,
      canUserUseUnfilteredHTML = _ref$canUserUseUnfilt === void 0 ? false : _ref$canUserUseUnfilt;
  // First of all, strip any meta tags.
  HTML = HTML.replace(/<meta[^>]+>/, ''); // If we detect block delimiters, parse entirely as blocks.

  if (mode !== 'INLINE' && HTML.indexOf('<!-- wp:') !== -1) {
    return (0, _parser.parseWithGrammar)(HTML);
  } // Normalize unicode to use composed characters.
  // This is unsupported in IE 11 but it's a nice-to-have feature, not mandatory.
  // Not normalizing the content will only affect older browsers and won't
  // entirely break the app.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  // See: https://core.trac.wordpress.org/ticket/30130
  // See: https://github.com/WordPress/gutenberg/pull/6983#pullrequestreview-125151075


  if (String.prototype.normalize) {
    HTML = HTML.normalize();
  } // Parse Markdown (and encoded HTML) if:
  // * There is a plain text version.
  // * There is no HTML version, or it has no formatting.


  if (plainText && (!HTML || (0, _utils.isPlain)(HTML))) {
    HTML = (0, _markdownConverter.default)(plainText); // Switch to inline mode if:
    // * The current mode is AUTO.
    // * The original plain text had no line breaks.
    // * The original plain text was not an HTML paragraph.
    // * The converted text is just a paragraph.

    if (mode === 'AUTO' && plainText.indexOf('\n') === -1 && plainText.indexOf('<p>') !== 0 && HTML.indexOf('<p>') === 0) {
      mode = 'INLINE';
    }
  }

  if (mode === 'INLINE') {
    return filterInlineHTML(HTML);
  } // An array of HTML strings and block objects. The blocks replace matched
  // shortcodes.


  var pieces = (0, _shortcodeConverter.default)(HTML); // The call to shortcodeConverter will always return more than one element
  // if shortcodes are matched. The reason is when shortcodes are matched
  // empty HTML strings are included.

  var hasShortcodes = pieces.length > 1;

  if (mode === 'AUTO' && !hasShortcodes && (0, _isInlineContent.default)(HTML, tagName)) {
    return filterInlineHTML(HTML);
  }

  var rawTransformations = getRawTransformations();
  var phrasingContentSchema = (0, _phrasingContent.getPhrasingContentSchema)();
  var blockContentSchema = (0, _utils.getBlockContentSchema)(rawTransformations);
  var blocks = (0, _lodash.compact)((0, _lodash.flatMap)(pieces, function (piece) {
    // Already a block from shortcode.
    if (typeof piece !== 'string') {
      return piece;
    }

    var filters = [_msListConverter.default, _headRemover.default, _listReducer.default, _imageCorrector.default, _phrasingContentReducer.default, _specialCommentConverter.default, _figureContentReducer.default, _blockquoteNormaliser.default];

    if (!canUserUseUnfilteredHTML) {
      // Should run before `figureContentReducer`.
      filters.unshift(_iframeRemover.default);
    }

    var schema = (0, _objectSpread2.default)({}, blockContentSchema, phrasingContentSchema);
    piece = (0, _utils.deepFilterHTML)(piece, filters, blockContentSchema);
    piece = (0, _utils.removeInvalidHTML)(piece, schema);
    piece = (0, _normaliseBlocks.default)(piece); // Allows us to ask for this information when we get a report.

    console.log('Processed HTML piece:\n\n', piece);
    var doc = document.implementation.createHTMLDocument('');
    doc.body.innerHTML = piece;
    return Array.from(doc.body.children).map(function (node) {
      var rawTransformation = (0, _factory.findTransform)(rawTransformations, function (_ref2) {
        var isMatch = _ref2.isMatch;
        return isMatch(node);
      });

      if (!rawTransformation) {
        console.warn('A block registered a raw transformation schema for `' + node.nodeName + '` but did not match it. ' + 'Make sure there is a `selector` or `isMatch` property that can match the schema.\n' + 'Sanitized HTML: `' + node.outerHTML + '`');
        return;
      }

      var transform = rawTransformation.transform,
          blockName = rawTransformation.blockName;

      if (transform) {
        return transform(node);
      }

      return (0, _factory.createBlock)(blockName, (0, _parser.getBlockAttributes)((0, _registration.getBlockType)(blockName), node.outerHTML));
    });
  })); // If we're allowed to return inline content and there is only one block
  // and the original plain text content does not have any line breaks, then
  // treat it as inline paste.

  if (mode === 'AUTO' && blocks.length === 1) {
    var trimmedPlainText = plainText.trim();

    if (trimmedPlainText !== '' && trimmedPlainText.indexOf('\n') === -1) {
      return (0, _utils.removeInvalidHTML)((0, _serializer.getBlockContent)(blocks[0]), phrasingContentSchema);
    }
  }

  return blocks;
}
//# sourceMappingURL=index.js.map