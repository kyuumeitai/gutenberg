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
var name = 'core/freeform';
exports.name = name;
var settings = {
  title: (0, _i18n._x)('Classic', 'block title'),
  description: (0, _i18n.__)('Use the classic WordPress editor.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Path, {
    d: "m20 7v10h-16v-10h16m0-2h-16c-1.1 0-1.99 0.9-1.99 2l-0.01 10c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2z"
  }), (0, _element.createElement)(_components.Rect, {
    x: "11",
    y: "8",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "11",
    y: "11",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "8",
    y: "8",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "8",
    y: "11",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "5",
    y: "11",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "5",
    y: "8",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "8",
    y: "14",
    width: "8",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "14",
    y: "11",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "14",
    y: "8",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "17",
    y: "11",
    width: "2",
    height: "2"
  }), (0, _element.createElement)(_components.Rect, {
    x: "17",
    y: "8",
    width: "2",
    height: "2"
  })),
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html'
    }
  },
  supports: {
    className: false,
    customClassName: false
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var content = attributes.content;
    return (0, _element.createElement)(_element.RawHTML, null, content);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map