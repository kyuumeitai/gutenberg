"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHTMLString = toHTMLString;

var _escapeHtml = require("@wordpress/escape-html");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _toTree = require("./to-tree");

/**
 * Internal dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Create an HTML string from a Rich Text value. If a `multilineTag` is
 * provided, text separated by a line separator will be wrapped in it.
 *
 * @param {Object} $1                      Named argements.
 * @param {Object} $1.value                Rich text value.
 * @param {string} $1.multilineTag         Multiline tag.
 * @param {Array}  $1.multilineWrapperTags Tags where lines can be found if
 *                                         nesting is possible.
 *
 * @return {string} HTML string.
 */
function toHTMLString(_ref) {
  var value = _ref.value,
      multilineTag = _ref.multilineTag,
      multilineWrapperTags = _ref.multilineWrapperTags;

  // Check other arguments for backward compatibility.
  if (value === undefined) {
    (0, _deprecated.default)('wp.richText.toHTMLString positional parameters', {
      version: '4.4',
      alternative: 'named parameters',
      plugin: 'Gutenberg'
    });
    value = arguments[0];
    multilineTag = arguments[1];
    multilineWrapperTags = arguments[2];
  }

  var tree = (0, _toTree.toTree)({
    value: value,
    multilineTag: multilineTag,
    multilineWrapperTags: multilineWrapperTags,
    createEmpty: createEmpty,
    append: append,
    getLastChild: getLastChild,
    getParent: getParent,
    isText: isText,
    getText: getText,
    remove: remove,
    appendText: appendText
  });
  return createChildrenHTML(tree.children);
}

function createEmpty() {
  return {};
}

function getLastChild(_ref2) {
  var children = _ref2.children;
  return children && children[children.length - 1];
}

function append(parent, object) {
  if (typeof object === 'string') {
    object = {
      text: object
    };
  }

  object.parent = parent;
  parent.children = parent.children || [];
  parent.children.push(object);
  return object;
}

function appendText(object, text) {
  object.text += text;
}

function getParent(_ref3) {
  var parent = _ref3.parent;
  return parent;
}

function isText(_ref4) {
  var text = _ref4.text;
  return typeof text === 'string';
}

function getText(_ref5) {
  var text = _ref5.text;
  return text;
}

function remove(object) {
  var index = object.parent.children.indexOf(object);

  if (index !== -1) {
    object.parent.children.splice(index, 1);
  }

  return object;
}

function createElementHTML(_ref6) {
  var type = _ref6.type,
      attributes = _ref6.attributes,
      object = _ref6.object,
      children = _ref6.children;
  var attributeString = '';

  for (var key in attributes) {
    if (!(0, _escapeHtml.isValidAttributeName)(key)) {
      continue;
    }

    attributeString += " ".concat(key, "=\"").concat((0, _escapeHtml.escapeAttribute)(attributes[key]), "\"");
  }

  if (object) {
    return "<".concat(type).concat(attributeString, ">");
  }

  return "<".concat(type).concat(attributeString, ">").concat(createChildrenHTML(children), "</").concat(type, ">");
}

function createChildrenHTML() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return children.map(function (child) {
    return child.text === undefined ? createElementHTML(child) : (0, _escapeHtml.escapeHTML)(child.text);
  }).join('');
}
//# sourceMappingURL=to-html-string.js.map