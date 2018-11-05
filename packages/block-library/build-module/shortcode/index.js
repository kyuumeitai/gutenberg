import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { removep, autop } from '@wordpress/autop';
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Dashicon, SVG, Path } from '@wordpress/components';
import { PlainText } from '@wordpress/editor';
import { withInstanceId } from '@wordpress/compose';
export var name = 'core/shortcode';
export var settings = {
  title: __('Shortcode'),
  description: __('Insert additional custom elements with a WordPress shortcode.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
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
            return removep(autop(content));
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
  edit: withInstanceId(function (_ref2) {
    var attributes = _ref2.attributes,
        setAttributes = _ref2.setAttributes,
        instanceId = _ref2.instanceId;
    var inputId = "blocks-shortcode-input-".concat(instanceId);
    return createElement("div", {
      className: "wp-block-shortcode"
    }, createElement("label", {
      htmlFor: inputId
    }, createElement(Dashicon, {
      icon: "shortcode"
    }), __('Shortcode')), createElement(PlainText, {
      className: "input-control",
      id: inputId,
      value: attributes.text,
      placeholder: __('Write shortcode here…'),
      onChange: function onChange(text) {
        return setAttributes({
          text: text
        });
      }
    }));
  }),
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    return createElement(RawHTML, null, attributes.text);
  }
};
//# sourceMappingURL=index.js.map