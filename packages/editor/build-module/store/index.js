/**
 * WordPress Dependencies
 */
import { registerStore } from '@wordpress/data';
/**
 * Internal dependencies
 */

import reducer from './reducer';
import applyMiddlewares from './middlewares';
import * as selectors from './selectors';
import * as actions from './actions';
/**
 * Module Constants
 */

var MODULE_KEY = 'core/editor';
var store = registerStore(MODULE_KEY, {
  reducer: reducer,
  selectors: selectors,
  actions: actions,
  persist: ['preferences']
});
applyMiddlewares(store);
export default store;
//# sourceMappingURL=index.js.map