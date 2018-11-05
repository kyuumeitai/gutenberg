"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var withHoverAreas = (0, _compose.createHigherOrderComponent)(function (WrappedComponent) {
  var WithHoverAreasComponent =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(WithHoverAreasComponent, _Component);

    function WithHoverAreasComponent() {
      var _this;

      (0, _classCallCheck2.default)(this, WithHoverAreasComponent);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WithHoverAreasComponent).apply(this, arguments));
      _this.state = {
        hoverArea: null
      };
      _this.onMouseLeave = _this.onMouseLeave.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.onMouseMove = _this.onMouseMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    (0, _createClass2.default)(WithHoverAreasComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        // Disable reason: We use findDOMNode to avoid unnecessary extra dom Nodes
        // eslint-disable-next-line react/no-find-dom-node
        this.container = (0, _element.findDOMNode)(this);
        this.container.addEventListener('mousemove', this.onMouseMove);
        this.container.addEventListener('mouseleave', this.onMouseLeave);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.container.removeEventListener('mousemove', this.onMouseMove);
        this.container.removeEventListener('mouseleave', this.onMouseLeave);
      }
    }, {
      key: "onMouseLeave",
      value: function onMouseLeave() {
        if (this.state.hoverArea) {
          this.setState({
            hoverArea: null
          });
        }
      }
    }, {
      key: "onMouseMove",
      value: function onMouseMove(event) {
        var isRTL = this.props.isRTL;

        var _this$container$getBo = this.container.getBoundingClientRect(),
            width = _this$container$getBo.width,
            left = _this$container$getBo.left,
            right = _this$container$getBo.right;

        var hoverArea = null;

        if (event.clientX - left < width / 3) {
          hoverArea = isRTL ? 'right' : 'left';
        } else if (right - event.clientX < width / 3) {
          hoverArea = isRTL ? 'left' : 'right';
        }

        if (hoverArea !== this.state.hoverArea) {
          this.setState({
            hoverArea: hoverArea
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var hoverArea = this.state.hoverArea;
        return (0, _element.createElement)(WrappedComponent, (0, _extends2.default)({}, this.props, {
          hoverArea: hoverArea
        }));
      }
    }]);
    return WithHoverAreasComponent;
  }(_element.Component);

  return (0, _data.withSelect)(function (select) {
    return {
      isRTL: select('core/editor').getEditorSettings().isRTL
    };
  })(WithHoverAreasComponent);
});
var _default = withHoverAreas;
exports.default = _default;
//# sourceMappingURL=with-hover-areas.js.map