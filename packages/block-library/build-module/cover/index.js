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

import { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices, SVG, Path } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { BlockControls, InspectorControls, BlockAlignmentToolbar, MediaPlaceholder, MediaUpload, AlignmentToolbar, PanelColorSettings, RichText, withColors, getColorClassName } from '@wordpress/editor';
var validAlignments = ['left', 'center', 'right', 'wide', 'full'];
var blockAttributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: 'p'
  },
  url: {
    type: 'string'
  },
  align: {
    type: 'string'
  },
  contentAlign: {
    type: 'string',
    default: 'center'
  },
  id: {
    type: 'number'
  },
  hasParallax: {
    type: 'boolean',
    default: false
  },
  dimRatio: {
    type: 'number',
    default: 50
  },
  overlayColor: {
    type: 'string'
  },
  customOverlayColor: {
    type: 'string'
  },
  backgroundType: {
    type: 'string',
    default: 'image'
  }
};
export var name = 'core/cover';
var ALLOWED_MEDIA_TYPES = ['image', 'video'];
var IMAGE_BACKGROUND_TYPE = 'image';
var VIDEO_BACKGROUND_TYPE = 'video';
export var settings = {
  title: __('Cover'),
  description: __('Add an image or video with a text overlay — great for headers.'),
  icon: createElement(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement(Path, {
    d: "M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"
  }), createElement(Path, {
    d: "M0 0h24v24H0z",
    fill: "none"
  })),
  category: 'common',
  attributes: blockAttributes,
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/heading'],
      transform: function transform(_ref) {
        var content = _ref.content;
        return createBlock('core/cover', {
          title: content
        });
      }
    }, {
      type: 'block',
      blocks: ['core/image'],
      transform: function transform(_ref2) {
        var caption = _ref2.caption,
            url = _ref2.url,
            align = _ref2.align,
            id = _ref2.id;
        return createBlock('core/cover', {
          title: caption,
          url: url,
          align: align,
          id: id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      transform: function transform(_ref3) {
        var caption = _ref3.caption,
            src = _ref3.src,
            align = _ref3.align,
            id = _ref3.id;
        return createBlock('core/cover', {
          title: caption,
          url: src,
          align: align,
          id: id,
          backgroundType: VIDEO_BACKGROUND_TYPE
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/heading'],
      transform: function transform(_ref4) {
        var title = _ref4.title;
        return createBlock('core/heading', {
          content: title
        });
      }
    }, {
      type: 'block',
      blocks: ['core/image'],
      isMatch: function isMatch(_ref5) {
        var backgroundType = _ref5.backgroundType,
            url = _ref5.url;
        return !url || backgroundType === IMAGE_BACKGROUND_TYPE;
      },
      transform: function transform(_ref6) {
        var title = _ref6.title,
            url = _ref6.url,
            align = _ref6.align,
            id = _ref6.id;
        return createBlock('core/image', {
          caption: title,
          url: url,
          align: align,
          id: id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      isMatch: function isMatch(_ref7) {
        var backgroundType = _ref7.backgroundType,
            url = _ref7.url;
        return !url || backgroundType === VIDEO_BACKGROUND_TYPE;
      },
      transform: function transform(_ref8) {
        var title = _ref8.title,
            url = _ref8.url,
            align = _ref8.align,
            id = _ref8.id;
        return createBlock('core/video', {
          caption: title,
          src: url,
          id: id,
          align: align
        });
      }
    }]
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align;

    if (-1 !== validAlignments.indexOf(align)) {
      return {
        'data-align': align
      };
    }
  },
  edit: compose([withColors({
    overlayColor: 'background-color'
  }), withNotices])(function (_ref9) {
    var attributes = _ref9.attributes,
        setAttributes = _ref9.setAttributes,
        isSelected = _ref9.isSelected,
        className = _ref9.className,
        noticeOperations = _ref9.noticeOperations,
        noticeUI = _ref9.noticeUI,
        overlayColor = _ref9.overlayColor,
        setOverlayColor = _ref9.setOverlayColor;
    var align = attributes.align,
        backgroundType = attributes.backgroundType,
        contentAlign = attributes.contentAlign,
        dimRatio = attributes.dimRatio,
        hasParallax = attributes.hasParallax,
        id = attributes.id,
        title = attributes.title,
        url = attributes.url;

    var updateAlignment = function updateAlignment(nextAlign) {
      return setAttributes({
        align: nextAlign
      });
    };

    var onSelectMedia = function onSelectMedia(media) {
      if (!media || !media.url) {
        setAttributes({
          url: undefined,
          id: undefined
        });
        return;
      }

      var mediaType; // for media selections originated from a file upload.

      if (media.media_type) {
        if (media.media_type === IMAGE_BACKGROUND_TYPE) {
          mediaType = IMAGE_BACKGROUND_TYPE;
        } else {
          // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
          // Videos contain the media type of 'file' in the object returned from the rest api.
          mediaType = VIDEO_BACKGROUND_TYPE;
        }
      } else {
        // for media selections originated from existing files in the media library.
        if (media.type !== IMAGE_BACKGROUND_TYPE && media.type !== VIDEO_BACKGROUND_TYPE) {
          return;
        }

        mediaType = media.type;
      }

      setAttributes({
        url: media.url,
        id: media.id,
        backgroundType: mediaType
      });
    };

    var toggleParallax = function toggleParallax() {
      return setAttributes({
        hasParallax: !hasParallax
      });
    };

    var setDimRatio = function setDimRatio(ratio) {
      return setAttributes({
        dimRatio: ratio
      });
    };

    var setTitle = function setTitle(newTitle) {
      return setAttributes({
        title: newTitle
      });
    };

    var style = _objectSpread({}, backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {}, {
      backgroundColor: overlayColor.color
    });

    var classes = classnames(className, contentAlign !== 'center' && "has-".concat(contentAlign, "-content"), dimRatioToClass(dimRatio), {
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax
    });
    var controls = createElement(Fragment, null, createElement(BlockControls, null, createElement(BlockAlignmentToolbar, {
      value: align,
      onChange: updateAlignment
    }), !!url && createElement(Fragment, null, createElement(AlignmentToolbar, {
      value: contentAlign,
      onChange: function onChange(nextAlign) {
        setAttributes({
          contentAlign: nextAlign
        });
      }
    }), createElement(Toolbar, null, createElement(MediaUpload, {
      onSelect: onSelectMedia,
      allowedTypes: ALLOWED_MEDIA_TYPES,
      value: id,
      render: function render(_ref10) {
        var open = _ref10.open;
        return createElement(IconButton, {
          className: "components-toolbar__control",
          label: __('Edit media'),
          icon: "edit",
          onClick: open
        });
      }
    })))), !!url && createElement(InspectorControls, null, createElement(PanelBody, {
      title: __('Cover Settings')
    }, IMAGE_BACKGROUND_TYPE === backgroundType && createElement(ToggleControl, {
      label: __('Fixed Background'),
      checked: hasParallax,
      onChange: toggleParallax
    }), createElement(PanelColorSettings, {
      title: __('Overlay'),
      initialOpen: true,
      colorSettings: [{
        value: overlayColor.color,
        onChange: setOverlayColor,
        label: __('Overlay Color')
      }]
    }, createElement(RangeControl, {
      label: __('Background Opacity'),
      value: dimRatio,
      onChange: setDimRatio,
      min: 0,
      max: 100,
      step: 10
    })))));

    if (!url) {
      var hasTitle = !RichText.isEmpty(title);
      var icon = hasTitle ? undefined : 'format-image';
      var label = hasTitle ? createElement(RichText, {
        tagName: "h2",
        value: title,
        onChange: setTitle,
        inlineToolbar: true
      }) : __('Cover');
      return createElement(Fragment, null, controls, createElement(MediaPlaceholder, {
        icon: icon,
        className: className,
        labels: {
          title: label,
          instructions: __('Drag an image or a video, upload a new one or select a file from your library.')
        },
        onSelect: onSelectMedia,
        accept: "image/*,video/*",
        allowedTypes: ALLOWED_MEDIA_TYPES,
        notices: noticeUI,
        onError: noticeOperations.createErrorNotice
      }));
    }

    return createElement(Fragment, null, controls, createElement("div", {
      "data-url": url,
      style: style,
      className: classes
    }, VIDEO_BACKGROUND_TYPE === backgroundType && createElement("video", {
      className: "wp-block-cover__video-background",
      autoPlay: true,
      muted: true,
      loop: true,
      src: url
    }), (!RichText.isEmpty(title) || isSelected) && createElement(RichText, {
      tagName: "p",
      className: "wp-block-cover-text",
      placeholder: __('Write title…'),
      value: title,
      onChange: setTitle,
      inlineToolbar: true
    })));
  }),
  save: function save(_ref11) {
    var attributes = _ref11.attributes,
        className = _ref11.className;
    var align = attributes.align,
        backgroundType = attributes.backgroundType,
        contentAlign = attributes.contentAlign,
        customOverlayColor = attributes.customOverlayColor,
        dimRatio = attributes.dimRatio,
        hasParallax = attributes.hasParallax,
        overlayColor = attributes.overlayColor,
        title = attributes.title,
        url = attributes.url;
    var overlayColorClass = getColorClassName('background-color', overlayColor);
    var style = backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {};

    if (!overlayColorClass) {
      style.backgroundColor = customOverlayColor;
    }

    var classes = classnames(className, dimRatioToClass(dimRatio), overlayColorClass, _defineProperty({
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax
    }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'), align ? "align".concat(align) : null);
    return createElement("div", {
      className: classes,
      style: style
    }, VIDEO_BACKGROUND_TYPE === backgroundType && url && createElement("video", {
      className: "wp-block-cover__video-background",
      autoPlay: true,
      muted: true,
      loop: true,
      src: url
    }), !RichText.isEmpty(title) && createElement(RichText.Content, {
      tagName: "p",
      className: "wp-block-cover-text",
      value: title
    }));
  },
  deprecated: [{
    attributes: _objectSpread({}, blockAttributes),
    supports: {
      className: false
    },
    save: function save(_ref12) {
      var attributes = _ref12.attributes;
      var url = attributes.url,
          title = attributes.title,
          hasParallax = attributes.hasParallax,
          dimRatio = attributes.dimRatio,
          align = attributes.align,
          contentAlign = attributes.contentAlign,
          overlayColor = attributes.overlayColor,
          customOverlayColor = attributes.customOverlayColor;
      var overlayColorClass = getColorClassName('background-color', overlayColor);
      var style = backgroundImageStyles(url);

      if (!overlayColorClass) {
        style.backgroundColor = customOverlayColor;
      }

      var classes = classnames('wp-block-cover-image', dimRatioToClass(dimRatio), overlayColorClass, _defineProperty({
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'), align ? "align".concat(align) : null);
      return createElement("div", {
        className: classes,
        style: style
      }, !RichText.isEmpty(title) && createElement(RichText.Content, {
        tagName: "p",
        className: "wp-block-cover-image-text",
        value: title
      }));
    }
  }, {
    attributes: _objectSpread({}, blockAttributes, {
      title: {
        type: 'string',
        source: 'html',
        selector: 'h2'
      }
    }),
    save: function save(_ref13) {
      var attributes = _ref13.attributes,
          className = _ref13.className;
      var url = attributes.url,
          title = attributes.title,
          hasParallax = attributes.hasParallax,
          dimRatio = attributes.dimRatio,
          align = attributes.align;
      var style = backgroundImageStyles(url);
      var classes = classnames(className, dimRatioToClass(dimRatio), {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, align ? "align".concat(align) : null);
      return createElement("section", {
        className: classes,
        style: style
      }, createElement(RichText.Content, {
        tagName: "h2",
        value: title
      }));
    }
  }]
};

function dimRatioToClass(ratio) {
  return ratio === 0 || ratio === 50 ? null : 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

function backgroundImageStyles(url) {
  return url ? {
    backgroundImage: "url(".concat(url, ")")
  } : {};
}
//# sourceMappingURL=index.js.map