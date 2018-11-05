"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DocumentOutline = void 0;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _item = _interopRequireDefault(require("./item"));

var _richText = _interopRequireDefault(require("./../rich-text"));

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
 * Module constants
 */
var emptyHeadingContent = (0, _element.createElement)("em", null, (0, _i18n.__)('(Empty heading)'));
var incorrectLevelContent = [(0, _element.createElement)("br", {
  key: "incorrect-break"
}), (0, _element.createElement)("em", {
  key: "incorrect-message"
}, (0, _i18n.__)('(Incorrect heading level)'))];
var singleH1Headings = [(0, _element.createElement)("br", {
  key: "incorrect-break-h1"
}), (0, _element.createElement)("em", {
  key: "incorrect-message-h1"
}, (0, _i18n.__)('(Your theme may already use a H1 for the post title)'))];
var multipleH1Headings = [(0, _element.createElement)("br", {
  key: "incorrect-break-multiple-h1"
}), (0, _element.createElement)("em", {
  key: "incorrect-message-multiple-h1"
}, (0, _i18n.__)('(Multiple H1 headings are not recommended)'))];
/**
 * Returns an array of heading blocks enhanced with the following properties:
 * path    - An array of blocks that are ancestors of the heading starting from a top-level node.
 *           Can be an empty array if the heading is a top-level node (is not nested inside another block).
 * level   - An integer with the heading level.
 * isEmpty - Flag indicating if the heading has no content.
 *
 * @param {?Array} blocks An array of blocks.
 * @param {?Array} path   An array of blocks that are ancestors of the blocks passed as blocks.
 *
 * @return {Array} An array of heading blocks enhanced with the properties described above.
 */

var computeOutlineHeadings = function computeOutlineHeadings() {
  var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _lodash.flatMap)(blocks, function () {
    var block = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (block.name === 'core/heading') {
      return (0, _objectSpread2.default)({}, block, {
        path: path,
        level: block.attributes.level,
        isEmpty: isEmptyHeading(block)
      });
    }

    return computeOutlineHeadings(block.innerBlocks, (0, _toConsumableArray2.default)(path).concat([block]));
  });
};

var isEmptyHeading = function isEmptyHeading(heading) {
  return !heading.attributes.content || heading.attributes.content.length === 0;
};

var DocumentOutline = function DocumentOutline(_ref) {
  var _ref$blocks = _ref.blocks,
      blocks = _ref$blocks === void 0 ? [] : _ref$blocks,
      title = _ref.title,
      onSelect = _ref.onSelect,
      isTitleSupported = _ref.isTitleSupported;
  var headings = computeOutlineHeadings(blocks);

  if (headings.length < 1) {
    return null;
  }

  var prevHeadingLevel = 1; // Select the corresponding block in the main editor
  // when clicking on a heading item from the list.

  var onSelectHeading = function onSelectHeading(clientId) {
    return onSelect(clientId);
  };

  var focusTitle = function focusTitle() {
    // Not great but it's the simplest way to focus the title right now.
    var titleNode = document.querySelector('.editor-post-title__input');

    if (titleNode) {
      titleNode.focus();
    }
  };

  var hasTitle = isTitleSupported && title;
  var countByLevel = (0, _lodash.countBy)(headings, 'level');
  var hasMultipleH1 = countByLevel[1] > 1;
  return (0, _element.createElement)("div", {
    className: "document-outline"
  }, (0, _element.createElement)("ul", null, hasTitle && (0, _element.createElement)(_item.default, {
    level: (0, _i18n.__)('Title'),
    isValid: true,
    onClick: focusTitle
  }, title), headings.map(function (item, index) {
    // Headings remain the same, go up by one, or down by any amount.
    // Otherwise there are missing levels.
    var isIncorrectLevel = item.level > prevHeadingLevel + 1;
    var isValid = !item.isEmpty && !isIncorrectLevel && !!item.level && (item.level !== 1 || !hasMultipleH1 && !hasTitle);
    prevHeadingLevel = item.level;
    return (0, _element.createElement)(_item.default, {
      key: index,
      level: "H".concat(item.level),
      isValid: isValid,
      onClick: function onClick() {
        return onSelectHeading(item.clientId);
      },
      path: item.path
    }, item.isEmpty ? emptyHeadingContent : (0, _element.createElement)(_richText.default.Content, {
      tagName: "span",
      value: item.attributes.content
    }), isIncorrectLevel && incorrectLevelContent, item.level === 1 && hasMultipleH1 && multipleH1Headings, hasTitle && item.level === 1 && !hasMultipleH1 && singleH1Headings);
  })));
};

exports.DocumentOutline = DocumentOutline;

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getBlocks = _select.getBlocks;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  var postType = getPostType(getEditedPostAttribute('type'));
  return {
    title: getEditedPostAttribute('title'),
    blocks: getBlocks(),
    isTitleSupported: (0, _lodash.get)(postType, ['supports', 'title'], false)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      selectBlock = _dispatch.selectBlock;

  return {
    onSelect: selectBlock
  };
}))(DocumentOutline);

exports.default = _default;
//# sourceMappingURL=index.js.map