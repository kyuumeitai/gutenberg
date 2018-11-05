"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/archives';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Archives'),
  description: (0, _i18n.__)('Display a monthly archive of your posts.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M7 11h2v2H7v-2zm14-5v14l-2 2H5l-2-2V6l2-2h1V2h2v2h8V2h2v2h1l2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"
  }))),
  category: 'widgets',
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align;

    if (['left', 'center', 'right'].includes(align)) {
      return {
        'data-align': align
      };
    }
  },
  edit: _edit.default,
  save: function save() {
    // Handled by PHP.
    return null;
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map