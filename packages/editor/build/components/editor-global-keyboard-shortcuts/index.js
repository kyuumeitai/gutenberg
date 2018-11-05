"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.shortcuts = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _keycodes = require("@wordpress/keycodes");

var _compose = require("@wordpress/compose");

var _blockActions = _interopRequireDefault(require("../block-actions"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var preventDefault = function preventDefault(event) {
  event.preventDefault();
  return event;
};

var shortcuts = {
  duplicate: {
    raw: _keycodes.rawShortcut.primaryShift('d'),
    display: _keycodes.displayShortcut.primaryShift('d')
  },
  removeBlock: {
    raw: _keycodes.rawShortcut.access('z'),
    display: _keycodes.displayShortcut.access('z')
  },
  insertBefore: {
    raw: _keycodes.rawShortcut.primaryAlt('t'),
    display: _keycodes.displayShortcut.primaryAlt('t')
  },
  insertAfter: {
    raw: _keycodes.rawShortcut.primaryAlt('y'),
    display: _keycodes.displayShortcut.primaryAlt('y')
  }
};
exports.shortcuts = shortcuts;

var EditorGlobalKeyboardShortcuts =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(EditorGlobalKeyboardShortcuts, _Component);

  function EditorGlobalKeyboardShortcuts() {
    var _this;

    (0, _classCallCheck2.default)(this, EditorGlobalKeyboardShortcuts);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EditorGlobalKeyboardShortcuts).apply(this, arguments));
    _this.selectAll = _this.selectAll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.undoOrRedo = _this.undoOrRedo.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.save = _this.save.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.deleteSelectedBlocks = _this.deleteSelectedBlocks.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearMultiSelection = _this.clearMultiSelection.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(EditorGlobalKeyboardShortcuts, [{
    key: "selectAll",
    value: function selectAll(event) {
      var _this$props = this.props,
          rootBlocksClientIds = _this$props.rootBlocksClientIds,
          onMultiSelect = _this$props.onMultiSelect;
      event.preventDefault();
      onMultiSelect((0, _lodash.first)(rootBlocksClientIds), (0, _lodash.last)(rootBlocksClientIds));
    }
  }, {
    key: "undoOrRedo",
    value: function undoOrRedo(event) {
      var _this$props2 = this.props,
          onRedo = _this$props2.onRedo,
          onUndo = _this$props2.onUndo;

      if (event.shiftKey) {
        onRedo();
      } else {
        onUndo();
      }

      event.preventDefault();
    }
  }, {
    key: "save",
    value: function save(event) {
      event.preventDefault();
      this.props.onSave();
    }
  }, {
    key: "deleteSelectedBlocks",
    value: function deleteSelectedBlocks(event) {
      var _this$props3 = this.props,
          selectedBlockClientIds = _this$props3.selectedBlockClientIds,
          hasMultiSelection = _this$props3.hasMultiSelection,
          onRemove = _this$props3.onRemove,
          isLocked = _this$props3.isLocked;

      if (hasMultiSelection) {
        event.preventDefault();

        if (!isLocked) {
          onRemove(selectedBlockClientIds);
        }
      }
    }
    /**
     * Clears current multi-selection, if one exists.
     */

  }, {
    key: "clearMultiSelection",
    value: function clearMultiSelection() {
      var _this$props4 = this.props,
          hasMultiSelection = _this$props4.hasMultiSelection,
          clearSelectedBlock = _this$props4.clearSelectedBlock;

      if (hasMultiSelection) {
        clearSelectedBlock();
        window.getSelection().removeAllRanges();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _ref;

      var selectedBlockClientIds = this.props.selectedBlockClientIds;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.KeyboardShortcuts, {
        shortcuts: (_ref = {}, (0, _defineProperty2.default)(_ref, _keycodes.rawShortcut.primary('a'), this.selectAll), (0, _defineProperty2.default)(_ref, _keycodes.rawShortcut.primary('z'), this.undoOrRedo), (0, _defineProperty2.default)(_ref, _keycodes.rawShortcut.primaryShift('z'), this.undoOrRedo), (0, _defineProperty2.default)(_ref, "backspace", this.deleteSelectedBlocks), (0, _defineProperty2.default)(_ref, "del", this.deleteSelectedBlocks), (0, _defineProperty2.default)(_ref, "escape", this.clearMultiSelection), _ref)
      }), (0, _element.createElement)(_components.KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: (0, _defineProperty2.default)({}, _keycodes.rawShortcut.primary('s'), this.save)
      }), selectedBlockClientIds.length > 0 && (0, _element.createElement)(_blockActions.default, {
        clientIds: selectedBlockClientIds
      }, function (_ref3) {
        var _ref4;

        var onDuplicate = _ref3.onDuplicate,
            onRemove = _ref3.onRemove,
            onInsertAfter = _ref3.onInsertAfter,
            onInsertBefore = _ref3.onInsertBefore;
        return (0, _element.createElement)(_components.KeyboardShortcuts, {
          bindGlobal: true,
          shortcuts: (_ref4 = {}, (0, _defineProperty2.default)(_ref4, shortcuts.duplicate.raw, (0, _lodash.flow)(preventDefault, onDuplicate)), (0, _defineProperty2.default)(_ref4, shortcuts.removeBlock.raw, (0, _lodash.flow)(preventDefault, onRemove)), (0, _defineProperty2.default)(_ref4, shortcuts.insertBefore.raw, (0, _lodash.flow)(preventDefault, onInsertBefore)), (0, _defineProperty2.default)(_ref4, shortcuts.insertAfter.raw, (0, _lodash.flow)(preventDefault, onInsertAfter)), _ref4)
        });
      }));
    }
  }]);
  return EditorGlobalKeyboardShortcuts;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getBlockOrder = _select.getBlockOrder,
      getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
      hasMultiSelection = _select.hasMultiSelection,
      isEditedPostDirty = _select.isEditedPostDirty,
      getBlockRootClientId = _select.getBlockRootClientId,
      getTemplateLock = _select.getTemplateLock,
      getSelectedBlock = _select.getSelectedBlock;

  var block = getSelectedBlock();
  var selectedBlockClientIds = block ? [block.clientId] : getMultiSelectedBlockClientIds();
  return {
    rootBlocksClientIds: getBlockOrder(),
    hasMultiSelection: hasMultiSelection(),
    isLocked: (0, _lodash.some)(selectedBlockClientIds, function (clientId) {
      return !!getTemplateLock(getBlockRootClientId(clientId));
    }),
    isDirty: isEditedPostDirty(),
    selectedBlockClientIds: selectedBlockClientIds
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/editor'),
      clearSelectedBlock = _dispatch.clearSelectedBlock,
      multiSelect = _dispatch.multiSelect,
      redo = _dispatch.redo,
      undo = _dispatch.undo,
      removeBlocks = _dispatch.removeBlocks,
      savePost = _dispatch.savePost;

  return {
    onSave: function onSave() {
      // TODO: This should be handled in the `savePost` effect in
      // considering `isSaveable`. See note on `isEditedPostSaveable`
      // selector about dirtiness and meta-boxes. When removing, also
      // remember to remove `isDirty` prop passing from `withSelect`.
      //
      // See: `isEditedPostSaveable`
      if (!ownProps.isDirty) {
        return;
      }

      savePost();
    },
    clearSelectedBlock: clearSelectedBlock,
    onMultiSelect: multiSelect,
    onRedo: redo,
    onUndo: undo,
    onRemove: removeBlocks
  };
})])(EditorGlobalKeyboardShortcuts);

exports.default = _default;
//# sourceMappingURL=index.js.map