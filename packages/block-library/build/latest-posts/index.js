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
var name = 'core/latest-posts';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Latest Posts'),
  description: (0, _i18n.__)('Display a list of your most recent posts.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Rect, {
    x: "11",
    y: "7",
    width: "6",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "11",
    y: "11",
    width: "6",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "11",
    y: "15",
    width: "6",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "7",
    y: "7",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "7",
    y: "11",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "7",
    y: "15",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Path, {
    d: "M20.1,3H3.9C3.4,3,3,3.4,3,3.9v16.2C3,20.5,3.4,21,3.9,21h16.2c0.4,0,0.9-0.5,0.9-0.9V3.9C21,3.4,20.5,3,20.1,3z M19,19H5V5h14V19z"
  })),
  category: 'widgets',
  keywords: [(0, _i18n.__)('recent posts')],
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align;

    if ('left' === align || 'right' === align || 'wide' === align || 'full' === align) {
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