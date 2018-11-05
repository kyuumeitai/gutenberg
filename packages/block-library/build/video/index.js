"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _blocks = require("@wordpress/blocks");

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/video';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Video'),
  description: (0, _i18n.__)('Embed a video from your media library or upload a new one.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M4 6l2 4h14v8H4V6m18-2h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4L2 6v12l2 2h16l2-2V4z"
  })),
  keywords: [(0, _i18n.__)('movie')],
  category: 'common',
  attributes: {
    autoplay: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'autoplay'
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption'
    },
    controls: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'controls',
      default: true
    },
    id: {
      type: 'number'
    },
    loop: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'loop'
    },
    muted: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'muted'
    },
    poster: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'poster'
    },
    preload: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'preload',
      default: 'metadata'
    },
    src: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'src'
    }
  },
  transforms: {
    from: [{
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length === 1 && files[0].type.indexOf('video/') === 0;
      },
      transform: function transform(files) {
        var file = files[0]; // We don't need to upload the media directly here
        // It's already done as part of the `componentDidMount`
        // in the video block

        var block = (0, _blocks.createBlock)('core/video', {
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
        controls = attributes.controls,
        loop = attributes.loop,
        muted = attributes.muted,
        poster = attributes.poster,
        preload = attributes.preload,
        src = attributes.src;
    return (0, _element.createElement)("figure", null, src && (0, _element.createElement)("video", {
      autoPlay: autoplay,
      controls: controls,
      loop: loop,
      muted: muted,
      poster: poster,
      preload: preload !== 'metadata' ? preload : undefined,
      src: src
    }), !_editor.RichText.isEmpty(caption) && (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map