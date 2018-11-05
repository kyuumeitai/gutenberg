"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _autop = require("@wordpress/autop");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var name = 'core/shortcode';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Shortcode'),
  description: (0, _i18n.__)('Insert additional custom elements with a WordPress shortcode.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M8.5,21.4l1.9,0.5l5.2-19.3l-1.9-0.5L8.5,21.4z M3,19h4v-2H5V7h2V5H3V19z M17,5v2h2v10h-2v2h4V5H17z"
  })),
  category: 'widgets',
  attributes: {
    text: {
      type: 'string',
      source: 'text'
    }
  },
  transforms: {
    from: [{
      type: 'shortcode',
      // Per "Shortcode names should be all lowercase and use all
      // letters, but numbers and underscores should work fine too.
      // Be wary of using hyphens (dashes), you'll be better off not
      // using them." in https://codex.wordpress.org/Shortcode_API
      // Require that the first character be a letter. This notably
      // prevents footnote markings ([1]) from being caught as
      // shortcodes.
      tag: '[a-z][a-z0-9_-]*',
      attributes: {
        text: {
          type: 'string',
          shortcode: function shortcode(attrs, _ref) {
            var content = _ref.content;
            return (0, _autop.removep)((0, _autop.autop)(content));
          }
        }
      },
      priority: 20
    }]
  },
  supports: {
    customClassName: false,
    className: false,
    html: false
  },
  edit: (0, _compose.withInstanceId)(function (_ref2) {
    var attributes = _ref2.attributes,
        setAttributes = _ref2.setAttributes,
        instanceId = _ref2.instanceId;
    var inputId = "blocks-shortcode-input-".concat(instanceId);
    return (0, _element.createElement)("div", {
      className: "wp-block-shortcode"
    }, (0, _element.createElement)("label", {
      htmlFor: inputId
    }, (0, _element.createElement)(_components.Dashicon, {
      icon: "shortcode"
    }), (0, _i18n.__)('Shortcode')), (0, _element.createElement)(_editor.PlainText, {
      className: "input-control",
      id: inputId,
      value: attributes.text,
      placeholder: (0, _i18n.__)('Write shortcode here…'),
      onChange: function onChange(text) {
        return setAttributes({
          text: text
        });
      }
    }));
  }),
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    return (0, _element.createElement)(_element.RawHTML, null, attributes.text);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map