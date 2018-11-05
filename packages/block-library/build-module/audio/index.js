import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';
import { SVG, Path } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
import { createBlock } from '@wordpress/blocks';
import { createBlobURL } from '@wordpress/blob';
export var name = 'core/audio';
export var settings = {
  title: __('Audio'),
  description: __('Embed a simple audio player.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), createElement(Path, {
    d: "m12 3l0.01 10.55c-0.59-0.34-1.27-0.55-2-0.55-2.22 0-4.01 1.79-4.01 4s1.79 4 4.01 4 3.99-1.79 3.99-4v-10h4v-4h-6zm-1.99 16c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z"
  })),
  category: 'common',
  attributes: {
    src: {
      type: 'string',
      source: 'attribute',
      selector: 'audio',
      attribute: 'src'
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption'
    },
    id: {
      type: 'number'
    },
    autoplay: {
      type: 'boolean',
      source: 'attribute',
      selector: 'audio',
      attribute: 'autoplay'
    },
    loop: {
      type: 'boolean',
      source: 'attribute',
      selector: 'audio',
      attribute: 'loop'
    },
    preload: {
      type: 'string',
      source: 'attribute',
      selector: 'audio',
      attribute: 'preload'
    }
  },
  transforms: {
    from: [{
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length === 1 && files[0].type.indexOf('audio/') === 0;
      },
      transform: function transform(files) {
        var file = files[0]; // We don't need to upload the media directly here
        // It's already done as part of the `componentDidMount`
        // in the audio block

        var block = createBlock('core/audio', {
          src: createBlobURL(file)
        });
        return block;
      }
    }]
  },
  supports: {
    align: true
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var autoplay = attributes.autoplay,
        caption = attributes.caption,
        loop = attributes.loop,
        preload = attributes.preload,
        src = attributes.src;
    return createElement("figure", null, createElement("audio", {
      controls: "controls",
      src: src,
      autoPlay: autoplay,
      loop: loop,
      preload: preload
    }), !RichText.isEmpty(caption) && createElement(RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));
  }
};
//# sourceMappingURL=index.js.map