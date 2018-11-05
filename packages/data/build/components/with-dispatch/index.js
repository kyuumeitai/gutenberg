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

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _registryProvider = require("../registry-provider");

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
 * Higher-order component used to add dispatch props using registered action
 * creators.
 *
 * @param {Object} mapDispatchToProps Object of prop names where value is a
 *                                    dispatch-bound action creator, or a
 *                                    function to be called with with the
 *                                    component's props and returning an
 *                                    action creator.
 *
 * @return {Component} Enhanced component with merged dispatcher props.
 */
var withDispatch = function withDispatch(mapDispatchToProps) {
  return (0, _compose.createHigherOrderComponent)((0, _compose.compose)([_compose.pure, function (WrappedComponent) {
    var ComponentWithDispatch =
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(ComponentWithDispatch, _Component);

      function ComponentWithDispatch(props) {
        var _this;

        (0, _classCallCheck2.default)(this, ComponentWithDispatch);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ComponentWithDispatch).apply(this, arguments));
        _this.proxyProps = {};

        _this.setProxyProps(props);

        return _this;
      }

      (0, _createClass2.default)(ComponentWithDispatch, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.setProxyProps(this.props);
        }
      }, {
        key: "proxyDispatch",
        value: function proxyDispatch(propName) {
          var _mapDispatchToProps;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          // Original dispatcher is a pre-bound (dispatching) action creator.
          (_mapDispatchToProps = mapDispatchToProps(this.props.registry.dispatch, this.props.ownProps))[propName].apply(_mapDispatchToProps, args);
        }
      }, {
        key: "setProxyProps",
        value: function setProxyProps(props) {
          var _this2 = this;

          // Assign as instance property so that in subsequent render
          // reconciliation, the prop values are referentially equal.
          // Importantly, note that while `mapDispatchToProps` is
          // called, it is done only to determine the keys for which
          // proxy functions should be created. The actual registry
          // dispatch does not occur until the function is called.
          var propsToDispatchers = mapDispatchToProps(this.props.registry.dispatch, props.ownProps);
          this.proxyProps = (0, _lodash.mapValues)(propsToDispatchers, function (dispatcher, propName) {
            // Prebind with prop name so we have reference to the original
            // dispatcher to invoke. Track between re-renders to avoid
            // creating new function references every render.
            if (_this2.proxyProps.hasOwnProperty(propName)) {
              return _this2.proxyProps[propName];
            }

            return _this2.proxyDispatch.bind(_this2, propName);
          });
        }
      }, {
        key: "render",
        value: function render() {
          return (0, _element.createElement)(WrappedComponent, (0, _extends2.default)({}, this.props.ownProps, this.proxyProps));
        }
      }]);
      return ComponentWithDispatch;
    }(_element.Component);

    return function (ownProps) {
      return (0, _element.createElement)(_registryProvider.RegistryConsumer, null, function (registry) {
        return (0, _element.createElement)(ComponentWithDispatch, {
          ownProps: ownProps,
          registry: registry
        });
      });
    };
  }]), 'withDispatch');
};

var _default = withDispatch;
exports.default = _default;
//# sourceMappingURL=index.js.map