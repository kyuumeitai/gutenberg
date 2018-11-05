import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { createBlock, getBlockAttributes, getBlockType, getPhrasingContentSchema } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';
import { createBlobURL } from '@wordpress/blob';
import { Path, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/image';
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

var deprecatedBlockAttributes = _objectSpread({}, blockAttributes, {
  url: _objectSpread({}, blockAttributes.url, {
    source: 'attribute',
    selector: 'img',
    attribute: 'src'
  }),
  alt: _objectSpread({}, blockAttributes.alt, {
    source: 'attribute',
    selector: 'img',
    attribute: 'alt'
  }),
  caption: _objectSpread({}, blockAttributes.caption, {
    type: undefined,
    source: 'html',
    selector: 'figcaption'
  }),
  href: _objectSpread({}, blockAttributes.href, {
    source: 'attribute',
    selector: 'figure > a',
    attribute: 'href'
  }),
  linkTarget: _objectSpread({}, blockAttributes.linkTarget, {
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
    children: _objectSpread({}, imageSchema, {
      a: {
        attributes: ['href', 'target'],
        children: imageSchema
      },
      figcaption: {
        children: getPhrasingContentSchema()
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
  var classes = classnames((_classnames = {}, _defineProperty(_classnames, "align".concat(align), align), _defineProperty(_classnames, 'is-resized', width || height), _classnames));
  var image = createElement("img", {
    src: url,
    alt: alt,
    className: id ? "wp-image-".concat(id) : null,
    width: width,
    height: height
  });
  var figure = createElement(Fragment, null, href ? createElement("a", {
    href: href,
    target: linkTarget,
    rel: linkTarget === '_blank' ? 'noreferrer noopener' : undefined
  }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
    tagName: "figcaption",
    value: caption
  }));

  if ('left' === align || 'right' === align || 'center' === align) {
    return createElement("div", null, createElement("figure", {
      className: classes
    }, figure));
  }

  return createElement("figure", {
    className: classes
  }, figure);
}

export var settings = {
  title: __('Image'),
  description: __('Insert an image to make a visual statement.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), createElement(Path, {
    d: "m19 5v14h-14v-14h14m0-2h-14c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2v-14c0-1.1-0.9-2-2-2z"
  }), createElement(Path, {
    d: "m14.14 11.86l-3 3.87-2.14-2.59-3 3.86h12l-3.86-5.14z"
  })),
  category: 'common',
  keywords: ['img', // "img" is not translated as it is intended to reflect the HTML <img> tag.
  __('photo')],
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
        var blockType = getBlockType('core/image');
        var attributes = getBlockAttributes(blockType, node.outerHTML, {
          align: align,
          id: id,
          linkDestination: linkDestination,
          href: href
        });
        return createBlock('core/image', attributes);
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

        var block = createBlock('core/image', {
          url: createBlobURL(file)
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
  edit: edit,
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
      var classes = classnames((_classnames2 = {}, _defineProperty(_classnames2, "align".concat(align), align), _defineProperty(_classnames2, 'is-resized', width || height), _classnames2));
      var image = createElement("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return createElement("figure", {
        className: classes
      }, href ? createElement("a", {
        href: href
      }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
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
      var image = createElement("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return createElement("figure", {
        className: align ? "align".concat(align) : null
      }, href ? createElement("a", {
        href: href
      }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
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
      var image = createElement("img", _extends({
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

      return createElement("figure", {
        className: align ? "align".concat(align) : null,
        style: figureStyle
      }, href ? createElement("a", {
        href: href
      }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }]
};
//# sourceMappingURL=index.js.map