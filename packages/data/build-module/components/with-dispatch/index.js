import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { mapValues } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { pure, compose, createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { RegistryConsumer } from '../registry-provider';
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
  return createHigherOrderComponent(compose([pure, function (WrappedComponent) {
    var ComponentWithDispatch =
    /*#__PURE__*/
    function (_Component) {
      _inherits(ComponentWithDispatch, _Component);

      function ComponentWithDispatch(props) {
        var _this;

        _classCallCheck(this, ComponentWithDispatch);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentWithDispatch).apply(this, arguments));
        _this.proxyProps = {};

        _this.setProxyProps(props);

        return _this;
      }

      _createClass(ComponentWithDispatch, [{
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
          this.proxyProps = mapValues(propsToDispatchers, function (dispatcher, propName) {
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
          return createElement(WrappedComponent, _extends({}, this.props.ownProps, this.proxyProps));
        }
      }]);

      return ComponentWithDispatch;
    }(Component);

    return function (ownProps) {
      return createElement(RegistryConsumer, null, function (registry) {
        return createElement(ComponentWithDispatch, {
          ownProps: ownProps,
          registry: registry
        });
      });
    };
  }]), 'withDispatch');
};

export default withDispatch;
//# sourceMappingURL=index.js.map