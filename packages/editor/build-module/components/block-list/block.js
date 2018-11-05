import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import classnames from 'classnames';
import { get, reduce, size, first, last } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { focus, isTextField, placeCaretAtHorizontalEdge, placeCaretAtVerticalEdge } from '@wordpress/dom';
import { BACKSPACE, DELETE, ENTER } from '@wordpress/keycodes';
import { getBlockType, getSaveElement, isReusableBlock, isUnmodifiedDefaultBlock, getUnregisteredTypeHandlerName } from '@wordpress/blocks';
import { withFilters } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { withDispatch, withSelect } from '@wordpress/data';
import { withViewportMatch } from '@wordpress/viewport';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockEdit from '../block-edit';
import BlockMover from '../block-mover';
import BlockDropZone from '../block-drop-zone';
import BlockInvalidWarning from './block-invalid-warning';
import BlockCrashWarning from './block-crash-warning';
import BlockCrashBoundary from './block-crash-boundary';
import BlockHtml from './block-html';
import BlockBreadcrumb from './breadcrumb';
import BlockContextualToolbar from './block-contextual-toolbar';
import BlockMultiControls from './multi-controls';
import BlockMobileToolbar from './block-mobile-toolbar';
import BlockInsertionPoint from './insertion-point';
import IgnoreNestedEvents from '../ignore-nested-events';
import InserterWithShortcuts from '../inserter-with-shortcuts';
import Inserter from '../inserter';
import withHoverAreas from './with-hover-areas';
import { isInsideRootBlock } from '../../utils/dom';
export var BlockListBlock =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockListBlock, _Component);

  function BlockListBlock() {
    var _this;

    _classCallCheck(this, BlockListBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockListBlock).apply(this, arguments));
    _this.setBlockListRef = _this.setBlockListRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindBlockNode = _this.bindBlockNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setAttributes = _this.setAttributes.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.maybeHover = _this.maybeHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.hideHoverEffects = _this.hideHoverEffects.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.mergeBlocks = _this.mergeBlocks.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.insertBlocksAfter = _this.insertBlocksAfter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.preventDrag = _this.preventDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPointerDown = _this.onPointerDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.deleteOrInsertAfterWrapper = _this.deleteOrInsertAfterWrapper.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBlockError = _this.onBlockError.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTouchStart = _this.onTouchStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.selectOnOpen = _this.selectOnOpen.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.hadTouchStart = false;
    _this.state = {
      error: null,
      dragging: false,
      isHovered: false
    };
    return _this;
  }

  _createClass(BlockListBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isSelected) {
        this.focusTabbable();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isTypingWithinBlock || this.props.isSelected) {
        this.hideHoverEffects();
      }

      if (this.props.isSelected && !prevProps.isSelected) {
        this.focusTabbable(true);
      } // When triggering a multi-selection,
      // move the focus to the wrapper of the first selected block.


      if (this.props.isFirstMultiSelected && !prevProps.isFirstMultiSelected) {
        this.wrapperNode.focus();
      }
    }
  }, {
    key: "setBlockListRef",
    value: function setBlockListRef(node) {
      this.wrapperNode = node;
      this.props.blockRef(node, this.props.clientId);
    }
  }, {
    key: "bindBlockNode",
    value: function bindBlockNode(node) {
      this.node = node;
    }
    /**
     * When a block becomes selected, transition focus to an inner tabbable.
     *
     * @param {boolean} ignoreInnerBlocks Should not focus inner blocks.
     */

  }, {
    key: "focusTabbable",
    value: function focusTabbable(ignoreInnerBlocks) {
      var _this2 = this;

      var initialPosition = this.props.initialPosition; // Focus is captured by the wrapper node, so while focus transition
      // should only consider tabbables within editable display, since it
      // may be the wrapper itself or a side control which triggered the
      // focus event, don't unnecessary transition to an inner tabbable.

      if (this.wrapperNode.contains(document.activeElement)) {
        return;
      } // Find all tabbables within node.


      var textInputs = focus.tabbable.find(this.node).filter(isTextField) // Exclude inner blocks
      .filter(function (node) {
        return !ignoreInnerBlocks || isInsideRootBlock(_this2.node, node);
      }); // If reversed (e.g. merge via backspace), use the last in the set of
      // tabbables.

      var isReverse = -1 === initialPosition;
      var target = (isReverse ? last : first)(textInputs);

      if (!target) {
        this.wrapperNode.focus();
        return;
      }

      target.focus(); // In reverse case, need to explicitly place caret position.

      if (isReverse) {
        placeCaretAtHorizontalEdge(target, true);
        placeCaretAtVerticalEdge(target, true);
      }
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      var _this$props = this.props,
          block = _this$props.block,
          onChange = _this$props.onChange;
      var type = getBlockType(block.name);
      onChange(block.clientId, attributes);
      var metaAttributes = reduce(attributes, function (result, value, key) {
        if (get(type, ['attributes', key, 'source']) === 'meta') {
          result[type.attributes[key].meta] = value;
        }

        return result;
      }, {});

      if (size(metaAttributes)) {
        this.props.onMetaChange(_objectSpread({}, this.props.meta, metaAttributes));
      }
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart() {
      // Detect touchstart to disable hover on iOS
      this.hadTouchStart = true;
    }
  }, {
    key: "onClick",
    value: function onClick() {
      // Clear touchstart detection
      // Browser will try to emulate mouse events also see https://www.html5rocks.com/en/mobile/touchandmouse/
      this.hadTouchStart = false;
    }
    /**
     * A mouseover event handler to apply hover effect when a pointer device is
     * placed within the bounds of the block. The mouseover event is preferred
     * over mouseenter because it may be the case that a previous mouseenter
     * event was blocked from being handled by a IgnoreNestedEvents component,
     * therefore transitioning out of a nested block to the bounds of the block
     * would otherwise not trigger a hover effect.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter
     */

  }, {
    key: "maybeHover",
    value: function maybeHover() {
      var _this$props2 = this.props,
          isPartOfMultiSelection = _this$props2.isPartOfMultiSelection,
          isSelected = _this$props2.isSelected;
      var isHovered = this.state.isHovered;

      if (isHovered || isPartOfMultiSelection || isSelected || this.props.isMultiSelecting || this.hadTouchStart) {
        return;
      }

      this.setState({
        isHovered: true
      });
    }
    /**
     * Sets the block state as unhovered if currently hovering. There are cases
     * where mouseleave may occur but the block is not hovered (multi-select),
     * so to avoid unnecesary renders, the state is only set if hovered.
     */

  }, {
    key: "hideHoverEffects",
    value: function hideHoverEffects() {
      if (this.state.isHovered) {
        this.setState({
          isHovered: false
        });
      }
    }
  }, {
    key: "mergeBlocks",
    value: function mergeBlocks() {
      var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props3 = this.props,
          block = _this$props3.block,
          previousBlockClientId = _this$props3.previousBlockClientId,
          nextBlockClientId = _this$props3.nextBlockClientId,
          onMerge = _this$props3.onMerge; // Do nothing when it's the first block.

      if (!forward && !previousBlockClientId || forward && !nextBlockClientId) {
        return;
      }

      if (forward) {
        onMerge(block.clientId, nextBlockClientId);
      } else {
        onMerge(previousBlockClientId, block.clientId);
      }
    }
  }, {
    key: "insertBlocksAfter",
    value: function insertBlocksAfter(blocks) {
      this.props.onInsertBlocks(blocks, this.props.order + 1);
    }
    /**
     * Marks the block as selected when focused and not already selected. This
     * specifically handles the case where block does not set focus on its own
     * (via `setFocus`), typically if there is no focusable input in the block.
     *
     * @return {void}
     */

  }, {
    key: "onFocus",
    value: function onFocus() {
      if (!this.props.isSelected && !this.props.isPartOfMultiSelection) {
        this.props.onSelect();
      }
    }
    /**
     * Prevents default dragging behavior within a block to allow for multi-
     * selection to take effect unhampered.
     *
     * @param {DragEvent} event Drag event.
     *
     * @return {void}
     */

  }, {
    key: "preventDrag",
    value: function preventDrag(event) {
      event.preventDefault();
    }
    /**
     * Begins tracking cursor multi-selection when clicking down within block.
     *
     * @param {MouseEvent} event A mousedown event.
     *
     * @return {void}
     */

  }, {
    key: "onPointerDown",
    value: function onPointerDown(event) {
      // Not the main button.
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
      if (event.button !== 0) {
        return;
      }

      if (event.shiftKey) {
        if (!this.props.isSelected) {
          this.props.onShiftSelection(this.props.clientId);
          event.preventDefault();
        }
      } else {
        this.props.onSelectionStart(this.props.clientId); // Allow user to escape out of a multi-selection to a singular
        // selection of a block via click. This is handled here since
        // onFocus excludes blocks involved in a multiselection, as
        // focus can be incurred by starting a multiselection (focus
        // moved to first block's multi-controls).

        if (this.props.isPartOfMultiSelection) {
          this.props.onSelect();
        }
      }
    }
    /**
     * Interprets keydown event intent to remove or insert after block if key
     * event occurs on wrapper node. This can occur when the block has no text
     * fields of its own, particularly after initial insertion, to allow for
     * easy deletion and continuous writing flow to add additional content.
     *
     * @param {KeyboardEvent} event Keydown event.
     */

  }, {
    key: "deleteOrInsertAfterWrapper",
    value: function deleteOrInsertAfterWrapper(event) {
      var keyCode = event.keyCode,
          target = event.target;

      if (!this.props.isSelected || target !== this.wrapperNode || this.props.isLocked) {
        return;
      }

      switch (keyCode) {
        case ENTER:
          // Insert default block after current block if enter and event
          // not already handled by descendant.
          this.props.onInsertDefaultBlockAfter();
          event.preventDefault();
          break;

        case BACKSPACE:
        case DELETE:
          // Remove block on backspace.
          var _this$props4 = this.props,
              clientId = _this$props4.clientId,
              onRemove = _this$props4.onRemove;
          onRemove(clientId);
          event.preventDefault();
          break;
      }
    }
  }, {
    key: "onBlockError",
    value: function onBlockError(error) {
      this.setState({
        error: error
      });
    }
  }, {
    key: "onDragStart",
    value: function onDragStart() {
      this.setState({
        dragging: true
      });
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd() {
      this.setState({
        dragging: false
      });
    }
  }, {
    key: "selectOnOpen",
    value: function selectOnOpen(open) {
      if (open && !this.props.isSelected) {
        this.props.onSelect();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          block = _this$props5.block,
          order = _this$props5.order,
          mode = _this$props5.mode,
          isFocusMode = _this$props5.isFocusMode,
          hasFixedToolbar = _this$props5.hasFixedToolbar,
          isLocked = _this$props5.isLocked,
          isFirst = _this$props5.isFirst,
          isLast = _this$props5.isLast,
          clientId = _this$props5.clientId,
          rootClientId = _this$props5.rootClientId,
          isSelected = _this$props5.isSelected,
          isPartOfMultiSelection = _this$props5.isPartOfMultiSelection,
          isFirstMultiSelected = _this$props5.isFirstMultiSelected,
          isTypingWithinBlock = _this$props5.isTypingWithinBlock,
          isCaretWithinFormattedText = _this$props5.isCaretWithinFormattedText,
          isMultiSelecting = _this$props5.isMultiSelecting,
          hoverArea = _this$props5.hoverArea,
          isEmptyDefaultBlock = _this$props5.isEmptyDefaultBlock,
          isMovable = _this$props5.isMovable,
          isPreviousBlockADefaultEmptyBlock = _this$props5.isPreviousBlockADefaultEmptyBlock,
          isParentOfSelectedBlock = _this$props5.isParentOfSelectedBlock,
          isDraggable = _this$props5.isDraggable;
      var isHovered = this.state.isHovered && !isMultiSelecting;
      var blockName = block.name,
          isValid = block.isValid;
      var blockType = getBlockType(blockName); // translators: %s: Type of block (i.e. Text, Image etc)

      var blockLabel = sprintf(__('Block: %s'), blockType.title); // The block as rendered in the editor is composed of general block UI
      // (mover, toolbar, wrapper) and the display of the block content.

      var isUnregisteredBlock = block.name === getUnregisteredTypeHandlerName(); // If the block is selected and we're typing the block should not appear.
      // Empty paragraph blocks should always show up as unselected.

      var showEmptyBlockSideInserter = (isSelected || isHovered) && isEmptyDefaultBlock && isValid;
      var showSideInserter = (isSelected || isHovered) && isEmptyDefaultBlock;
      var shouldAppearSelected = !isFocusMode && !hasFixedToolbar && !showSideInserter && isSelected && !isTypingWithinBlock;
      var shouldAppearHovered = !isFocusMode && !hasFixedToolbar && isHovered && !isEmptyDefaultBlock; // We render block movers and block settings to keep them tabbale even if hidden

      var shouldRenderMovers = !isFocusMode && (isSelected || hoverArea === 'left') && !showEmptyBlockSideInserter && !isMultiSelecting && !isPartOfMultiSelection && !isTypingWithinBlock;
      var shouldShowBreadcrumb = !isFocusMode && isHovered && !isEmptyDefaultBlock;
      var shouldShowContextualToolbar = !hasFixedToolbar && !showSideInserter && (isSelected && (!isTypingWithinBlock || isCaretWithinFormattedText) || isFirstMultiSelected);
      var shouldShowMobileToolbar = shouldAppearSelected;
      var _this$state = this.state,
          error = _this$state.error,
          dragging = _this$state.dragging; // Insertion point can only be made visible if the block is at the
      // the extent of a multi-selection, or not in a multi-selection.

      var shouldShowInsertionPoint = isPartOfMultiSelection && isFirstMultiSelected || !isPartOfMultiSelection;
      var canShowInBetweenInserter = !isEmptyDefaultBlock && !isPreviousBlockADefaultEmptyBlock; // The wp-block className is important for editor styles.
      // Generate the wrapper class names handling the different states of the block.

      var wrapperClassName = classnames('wp-block editor-block-list__block', {
        'has-warning': !isValid || !!error || isUnregisteredBlock,
        'is-selected': shouldAppearSelected,
        'is-multi-selected': isPartOfMultiSelection,
        'is-hovered': shouldAppearHovered,
        'is-reusable': isReusableBlock(blockType),
        'is-dragging': dragging,
        'is-typing': isTypingWithinBlock,
        'is-focused': isFocusMode && (isSelected || isParentOfSelectedBlock),
        'is-focus-mode': isFocusMode
      });
      var onReplace = this.props.onReplace; // Determine whether the block has props to apply to the wrapper.

      var wrapperProps = this.props.wrapperProps;

      if (blockType.getEditWrapperProps) {
        wrapperProps = _objectSpread({}, wrapperProps, blockType.getEditWrapperProps(block.attributes));
      }

      var blockElementId = "block-".concat(clientId); // We wrap the BlockEdit component in a div that hides it when editing in
      // HTML mode. This allows us to render all of the ancillary pieces
      // (InspectorControls, etc.) which are inside `BlockEdit` but not
      // `BlockHTML`, even in HTML mode.

      var blockEdit = createElement(BlockEdit, {
        name: blockName,
        isSelected: isSelected,
        attributes: block.attributes,
        setAttributes: this.setAttributes,
        insertBlocksAfter: isLocked ? undefined : this.insertBlocksAfter,
        onReplace: isLocked ? undefined : onReplace,
        mergeBlocks: isLocked ? undefined : this.mergeBlocks,
        clientId: clientId,
        isSelectionEnabled: this.props.isSelectionEnabled,
        toggleSelection: this.props.toggleSelection
      });

      if (mode !== 'visual') {
        blockEdit = createElement("div", {
          style: {
            display: 'none'
          }
        }, blockEdit);
      } // Disable reasons:
      //
      //  jsx-a11y/mouse-events-have-key-events:
      //   - onMouseOver is explicitly handling hover effects
      //
      //  jsx-a11y/no-static-element-interactions:
      //   - Each block can be selected by clicking on it

      /* eslint-disable jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */


      return createElement(IgnoreNestedEvents, _extends({
        id: blockElementId,
        ref: this.setBlockListRef,
        onMouseOver: this.maybeHover,
        onMouseOverHandled: this.hideHoverEffects,
        onMouseLeave: this.hideHoverEffects,
        className: wrapperClassName,
        "data-type": block.name,
        onTouchStart: this.onTouchStart,
        onFocus: this.onFocus,
        onClick: this.onClick,
        onKeyDown: this.deleteOrInsertAfterWrapper,
        tabIndex: "0",
        "aria-label": blockLabel,
        childHandledEvents: ['onDragStart', 'onMouseDown']
      }, wrapperProps), shouldShowInsertionPoint && createElement(BlockInsertionPoint, {
        clientId: clientId,
        rootClientId: rootClientId,
        canShowInserter: canShowInBetweenInserter
      }), createElement(BlockDropZone, {
        index: order,
        clientId: clientId,
        rootClientId: rootClientId
      }), shouldRenderMovers && createElement(BlockMover, {
        clientIds: clientId,
        blockElementId: blockElementId,
        isFirst: isFirst,
        isLast: isLast,
        isHidden: !(isHovered || isSelected) || hoverArea !== 'left',
        isDraggable: isDraggable !== false && !isPartOfMultiSelection && isMovable,
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd
      }), shouldShowBreadcrumb && createElement(BlockBreadcrumb, {
        clientId: clientId,
        isHidden: !(isHovered || isSelected) || hoverArea !== 'left'
      }), shouldShowContextualToolbar && createElement(BlockContextualToolbar, null), isFirstMultiSelected && createElement(BlockMultiControls, {
        rootClientId: rootClientId
      }), createElement(IgnoreNestedEvents, {
        ref: this.bindBlockNode,
        onDragStart: this.preventDrag,
        onMouseDown: this.onPointerDown,
        className: "editor-block-list__block-edit",
        "data-block": clientId
      }, createElement(BlockCrashBoundary, {
        onError: this.onBlockError
      }, isValid && blockEdit, isValid && mode === 'html' && createElement(BlockHtml, {
        clientId: clientId
      }), !isValid && [createElement(BlockInvalidWarning, {
        key: "invalid-warning",
        block: block
      }), createElement("div", {
        key: "invalid-preview"
      }, getSaveElement(blockType, block.attributes))]), shouldShowMobileToolbar && createElement(BlockMobileToolbar, {
        clientId: clientId
      }), !!error && createElement(BlockCrashWarning, null)), showEmptyBlockSideInserter && createElement(Fragment, null, createElement("div", {
        className: "editor-block-list__side-inserter"
      }, createElement(InserterWithShortcuts, {
        clientId: clientId,
        rootClientId: rootClientId,
        onToggle: this.selectOnOpen
      })), createElement("div", {
        className: "editor-block-list__empty-block-inserter"
      }, createElement(Inserter, {
        position: "top right",
        onToggle: this.selectOnOpen
      }))));
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    }
  }]);

  return BlockListBlock;
}(Component);
var applyWithSelect = withSelect(function (select, _ref) {
  var clientId = _ref.clientId,
      rootClientId = _ref.rootClientId,
      isLargeViewport = _ref.isLargeViewport;

  var _select = select('core/editor'),
      isBlockSelected = _select.isBlockSelected,
      getPreviousBlockClientId = _select.getPreviousBlockClientId,
      getNextBlockClientId = _select.getNextBlockClientId,
      getBlock = _select.getBlock,
      isAncestorMultiSelected = _select.isAncestorMultiSelected,
      isBlockMultiSelected = _select.isBlockMultiSelected,
      isFirstMultiSelectedBlock = _select.isFirstMultiSelectedBlock,
      isMultiSelecting = _select.isMultiSelecting,
      isTyping = _select.isTyping,
      isCaretWithinFormattedText = _select.isCaretWithinFormattedText,
      getBlockIndex = _select.getBlockIndex,
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getBlockMode = _select.getBlockMode,
      isSelectionEnabled = _select.isSelectionEnabled,
      getSelectedBlocksInitialCaretPosition = _select.getSelectedBlocksInitialCaretPosition,
      getEditorSettings = _select.getEditorSettings,
      hasSelectedInnerBlock = _select.hasSelectedInnerBlock,
      getTemplateLock = _select.getTemplateLock;

  var isSelected = isBlockSelected(clientId);

  var _getEditorSettings = getEditorSettings(),
      hasFixedToolbar = _getEditorSettings.hasFixedToolbar,
      focusMode = _getEditorSettings.focusMode;

  var block = getBlock(clientId);
  var previousBlockClientId = getPreviousBlockClientId(clientId);
  var previousBlock = getBlock(previousBlockClientId);
  var templateLock = getTemplateLock(rootClientId);
  var isParentOfSelectedBlock = hasSelectedInnerBlock(clientId, true);
  return {
    nextBlockClientId: getNextBlockClientId(clientId),
    isPartOfMultiSelection: isBlockMultiSelected(clientId) || isAncestorMultiSelected(clientId),
    isFirstMultiSelected: isFirstMultiSelectedBlock(clientId),
    isMultiSelecting: isMultiSelecting(),
    // We only care about this prop when the block is selected
    // Thus to avoid unnecessary rerenders we avoid updating the prop if the block is not selected.
    isTypingWithinBlock: (isSelected || isParentOfSelectedBlock) && isTyping(),
    isCaretWithinFormattedText: isCaretWithinFormattedText(),
    order: getBlockIndex(clientId, rootClientId),
    meta: getEditedPostAttribute('meta'),
    mode: getBlockMode(clientId),
    isSelectionEnabled: isSelectionEnabled(),
    initialPosition: getSelectedBlocksInitialCaretPosition(),
    isEmptyDefaultBlock: block && isUnmodifiedDefaultBlock(block),
    isPreviousBlockADefaultEmptyBlock: previousBlock && isUnmodifiedDefaultBlock(previousBlock),
    isMovable: 'all' !== templateLock,
    isLocked: !!templateLock,
    isFocusMode: focusMode && isLargeViewport,
    hasFixedToolbar: hasFixedToolbar && isLargeViewport,
    previousBlockClientId: previousBlockClientId,
    block: block,
    isSelected: isSelected,
    isParentOfSelectedBlock: isParentOfSelectedBlock
  };
});
var applyWithDispatch = withDispatch(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/editor'),
      updateBlockAttributes = _dispatch.updateBlockAttributes,
      selectBlock = _dispatch.selectBlock,
      insertBlocks = _dispatch.insertBlocks,
      insertDefaultBlock = _dispatch.insertDefaultBlock,
      removeBlock = _dispatch.removeBlock,
      mergeBlocks = _dispatch.mergeBlocks,
      replaceBlocks = _dispatch.replaceBlocks,
      editPost = _dispatch.editPost,
      _toggleSelection = _dispatch.toggleSelection;

  return {
    onChange: function onChange(clientId, attributes) {
      updateBlockAttributes(clientId, attributes);
    },
    onSelect: function onSelect() {
      var clientId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ownProps.clientId;
      var initialPosition = arguments.length > 1 ? arguments[1] : undefined;
      selectBlock(clientId, initialPosition);
    },
    onInsertBlocks: function onInsertBlocks(blocks, index) {
      var rootClientId = ownProps.rootClientId;
      insertBlocks(blocks, index, rootClientId);
    },
    onInsertDefaultBlockAfter: function onInsertDefaultBlockAfter() {
      var order = ownProps.order,
          rootClientId = ownProps.rootClientId;
      insertDefaultBlock({}, rootClientId, order + 1);
    },
    onRemove: function onRemove(clientId) {
      removeBlock(clientId);
    },
    onMerge: function onMerge() {
      mergeBlocks.apply(void 0, arguments);
    },
    onReplace: function onReplace(blocks) {
      replaceBlocks([ownProps.clientId], blocks);
    },
    onMetaChange: function onMetaChange(meta) {
      editPost({
        meta: meta
      });
    },
    toggleSelection: function toggleSelection(selectionEnabled) {
      _toggleSelection(selectionEnabled);
    }
  };
});
export default compose(withViewportMatch({
  isLargeViewport: 'medium'
}), applyWithSelect, applyWithDispatch, withFilters('editor.BlockListBlock'), withHoverAreas)(BlockListBlock);
//# sourceMappingURL=block.js.map