"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _edit = _interopRequireDefault(require("./edit"));

var _blocks = require("@wordpress/blocks");

var _blob = require("@wordpress/blob");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/audio';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Audio'),
  description: (0, _i18n.__)('Embed a simple audio player.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Path, {
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

        var block = (0, _blocks.createBlock)('core/audio', {
          src: (0, _blob.createBlobURL)(file)
        });
        return block;
      }
    }]
  },
  supports: {
    align: true
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var autoplay = attributes.autoplay,
        caption = attributes.caption,
        loop = attributes.loop,
        preload = attributes.preload,
        src = attributes.src;
    return (0, _element.createElement)("figure", null, (0, _element.createElement)("audio", {
      controls: "controls",
      src: src,
      autoPlay: autoplay,
      loop: loop,
      preload: preload
    }), !_editor.RichText.isEmpty(caption) && (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map