"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/image';
exports.name = name;
var blockAttributes = {
  url: {
    type: 'string'
  },
  alt: {
    type: 'string',
    default: ''
  },
  caption: {
    type: 'string'
  },
  href: {
    type: 'string'
  },
  id: {
    type: 'number'
  },
  align: {
    type: 'string'
  },
  width: {
    type: 'number'
  },
  height: {
    type: 'number'
  },
  linkDestination: {
    type: 'string',
    default: 'none'
  },
  linkTarget: {
    type: 'string'
  }
};
var deprecatedBlockAttributes = (0, _objectSpread2.default)({}, blockAttributes, {
  url: (0, _objectSpread2.default)({}, blockAttributes.url, {
    source: 'attribute',
    selector: 'img',
    attribute: 'src'
  }),
  alt: (0, _objectSpread2.default)({}, blockAttributes.alt, {
    source: 'attribute',
    selector: 'img',
    attribute: 'alt'
  }),
  caption: (0, _objectSpread2.default)({}, blockAttributes.caption, {
    type: undefined,
    source: 'html',
    selector: 'figcaption'
  }),
  href: (0, _objectSpread2.default)({}, blockAttributes.href, {
    source: 'attribute',
    selector: 'figure > a',
    attribute: 'href'
  }),
  linkTarget: (0, _objectSpread2.default)({}, blockAttributes.linkTarget, {
    source: 'attribute',
    selector: 'figure > a',
    attribute: 'target'
  })
});
var imageSchema = {
  img: {
    attributes: ['src', 'alt'],
    classes: ['alignleft', 'aligncenter', 'alignright', 'alignnone', /^wp-image-\d+$/]
  }
};
var schema = {
  figure: {
    require: ['img'],
    children: (0, _objectSpread2.default)({}, imageSchema, {
      a: {
        attributes: ['href', 'target'],
        children: imageSchema
      },
      figcaption: {
        children: (0, _blocks.getPhrasingContentSchema)()
      }
    })
  }
};

function save(_ref) {
  var _classnames;

  var attributes = _ref.attributes;
  var url = attributes.url,
      alt = attributes.alt,
      caption = attributes.caption,
      align = attributes.align,
      href = attributes.href,
      width = attributes.width,
      height = attributes.height,
      id = attributes.id,
      linkTarget = attributes.linkTarget;
  var classes = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "align".concat(align), align), (0, _defineProperty2.default)(_classnames, 'is-resized', width || height), _classnames));
  var image = (0, _element.createElement)("img", {
    src: url,
    alt: alt,
    className: id ? "wp-image-".concat(id) : null,
    width: width,
    height: height
  });
  var figure = (0, _element.createElement)(_element.Fragment, null, href ? (0, _element.createElement)("a", {
    href: href,
    target: linkTarget,
    rel: linkTarget === '_blank' ? 'noreferrer noopener' : undefined
  }, image) : image, !_editor.RichText.isEmpty(caption) && (0, _element.createElement)(_editor.RichText.Content, {
    tagName: "figcaption",
    value: caption
  }));

  if ('left' === align || 'right' === align || 'center' === align) {
    return (0, _element.createElement)("div", null, (0, _element.createElement)("figure", {
      className: classes
    }, figure));
  }

  return (0, _element.createElement)("figure", {
    className: classes
  }, figure);
}

var settings = {
  title: (0, _i18n.__)('Image'),
  description: (0, _i18n.__)('Insert an image to make a visual statement.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), (0, _element.createElement)(_components.Path, {
    d: "m19 5v14h-14v-14h14m0-2h-14c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2v-14c0-1.1-0.9-2-2-2z"
  }), (0, _element.createElement)(_components.Path, {
    d: "m14.14 11.86l-3 3.87-2.14-2.59-3 3.86h12l-3.86-5.14z"
  })),
  category: 'common',
  keywords: ['img', // "img" is not translated as it is intended to reflect the HTML <img> tag.
  (0, _i18n.__)('photo')],
  attributes: blockAttributes,
  transforms: {
    from: [{
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'FIGURE' && !!node.querySelector('img');
      },
      schema: schema,
      transform: function transform(node) {
        // Search both figure and image classes. Alignment could be
        // set on either. ID is set on the image.
        var className = node.className + ' ' + node.querySelector('img').className;
        var alignMatches = /(?:^|\s)align(left|center|right)(?:$|\s)/.exec(className);
        var align = alignMatches ? alignMatches[1] : undefined;
        var idMatches = /(?:^|\s)wp-image-(\d+)(?:$|\s)/.exec(className);
        var id = idMatches ? Number(idMatches[1]) : undefined;
        var anchorElement = node.querySelector('a');
        var linkDestination = anchorElement && anchorElement.href ? 'custom' : undefined;
        var href = anchorElement && anchorElement.href ? anchorElement.href : undefined;
        var blockType = (0, _blocks.getBlockType)('core/image');
        var attributes = (0, _blocks.getBlockAttributes)(blockType, node.outerHTML, {
          align: align,
          id: id,
          linkDestination: linkDestination,
          href: href
        });
        return (0, _blocks.createBlock)('core/image', attributes);
      }
    }, {
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length === 1 && files[0].type.indexOf('image/') === 0;
      },
      transform: function transform(files) {
        var file = files[0]; // We don't need to upload the media directly here
        // It's already done as part of the `componentDidMount`
        // int the image block

        var block = (0, _blocks.createBlock)('core/image', {
          url: (0, _blob.createBlobURL)(file)
        });
        return block;
      }
    }, {
      type: 'shortcode',
      tag: 'caption',
      attributes: {
        url: {
          type: 'string',
          source: 'attribute',
          attribute: 'src',
          selector: 'img'
        },
        alt: {
          type: 'string',
          source: 'attribute',
          attribute: 'alt',
          selector: 'img'
        },
        caption: {
          shortcode: function shortcode(attributes, _ref2) {
            var _shortcode = _ref2.shortcode;
            var content = _shortcode.content;
            return content.replace(/\s*<img[^>]*>\s/, '');
          }
        },
        href: {
          type: 'string',
          source: 'attribute',
          attribute: 'href',
          selector: 'a'
        },
        id: {
          type: 'number',
          shortcode: function shortcode(_ref3) {
            var id = _ref3.named.id;

            if (!id) {
              return;
            }

            return parseInt(id.replace('attachment_', ''), 10);
          }
        },
        align: {
          type: 'string',
          shortcode: function shortcode(_ref4) {
            var _ref4$named$align = _ref4.named.align,
                align = _ref4$named$align === void 0 ? 'alignnone' : _ref4$named$align;
            return align.replace('align', '');
          }
        }
      }
    }]
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align,
        width = attributes.width;

    if ('left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align) {
      return {
        'data-align': align,
        'data-resized': !!width
      };
    }
  },
  edit: _edit.default,
  save: save,
  deprecated: [{
    attributes: deprecatedBlockAttributes,
    save: save
  }, {
    attributes: deprecatedBlockAttributes,
    save: function save(_ref5) {
      var _classnames2;

      var attributes = _ref5.attributes;
      var url = attributes.url,
          alt = attributes.alt,
          caption = attributes.caption,
          align = attributes.align,
          href = attributes.href,
          width = attributes.width,
          height = attributes.height,
          id = attributes.id;
      var classes = (0, _classnames3.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "align".concat(align), align), (0, _defineProperty2.default)(_classnames2, 'is-resized', width || height), _classnames2));
      var image = (0, _element.createElement)("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return (0, _element.createElement)("figure", {
        className: classes
      }, href ? (0, _element.createElement)("a", {
        href: href
      }, image) : image, !_editor.RichText.isEmpty(caption) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }, {
    attributes: deprecatedBlockAttributes,
    save: function save(_ref6) {
      var attributes = _ref6.attributes;
      var url = attributes.url,
          alt = attributes.alt,
          caption = attributes.caption,
          align = attributes.align,
          href = attributes.href,
          width = attributes.width,
          height = attributes.height,
          id = attributes.id;
      var image = (0, _element.createElement)("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return (0, _element.createElement)("figure", {
        className: align ? "align".concat(align) : null
      }, href ? (0, _element.createElement)("a", {
        href: href
      }, image) : image, !_editor.RichText.isEmpty(caption) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }, {
    attributes: deprecatedBlockAttributes,
    save: function save(_ref7) {
      var attributes = _ref7.attributes;
      var url = attributes.url,
          alt = attributes.alt,
          caption = attributes.caption,
          align = attributes.align,
          href = attributes.href,
          width = attributes.width,
          height = attributes.height;
      var extraImageProps = width || height ? {
        width: width,
        height: height
      } : {};
      var image = (0, _element.createElement)("img", (0, _extends2.default)({
        src: url,
        alt: alt
      }, extraImageProps));
      var figureStyle = {};

      if (width) {
        figureStyle = {
          width: width
        };
      } else if (align === 'left' || align === 'right') {
        figureStyle = {
          maxWidth: '50%'
        };
      }

      return (0, _element.createElement)("figure", {
        className: align ? "align".concat(align) : null,
        style: figureStyle
      }, href ? (0, _element.createElement)("a", {
        href: href
      }, image) : image, !_editor.RichText.isEmpty(caption) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map