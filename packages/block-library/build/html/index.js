"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var name = 'core/html';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Custom HTML'),
  description: (0, _i18n.__)('Add custom HTML code and preview it as you edit.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M4.5,11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5V11z M7,10.5h1.5V15H10v-4.5h1.5V9H7V10.5z M14.5,10l-1-1H12v6h1.5v-3.9  l1,1l1-1V15H17V9h-1.5L14.5,10z M19.5,13.5V9H18v6h5v-1.5H19.5z"
  })),
  category: 'formatting',
  keywords: [(0, _i18n.__)('embed')],
  supports: {
    customClassName: false,
    className: false,
    html: false
  },
  attributes: {
    content: {
      type: 'string',
      source: 'html'
    }
  },
  transforms: {
    from: [{
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'FIGURE' && !!node.querySelector('iframe');
      },
      schema: {
        figure: {
          require: ['iframe'],
          children: {
            iframe: {
              attributes: ['src', 'allowfullscreen', 'height', 'width']
            },
            figcaption: {
              children: (0, _blocks.getPhrasingContentSchema)()
            }
          }
        }
      }
    }]
  },
  edit: (0, _compose.withState)({
    isPreview: false
  })(function (_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        setState = _ref.setState,
        isPreview = _ref.isPreview;
    return (0, _element.createElement)("div", {
      className: "wp-block-html"
    }, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)("div", {
      className: "components-toolbar"
    }, (0, _element.createElement)("button", {
      className: "components-tab-button ".concat(!isPreview ? 'is-active' : ''),
      onClick: function onClick() {
        return setState({
          isPreview: false
        });
      }
    }, (0, _element.createElement)("span", null, "HTML")), (0, _element.createElement)("button", {
      className: "components-tab-button ".concat(isPreview ? 'is-active' : ''),
      onClick: function onClick() {
        return setState({
          isPreview: true
        });
      }
    }, (0, _element.createElement)("span", null, (0, _i18n.__)('Preview'))))), (0, _element.createElement)(_components.Disabled.Consumer, null, function (isDisabled) {
      return isPreview || isDisabled ? (0, _element.createElement)(_components.SandBox, {
        html: attributes.content
      }) : (0, _element.createElement)(_editor.PlainText, {
        value: attributes.content,
        onChange: function onChange(content) {
          return setAttributes({
            content: content
          });
        },
        placeholder: (0, _i18n.__)('Write HTML…'),
        "aria-label": (0, _i18n.__)('HTML')
      });
    }));
  }),
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    return (0, _element.createElement)(_element.RawHTML, null, attributes.content);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map