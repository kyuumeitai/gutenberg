"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var name = 'core/separator';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Separator'),
  description: (0, _i18n.__)('Create a break between ideas or sections with a horizontal separator.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M19 13H5v-2h14v2z"
  })),
  category: 'layout',
  keywords: [(0, _i18n.__)('horizontal-line'), 'hr', (0, _i18n.__)('divider')],
  styles: [{
    name: 'default',
    label: (0, _i18n.__)('Short Line'),
    isDefault: true
  }, {
    name: 'wide',
    label: (0, _i18n.__)('Wide Line')
  }, {
    name: 'dots',
    label: (0, _i18n.__)('Dots')
  }],
  transforms: {
    from: [{
      type: 'pattern',
      trigger: 'enter',
      regExp: /^-{3,}$/,
      transform: function transform() {
        return (0, _blocks.createBlock)('core/separator');
      }
    }, {
      type: 'raw',
      selector: 'hr',
      schema: {
        hr: {}
      }
    }]
  },
  edit: function edit(_ref) {
    var className = _ref.className;
    return (0, _element.createElement)("hr", {
      className: className
    });
  },
  save: function save() {
    return (0, _element.createElement)("hr", null);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map