"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _edit = _interopRequireWildcard(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var blockAttributes = {
  value: {
    type: 'string',
    source: 'html',
    selector: 'blockquote',
    multiline: 'p'
  },
  citation: {
    type: 'string',
    source: 'html',
    selector: 'cite',
    default: ''
  },
  mainColor: {
    type: 'string'
  },
  customMainColor: {
    type: 'string'
  },
  textColor: {
    type: 'string'
  },
  customTextColor: {
    type: 'string'
  }
};
var name = 'core/pullquote';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Pullquote'),
  description: (0, _i18n.__)('Give special visual emphasis to a quote from your text.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Polygon, {
    points: "21 18 2 18 2 20 21 20"
  }), (0, _element.createElement)(_components.Path, {
    d: "m19 10v4h-15v-4h15m1-2h-17c-0.55 0-1 0.45-1 1v6c0 0.55 0.45 1 1 1h17c0.55 0 1-0.45 1-1v-6c0-0.55-0.45-1-1-1z"
  }), (0, _element.createElement)(_components.Polygon, {
    points: "21 4 2 4 2 6 21 6"
  })),
  category: 'formatting',
  attributes: blockAttributes,
  styles: [{
    name: 'default',
    label: (0, _i18n._x)('Regular', 'block style'),
    isDefault: true
  }, {
    name: _edit.SOLID_COLOR_STYLE_NAME,
    label: (0, _i18n.__)('Solid Color')
  }],
  supports: {
    align: ['left', 'right', 'wide', 'full']
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var mainColor = attributes.mainColor,
        customMainColor = attributes.customMainColor,
        textColor = attributes.textColor,
        customTextColor = attributes.customTextColor,
        value = attributes.value,
        citation = attributes.citation,
        className = attributes.className;
    var isSolidColorStyle = (0, _lodash.includes)(className, _edit.SOLID_COLOR_CLASS);
    var figureClass, figureStyles; // Is solid color style

    if (isSolidColorStyle) {
      figureClass = (0, _editor.getColorClassName)('background-color', mainColor);

      if (!figureClass) {
        figureStyles = {
          backgroundColor: customMainColor
        };
      } // Is normal style and a custom color is being used ( we can set a style directly with its value)

    } else if (customMainColor) {
      figureStyles = {
        borderColor: customMainColor
      }; // Is normal style and a named color is being used, we need to retrieve the color value to set the style,
      // as there is no expectation that themes create classes that set border colors.
    } else if (mainColor) {
      var colors = (0, _lodash.get)((0, _data.select)('core/editor').getEditorSettings(), ['colors'], []);
      var colorObject = (0, _editor.getColorObjectByAttributeValues)(colors, mainColor);
      figureStyles = {
        borderColor: colorObject.color
      };
    }

    var blockquoteTextColorClass = (0, _editor.getColorClassName)('color', textColor);
    var blockquoteClasses = textColor || customTextColor ? (0, _classnames2.default)('has-text-color', (0, _defineProperty2.default)({}, blockquoteTextColorClass, blockquoteTextColorClass)) : undefined;
    var blockquoteStyle = blockquoteTextColorClass ? undefined : {
      color: customTextColor
    };
    return (0, _element.createElement)("figure", {
      className: figureClass,
      style: figureStyles
    }, (0, _element.createElement)("blockquote", {
      className: blockquoteClasses,
      style: blockquoteStyle
    }, (0, _element.createElement)(_editor.RichText.Content, {
      value: value,
      multiline: true
    }), !_editor.RichText.isEmpty(citation) && (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "cite",
      value: citation
    })));
  },
  deprecated: [{
    attributes: (0, _objectSpread2.default)({}, blockAttributes),
    save: function save(_ref2) {
      var attributes = _ref2.attributes;
      var value = attributes.value,
          citation = attributes.citation;
      return (0, _element.createElement)("blockquote", null, (0, _element.createElement)(_editor.RichText.Content, {
        value: value,
        multiline: true
      }), !_editor.RichText.isEmpty(citation) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "cite",
        value: citation
      }));
    }
  }, {
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
      citation: {
        type: 'string',
        source: 'html',
        selector: 'footer'
      },
      align: {
        type: 'string',
        default: 'none'
      }
    }),
    save: function save(_ref3) {
      var attributes = _ref3.attributes;
      var value = attributes.value,
          citation = attributes.citation,
          align = attributes.align;
      return (0, _element.createElement)("blockquote", {
        className: "align".concat(align)
      }, (0, _element.createElement)(_editor.RichText.Content, {
        value: value,
        multiline: true
      }), !_editor.RichText.isEmpty(citation) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "footer",
        value: citation
      }));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map