"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var name = 'core/template';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Reusable Template'),
  category: 'reusable',
  description: (0, _i18n.__)('Template block used as a container.'),
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.Rect, {
    x: "0",
    fill: "none",
    width: "24",
    height: "24"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M19 3H5c-1.105 0-2 .895-2 2v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zM6 6h5v5H6V6zm4.5 13C9.12 19 8 17.88 8 16.5S9.12 14 10.5 14s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm3-6l3-5 3 5h-6z"
  }))),
  supports: {
    customClassName: false,
    html: false,
    inserter: false
  },
  edit: function edit() {
    return (0, _element.createElement)(_editor.InnerBlocks, null);
  },
  save: function save() {
    return (0, _element.createElement)(_editor.InnerBlocks.Content, null);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map