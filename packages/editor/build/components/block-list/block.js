"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockListBlock = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _viewport = require("@wordpress/viewport");

var _compose = require("@wordpress/compose");

var _blockEdit = _interopRequireDefault(require("../block-edit"));

var _blockMover = _interopRequireDefault(require("../block-mover"));

var _blockDropZone = _interopRequireDefault(require("../block-drop-zone"));

var _blockInvalidWarning = _interopRequireDefault(require("./block-invalid-warning"));

var _blockCrashWarning = _interopRequireDefault(require("./block-crash-warning"));

var _blockCrashBoundary = _interopRequireDefault(require("./block-crash-boundary"));

var _blockHtml = _interopRequireDefault(require("./block-html"));

var _breadcrumb = _interopRequireDefault(require("./breadcrumb"));

var _blockContextualToolbar = _interopRequireDefault(require("./block-contextual-toolbar"));

var _multiControls = _interopRequireDefault(require("./multi-controls"));

var _blockMobileToolbar = _interopRequireDefault(require("./block-mobile-toolbar"));

var _insertionPoint = _interopRequireDefault(require("./insertion-point"));

var _ignoreNestedEvents = _interopRequireDefault(require("../ignore-nested-events"));

var _inserterWithShortcuts = _interopRequireDefault(require("../inserter-with-shortcuts"));

var _inserter = _interopRequireDefault(require("../inserter"));

var _withHoverAreas = _interopRequireDefault(require("./with-hover-areas"));

var _dom2 = require("../../utils/dom");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockListBlock =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockListBlock, _Component);

  function BlockListBlock() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockListBlock);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockListBlock).apply(this, arguments));
    _this.setBlockListRef = _this.setBlockListRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindBlockNode = _this.bindBlockNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setAttributes = _this.setAttributes.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.maybeHover = _this.maybeHover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.hideHoverEffects = _this.hideHoverEffects.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.mergeBlocks = _this.mergeBlocks.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.insertBlocksAfter = _this.insertBlocksAfter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.preventDrag = _this.preventDrag.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onPointerDown = _this.onPointerDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.deleteOrInsertAfterWrapper = _this.deleteOrInsertAfterWrapper.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBlockError = _this.onBlockError.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onTouchStart = _this.onTouchStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onClick = _this.onClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onDragStart = _this.onDragStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onDragEnd = _this.onDragEnd.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.selectOnOpen = _this.selectOnOpen.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.hadTouchStart = false;
    _this.state = {
      error: null,
      dragging: false,
      isHovered: false
    };
    return _this;
  }

  (0, _createClass2.default)(BlockListBlock, [{
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


      var textInputs = _dom.focus.tabbable.find(this.node).filter(_dom.isTextField) // Exclude inner blocks
      .filter(function (node) {
        return !ignoreInnerBlocks || (0, _dom2.isInsideRootBlock)(_this2.node, node);
      }); // If reversed (e.g. merge via backspace), use the last in the set of
      // tabbables.


      var isReverse = -1 === initialPosition;
      var target = (isReverse ? _lodash.last : _lodash.first)(textInputs);

      if (!target) {
        this.wrapperNode.focus();
        return;
      }

      target.focus(); // In reverse case, need to explicitly place caret position.

      if (isReverse) {
        (0, _dom.placeCaretAtHorizontalEdge)(target, true);
        (0, _dom.placeCaretAtVerticalEdge)(target, true);
      }
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      var _this$props = this.props,
          block = _this$props.block,
          onChange = _this$props.onChange;
      var type = (0, _blocks.getBlockType)(block.name);
      onChange(block.clientId, attributes);
      var metaAttributes = (0, _lodash.reduce)(attributes, function (result, value, key) {
        if ((0, _lodash.get)(type, ['attributes', key, 'source']) === 'meta') {
          result[type.attributes[key].meta] = value;
        }

        return result;
      }, {});

      if ((0, _lodash.size)(metaAttributes)) {
        this.props.onMetaChange((0, _objectSpread2.default)({}, this.props.meta, metaAttributes));
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
        case _keycodes.ENTER:
          // Insert default block after current block if enter and event
          // not already handled by descendant.
          this.props.onInsertDefaultBlockAfter();
          event.preventDefault();
          break;

        case _keycodes.BACKSPACE:
        case _keycodes.DELETE:
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
      var blockType = (0, _blocks.getBlockType)(blockName); // translators: %s: Type of block (i.e. Text, Image etc)

      var blockLabel = (0, _i18n.sprintf)((0, _i18n.__)('Block: %s'), blockType.title); // The block as rendered in the editor is composed of general block UI
      // (mover, toolbar, wrapper) and the display of the block content.

      var isUnregisteredBlock = block.name === (0, _blocks.getUnregisteredTypeHandlerName)(); // If the block is selected and we're typing the block should not appear.
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

      var wrapperClassName = (0, _classnames.default)('wp-block editor-block-list__block', {
        'has-warning': !isValid || !!error || isUnregisteredBlock,
        'is-selected': shouldAppearSelected,
        'is-multi-selected': isPartOfMultiSelection,
        'is-hovered': shouldAppearHovered,
        'is-reusable': (0, _blocks.isReusableBlock)(blockType),
        'is-dragging': dragging,
        'is-typing': isTypingWithinBlock,
        'is-focused': isFocusMode && (isSelected || isParentOfSelectedBlock),
        'is-focus-mode': isFocusMode
      });
      var onReplace = this.props.onReplace; // Determine whether the block has props to apply to the wrapper.

      var wrapperProps = this.props.wrapperProps;

      if (blockType.getEditWrapperProps) {
        wrapperProps = (0, _objectSpread2.default)({}, wrapperProps, blockType.getEditWrapperProps(block.attributes));
      }

      var blockElementId = "block-".concat(clientId); // We wrap the BlockEdit component in a div that hides it when editing in
      // HTML mode. This allows us to render all of the ancillary pieces
      // (InspectorControls, etc.) which are inside `BlockEdit` but not
      // `BlockHTML`, even in HTML mode.

      var blockEdit = (0, _element.createElement)(_blockEdit.default, {
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
        blockEdit = (0, _element.createElement)("div", {
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


      return (0, _element.createElement)(_ignoreNestedEvents.default, (0, _extends2.default)({
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
      }, wrapperProps), shouldShowInsertionPoint && (0, _element.createElement)(_insertionPoint.default, {
        clientId: clientId,
        rootClientId: rootClientId,
        canShowInserter: canShowInBetweenInserter
      }), (0, _element.createElement)(_blockDropZone.default, {
        index: order,
        clientId: clientId,
        rootClientId: rootClientId
      }), shouldRenderMovers && (0, _element.createElement)(_blockMover.default, {
        clientIds: clientId,
        blockElementId: blockElementId,
        isFirst: isFirst,
        isLast: isLast,
        isHidden: !(isHovered || isSelected) || hoverArea !== 'left',
        isDraggable: isDraggable !== false && !isPartOfMultiSelection && isMovable,
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd
      }), shouldShowBreadcrumb && (0, _element.createElement)(_breadcrumb.default, {
        clientId: clientId,
        isHidden: !(isHovered || isSelected) || hoverArea !== 'left'
      }), shouldShowContextualToolbar && (0, _element.createElement)(_blockContextualToolbar.default, null), isFirstMultiSelected && (0, _element.createElement)(_multiControls.default, {
        rootClientId: rootClientId
      }), (0, _element.createElement)(_ignoreNestedEvents.default, {
        ref: this.bindBlockNode,
        onDragStart: this.preventDrag,
        onMouseDown: this.onPointerDown,
        className: "editor-block-list__block-edit",
        "data-block": clientId
      }, (0, _element.createElement)(_blockCrashBoundary.default, {
        onError: this.onBlockError
      }, isValid && blockEdit, isValid && mode === 'html' && (0, _element.createElement)(_blockHtml.default, {
        clientId: clientId
      }), !isValid && [(0, _element.createElement)(_blockInvalidWarning.default, {
        key: "invalid-warning",
        block: block
      }), (0, _element.createElement)("div", {
        key: "invalid-preview"
      }, (0, _blocks.getSaveElement)(blockType, block.attributes))]), shouldShowMobileToolbar && (0, _element.createElement)(_blockMobileToolbar.default, {
        clientId: clientId
      }), !!error && (0, _element.createElement)(_blockCrashWarning.default, null)), showEmptyBlockSideInserter && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
        className: "editor-block-list__side-inserter"
      }, (0, _element.createElement)(_inserterWithShortcuts.default, {
        clientId: clientId,
        rootClientId: rootClientId,
        onToggle: this.selectOnOpen
      })), (0, _element.createElement)("div", {
        className: "editor-block-list__empty-block-inserter"
      }, (0, _element.createElement)(_inserter.default, {
        position: "top right",
        onToggle: this.selectOnOpen
      }))));
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    }
  }]);
  return BlockListBlock;
}(_element.Component);

exports.BlockListBlock = BlockListBlock;
var applyWithSelect = (0, _data.withSelect)(function (select, _ref) {
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
    isEmptyDefaultBlock: block && (0, _blocks.isUnmodifiedDefaultBlock)(block),
    isPreviousBlockADefaultEmptyBlock: previousBlock && (0, _blocks.isUnmodifiedDefaultBlock)(previousBlock),
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
var applyWithDispatch = (0, _data.withDispatch)(function (dispatch, ownProps) {
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

var _default = (0, _compose.compose)((0, _viewport.withViewportMatch)({
  isLargeViewport: 'medium'
}), applyWithSelect, applyWithDispatch, (0, _components.withFilters)('editor.BlockListBlock'), _withHoverAreas.default)(BlockListBlock);

exports.default = _default;
//# sourceMappingURL=block.js.map