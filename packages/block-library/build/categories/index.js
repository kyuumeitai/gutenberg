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
var name = 'core/categories';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Categories'),
  description: (0, _i18n.__)('Display a list of all categories.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Path, {
    d: "M12,2l-5.5,9h11L12,2z M12,5.84L13.93,9h-3.87L12,5.84z"
  }), (0, _element.createElement)(_components.Path, {
    d: "m17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
  }), (0, _element.createElement)(_components.Path, {
    d: "m3 21.5h8v-8h-8v8zm2-6h4v4h-4v-4z"
  })),
  category: 'widgets',
  attributes: {
    align: {
      type: 'string'
    },
    displayAsDropdown: {
      type: 'boolean',
      default: false
    },
    showHierarchy: {
      type: 'boolean',
      default: false
    },
    showPostCounts: {
      type: 'boolean',
      default: false
    }
  },
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align;

    if (['left', 'center', 'right', 'full'].includes(align)) {
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