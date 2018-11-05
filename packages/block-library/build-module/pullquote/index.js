import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { get, includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { getColorClassName, RichText, getColorObjectByAttributeValues } from '@wordpress/editor';
import { select } from '@wordpress/data';
import { Path, Polygon, SVG } from '@wordpress/components';
import { default as edit, SOLID_COLOR_STYLE_NAME, SOLID_COLOR_CLASS } from './edit';
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
export var name = 'core/pullquote';
export var settings = {
  title: __('Pullquote'),
  description: __('Give special visual emphasis to a quote from your text.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), createElement(Polygon, {
    points: "21 18 2 18 2 20 21 20"
  }), createElement(Path, {
    d: "m19 10v4h-15v-4h15m1-2h-17c-0.55 0-1 0.45-1 1v6c0 0.55 0.45 1 1 1h17c0.55 0 1-0.45 1-1v-6c0-0.55-0.45-1-1-1z"
  }), createElement(Polygon, {
    points: "21 4 2 4 2 6 21 6"
  })),
  category: 'formatting',
  attributes: blockAttributes,
  styles: [{
    name: 'default',
    label: _x('Regular', 'block style'),
    isDefault: true
  }, {
    name: SOLID_COLOR_STYLE_NAME,
    label: __('Solid Color')
  }],
  supports: {
    align: ['left', 'right', 'wide', 'full']
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var mainColor = attributes.mainColor,
        customMainColor = attributes.customMainColor,
        textColor = attributes.textColor,
        customTextColor = attributes.customTextColor,
        value = attributes.value,
        citation = attributes.citation,
        className = attributes.className;
    var isSolidColorStyle = includes(className, SOLID_COLOR_CLASS);
    var figureClass, figureStyles; // Is solid color style

    if (isSolidColorStyle) {
      figureClass = getColorClassName('background-color', mainColor);

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
      var colors = get(select('core/editor').getEditorSettings(), ['colors'], []);
      var colorObject = getColorObjectByAttributeValues(colors, mainColor);
      figureStyles = {
        borderColor: colorObject.color
      };
    }

    var blockquoteTextColorClass = getColorClassName('color', textColor);
    var blockquoteClasses = textColor || customTextColor ? classnames('has-text-color', _defineProperty({}, blockquoteTextColorClass, blockquoteTextColorClass)) : undefined;
    var blockquoteStyle = blockquoteTextColorClass ? undefined : {
      color: customTextColor
    };
    return createElement("figure", {
      className: figureClass,
      style: figureStyles
    }, createElement("blockquote", {
      className: blockquoteClasses,
      style: blockquoteStyle
    }, createElement(RichText.Content, {
      value: value,
      multiline: true
    }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
      tagName: "cite",
      value: citation
    })));
  },
  deprecated: [{
    attributes: _objectSpread({}, blockAttributes),
    save: function save(_ref2) {
      var attributes = _ref2.attributes;
      var value = attributes.value,
          citation = attributes.citation;
      return createElement("blockquote", null, createElement(RichText.Content, {
        value: value,
        multiline: true
      }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
        tagName: "cite",
        value: citation
      }));
    }
  }, {
    attributes: _objectSpread({}, blockAttributes, {
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
      return createElement("blockquote", {
        className: "align".concat(align)
      }, createElement(RichText.Content, {
        value: value,
        multiline: true
      }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
        tagName: "footer",
        value: citation
      }));
    }
  }]
};
//# sourceMappingURL=index.js.map