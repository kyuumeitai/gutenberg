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
 * WordPress dependencies.
 */

/**
 * Internal dependencies.
 */
var name = 'core/latest-comments';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Latest Comments'),
  description: (0, _i18n.__)('Display a list of your most recent comments.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M22 4l-2-2H4L2 4v12l2 2h14l4 4V4zm-2 0v13l-1-1H4V4h16z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M6 12h12v2H6zM6 9h12v2H6zM6 6h12v2H6z"
  }))),
  category: 'widgets',
  keywords: [(0, _i18n.__)('recent comments')],
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align; // TODO: Use consistent values across the app;
    // see: https://github.com/WordPress/gutenberg/issues/7908.

    if (['left', 'center', 'right', 'wide', 'full'].includes(align)) {
      return {
        'data-align': align
      };
    }
  },
  edit: _edit.default,
  save: function save() {
    return null;
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map