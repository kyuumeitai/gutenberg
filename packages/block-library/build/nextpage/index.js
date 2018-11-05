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
var name = 'core/nextpage';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Page Break'),
  description: (0, _i18n.__)('Separate your content into a multi-page experience.'),
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M9 12h6v-2H9zm-7 0h5v-2H2zm15 0h5v-2h-5zm3 2v2l-6 6H6a2 2 0 0 1-2-2v-6h2v6h6v-4a2 2 0 0 1 2-2h6zM4 8V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4h-2V4H6v4z"
  }))),
  category: 'layout',
  keywords: [(0, _i18n.__)('next page'), (0, _i18n.__)('pagination')],
  supports: {
    customClassName: false,
    className: false,
    html: false
  },
  attributes: {},
  transforms: {
    from: [{
      type: 'raw',
      schema: {
        'wp-block': {
          attributes: ['data-block']
        }
      },
      isMatch: function isMatch(node) {
        return node.dataset && node.dataset.block === 'core/nextpage';
      },
      transform: function transform() {
        return (0, _blocks.createBlock)('core/nextpage', {});
      }
    }]
  },
  edit: _edit.default,
  save: function save() {
    return (0, _element.createElement)(_element.RawHTML, null, '<!--nextpage-->');
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map