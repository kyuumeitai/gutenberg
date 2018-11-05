import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { first, last, some, flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { KeyboardShortcuts } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockActions from '../block-actions';

var preventDefault = function preventDefault(event) {
  event.preventDefault();
  return event;
};

export var shortcuts = {
  duplicate: {
    raw: rawShortcut.primaryShift('d'),
    display: displayShortcut.primaryShift('d')
  },
  removeBlock: {
    raw: rawShortcut.access('z'),
    display: displayShortcut.access('z')
  },
  insertBefore: {
    raw: rawShortcut.primaryAlt('t'),
    display: displayShortcut.primaryAlt('t')
  },
  insertAfter: {
    raw: rawShortcut.primaryAlt('y'),
    display: displayShortcut.primaryAlt('y')
  }
};

var EditorGlobalKeyboardShortcuts =
/*#__PURE__*/
function (_Component) {
  _inherits(EditorGlobalKeyboardShortcuts, _Component);

  function EditorGlobalKeyboardShortcuts() {
    var _this;

    _classCallCheck(this, EditorGlobalKeyboardShortcuts);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditorGlobalKeyboardShortcuts).apply(this, arguments));
    _this.selectAll = _this.selectAll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.undoOrRedo = _this.undoOrRedo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.save = _this.save.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.deleteSelectedBlocks = _this.deleteSelectedBlocks.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearMultiSelection = _this.clearMultiSelection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(EditorGlobalKeyboardShortcuts, [{
    key: "selectAll",
    value: function selectAll(event) {
      var _this$props = this.props,
          rootBlocksClientIds = _this$props.rootBlocksClientIds,
          onMultiSelect = _this$props.onMultiSelect;
      event.preventDefault();
      onMultiSelect(first(rootBlocksClientIds), last(rootBlocksClientIds));
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
      return createElement(Fragment, null, createElement(KeyboardShortcuts, {
        shortcuts: (_ref = {}, _defineProperty(_ref, rawShortcut.primary('a'), this.selectAll), _defineProperty(_ref, rawShortcut.primary('z'), this.undoOrRedo), _defineProperty(_ref, rawShortcut.primaryShift('z'), this.undoOrRedo), _defineProperty(_ref, "backspace", this.deleteSelectedBlocks), _defineProperty(_ref, "del", this.deleteSelectedBlocks), _defineProperty(_ref, "escape", this.clearMultiSelection), _ref)
      }), createElement(KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: _defineProperty({}, rawShortcut.primary('s'), this.save)
      }), selectedBlockClientIds.length > 0 && createElement(BlockActions, {
        clientIds: selectedBlockClientIds
      }, function (_ref3) {
        var _ref4;

        var onDuplicate = _ref3.onDuplicate,
            onRemove = _ref3.onRemove,
            onInsertAfter = _ref3.onInsertAfter,
            onInsertBefore = _ref3.onInsertBefore;
        return createElement(KeyboardShortcuts, {
          bindGlobal: true,
          shortcuts: (_ref4 = {}, _defineProperty(_ref4, shortcuts.duplicate.raw, flow(preventDefault, onDuplicate)), _defineProperty(_ref4, shortcuts.removeBlock.raw, flow(preventDefault, onRemove)), _defineProperty(_ref4, shortcuts.insertBefore.raw, flow(preventDefault, onInsertBefore)), _defineProperty(_ref4, shortcuts.insertAfter.raw, flow(preventDefault, onInsertAfter)), _ref4)
        });
      }));
    }
  }]);

  return EditorGlobalKeyboardShortcuts;
}(Component);

export default compose([withSelect(function (select) {
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
    isLocked: some(selectedBlockClientIds, function (clientId) {
      return !!getTemplateLock(getBlockRootClientId(clientId));
    }),
    isDirty: isEditedPostDirty(),
    selectedBlockClientIds: selectedBlockClientIds
  };
}), withDispatch(function (dispatch, ownProps) {
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
//# sourceMappingURL=index.js.map