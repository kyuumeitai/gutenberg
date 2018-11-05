"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
var name = 'core/column';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Column'),
  parent: ['core/columns'],
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"
  })),
  description: (0, _i18n.__)('A single column within a columns block.'),
  category: 'common',
  supports: {
    inserter: false
  },
  edit: function edit() {
    return (0, _element.createElement)(_editor.InnerBlocks, {
      templateLock: false
    });
  },
  save: function save() {
    return (0, _element.createElement)("div", null, (0, _element.createElement)(_editor.InnerBlocks.Content, null));
  }
};
exports.settings = settings;
//# sourceMappingURL=column.js.map