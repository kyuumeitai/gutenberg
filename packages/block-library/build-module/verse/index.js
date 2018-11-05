import { createElement } from "@wordpress/element";

/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { RichText, BlockControls, AlignmentToolbar } from '@wordpress/editor';
import { SVG, Path } from '@wordpress/components';
export var name = 'core/verse';
export var settings = {
  title: __('Verse'),
  description: __('Insert poetry. Use special spacing formats. Or quote song lyrics.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(Path, {
    d: "M3 17v4h4l11-11-4-4L3 17zm3 2H5v-1l9-9 1 1-9 9zM21 6l-3-3h-1l-2 2 4 4 2-2V6z"
  })),
  category: 'formatting',
  keywords: [__('poetry')],
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'pre',
      default: ''
    },
    textAlign: {
      type: 'string'
    }
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return createBlock('core/verse', attributes);
      }
    }],
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
        className = _ref.className,
        mergeBlocks = _ref.mergeBlocks;
    var textAlign = attributes.textAlign,
        content = attributes.content;
    return createElement(Fragment, null, createElement(BlockControls, null, createElement(AlignmentToolbar, {
      value: textAlign,
      onChange: function onChange(nextAlign) {
        setAttributes({
          textAlign: nextAlign
        });
      }
    })), createElement(RichText, {
      tagName: "pre",
      value: content,
      onChange: function onChange(nextContent) {
        setAttributes({
          content: nextContent
        });
      },
      style: {
        textAlign: textAlign
      },
      placeholder: __('Write…'),
      wrapperClassName: className,
      onMerge: mergeBlocks
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var textAlign = attributes.textAlign,
        content = attributes.content;
    return createElement(RichText.Content, {
      tagName: "pre",
      className: className,
      style: {
        textAlign: textAlign
      },
      value: content
    });
  },
  merge: function merge(attributes, attributesToMerge) {
    return {
      content: attributes.content + attributesToMerge.content
    };
  }
};
//# sourceMappingURL=index.js.map