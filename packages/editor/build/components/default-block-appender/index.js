"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultBlockAppender = DefaultBlockAppender;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _blocks = require("@wordpress/blocks");

var _htmlEntities = require("@wordpress/html-entities");

var _data = require("@wordpress/data");

var _blockDropZone = _interopRequireDefault(require("../block-drop-zone"));

var _inserterWithShortcuts = _interopRequireDefault(require("../inserter-with-shortcuts"));

var _inserter = _interopRequireDefault(require("../inserter"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DefaultBlockAppender(_ref) {
  var isLocked = _ref.isLocked,
      isVisible = _ref.isVisible,
      onAppend = _ref.onAppend,
      showPrompt = _ref.showPrompt,
      placeholder = _ref.placeholder,
      rootClientId = _ref.rootClientId;

  if (isLocked || !isVisible) {
    return null;
  }

  var value = (0, _htmlEntities.decodeEntities)(placeholder) || (0, _i18n.__)('Write your story'); // The appender "button" is in-fact a text field so as to support
  // transitions by WritingFlow occurring by arrow key press. WritingFlow
  // only supports tab transitions into text fields and to the block focus
  // boundary.
  //
  // See: https://github.com/WordPress/gutenberg/issues/4829#issuecomment-374213658
  //
  // If it were ever to be made to be a proper `button` element, it is
  // important to note that `onFocus` alone would not be sufficient to
  // capture click events, notably in Firefox.
  //
  // See: https://gist.github.com/cvrebert/68659d0333a578d75372
  // The wp-block className is important for editor styles.

  return (0, _element.createElement)("div", {
    "data-root-client-id": rootClientId || '',
    className: "wp-block editor-default-block-appender"
  }, (0, _element.createElement)(_blockDropZone.default, {
    rootClientId: rootClientId
  }), (0, _element.createElement)("input", {
    role: "button",
    "aria-label": (0, _i18n.__)('Add block'),
    className: "editor-default-block-appender__content",
    type: "text",
    readOnly: true,
    onFocus: onAppend,
    value: showPrompt ? value : ''
  }), (0, _element.createElement)(_inserterWithShortcuts.default, {
    rootClientId: rootClientId
  }), (0, _element.createElement)(_inserter.default, {
    position: "top right"
  }));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, ownProps) {
  var _select = select('core/editor'),
      getBlockCount = _select.getBlockCount,
      getBlock = _select.getBlock,
      getEditorSettings = _select.getEditorSettings,
      getTemplateLock = _select.getTemplateLock;

  var isEmpty = !getBlockCount(ownProps.rootClientId);
  var lastBlock = getBlock(ownProps.lastBlockClientId);
  var isLastBlockDefault = (0, _lodash.get)(lastBlock, ['name']) === (0, _blocks.getDefaultBlockName)();
  var isLastBlockValid = (0, _lodash.get)(lastBlock, ['isValid']);

  var _getEditorSettings = getEditorSettings(),
      bodyPlaceholder = _getEditorSettings.bodyPlaceholder;

  return {
    isVisible: isEmpty || !isLastBlockDefault || !isLastBlockValid,
    showPrompt: isEmpty,
    isLocked: !!getTemplateLock(ownProps.rootClientId),
    placeholder: bodyPlaceholder
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/editor'),
      insertDefaultBlock = _dispatch.insertDefaultBlock,
      startTyping = _dispatch.startTyping;

  return {
    onAppend: function onAppend() {
      var rootClientId = ownProps.rootClientId;
      insertDefaultBlock(undefined, rootClientId);
      startTyping();
    }
  };
}))(DefaultBlockAppender);

exports.default = _default;
//# sourceMappingURL=index.js.map