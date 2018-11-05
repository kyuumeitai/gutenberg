"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _editor = require("@wordpress/editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
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
var name = 'core/cover';
exports.name = name;
var ALLOWED_MEDIA_TYPES = ['image', 'video'];
var IMAGE_BACKGROUND_TYPE = 'image';
var VIDEO_BACKGROUND_TYPE = 'video';
var settings = {
  title: (0, _i18n.__)('Cover'),
  description: (0, _i18n.__)('Add an image or video with a text overlay — great for headers.'),
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.Path, {
    d: "M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"
  }), (0, _element.createElement)(_components.Path, {
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
        return (0, _blocks.createBlock)('core/cover', {
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
        return (0, _blocks.createBlock)('core/cover', {
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
        return (0, _blocks.createBlock)('core/cover', {
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
        return (0, _blocks.createBlock)('core/heading', {
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
        return (0, _blocks.createBlock)('core/image', {
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
        return (0, _blocks.createBlock)('core/video', {
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
  edit: (0, _compose.compose)([(0, _editor.withColors)({
    overlayColor: 'background-color'
  }), _components.withNotices])(function (_ref9) {
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

    var style = (0, _objectSpread2.default)({}, backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {}, {
      backgroundColor: overlayColor.color
    });
    var classes = (0, _classnames3.default)(className, contentAlign !== 'center' && "has-".concat(contentAlign, "-content"), dimRatioToClass(dimRatio), {
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax
    });
    var controls = (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_editor.BlockAlignmentToolbar, {
      value: align,
      onChange: updateAlignment
    }), !!url && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.AlignmentToolbar, {
      value: contentAlign,
      onChange: function onChange(nextAlign) {
        setAttributes({
          contentAlign: nextAlign
        });
      }
    }), (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_editor.MediaUpload, {
      onSelect: onSelectMedia,
      allowedTypes: ALLOWED_MEDIA_TYPES,
      value: id,
      render: function render(_ref10) {
        var open = _ref10.open;
        return (0, _element.createElement)(_components.IconButton, {
          className: "components-toolbar__control",
          label: (0, _i18n.__)('Edit media'),
          icon: "edit",
          onClick: open
        });
      }
    })))), !!url && (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
      title: (0, _i18n.__)('Cover Settings')
    }, IMAGE_BACKGROUND_TYPE === backgroundType && (0, _element.createElement)(_components.ToggleControl, {
      label: (0, _i18n.__)('Fixed Background'),
      checked: hasParallax,
      onChange: toggleParallax
    }), (0, _element.createElement)(_editor.PanelColorSettings, {
      title: (0, _i18n.__)('Overlay'),
      initialOpen: true,
      colorSettings: [{
        value: overlayColor.color,
        onChange: setOverlayColor,
        label: (0, _i18n.__)('Overlay Color')
      }]
    }, (0, _element.createElement)(_components.RangeControl, {
      label: (0, _i18n.__)('Background Opacity'),
      value: dimRatio,
      onChange: setDimRatio,
      min: 0,
      max: 100,
      step: 10
    })))));

    if (!url) {
      var hasTitle = !_editor.RichText.isEmpty(title);
      var icon = hasTitle ? undefined : 'format-image';
      var label = hasTitle ? (0, _element.createElement)(_editor.RichText, {
        tagName: "h2",
        value: title,
        onChange: setTitle,
        inlineToolbar: true
      }) : (0, _i18n.__)('Cover');
      return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)(_editor.MediaPlaceholder, {
        icon: icon,
        className: className,
        labels: {
          title: label,
          instructions: (0, _i18n.__)('Drag an image or a video, upload a new one or select a file from your library.')
        },
        onSelect: onSelectMedia,
        accept: "image/*,video/*",
        allowedTypes: ALLOWED_MEDIA_TYPES,
        notices: noticeUI,
        onError: noticeOperations.createErrorNotice
      }));
    }

    return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)("div", {
      "data-url": url,
      style: style,
      className: classes
    }, VIDEO_BACKGROUND_TYPE === backgroundType && (0, _element.createElement)("video", {
      className: "wp-block-cover__video-background",
      autoPlay: true,
      muted: true,
      loop: true,
      src: url
    }), (!_editor.RichText.isEmpty(title) || isSelected) && (0, _element.createElement)(_editor.RichText, {
      tagName: "p",
      className: "wp-block-cover-text",
      placeholder: (0, _i18n.__)('Write title…'),
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
    var overlayColorClass = (0, _editor.getColorClassName)('background-color', overlayColor);
    var style = backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {};

    if (!overlayColorClass) {
      style.backgroundColor = customOverlayColor;
    }

    var classes = (0, _classnames3.default)(className, dimRatioToClass(dimRatio), overlayColorClass, (0, _defineProperty2.default)({
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax
    }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'), align ? "align".concat(align) : null);
    return (0, _element.createElement)("div", {
      className: classes,
      style: style
    }, VIDEO_BACKGROUND_TYPE === backgroundType && url && (0, _element.createElement)("video", {
      className: "wp-block-cover__video-background",
      autoPlay: true,
      muted: true,
      loop: true,
      src: url
    }), !_editor.RichText.isEmpty(title) && (0, _element.createElement)(_editor.RichText.Content, {
      tagName: "p",
      className: "wp-block-cover-text",
      value: title
    }));
  },
  deprecated: [{
    attributes: (0, _objectSpread2.default)({}, blockAttributes),
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
      var overlayColorClass = (0, _editor.getColorClassName)('background-color', overlayColor);
      var style = backgroundImageStyles(url);

      if (!overlayColorClass) {
        style.backgroundColor = customOverlayColor;
      }

      var classes = (0, _classnames3.default)('wp-block-cover-image', dimRatioToClass(dimRatio), overlayColorClass, (0, _defineProperty2.default)({
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'), align ? "align".concat(align) : null);
      return (0, _element.createElement)("div", {
        className: classes,
        style: style
      }, !_editor.RichText.isEmpty(title) && (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "p",
        className: "wp-block-cover-image-text",
        value: title
      }));
    }
  }, {
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
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
      var classes = (0, _classnames3.default)(className, dimRatioToClass(dimRatio), {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, align ? "align".concat(align) : null);
      return (0, _element.createElement)("section", {
        className: classes,
        style: style
      }, (0, _element.createElement)(_editor.RichText.Content, {
        tagName: "h2",
        value: title
      }));
    }
  }]
};
exports.settings = settings;

function dimRatioToClass(ratio) {
  return ratio === 0 || ratio === 50 ? null : 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

function backgroundImageStyles(url) {
  return url ? {
    backgroundImage: "url(".concat(url, ")")
  } : {};
}
//# sourceMappingURL=index.js.map