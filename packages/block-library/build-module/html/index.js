import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Disabled, SandBox, SVG, Path } from '@wordpress/components';
import { getPhrasingContentSchema } from '@wordpress/blocks';
import { BlockControls, PlainText } from '@wordpress/editor';
import { withState } from '@wordpress/compose';
export var name = 'core/html';
export var settings = {
  title: __('Custom HTML'),
  description: __('Add custom HTML code and preview it as you edit.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M4.5,11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5V11z M7,10.5h1.5V15H10v-4.5h1.5V9H7V10.5z M14.5,10l-1-1H12v6h1.5v-3.9  l1,1l1-1V15H17V9h-1.5L14.5,10z M19.5,13.5V9H18v6h5v-1.5H19.5z"
  })),
  category: 'formatting',
  keywords: [__('embed')],
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
              children: getPhrasingContentSchema()
            }
          }
        }
      }
    }]
  },
  edit: withState({
    isPreview: false
  })(function (_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        setState = _ref.setState,
        isPreview = _ref.isPreview;
    return createElement("div", {
      className: "wp-block-html"
    }, createElement(BlockControls, null, createElement("div", {
      className: "components-toolbar"
    }, createElement("button", {
      className: "components-tab-button ".concat(!isPreview ? 'is-active' : ''),
      onClick: function onClick() {
        return setState({
          isPreview: false
        });
      }
    }, createElement("span", null, "HTML")), createElement("button", {
      className: "components-tab-button ".concat(isPreview ? 'is-active' : ''),
      onClick: function onClick() {
        return setState({
          isPreview: true
        });
      }
    }, createElement("span", null, __('Preview'))))), createElement(Disabled.Consumer, null, function (isDisabled) {
      return isPreview || isDisabled ? createElement(SandBox, {
        html: attributes.content
      }) : createElement(PlainText, {
        value: attributes.content,
        onChange: function onChange(content) {
          return setAttributes({
            content: content
          });
        },
        placeholder: __('Write HTML…'),
        "aria-label": __('HTML')
      });
    }));
  }),
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    return createElement(RawHTML, null, attributes.content);
  }
};
//# sourceMappingURL=index.js.map