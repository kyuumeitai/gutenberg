"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

var _utils = require("./utils");

var _withFocusReturn = _interopRequireDefault(require("../higher-order/with-focus-return"));

var _withConstrainedTabbing = _interopRequireDefault(require("../higher-order/with-constrained-tabbing"));

var _detectOutside = _interopRequireDefault(require("./detect-outside"));

var _iconButton = _interopRequireDefault(require("../icon-button"));

var _scrollLock = _interopRequireDefault(require("../scroll-lock"));

var _slotFill = require("../slot-fill");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var FocusManaged = (0, _withConstrainedTabbing.default)((0, _withFocusReturn.default)(function (_ref) {
  var children = _ref.children;
  return children;
}));
/**
 * Name of slot in which popover should fill.
 *
 * @type {String}
 */

var SLOT_NAME = 'Popover';

var Popover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Popover, _Component);

  function Popover() {
    var _this;

    (0, _classCallCheck2.default)(this, Popover);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popover).apply(this, arguments));
    _this.focus = _this.focus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.refresh = _this.refresh.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getAnchorRect = _this.getAnchorRect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updatePopoverSize = _this.updatePopoverSize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.computePopoverPosition = _this.computePopoverPosition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.throttledComputePopoverPosition = _this.throttledComputePopoverPosition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.maybeClose = _this.maybeClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.contentNode = (0, _element.createRef)();
    _this.anchorNode = (0, _element.createRef)();
    _this.state = {
      popoverLeft: null,
      popoverTop: null,
      yAxis: 'top',
      xAxis: 'center',
      contentHeight: null,
      contentWidth: null,
      isMobile: false,
      popoverSize: null
    };
    return _this;
  }

  (0, _createClass2.default)(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.toggleWindowEvents(true);
      this.refresh();
      /*
       * Without the setTimeout, the dom node is not being focused. Related:
       * https://stackoverflow.com/questions/35522220/react-ref-with-focus-doesnt-work-without-settimeout-my-example
       *
       * TODO: Treat the cause, not the symptom.
       */

      this.focusTimeout = setTimeout(function () {
        _this2.focus();
      }, 0);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.position !== this.props.position) {
        this.computePopoverPosition();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleWindowEvents(false);
      clearTimeout(this.focusTimeout);
    }
  }, {
    key: "toggleWindowEvents",
    value: function toggleWindowEvents(isListening) {
      var handler = isListening ? 'addEventListener' : 'removeEventListener';
      window.cancelAnimationFrame(this.rafHandle);
      window[handler]('resize', this.throttledComputePopoverPosition);
      window[handler]('scroll', this.throttledComputePopoverPosition, true);
    }
  }, {
    key: "throttledComputePopoverPosition",
    value: function throttledComputePopoverPosition(event) {
      var _this3 = this;

      if (event.type === 'scroll' && this.contentNode.current.contains(event.target)) {
        return;
      }

      this.rafHandle = window.requestAnimationFrame(function () {
        return _this3.computePopoverPosition();
      });
    }
    /**
     * Calling `refresh()` will force the Popover to recalculate its size and
     * position. This is useful when a DOM change causes the anchor node to change
     * position.
     *
     * @return {void}
     */

  }, {
    key: "refresh",
    value: function refresh() {
      var popoverSize = this.updatePopoverSize();
      this.computePopoverPosition(popoverSize);
    }
  }, {
    key: "focus",
    value: function focus() {
      var focusOnMount = this.props.focusOnMount;

      if (!focusOnMount || !this.contentNode.current) {
        return;
      }

      if (focusOnMount === 'firstElement') {
        // Find first tabbable node within content and shift focus, falling
        // back to the popover panel itself.
        var firstTabbable = _dom.focus.tabbable.find(this.contentNode.current)[0];

        if (firstTabbable) {
          firstTabbable.focus();
        } else {
          this.contentNode.current.focus();
        }

        return;
      }

      if (focusOnMount === 'container') {
        // Focus the popover panel itself so items in the popover are easily
        // accessed via keyboard navigation.
        this.contentNode.current.focus();
      }
    }
  }, {
    key: "getAnchorRect",
    value: function getAnchorRect(anchor) {
      if (!anchor || !anchor.parentNode) {
        return;
      }

      var rect = anchor.parentNode.getBoundingClientRect(); // subtract padding

      var _window$getComputedSt = window.getComputedStyle(anchor.parentNode),
          paddingTop = _window$getComputedSt.paddingTop,
          paddingBottom = _window$getComputedSt.paddingBottom;

      var topPad = parseInt(paddingTop, 10);
      var bottomPad = parseInt(paddingBottom, 10);
      return {
        x: rect.left,
        y: rect.top + topPad,
        width: rect.width,
        height: rect.height - topPad - bottomPad,
        left: rect.left,
        right: rect.right,
        top: rect.top + topPad,
        bottom: rect.bottom - bottomPad
      };
    }
  }, {
    key: "updatePopoverSize",
    value: function updatePopoverSize() {
      var rect = this.contentNode.current.getBoundingClientRect();

      if (!this.state.popoverSize || rect.width !== this.state.popoverSize.width || rect.height !== this.state.popoverSize.height) {
        var popoverSize = {
          height: rect.height,
          width: rect.width
        };
        this.setState({
          popoverSize: popoverSize
        });
        return popoverSize;
      }

      return this.state.popoverSize;
    }
  }, {
    key: "computePopoverPosition",
    value: function computePopoverPosition(popoverSize) {
      var _this$props = this.props,
          _this$props$getAnchor = _this$props.getAnchorRect,
          getAnchorRect = _this$props$getAnchor === void 0 ? this.getAnchorRect : _this$props$getAnchor,
          _this$props$position = _this$props.position,
          position = _this$props$position === void 0 ? 'top' : _this$props$position,
          expandOnMobile = _this$props.expandOnMobile;
      var newPopoverPosition = (0, _utils.computePopoverPosition)(getAnchorRect(this.anchorNode.current), popoverSize || this.state.popoverSize, position, expandOnMobile);

      if (this.state.yAxis !== newPopoverPosition.yAxis || this.state.xAxis !== newPopoverPosition.xAxis || this.state.popoverLeft !== newPopoverPosition.popoverLeft || this.state.popoverTop !== newPopoverPosition.popoverTop || this.state.contentHeight !== newPopoverPosition.contentHeight || this.state.contentWidth !== newPopoverPosition.contentWidth || this.state.isMobile !== newPopoverPosition.isMobile) {
        this.setState(newPopoverPosition);
      }
    }
  }, {
    key: "maybeClose",
    value: function maybeClose(event) {
      var _this$props2 = this.props,
          onKeyDown = _this$props2.onKeyDown,
          onClose = _this$props2.onClose; // Close on escape

      if (event.keyCode === _keycodes.ESCAPE && onClose) {
        event.stopPropagation();
        onClose();
      } // Preserve original content prop behavior


      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          headerTitle = _this$props3.headerTitle,
          onClose = _this$props3.onClose,
          children = _this$props3.children,
          className = _this$props3.className,
          _this$props3$onClickO = _this$props3.onClickOutside,
          onClickOutside = _this$props3$onClickO === void 0 ? onClose : _this$props3$onClickO,
          noArrow = _this$props3.noArrow,
          position = _this$props3.position,
          range = _this$props3.range,
          focusOnMount = _this$props3.focusOnMount,
          getAnchorRect = _this$props3.getAnchorRect,
          expandOnMobile = _this$props3.expandOnMobile,
          contentProps = (0, _objectWithoutProperties2.default)(_this$props3, ["headerTitle", "onClose", "children", "className", "onClickOutside", "noArrow", "position", "range", "focusOnMount", "getAnchorRect", "expandOnMobile"]);
      var _this$state = this.state,
          popoverLeft = _this$state.popoverLeft,
          popoverTop = _this$state.popoverTop,
          yAxis = _this$state.yAxis,
          xAxis = _this$state.xAxis,
          contentHeight = _this$state.contentHeight,
          contentWidth = _this$state.contentWidth,
          popoverSize = _this$state.popoverSize,
          isMobile = _this$state.isMobile;
      var classes = (0, _classnames.default)('components-popover', className, 'is-' + yAxis, 'is-' + xAxis, {
        'is-mobile': isMobile,
        'is-without-arrow': noArrow || xAxis === 'center' && yAxis === 'middle'
      }); // Disable reason: We care to capture the _bubbled_ events from inputs
      // within popover as inferring close intent.

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      var content = (0, _element.createElement)(_detectOutside.default, {
        onClickOutside: onClickOutside
      }, (0, _element.createElement)("div", (0, _extends2.default)({
        className: classes,
        style: {
          top: !isMobile && popoverTop ? popoverTop + 'px' : undefined,
          left: !isMobile && popoverLeft ? popoverLeft + 'px' : undefined,
          visibility: popoverSize ? undefined : 'hidden'
        }
      }, contentProps, {
        onKeyDown: this.maybeClose
      }), isMobile && (0, _element.createElement)("div", {
        className: "components-popover__header"
      }, (0, _element.createElement)("span", {
        className: "components-popover__header-title"
      }, headerTitle), (0, _element.createElement)(_iconButton.default, {
        className: "components-popover__close",
        icon: "no-alt",
        onClick: onClose
      })), (0, _element.createElement)("div", {
        ref: this.contentNode,
        className: "components-popover__content",
        style: {
          maxHeight: !isMobile && contentHeight ? contentHeight + 'px' : undefined,
          maxWidth: !isMobile && contentWidth ? contentWidth + 'px' : undefined
        },
        tabIndex: "-1"
      }, children)));
      /* eslint-enable jsx-a11y/no-static-element-interactions */
      // Apply focus to element as long as focusOnMount is truthy; false is
      // the only "disabled" value.

      if (focusOnMount) {
        content = (0, _element.createElement)(FocusManaged, null, content);
      }

      return (0, _element.createElement)(_slotFill.Consumer, null, function (_ref2) {
        var getSlot = _ref2.getSlot;

        // In case there is no slot context in which to render,
        // default to an in-place rendering.
        if (getSlot && getSlot(SLOT_NAME)) {
          content = (0, _element.createElement)(_slotFill.Fill, {
            name: SLOT_NAME
          }, content);
        }

        return (0, _element.createElement)("span", {
          ref: _this4.anchorNode
        }, content, isMobile && expandOnMobile && (0, _element.createElement)(_scrollLock.default, null));
      });
    }
  }]);
  return Popover;
}(_element.Component);

Popover.defaultProps = {
  focusOnMount: 'firstElement',
  noArrow: false
};
var PopoverContainer = Popover;

PopoverContainer.Slot = function () {
  return (0, _element.createElement)(_slotFill.Slot, {
    bubblesVirtually: true,
    name: SLOT_NAME
  });
};

var _default = PopoverContainer;
exports.default = _default;
//# sourceMappingURL=index.js.map