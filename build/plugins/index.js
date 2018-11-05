this.wp=this.wp||{},this.wp.plugins=function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=201)}({0:function(t,n){!function(){t.exports=this.wp.element}()},10:function(t,n,e){"use strict";function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}e.d(n,"a",function(){return r})},11:function(t,n,e){"use strict";e.d(n,"a",function(){return u});var r=e(28),o=e(3);function u(t,n){return!n||"object"!==Object(r.a)(n)&&"function"!=typeof n?Object(o.a)(t):n}},12:function(t,n,e){"use strict";function r(t,n){return(r=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function o(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&r(t,n)}e.d(n,"a",function(){return o})},13:function(t,n,e){"use strict";function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}e.d(n,"a",function(){return r})},15:function(t,n,e){"use strict";function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e.d(n,"a",function(){return r})},18:function(t,n,e){"use strict";function r(){return(r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}).apply(this,arguments)}e.d(n,"a",function(){return r})},2:function(t,n){!function(){t.exports=this.lodash}()},201:function(t,n,e){"use strict";e.r(n);var r=e(10),o=e(9),u=e(11),i=e(13),c=e(12),s=e(3),l=e(0),a=e(2),f=e(23),p=e(18),g=e(6),b=Object(l.createContext)({name:null,icon:null}),d=b.Consumer,y=b.Provider,O=function(t){return Object(g.createHigherOrderComponent)(function(n){return function(e){return Object(l.createElement)(d,null,function(r){return Object(l.createElement)(n,Object(p.a)({},e,t(r,e)))})}},"withPluginContext")},m=e(8),j=e(28),h={};function v(t,n){return"object"!==Object(j.a)(n)?(console.error("No settings object provided!"),null):"string"!=typeof t?(console.error("Plugin names must be strings."),null):/^[a-z][a-z0-9-]*$/.test(t)?(h[t]&&console.error('Plugin "'.concat(t,'" is already registered.')),n=Object(f.applyFilters)("plugins.registerPlugin",n,t),Object(a.isFunction)(n.render)?(h[t]=Object(m.a)({name:t,icon:"admin-plugins"},n),Object(f.doAction)("plugins.pluginRegistered",n,t),n):(console.error('The "render" property must be specified and must be a valid function.'),null)):(console.error('Plugin names must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".'),null)}function P(t){if(h[t]){var n=h[t];return delete h[t],Object(f.doAction)("plugins.pluginUnregistered",n,t),n}console.error('Plugin "'+t+'" is not registered.')}function w(t){return h[t]}function S(){return Object.values(h)}var x=function(t){function n(){var t;return Object(r.a)(this,n),(t=Object(u.a)(this,Object(i.a)(n).apply(this,arguments))).setPlugins=t.setPlugins.bind(Object(s.a)(Object(s.a)(t))),t.state=t.getCurrentPluginsState(),t}return Object(c.a)(n,t),Object(o.a)(n,[{key:"getCurrentPluginsState",value:function(){return{plugins:Object(a.map)(S(),function(t){var n=t.icon,e=t.name;return{Plugin:t.render,context:{name:e,icon:n}}})}}},{key:"componentDidMount",value:function(){Object(f.addAction)("plugins.pluginRegistered","core/plugins/plugin-area/plugins-registered",this.setPlugins),Object(f.addAction)("plugins.pluginUnregistered","core/plugins/plugin-area/plugins-unregistered",this.setPlugins)}},{key:"componentWillUnmount",value:function(){Object(f.removeAction)("plugins.pluginRegistered","core/plugins/plugin-area/plugins-registered"),Object(f.removeAction)("plugins.pluginUnregistered","core/plugins/plugin-area/plugins-unregistered")}},{key:"setPlugins",value:function(){this.setState(this.getCurrentPluginsState)}},{key:"render",value:function(){return Object(l.createElement)("div",{style:{display:"none"}},Object(a.map)(this.state.plugins,function(t){var n=t.context,e=t.Plugin;return Object(l.createElement)(y,{key:n.name,value:n},Object(l.createElement)(e,null))}))}}]),n}(l.Component);e.d(n,"PluginArea",function(){return x}),e.d(n,"withPluginContext",function(){return O}),e.d(n,"registerPlugin",function(){return v}),e.d(n,"unregisterPlugin",function(){return P}),e.d(n,"getPlugin",function(){return w}),e.d(n,"getPlugins",function(){return S})},23:function(t,n){!function(){t.exports=this.wp.hooks}()},28:function(t,n,e){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return(o="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(t){return r(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t)})(t)}e.d(n,"a",function(){return o})},3:function(t,n,e){"use strict";function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}e.d(n,"a",function(){return r})},6:function(t,n){!function(){t.exports=this.wp.compose}()},8:function(t,n,e){"use strict";e.d(n,"a",function(){return o});var r=e(15);function o(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},o=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.forEach(function(n){Object(r.a)(t,n,e[n])})}return t}},9:function(t,n,e){"use strict";function r(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,n,e){return n&&r(t.prototype,n),e&&r(t,e),t}e.d(n,"a",function(){return o})}});