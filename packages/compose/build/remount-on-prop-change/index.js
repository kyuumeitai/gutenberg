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

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _createHigherOrderComponent = _interopRequireDefault(require("../create-higher-order-component"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Higher-order component creator, creating a new component that remounts
 * the wrapped component each time a given prop value changes.
 *
 * @param {string} propName Prop name to monitor.
 *
 * @return {Function} Higher-order component.
 */
var remountOnPropChange = function remountOnPropChange(propName) {
  return (0, _createHigherOrderComponent.default)(function (WrappedComponent) {
    (0, _deprecated.default)('remountOnPropChange', {
      plugin: 'Gutenberg',
      version: '4.4.0'
    });
    return (
      /*#__PURE__*/
      function (_Component) {
        (0, _inherits2.default)(_class, _Component);

        function _class(props) {
          var _this;

          (0, _classCallCheck2.default)(this, _class);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
          _this.state = {
            propChangeId: 0,
            propValue: props[propName]
          };
          return _this;
        }

        (0, _createClass2.default)(_class, [{
          key: "render",
          value: function render() {
            return (0, _element.createElement)(WrappedComponent, (0, _extends2.default)({
              key: this.state.propChangeId
            }, this.props));
          }
        }], [{
          key: "getDerivedStateFromProps",
          value: function getDerivedStateFromProps(props, state) {
            if (props[propName] === state.propValue) {
              return null;
            }

            return {
              propChangeId: state.propChangeId + 1,
              propValue: props[propName]
            };
          }
        }]);
        return _class;
      }(_element.Component)
    );
  }, 'remountOnPropChange');
};

var _default = remountOnPropChange;
exports.default = _default;
//# sourceMappingURL=index.js.map