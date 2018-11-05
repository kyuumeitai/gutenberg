import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { RichText, BlockControls, AlignmentToolbar } from '@wordpress/editor';
import { SVG, Path } from '@wordpress/components';
export var name = 'core/subhead';
export var settings = {
  title: __('Subheading (deprecated)'),
  description: __('This block is deprecated. Please use the Paragraph block instead.'),
  icon: createElement(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement(Path, {
    d: "M7.1 6l-.5 3h4.5L9.4 19h3l1.8-10h4.5l.5-3H7.1z"
  })),
  category: 'common',
  supports: {
    // Hide from inserter as this block is deprecated.
    inserter: false,
    multiple: false
  },
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'p'
    },
    align: {
      type: 'string'
    }
  },
  transforms: {
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return createBlock('core/paragraph', attributes);
      }
    }]
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var align = attributes.align,
        content = attributes.content,
        placeholder = attributes.placeholder;
    deprecated('The Subheading block', {
      alternative: 'the Paragraph block',
      plugin: 'Gutenberg'
    });
    return createElement(Fragment, null, createElement(BlockControls, null, createElement(AlignmentToolbar, {
      value: align,
      onChange: function onChange(nextAlign) {
        setAttributes({
          align: nextAlign
        });
      }
    })), createElement(RichText, {
      tagName: "p",
      value: content,
      onChange: function onChange(nextContent) {
        setAttributes({
          content: nextContent
        });
      },
      style: {
        textAlign: align
      },
      className: className,
      placeholder: placeholder || __('Write subheading…')
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var align = attributes.align,
        content = attributes.content;
    return createElement(RichText.Content, {
      tagName: "p",
      className: className,
      style: {
        textAlign: align
      },
      value: content
    });
  }
};
//# sourceMappingURL=index.js.map