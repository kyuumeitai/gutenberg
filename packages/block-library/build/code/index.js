"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/code';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Code'),
  description: (0, _i18n.__)('Display code snippets that respect your spacing and tabs.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Path, {
    d: "M9.4,16.6L4.8,12l4.6-4.6L8,6l-6,6l6,6L9.4,16.6z M14.6,16.6l4.6-4.6l-4.6-4.6L16,6l6,6l-6,6L14.6,16.6z"
  })),
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'text',
      selector: 'code'
    }
  },
  supports: {
    html: false
  },
  transforms: {
    from: [{
      type: 'pattern',
      trigger: 'enter',
      regExp: /^```$/,
      transform: function transform() {
        return (0, _blocks.createBlock)('core/code');
      }
    }, {
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'PRE' && node.children.length === 1 && node.firstChild.nodeName === 'CODE';
      },
      schema: {
        pre: {
          children: {
            code: {
              children: {
                '#text': {}
              }
            }
          }
        }
      }
    }]
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return (0, _element.createElement)("pre", null, (0, _element.createElement)("code", null, attributes.content));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map