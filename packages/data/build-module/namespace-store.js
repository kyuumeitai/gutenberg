import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { flowRight, get, mapValues } from 'lodash';
/**
 * Internal dependencies
 */

import promise from './promise-middleware';
import createResolversCacheMiddleware from './resolvers-cache-middleware';
/**
 * Creates a namespace object with a store derived from the reducer given.
 *
 * @param {string} key              Identifying string used for namespace and redex dev tools.
 * @param {Object} options          Contains reducer, actions, selectors, and resolvers.
 * @param {Object} registry         Temporary registry reference, required for namespace updates.
 *
 * @return {Object} Store Object.
 */

export default function createNamespace(key, options, registry) {
  // TODO: After register[Reducer|Actions|Selectors|Resolvers] are deprecated and removed,
  //       this function can be greatly simplified because it should no longer be called to modify
  //       a namespace, but only to create one, and only once for each namespace.
  // TODO: After removing `registry.namespaces`and making stores immutable after create,
  //       reducer, store, actinos, selectors, and resolvers can all be removed from here.
  var _ref = registry.namespaces[key] || {},
      reducer = _ref.reducer,
      store = _ref.store,
      actions = _ref.actions,
      selectors = _ref.selectors,
      resolvers = _ref.resolvers;

  if (options.reducer) {
    reducer = options.reducer;
    store = createReduxStore(reducer, key, registry);
  }

  if (options.actions) {
    if (!store) {
      throw new TypeError('Cannot specify actions when no reducer is present');
    }

    actions = mapActions(options.actions, store);
  }

  if (options.selectors) {
    if (!store) {
      throw new TypeError('Cannot specify selectors when no reducer is present');
    }

    selectors = mapSelectors(options.selectors, store);
  }

  if (options.resolvers) {
    var fulfillment = getCoreDataFulfillment(registry, key);
    var result = mapResolvers(options.resolvers, selectors, fulfillment, store);
    resolvers = result.resolvers;
    selectors = result.selectors;
  }

  var getSelectors = function getSelectors() {
    return selectors;
  };

  var getActions = function getActions() {
    return actions;
  }; // Customize subscribe behavior to call listeners only on effective change,
  // not on every dispatch.


  var subscribe = store && function (listener) {
    var lastState = store.getState();
    store.subscribe(function () {
      var state = store.getState();
      var hasChanged = state !== lastState;
      lastState = state;

      if (hasChanged) {
        listener();
      }
    });
  };

  return {
    reducer: reducer,
    store: store,
    actions: actions,
    selectors: selectors,
    resolvers: resolvers,
    getSelectors: getSelectors,
    getActions: getActions,
    subscribe: subscribe
  };
}
/**
 * Creates a redux store for a namespace.
 *
 * @param {Function} reducer    Root reducer for redux store.
 * @param {string} key          Part of the state shape to register the
 *                              selectors for.
 * @param {Object} registry     Registry reference, for resolver enhancer support.
 * @return {Object}             Newly created redux store.
 */

function createReduxStore(reducer, key, registry) {
  var enhancers = [applyMiddleware(createResolversCacheMiddleware(registry, key), promise)];

  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__({
      name: key,
      instanceId: key
    }));
  }

  return createStore(reducer, flowRight(enhancers));
}
/**
 * Maps selectors to a redux store.
 *
 * @param {Object} selectors  Selectors to register. Keys will be used as the
 *                            public facing API. Selectors will get passed the
 *                            state as first argument.
 * @param {Object} store      The redux store to which the selectors should be mapped.
 * @return {Object}           Selectors mapped to the redux store provided.
 */


function mapSelectors(selectors, store) {
  var createStateSelector = function createStateSelector(selector) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return selector.apply(void 0, [store.getState()].concat(args));
    };
  };

  return mapValues(selectors, createStateSelector);
}
/**
 * Maps actions to dispatch from a given store.
 *
 * @param {Object} actions    Actions to register.
 * @param {Object} store      The redux store to which the actions should be mapped.
 * @return {Object}           Actions mapped to the redux store provided.
 */


function mapActions(actions, store) {
  var createBoundAction = function createBoundAction(action) {
    return function () {
      return store.dispatch(action.apply(void 0, arguments));
    };
  };

  return mapValues(actions, createBoundAction);
}
/**
 * Returns resolvers with matched selectors for a given namespace.
 * Resolvers are side effects invoked once per argument set of a given selector call,
 * used in ensuring that the data needs for the selector are satisfied.
 *
 * @param {Object} resolvers   Resolvers to register.
 * @param {Object} selectors   The current selectors to be modified.
 * @param {Object} fulfillment Fulfillment implementation functions.
 * @param {Object} store       The redux store to which the resolvers should be mapped.
 * @return {Object}            An object containing updated selectors and resolvers.
 */


function mapResolvers(resolvers, selectors, fulfillment, store) {
  var mapSelector = function mapSelector(selector, selectorName) {
    var resolver = resolvers[selectorName];

    if (!resolver) {
      return selector;
    }

    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      function fulfillSelector() {
        return _fulfillSelector.apply(this, arguments);
      }

      function _fulfillSelector() {
        _fulfillSelector = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var state;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  state = store.getState();

                  if (!(typeof resolver.isFulfilled === 'function' && resolver.isFulfilled.apply(resolver, [state].concat(args)))) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return");

                case 3:
                  if (!fulfillment.hasStarted(selectorName, args)) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt("return");

                case 5:
                  fulfillment.start(selectorName, args);
                  _context.next = 8;
                  return fulfillment.fulfill.apply(fulfillment, [selectorName].concat(args));

                case 8:
                  fulfillment.finish(selectorName, args);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
        return _fulfillSelector.apply(this, arguments);
      }

      fulfillSelector.apply(void 0, args);
      return selector.apply(void 0, args);
    };
  };

  var mappedResolvers = mapValues(resolvers, function (resolver) {
    var _resolver$fulfill = resolver.fulfill,
        resolverFulfill = _resolver$fulfill === void 0 ? resolver : _resolver$fulfill;
    return _objectSpread({}, resolver, {
      fulfill: resolverFulfill
    });
  });
  return {
    resolvers: mappedResolvers,
    selectors: mapValues(selectors, mapSelector)
  };
}
/**
 * Bundles up fulfillment functions for resolvers.
 * @param {Object} registry     Registry reference, for fulfilling via resolvers
 * @param {string} key          Part of the state shape to register the
 *                              selectors for.
 * @return {Object}             An object providing fulfillment functions.
 */


function getCoreDataFulfillment(registry, key) {
  var _registry$select = registry.select('core/data'),
      hasStartedResolution = _registry$select.hasStartedResolution;

  var _registry$dispatch = registry.dispatch('core/data'),
      startResolution = _registry$dispatch.startResolution,
      finishResolution = _registry$dispatch.finishResolution;

  return {
    hasStarted: function hasStarted() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return hasStartedResolution.apply(void 0, [key].concat(args));
    },
    start: function start() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return startResolution.apply(void 0, [key].concat(args));
    },
    finish: function finish() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return finishResolution.apply(void 0, [key].concat(args));
    },
    fulfill: function fulfill() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return fulfillWithRegistry.apply(void 0, [registry, key].concat(args));
    }
  };
}
/**
 * Calls a resolver given arguments
 *
 * @param {Object} registry     Registry reference, for fulfilling via resolvers
 * @param {string} key          Part of the state shape to register the
 *                              selectors for.
 * @param {string} selectorName Selector name to fulfill.
 * @param {Array} args         Selector Arguments.
 */


function fulfillWithRegistry(_x, _x2, _x3) {
  return _fulfillWithRegistry.apply(this, arguments);
}

function _fulfillWithRegistry() {
  _fulfillWithRegistry = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(registry, key, selectorName) {
    var namespace,
        resolver,
        _len7,
        args,
        _key7,
        action,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            namespace = registry.stores[key];
            resolver = get(namespace, ['resolvers', selectorName]);

            if (resolver) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return");

          case 4:
            for (_len7 = _args2.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key7 = 3; _key7 < _len7; _key7++) {
              args[_key7 - 3] = _args2[_key7];
            }

            action = resolver.fulfill.apply(resolver, args);

            if (!action) {
              _context2.next = 9;
              break;
            }

            _context2.next = 9;
            return namespace.store.dispatch(action);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _fulfillWithRegistry.apply(this, arguments);
}
//# sourceMappingURL=namespace-store.js.map