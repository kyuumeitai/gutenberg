"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _edit = _interopRequireWildcard(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
// Attributes are to be saved as JSON in the block boundary for easier
// server-side access.
var blockAttributes = {
  images: {
    type: 'array',
    default: [],
    query: {
      url: {
        source: 'attribute',
        selector: 'img',
        attribute: 'src'
      },
      link: {
        source: 'attribute',
        selector: 'img',
        attribute: 'data-link'
      },
      alt: {
        source: 'attribute',
        selector: 'img',
        attribute: 'alt',
        default: ''
      },
      id: {
        source: 'attribute',
        selector: 'img',
        attribute: 'data-id'
      },
      caption: {
        type: 'string',
        source: 'html',
        selector: 'figcaption'
      }
    }
  },
  columns: {
    type: 'number'
  },
  imageCrop: {
    type: 'boolean',
    default: true
  },
  linkTo: {
    type: 'string',
    default: 'none'
  }
}; // Identical schema, but wherein `images` are not saved in the block boundary,
// and instead are sourced in the block's inner HTML.

var deprecatedBlockAttributes = (0, _objectSpread2.default)({}, blockAttributes, {
  images: (0, _objectSpread2.default)({}, blockAttributes.images, {
    source: 'query',
    selector: 'ul.wp-block-gallery .blocks-gallery-item'
  })
});

function save(_ref) {
  var attributes = _ref.attributes;
  var images = attributes.images,
      _attributes$columns = attributes.columns,
      columns = _attributes$columns === void 0 ? (0, _edit.defaultColumnsNumber)(attributes) : _attributes$columns,
      imageCrop = attributes.imageCrop,
      linkTo = attributes.linkTo;
  return (0, _element.createElement)("ul", {
    className: "columns-".concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
  }, images.map(function (image) {
    var href;

    switch (linkTo) {
      case 'media':
        href = image.url;
        break;

      case 'attachment':
        href = image.link;
        break;
    }

    var img = (0, _element.createElement)("img", {
      src: image.url,
      alt: image.alt,
      "data-id": image.id,
      "data-link": image.link,
      className: image.id ? "wp-image-".concat(image.id) : null
    });
    return (0, _element.createElement)("li", {
      key: image.id || image.url,
      className: "blocks-gallery-item"
    }, (0, _element.createElement)("figure", null, href ? (0, _element.createElement)("a", {
      href: href
    }, img) : img, image.caption && image.caption.length > 0 && (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "figcaption",
      value: image.caption
    })));
  }));
}

var name = 'core/gallery';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Gallery'),
  description: (0, _i18n.__)('Display multiple images in a rich gallery.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M20 4v12H8V4h12m0-2H8L6 4v12l2 2h12l2-2V4l-2-2z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M12 12l1 2 3-3 3 4H9z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M2 6v14l2 2h14v-2H4V6H2z"
  }))),
  category: 'common',
  keywords: [(0, _i18n.__)('images'), (0, _i18n.__)('photos')],
  attributes: blockAttributes,
  supports: {
    align: true
  },
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/image'],
      transform: function transform(attributes) {
        var validImages = (0, _lodash.filter)(attributes, function (_ref2) {
          var id = _ref2.id,
              url = _ref2.url;
          return id && url;
        });

        if (validImages.length > 0) {
          return (0, _blocks.createBlock)('core/gallery', {
            images: validImages.map(function (_ref3) {
              var id = _ref3.id,
                  url = _ref3.url,
                  alt = _ref3.alt,
                  caption = _ref3.caption;
              return {
                id: id,
                url: url,
                alt: alt,
                caption: caption
              };
            })
          });
        }

        return (0, _blocks.createBlock)('core/gallery');
      }
    }, {
      type: 'shortcode',
      tag: 'gallery',
      attributes: {
        images: {
          type: 'array',
          shortcode: function shortcode(_ref4) {
            var ids = _ref4.named.ids;

            if (!ids) {
              return [];
            }

            return ids.split(',').map(function (id) {
              return {
                id: parseInt(id, 10)
              };
            });
          }
        },
        columns: {
          type: 'number',
          shortcode: function shortcode(_ref5) {
            var _ref5$named$columns = _ref5.named.columns,
                columns = _ref5$named$columns === void 0 ? '3' : _ref5$named$columns;
            return parseInt(columns, 10);
          }
        },
        linkTo: {
          type: 'string',
          shortcode: function shortcode(_ref6) {
            var _ref6$named$link = _ref6.named.link,
                link = _ref6$named$link === void 0 ? 'attachment' : _ref6$named$link;
            return link === 'file' ? 'media' : link;
          }
        }
      }
    }, {
      // When created by drag and dropping multiple files on an insertion point
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length !== 1 && (0, _lodash.every)(files, function (file) {
          return file.type.indexOf('image/') === 0;
        });
      },
      transform: function transform(files, onChange) {
        var block = (0, _blocks.createBlock)('core/gallery', {
          images: files.map(function (file) {
            return (0, _edit.pickRelevantMediaFiles)({
              url: (0, _blob.createBlobURL)(file)
            });
          })
        });
        (0, _editor.mediaUpload)({
          filesList: files,
          onFileChange: function onFileChange(images) {
            onChange(block.clientId, {
              images: images.map(function (image) {
                return (0, _edit.pickRelevantMediaFiles)(image);
              })
            });
          },
          allowedTypes: ['image']
        });
        return block;
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/image'],
      transform: function transform(_ref7) {
        var images = _ref7.images;

        if (images.length > 0) {
          return images.map(function (_ref8) {
            var id = _ref8.id,
                url = _ref8.url,
                alt = _ref8.alt,
                caption = _ref8.caption;
            return (0, _blocks.createBlock)('core/image', {
              id: id,
              url: url,
              alt: alt,
              caption: caption
            });
          });
        }

        return (0, _blocks.createBlock)('core/image');
      }
    }]
  },
  edit: _edit.default,
  save: save,
  deprecated: [{
    attributes: deprecatedBlockAttributes,
    save: save
  }, {
    attributes: deprecatedBlockAttributes,
    save: function save(_ref9) {
      var attributes = _ref9.attributes;
      var images = attributes.images,
          _attributes$columns2 = attributes.columns,
          columns = _attributes$columns2 === void 0 ? (0, _edit.defaultColumnsNumber)(attributes) : _attributes$columns2,
          imageCrop = attributes.imageCrop,
          linkTo = attributes.linkTo;
      return (0, _element.createElement)("ul", {
        className: "columns-".concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
      }, images.map(function (image) {
        var href;

        switch (linkTo) {
          case 'media':
            href = image.url;
            break;

          case 'attachment':
            href = image.link;
            break;
        }

        var img = (0, _element.createElement)("img", {
          src: image.url,
          alt: image.alt,
          "data-id": image.id,
          "data-link": image.link
        });
        return (0, _element.createElement)("li", {
          key: image.id || image.url,
          className: "blocks-gallery-item"
        }, (0, _element.createElement)("figure", null, href ? (0, _element.createElement)("a", {
          href: href
        }, img) : img, image.caption && image.caption.length > 0 && (0, _element.createElement)(_editor.RichText.Content, {
          tagName: "figcaption",
          value: image.caption
        })));
      }));
    }
  }, {
    attributes: (0, _objectSpread2.default)({}, deprecatedBlockAttributes, {
      images: (0, _objectSpread2.default)({}, deprecatedBlockAttributes.images, {
        selector: 'div.wp-block-gallery figure.blocks-gallery-image img'
      }),
      align: {
        type: 'string',
        default: 'none'
      }
    }),
    save: function save(_ref10) {
      var attributes = _ref10.attributes;
      var images = attributes.images,
          _attributes$columns3 = attributes.columns,
          columns = _attributes$columns3 === void 0 ? (0, _edit.defaultColumnsNumber)(attributes) : _attributes$columns3,
          align = attributes.align,
          imageCrop = attributes.imageCrop,
          linkTo = attributes.linkTo;
      return (0, _element.createElement)("div", {
        className: "align".concat(align, " columns-").concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
      }, images.map(function (image) {
        var href;

        switch (linkTo) {
          case 'media':
            href = image.url;
            break;

          case 'attachment':
            href = image.link;
            break;
        }

        var img = (0, _element.createElement)("img", {
          src: image.url,
          alt: image.alt,
          "data-id": image.id
        });
        return (0, _element.createElement)("figure", {
          key: image.id || image.url,
          className: "blocks-gallery-image"
        }, href ? (0, _element.createElement)("a", {
          href: href
        }, img) : img);
      }));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map