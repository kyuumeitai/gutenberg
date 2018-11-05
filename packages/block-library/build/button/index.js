"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var blockAttributes = {
  url: {
    type: 'string',
    source: 'attribute',
    selector: 'a',
    attribute: 'href'
  },
  title: {
    type: 'string',
    source: 'attribute',
    selector: 'a',
    attribute: 'title'
  },
  text: {
    type: 'string',
    source: 'html',
    selector: 'a'
  },
  backgroundColor: {
    type: 'string'
  },
  textColor: {
    type: 'string'
  },
  customBackgroundColor: {
    type: 'string'
  },
  customTextColor: {
    type: 'string'
  }
};
var name = 'core/button';
exports.name = name;

var colorsMigration = function colorsMigration(attributes) {
  return (0, _lodash.omit)((0, _objectSpread2.default)({}, attributes, {
    customTextColor: attributes.textColor && '#' === attributes.textColor[0] ? attributes.textColor : undefined,
    customBackgroundColor: attributes.color && '#' === attributes.color[0] ? attributes.color : undefined
  }), ['color', 'textColor']);
};

var settings = {
  title: (0, _i18n.__)('Button'),
  description: (0, _i18n.__)('Prompt visitors to take action with a custom button.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M19 6H5L3 8v8l2 2h14l2-2V8l-2-2zm0 10H5V8h14v8z"
  }))),
  category: 'layout',
  attributes: blockAttributes,
  supports: {
    align: true,
    alignWide: false
  },
  styles: [{
    name: 'default',
    label: (0, _i18n._x)('Rounded', 'block style'),
    isDefault: true
  }, {
    name: 'outline',
    label: (0, _i18n.__)('Outline')
  }, {
    name: 'squared',
    label: (0, _i18n._x)('Squared', 'block style')
  }],
  edit: _edit.default,
  save: function save(_ref) {
    var _classnames;

    var attributes = _ref.attributes;
    var url = attributes.url,
        text = attributes.text,
        title = attributes.title,
        backgroundColor = attributes.backgroundColor,
        textColor = attributes.textColor,
        customBackgroundColor = attributes.customBackgroundColor,
        customTextColor = attributes.customTextColor;
    var textClass = (0, _editor.getColorClassName)('color', textColor);
    var backgroundClass = (0, _editor.getColorClassName)('background-color', backgroundColor);
    var buttonClasses = (0, _classnames2.default)('wp-block-button__link', (_classnames = {
      'has-text-color': textColor || customTextColor
    }, (0, _defineProperty2.default)(_classnames, textClass, textClass), (0, _defineProperty2.default)(_classnames, 'has-background', backgroundColor || customBackgroundColor), (0, _defineProperty2.default)(_classnames, backgroundClass, backgroundClass), _classnames));
    var buttonStyle = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor
    };
    return (0, _element.createElement)("div", null, (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "a",
      className: buttonClasses,
      href: url,
      title: title,
      style: buttonStyle,
      value: text
    }));
  },
  deprecated: [{
    attributes: (0, _objectSpread2.default)({}, (0, _lodash.pick)(blockAttributes, ['url', 'title', 'text']), {
      color: {
        type: 'string'
      },
      textColor: {
        type: 'string'
      },
      align: {
        type: 'string',
        default: 'none'
      }
    }),
    save: function save(_ref2) {
      var attributes = _ref2.attributes;
      var url = attributes.url,
          text = attributes.text,
          title = attributes.title,
          align = attributes.align,
          color = attributes.color,
          textColor = attributes.textColor;
      var buttonStyle = {
        backgroundColor: color,
        color: textColor
      };
      var linkClass = 'wp-block-button__link';
      return (0, _element.createElement)("div", {
        className: "align".concat(align)
      }, (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "a",
        className: linkClass,
        href: url,
        title: title,
        style: buttonStyle,
        value: text
      }));
    },
    migrate: colorsMigration
  }, {
    attributes: (0, _objectSpread2.default)({}, (0, _lodash.pick)(blockAttributes, ['url', 'title', 'text']), {
      color: {
        type: 'string'
      },
      textColor: {
        type: 'string'
      },
      align: {
        type: 'string',
        default: 'none'
      }
    }),
    save: function save(_ref3) {
      var attributes = _ref3.attributes;
      var url = attributes.url,
          text = attributes.text,
          title = attributes.title,
          align = attributes.align,
          color = attributes.color,
          textColor = attributes.textColor;
      return (0, _element.createElement)("div", {
        className: "align".concat(align),
        style: {
          backgroundColor: color
        }
      }, (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "a",
        href: url,
        title: title,
        style: {
          color: textColor
        },
        value: text
      }));
    },
    migrate: colorsMigration
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map