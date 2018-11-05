"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _lodash = require("lodash");

var _isEmpty = require("./is-empty");

var _isFormatEqual = require("./is-format-equal");

var _createElement = require("./create-element");

var _getFormatTypes = require("./get-format-types");

var _specialCharacters = require("./special-characters");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Browser dependencies
 */
var _window$Node = window.Node,
    TEXT_NODE = _window$Node.TEXT_NODE,
    ELEMENT_NODE = _window$Node.ELEMENT_NODE;

function createEmptyValue() {
  return {
    formats: [],
    text: ''
  };
}

function simpleFindKey(object, value) {
  for (var key in object) {
    if (object[key] === value) {
      return key;
    }
  }
}

function toFormat(_ref) {
  var type = _ref.type,
      attributes = _ref.attributes;
  var formatType = (0, _lodash.find)((0, _getFormatTypes.getFormatTypes)(), function (_ref2) {
    var match = _ref2.match;
    return type === match.tagName;
  });

  if (!formatType) {
    return attributes ? {
      type: type,
      attributes: attributes
    } : {
      type: type
    };
  }

  if (!attributes) {
    return {
      type: formatType.name
    };
  }

  var registeredAttributes = {};
  var unregisteredAttributes = {};

  for (var name in attributes) {
    var key = simpleFindKey(formatType.attributes, name);

    if (key) {
      registeredAttributes[key] = attributes[name];
    } else {
      unregisteredAttributes[name] = attributes[name];
    }
  }

  return {
    type: formatType.name,
    attributes: registeredAttributes,
    unregisteredAttributes: unregisteredAttributes
  };
}
/**
 * Create a RichText value from an `Element` tree (DOM), an HTML string or a
 * plain text string, with optionally a `Range` object to set the selection. If
 * called without any input, an empty value will be created. If
 * `multilineTag` is provided, any content of direct children whose type matches
 * `multilineTag` will be separated by two newlines. The optional functions can
 * be used to filter out content.
 *
 * @param {?Object}   $1                      Optional named argements.
 * @param {?Element}  $1.element              Element to create value from.
 * @param {?string}   $1.text                 Text to create value from.
 * @param {?string}   $1.html                 HTML to create value from.
 * @param {?Range}    $1.range                Range to create value from.
 * @param {?string}   $1.multilineTag         Multiline tag if the structure is
 *                                            multiline.
 * @param {?Array}    $1.multilineWrapperTags Tags where lines can be found if
 *                                            nesting is possible.
 * @param {?Function} $1.removeNode           Function to declare whether the
 *                                            given node should be removed.
 * @param {?Function} $1.unwrapNode           Function to declare whether the
 *                                            given node should be unwrapped.
 * @param {?Function} $1.filterString         Function to filter the given
 *                                            string.
 * @param {?Function} $1.removeAttribute      Wether to remove an attribute
 *                                            based on the name.
 *
 * @return {Object} A rich text value.
 */


function create() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      element = _ref3.element,
      text = _ref3.text,
      html = _ref3.html,
      range = _ref3.range,
      multilineTag = _ref3.multilineTag,
      multilineWrapperTags = _ref3.multilineWrapperTags,
      removeNode = _ref3.removeNode,
      unwrapNode = _ref3.unwrapNode,
      filterString = _ref3.filterString,
      removeAttribute = _ref3.removeAttribute;

  if (typeof text === 'string' && text.length > 0) {
    return {
      formats: Array(text.length),
      text: text
    };
  }

  if (typeof html === 'string' && html.length > 0) {
    element = (0, _createElement.createElement)(document, html);
  }

  if ((0, _typeof2.default)(element) !== 'object') {
    return createEmptyValue();
  }

  if (!multilineTag) {
    return createFromElement({
      element: element,
      range: range,
      removeNode: removeNode,
      unwrapNode: unwrapNode,
      filterString: filterString,
      removeAttribute: removeAttribute
    });
  }

  return createFromMultilineElement({
    element: element,
    range: range,
    multilineTag: multilineTag,
    multilineWrapperTags: multilineWrapperTags,
    removeNode: removeNode,
    unwrapNode: unwrapNode,
    filterString: filterString,
    removeAttribute: removeAttribute
  });
}
/**
 * Helper to accumulate the value's selection start and end from the current
 * node and range.
 *
 * @param {Object} accumulator Object to accumulate into.
 * @param {Node}   node        Node to create value with.
 * @param {Range}  range       Range to create value with.
 * @param {Object} value       Value that is being accumulated.
 */


function accumulateSelection(accumulator, node, range, value) {
  if (!range) {
    return;
  }

  var parentNode = node.parentNode;
  var startContainer = range.startContainer,
      startOffset = range.startOffset,
      endContainer = range.endContainer,
      endOffset = range.endOffset;
  var currentLength = accumulator.text.length; // Selection can be extracted from value.

  if (value.start !== undefined) {
    accumulator.start = currentLength + value.start; // Range indicates that the current node has selection.
  } else if (node === startContainer && node.nodeType === TEXT_NODE) {
    accumulator.start = currentLength + startOffset; // Range indicates that the current node is selected.
  } else if (parentNode === startContainer && node === startContainer.childNodes[startOffset]) {
    accumulator.start = currentLength; // Range indicates that the selection is after the current node.
  } else if (parentNode === startContainer && node === startContainer.childNodes[startOffset - 1]) {
    accumulator.start = currentLength + value.text.length; // Fallback if no child inside handled the selection.
  } else if (node === startContainer) {
    accumulator.start = currentLength;
  } // Selection can be extracted from value.


  if (value.end !== undefined) {
    accumulator.end = currentLength + value.end; // Range indicates that the current node has selection.
  } else if (node === endContainer && node.nodeType === TEXT_NODE) {
    accumulator.end = currentLength + endOffset; // Range indicates that the current node is selected.
  } else if (parentNode === endContainer && node === endContainer.childNodes[endOffset - 1]) {
    accumulator.end = currentLength + value.text.length; // Range indicates that the selection is before the current node.
  } else if (parentNode === endContainer && node === endContainer.childNodes[endOffset]) {
    accumulator.end = currentLength; // Fallback if no child inside handled the selection.
  } else if (node === endContainer) {
    accumulator.end = currentLength + endOffset;
  }
}
/**
 * Adjusts the start and end offsets from a range based on a text filter.
 *
 * @param {Node}     node   Node of which the text should be filtered.
 * @param {Range}    range  The range to filter.
 * @param {Function} filter Function to use to filter the text.
 *
 * @return {?Object} Object containing range properties.
 */


function filterRange(node, range, filter) {
  if (!range) {
    return;
  }

  var startContainer = range.startContainer,
      endContainer = range.endContainer;
  var startOffset = range.startOffset,
      endOffset = range.endOffset;

  if (node === startContainer) {
    startOffset = filter(node.nodeValue.slice(0, startOffset)).length;
  }

  if (node === endContainer) {
    endOffset = filter(node.nodeValue.slice(0, endOffset)).length;
  }

  return {
    startContainer: startContainer,
    startOffset: startOffset,
    endContainer: endContainer,
    endOffset: endOffset
  };
}
/**
 * Creates a Rich Text value from a DOM element and range.
 *
 * @param {Object}    $1                      Named argements.
 * @param {?Element}  $1.element              Element to create value from.
 * @param {?Range}    $1.range                Range to create value from.
 * @param {?string}   $1.multilineTag         Multiline tag if the structure is
 *                                            multiline.
 * @param {?Array}    $1.multilineWrapperTags Tags where lines can be found if
 *                                            nesting is possible.
 * @param {?Function} $1.removeNode           Function to declare whether the
 *                                            given node should be removed.
 * @param {?Function} $1.unwrapNode           Function to declare whether the
 *                                            given node should be unwrapped.
 * @param {?Function} $1.filterString         Function to filter the given
 *                                            string.
 * @param {?Function} $1.removeAttribute      Wether to remove an attribute
 *                                            based on the name.
 *
 * @return {Object} A rich text value.
 */


function createFromElement(_ref4) {
  var element = _ref4.element,
      range = _ref4.range,
      multilineTag = _ref4.multilineTag,
      multilineWrapperTags = _ref4.multilineWrapperTags,
      _ref4$currentWrapperT = _ref4.currentWrapperTags,
      currentWrapperTags = _ref4$currentWrapperT === void 0 ? [] : _ref4$currentWrapperT,
      removeNode = _ref4.removeNode,
      unwrapNode = _ref4.unwrapNode,
      filterString = _ref4.filterString,
      removeAttribute = _ref4.removeAttribute;
  var accumulator = createEmptyValue();

  if (!element) {
    return accumulator;
  }

  if (!element.hasChildNodes()) {
    accumulateSelection(accumulator, element, range, createEmptyValue());
    return accumulator;
  }

  var length = element.childNodes.length; // Remove any line breaks in text nodes. They are not content, but used to
  // format the HTML. Line breaks in HTML are stored as BR elements.
  // See https://www.w3.org/TR/html5/syntax.html#newlines.

  var filterStringComplete = function filterStringComplete(string) {
    string = string.replace(/[\r\n]/g, '');

    if (filterString) {
      string = filterString(string);
    }

    return string;
  }; // Optimise for speed.


  for (var index = 0; index < length; index++) {
    var node = element.childNodes[index];
    var type = node.nodeName.toLowerCase();

    if (node.nodeType === TEXT_NODE) {
      var _text = filterStringComplete(node.nodeValue);

      range = filterRange(node, range, filterStringComplete);
      accumulateSelection(accumulator, node, range, {
        text: _text
      });
      accumulator.text += _text; // Create a sparse array of the same length as `text`, in which
      // formats can be added.

      accumulator.formats.length += _text.length;
      continue;
    }

    if (node.nodeType !== ELEMENT_NODE) {
      continue;
    }

    if (removeNode && removeNode(node) || unwrapNode && unwrapNode(node) && !node.hasChildNodes()) {
      accumulateSelection(accumulator, node, range, createEmptyValue());
      continue;
    }

    if (type === 'br') {
      accumulateSelection(accumulator, node, range, createEmptyValue());
      accumulator.text += '\n';
      accumulator.formats.length += 1;
      continue;
    }

    var lastFormats = accumulator.formats[accumulator.formats.length - 1];
    var lastFormat = lastFormats && lastFormats[lastFormats.length - 1];
    var format = void 0;
    var value = void 0;

    if (!unwrapNode || !unwrapNode(node)) {
      var newFormat = toFormat({
        type: type,
        attributes: getAttributes({
          element: node,
          removeAttribute: removeAttribute
        })
      }); // Reuse the last format if it's equal.

      if ((0, _isFormatEqual.isFormatEqual)(newFormat, lastFormat)) {
        format = lastFormat;
      } else {
        format = newFormat;
      }
    }

    if (multilineWrapperTags && multilineWrapperTags.indexOf(type) !== -1) {
      value = createFromMultilineElement({
        element: node,
        range: range,
        multilineTag: multilineTag,
        multilineWrapperTags: multilineWrapperTags,
        removeNode: removeNode,
        unwrapNode: unwrapNode,
        filterString: filterString,
        removeAttribute: removeAttribute,
        currentWrapperTags: (0, _toConsumableArray2.default)(currentWrapperTags).concat([format])
      });
      format = undefined;
    } else {
      value = createFromElement({
        element: node,
        range: range,
        multilineTag: multilineTag,
        multilineWrapperTags: multilineWrapperTags,
        removeNode: removeNode,
        unwrapNode: unwrapNode,
        filterString: filterString,
        removeAttribute: removeAttribute
      });
    }

    var text = value.text;
    var start = accumulator.text.length;
    accumulateSelection(accumulator, node, range, value); // Don't apply the element as formatting if it has no content.

    if ((0, _isEmpty.isEmpty)(value) && format && !format.attributes) {
      continue;
    }

    var formats = accumulator.formats;

    if (format && format.attributes && text.length === 0) {
      format.object = true;
      accumulator.text += _specialCharacters.OBJECT_REPLACEMENT_CHARACTER;

      if (formats[start]) {
        formats[start].unshift(format);
      } else {
        formats[start] = [format];
      }
    } else {
      accumulator.text += text;
      accumulator.formats.length += text.length;
      var i = value.formats.length; // Optimise for speed.

      while (i--) {
        var formatIndex = start + i;

        if (format) {
          if (formats[formatIndex]) {
            formats[formatIndex].push(format);
          } else {
            formats[formatIndex] = [format];
          }
        }

        if (value.formats[i]) {
          if (formats[formatIndex]) {
            var _formats$formatIndex;

            (_formats$formatIndex = formats[formatIndex]).push.apply(_formats$formatIndex, (0, _toConsumableArray2.default)(value.formats[i]));
          } else {
            formats[formatIndex] = value.formats[i];
          }
        }
      }
    }
  }

  return accumulator;
}
/**
 * Creates a rich text value from a DOM element and range that should be
 * multiline.
 *
 * @param {Object}    $1                      Named argements.
 * @param {?Element}  $1.element              Element to create value from.
 * @param {?Range}    $1.range                Range to create value from.
 * @param {?string}   $1.multilineTag         Multiline tag if the structure is
 *                                            multiline.
 * @param {?Array}    $1.multilineWrapperTags Tags where lines can be found if
 *                                            nesting is possible.
 * @param {?Function} $1.removeNode           Function to declare whether the
 *                                            given node should be removed.
 * @param {?Function} $1.unwrapNode           Function to declare whether the
 *                                            given node should be unwrapped.
 * @param {?Function} $1.filterString         Function to filter the given
 *                                            string.
 * @param {?Function} $1.removeAttribute      Wether to remove an attribute
 *                                            based on the name.
 * @param {boolean}   $1.currentWrapperTags   Whether to prepend a line
 *                                            separator.
 *
 * @return {Object} A rich text value.
 */


function createFromMultilineElement(_ref5) {
  var element = _ref5.element,
      range = _ref5.range,
      multilineTag = _ref5.multilineTag,
      multilineWrapperTags = _ref5.multilineWrapperTags,
      removeNode = _ref5.removeNode,
      unwrapNode = _ref5.unwrapNode,
      filterString = _ref5.filterString,
      removeAttribute = _ref5.removeAttribute,
      _ref5$currentWrapperT = _ref5.currentWrapperTags,
      currentWrapperTags = _ref5$currentWrapperT === void 0 ? [] : _ref5$currentWrapperT;
  var accumulator = createEmptyValue();

  if (!element || !element.hasChildNodes()) {
    return accumulator;
  }

  var length = element.children.length; // Optimise for speed.

  for (var index = 0; index < length; index++) {
    var node = element.children[index];

    if (node.nodeName.toLowerCase() !== multilineTag) {
      continue;
    }

    var value = createFromElement({
      element: node,
      range: range,
      multilineTag: multilineTag,
      multilineWrapperTags: multilineWrapperTags,
      currentWrapperTags: currentWrapperTags,
      removeNode: removeNode,
      unwrapNode: unwrapNode,
      filterString: filterString,
      removeAttribute: removeAttribute
    }); // If a line consists of one single line break (invisible), consider the
    // line empty, wether this is the browser's doing or not.

    if (value.text === '\n') {
      var start = value.start;
      var end = value.end;
      value = createEmptyValue();

      if (start !== undefined) {
        value.start = 0;
      }

      if (end !== undefined) {
        value.end = 0;
      }
    } // Multiline value text should be separated by a double line break.


    if (index !== 0 || currentWrapperTags.length > 0) {
      var formats = currentWrapperTags.length > 0 ? [currentWrapperTags] : [,];
      accumulator.formats = accumulator.formats.concat(formats);
      accumulator.text += _specialCharacters.LINE_SEPARATOR;
    }

    accumulateSelection(accumulator, node, range, value);
    accumulator.formats = accumulator.formats.concat(value.formats);
    accumulator.text += value.text;
  }

  return accumulator;
}
/**
 * Gets the attributes of an element in object shape.
 *
 * @param {Object}    $1                 Named argements.
 * @param {Element}   $1.element         Element to get attributes from.
 * @param {?Function} $1.removeAttribute Wether to remove an attribute based on
 *                                       the name.
 *
 * @return {?Object} Attribute object or `undefined` if the element has no
 *                   attributes.
 */


function getAttributes(_ref6) {
  var element = _ref6.element,
      removeAttribute = _ref6.removeAttribute;

  if (!element.hasAttributes()) {
    return;
  }

  var length = element.attributes.length;
  var accumulator; // Optimise for speed.

  for (var i = 0; i < length; i++) {
    var _element$attributes$i = element.attributes[i],
        name = _element$attributes$i.name,
        value = _element$attributes$i.value;

    if (removeAttribute && removeAttribute(name)) {
      continue;
    }

    accumulator = accumulator || {};
    accumulator[name] = value;
  }

  return accumulator;
}
//# sourceMappingURL=create.js.map