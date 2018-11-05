"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRegistry = createRegistry;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _namespaceStore = _interopRequireDefault(require("./namespace-store.js"));

var _store = _interopRequireDefault(require("./store"));

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
 * An isolated orchestrator of store registrations.
 *
 * @typedef {WPDataRegistry}
 *
 * @property {Function} registerGenericStore
 * @property {Function} registerStore
 * @property {Function} subscribe
 * @property {Function} select
 * @property {Function} dispatch
 */

/**
 * An object of registry function overrides.
 *
 * @typedef {WPDataPlugin}
 */

/**
 * Creates a new store registry, given an optional object of initial store
 * configurations.
 *
 * @param {Object} storeConfigs Initial store configurations.
 *
 * @return {WPDataRegistry} Data registry.
 */
function createRegistry() {
  var storeConfigs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var stores = {};
  var listeners = [];
  /**
   * Global listener called for each store's update.
   */

  function globalListener() {
    listeners.forEach(function (listener) {
      return listener();
    });
  }
  /**
   * Subscribe to changes to any data.
   *
   * @param {Function}   listener Listener function.
   *
   * @return {Function}           Unsubscribe function.
   */


  var subscribe = function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = (0, _lodash.without)(listeners, listener);
    };
  };
  /**
   * Calls a selector given the current state and extra arguments.
   *
   * @param {string} reducerKey Part of the state shape to register the
   *                            selectors for.
   *
   * @return {*} The selector's returned value.
   */


  function select(reducerKey) {
    var store = stores[reducerKey];
    return store && store.getSelectors();
  }
  /**
   * Returns the available actions for a part of the state.
   *
   * @param {string} reducerKey Part of the state shape to dispatch the
   *                            action for.
   *
   * @return {*} The action's returned value.
   */


  function dispatch(reducerKey) {
    var store = stores[reducerKey];
    return store && store.getActions();
  } //
  // Deprecated
  // TODO: Remove this after `use()` is removed.
  //


  function withPlugins(attributes) {
    return (0, _lodash.mapValues)(attributes, function (attribute, key) {
      if (typeof attribute !== 'function') {
        return attribute;
      }

      return function () {
        return registry[key].apply(null, arguments);
      };
    });
  }
  /**
   * Registers a generic store.
   *
   * @param {string} key    Store registry key.
   * @param {Object} config Configuration (getSelectors, getActions, subscribe).
   */


  function registerGenericStore(key, config) {
    if (typeof config.getSelectors !== 'function') {
      throw new TypeError('config.getSelectors must be a function');
    }

    if (typeof config.getActions !== 'function') {
      throw new TypeError('config.getActions must be a function');
    }

    if (typeof config.subscribe !== 'function') {
      throw new TypeError('config.subscribe must be a function');
    }

    stores[key] = config;
    config.subscribe(globalListener);
  }

  var registry = {
    registerGenericStore: registerGenericStore,
    stores: stores,
    namespaces: stores,
    // TODO: Deprecate/remove this.
    subscribe: subscribe,
    select: select,
    dispatch: dispatch,
    use: use
  }; //
  // Deprecated
  //

  registry.registerReducer = function (reducerKey, reducer) {
    (0, _deprecated.default)('registry.registerReducer', {
      alternative: 'registry.registerStore',
      plugin: 'Gutenberg',
      version: '4.4.0'
    });
    var namespace = (0, _namespaceStore.default)(reducerKey, {
      reducer: reducer
    }, registry);
    registerGenericStore(reducerKey, namespace);
    return namespace.store;
  }; //
  // Deprecated
  //


  registry.registerActions = function (reducerKey, actions) {
    (0, _deprecated.default)('registry.registerActions', {
      alternative: 'registry.registerStore',
      plugin: 'Gutenberg',
      version: '4.4.0'
    });
    var namespace = (0, _namespaceStore.default)(reducerKey, {
      actions: actions
    }, registry);
    registerGenericStore(reducerKey, namespace);
  }; //
  // Deprecated
  //


  registry.registerSelectors = function (reducerKey, selectors) {
    (0, _deprecated.default)('registry.registerSelectors', {
      alternative: 'registry.registerStore',
      plugin: 'Gutenberg',
      version: '4.4.0'
    });
    var namespace = (0, _namespaceStore.default)(reducerKey, {
      selectors: selectors
    }, registry);
    registerGenericStore(reducerKey, namespace);
  }; //
  // Deprecated
  //


  registry.registerResolvers = function (reducerKey, resolvers) {
    (0, _deprecated.default)('registry.registerResolvers', {
      alternative: 'registry.registerStore',
      plugin: 'Gutenberg',
      version: '4.4.0'
    });
    var namespace = (0, _namespaceStore.default)(reducerKey, {
      resolvers: resolvers
    }, registry);
    registerGenericStore(reducerKey, namespace);
  };
  /**
   * Registers a standard `@wordpress/data` store.
   *
   * @param {string} reducerKey Reducer key.
   * @param {Object} options    Store description (reducer, actions, selectors, resolvers).
   *
   * @return {Object} Registered store object.
   */


  registry.registerStore = function (reducerKey, options) {
    if (!options.reducer) {
      throw new TypeError('Must specify store reducer');
    }

    var namespace = (0, _namespaceStore.default)(reducerKey, options, registry);
    registerGenericStore(reducerKey, namespace);
    return namespace.store;
  }; //
  // TODO:
  // This function will be deprecated as soon as it is no longer internally referenced.
  //


  function use(plugin, options) {
    registry = (0, _objectSpread2.default)({}, registry, plugin(registry, options));
    return registry;
  }

  Object.entries((0, _objectSpread2.default)({
    'core/data': _store.default
  }, storeConfigs)).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        name = _ref2[0],
        config = _ref2[1];

    return registry.registerStore(name, config);
  });
  return withPlugins(registry);
}
//# sourceMappingURL=registry.js.map