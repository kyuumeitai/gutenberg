import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component, findDOMNode } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
var withHoverAreas = createHigherOrderComponent(function (WrappedComponent) {
  var WithHoverAreasComponent =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithHoverAreasComponent, _Component);

    function WithHoverAreasComponent() {
      var _this;

      _classCallCheck(this, WithHoverAreasComponent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WithHoverAreasComponent).apply(this, arguments));
      _this.state = {
        hoverArea: null
      };
      _this.onMouseLeave = _this.onMouseLeave.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(WithHoverAreasComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        // Disable reason: We use findDOMNode to avoid unnecessary extra dom Nodes
        // eslint-disable-next-line react/no-find-dom-node
        this.container = findDOMNode(this);
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
        return createElement(WrappedComponent, _extends({}, this.props, {
          hoverArea: hoverArea
        }));
      }
    }]);

    return WithHoverAreasComponent;
  }(Component);

  return withSelect(function (select) {
    return {
      isRTL: select('core/editor').getEditorSettings().isRTL
    };
  })(WithHoverAreasComponent);
});
export default withHoverAreas;
//# sourceMappingURL=with-hover-areas.js.map