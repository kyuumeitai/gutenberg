import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { RegistryConsumer } from '../registry-provider';
/**
 * Higher-order component used to inject state-derived props using registered
 * selectors.
 *
 * @param {Function} mapSelectToProps Function called on every state change,
 *                                   expected to return object of props to
 *                                   merge with the component's own props.
 *
 * @return {Component} Enhanced component with merged state data props.
 */

var withSelect = function withSelect(mapSelectToProps) {
  return createHigherOrderComponent(function (WrappedComponent) {
    /**
     * Default merge props. A constant value is used as the fallback since it
     * can be more efficiently shallow compared in case component is repeatedly
    	 * rendered without its own merge props.
     *
     * @type {Object}
     */
    var DEFAULT_MERGE_PROPS = {};
    /**
     * Given a props object, returns the next merge props by mapSelectToProps.
     *
     * @param {Object} props Props to pass as argument to mapSelectToProps.
     *
     * @return {Object} Props to merge into rendered wrapped element.
     */

    function getNextMergeProps(props) {
      return mapSelectToProps(props.registry.select, props.ownProps) || DEFAULT_MERGE_PROPS;
    }

    var ComponentWithSelect =
    /*#__PURE__*/
    function (_Component) {
      _inherits(ComponentWithSelect, _Component);

      function ComponentWithSelect(props) {
        var _this;

        _classCallCheck(this, ComponentWithSelect);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentWithSelect).call(this, props));

        _this.subscribe(props.registry);

        _this.mergeProps = getNextMergeProps(props);
        return _this;
      }

      _createClass(ComponentWithSelect, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.canRunSelection = true;
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.canRunSelection = false;
          this.unsubscribe();
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          // Cycle subscription if registry changes.
          var hasRegistryChanged = nextProps.registry !== this.props.registry;

          if (hasRegistryChanged) {
            this.unsubscribe();
            this.subscribe(nextProps.registry);
          } // Treat a registry change as equivalent to `ownProps`, to reflect
          // `mergeProps` to rendered component if and only if updated.


          var hasPropsChanged = hasRegistryChanged || !isShallowEqual(this.props.ownProps, nextProps.ownProps); // Only render if props have changed or merge props have been updated
          // from the store subscriber.

          if (this.state === nextState && !hasPropsChanged) {
            return false;
          }

          if (hasPropsChanged) {
            var nextMergeProps = getNextMergeProps(nextProps);

            if (!isShallowEqual(this.mergeProps, nextMergeProps)) {
              // If merge props change as a result of the incoming props,
              // they should be reflected as such in the upcoming render.
              // While side effects are discouraged in lifecycle methods,
              // this component is used heavily, and prior efforts to use
              // `getDerivedStateFromProps` had demonstrated miserable
              // performance.
              this.mergeProps = nextMergeProps;
            } // Regardless whether merge props are changing, fall through to
            // incur the render since the component will need to receive
            // the changed `ownProps`.

          }

          return true;
        }
      }, {
        key: "subscribe",
        value: function subscribe(registry) {
          var _this2 = this;

          this.unsubscribe = registry.subscribe(function () {
            if (!_this2.canRunSelection) {
              return;
            }

            var nextMergeProps = getNextMergeProps(_this2.props);

            if (isShallowEqual(_this2.mergeProps, nextMergeProps)) {
              return;
            }

            _this2.mergeProps = nextMergeProps; // Schedule an update. Merge props are not assigned to state
            // because derivation of merge props from incoming props occurs
            // within shouldComponentUpdate, where setState is not allowed.
            // setState is used here instead of forceUpdate because forceUpdate
            // bypasses shouldComponentUpdate altogether, which isn't desireable
            // if both state and props change within the same render.
            // Unfortunately this requires that next merge props are generated
            // twice.

            _this2.setState({});
          });
        }
      }, {
        key: "render",
        value: function render() {
          return createElement(WrappedComponent, _extends({}, this.props.ownProps, this.mergeProps));
        }
      }]);

      return ComponentWithSelect;
    }(Component);

    return function (ownProps) {
      return createElement(RegistryConsumer, null, function (registry) {
        return createElement(ComponentWithSelect, {
          ownProps: ownProps,
          registry: registry
        });
      });
    };
  }, 'withSelect');
};

export default withSelect;
//# sourceMappingURL=index.js.map