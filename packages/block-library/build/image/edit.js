"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.pickRelevantMediaFiles = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _editor = require("@wordpress/editor");

var _viewport = require("@wordpress/viewport");

var _compose = require("@wordpress/compose");

var _imageSize = _interopRequireDefault(require("./image-size"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Module constants
 */
var MIN_SIZE = 20;
var LINK_DESTINATION_NONE = 'none';
var LINK_DESTINATION_MEDIA = 'media';
var LINK_DESTINATION_ATTACHMENT = 'attachment';
var LINK_DESTINATION_CUSTOM = 'custom';
var ALLOWED_MEDIA_TYPES = ['image'];

var pickRelevantMediaFiles = function pickRelevantMediaFiles(image) {
  return (0, _lodash.pick)(image, ['alt', 'id', 'link', 'url', 'caption']);
};
/**
 * Is the URL a temporary blob URL? A blob URL is one that is used temporarily
 * while the image is being uploaded and will not have an id yet allocated.
 *
 * @param {number=} id The id of the image.
 * @param {string=} url The url of the image.
 *
 * @return {boolean} Is the URL a Blob URL
 */


exports.pickRelevantMediaFiles = pickRelevantMediaFiles;

var isTemporaryImage = function isTemporaryImage(id, url) {
  return !id && (0, _blob.isBlobURL)(url);
};
/**
 * Is the url for the image hosted externally. An externally hosted image has no id
 * and is not a blob url.
 *
 * @param {number=} id  The id of the image.
 * @param {string=} url The url of the image.
 *
 * @return {boolean} Is the url an externally hosted url?
 */


var isExternalImage = function isExternalImage(id, url) {
  return url && !id && !(0, _blob.isBlobURL)(url);
};

var ImageEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ImageEdit, _Component);

  function ImageEdit(_ref) {
    var _this;

    var attributes = _ref.attributes;
    (0, _classCallCheck2.default)(this, ImageEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageEdit).apply(this, arguments));
    _this.updateAlt = _this.updateAlt.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateAlignment = _this.updateAlignment.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFocusCaption = _this.onFocusCaption.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onImageClick = _this.onImageClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelectImage = _this.onSelectImage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelectURL = _this.onSelectURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateImageURL = _this.updateImageURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateWidth = _this.updateWidth.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateHeight = _this.updateHeight.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateDimensions = _this.updateDimensions.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSetCustomHref = _this.onSetCustomHref.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSetLinkDestination = _this.onSetLinkDestination.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleIsEditing = _this.toggleIsEditing.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      captionFocused: false,
      isEditing: !attributes.url
    };
    return _this;
  }

  (0, _createClass2.default)(ImageEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      var id = attributes.id,
          _attributes$url = attributes.url,
          url = _attributes$url === void 0 ? '' : _attributes$url;

      if (isTemporaryImage(id, url)) {
        var file = (0, _blob.getBlobByURL)(url);

        if (file) {
          (0, _editor.mediaUpload)({
            filesList: [file],
            onFileChange: function onFileChange(_ref2) {
              var _ref3 = (0, _slicedToArray2.default)(_ref2, 1),
                  image = _ref3[0];

              setAttributes(pickRelevantMediaFiles(image));
            },
            allowedTypes: ALLOWED_MEDIA_TYPES
          });
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _prevProps$attributes = prevProps.attributes,
          prevID = _prevProps$attributes.id,
          _prevProps$attributes2 = _prevProps$attributes.url,
          prevURL = _prevProps$attributes2 === void 0 ? '' : _prevProps$attributes2;
      var _this$props$attribute = this.props.attributes,
          id = _this$props$attribute.id,
          _this$props$attribute2 = _this$props$attribute.url,
          url = _this$props$attribute2 === void 0 ? '' : _this$props$attribute2;

      if (isTemporaryImage(prevID, prevURL) && !isTemporaryImage(id, url)) {
        (0, _blob.revokeBlobURL)(url);
      }

      if (!this.props.isSelected && prevProps.isSelected && this.state.captionFocused) {
        this.setState({
          captionFocused: false
        });
      }
    }
  }, {
    key: "onSelectImage",
    value: function onSelectImage(media) {
      if (!media || !media.url) {
        this.props.setAttributes({
          url: undefined,
          alt: undefined,
          id: undefined,
          caption: undefined
        });
        return;
      }

      this.setState({
        isEditing: false
      });
      this.props.setAttributes((0, _objectSpread2.default)({}, pickRelevantMediaFiles(media), {
        width: undefined,
        height: undefined
      }));
    }
  }, {
    key: "onSetLinkDestination",
    value: function onSetLinkDestination(value) {
      var href;

      if (value === LINK_DESTINATION_NONE) {
        href = undefined;
      } else if (value === LINK_DESTINATION_MEDIA) {
        href = this.props.image && this.props.image.source_url || this.props.attributes.url;
      } else if (value === LINK_DESTINATION_ATTACHMENT) {
        href = this.props.image && this.props.image.link;
      } else {
        href = this.props.attributes.href;
      }

      this.props.setAttributes({
        linkDestination: value,
        href: href
      });
    }
  }, {
    key: "onSelectURL",
    value: function onSelectURL(newURL) {
      var url = this.props.attributes.url;

      if (newURL !== url) {
        this.props.setAttributes({
          url: newURL,
          id: undefined
        });
      }

      this.setState({
        isEditing: false
      });
    }
  }, {
    key: "onSetCustomHref",
    value: function onSetCustomHref(value) {
      this.props.setAttributes({
        href: value
      });
    }
  }, {
    key: "onFocusCaption",
    value: function onFocusCaption() {
      if (!this.state.captionFocused) {
        this.setState({
          captionFocused: true
        });
      }
    }
  }, {
    key: "onImageClick",
    value: function onImageClick() {
      if (this.state.captionFocused) {
        this.setState({
          captionFocused: false
        });
      }
    }
  }, {
    key: "updateAlt",
    value: function updateAlt(newAlt) {
      this.props.setAttributes({
        alt: newAlt
      });
    }
  }, {
    key: "updateAlignment",
    value: function updateAlignment(nextAlign) {
      var extraUpdatedAttributes = ['wide', 'full'].indexOf(nextAlign) !== -1 ? {
        width: undefined,
        height: undefined
      } : {};
      this.props.setAttributes((0, _objectSpread2.default)({}, extraUpdatedAttributes, {
        align: nextAlign
      }));
    }
  }, {
    key: "updateImageURL",
    value: function updateImageURL(url) {
      this.props.setAttributes({
        url: url,
        width: undefined,
        height: undefined
      });
    }
  }, {
    key: "updateWidth",
    value: function updateWidth(width) {
      this.props.setAttributes({
        width: parseInt(width, 10)
      });
    }
  }, {
    key: "updateHeight",
    value: function updateHeight(height) {
      this.props.setAttributes({
        height: parseInt(height, 10)
      });
    }
  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      var _this2 = this;

      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return function () {
        _this2.props.setAttributes({
          width: width,
          height: height
        });
      };
    }
  }, {
    key: "getImageSizes",
    value: function getImageSizes() {
      return (0, _lodash.get)(this.props.image, ['media_details', 'sizes'], {});
    }
  }, {
    key: "getLinkDestinationOptions",
    value: function getLinkDestinationOptions() {
      return [{
        value: LINK_DESTINATION_NONE,
        label: (0, _i18n.__)('None')
      }, {
        value: LINK_DESTINATION_MEDIA,
        label: (0, _i18n.__)('Media File')
      }, {
        value: LINK_DESTINATION_ATTACHMENT,
        label: (0, _i18n.__)('Attachment Page')
      }, {
        value: LINK_DESTINATION_CUSTOM,
        label: (0, _i18n.__)('Custom URL')
      }];
    }
  }, {
    key: "toggleIsEditing",
    value: function toggleIsEditing() {
      this.setState({
        isEditing: !this.state.isEditing
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var isEditing = this.state.isEditing;
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes,
          isLargeViewport = _this$props2.isLargeViewport,
          isSelected = _this$props2.isSelected,
          className = _this$props2.className,
          maxWidth = _this$props2.maxWidth,
          noticeOperations = _this$props2.noticeOperations,
          noticeUI = _this$props2.noticeUI,
          toggleSelection = _this$props2.toggleSelection,
          isRTL = _this$props2.isRTL,
          availableImageSizes = _this$props2.availableImageSizes;
      var url = attributes.url,
          alt = attributes.alt,
          caption = attributes.caption,
          align = attributes.align,
          id = attributes.id,
          href = attributes.href,
          linkDestination = attributes.linkDestination,
          width = attributes.width,
          height = attributes.height,
          linkTarget = attributes.linkTarget;
      var isExternal = isExternalImage(id, url);
      var availableImageSizesBySlug = (0, _lodash.keyBy)(availableImageSizes, 'slug');
      var toolbarEditButton;

      if (url) {
        if (isExternal) {
          toolbarEditButton = (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.IconButton, {
            className: "components-icon-button components-toolbar__control",
            label: (0, _i18n.__)('Edit image'),
            onClick: this.toggleIsEditing,
            icon: "edit"
          }));
        } else {
          toolbarEditButton = (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_editor.MediaUpload, {
            onSelect: this.onSelectImage,
            allowedTypes: ALLOWED_MEDIA_TYPES,
            value: id,
            render: function render(_ref4) {
              var open = _ref4.open;
              return (0, _element.createElement)(_components.IconButton, {
                className: "components-toolbar__control",
                label: (0, _i18n.__)('Edit image'),
                icon: "edit",
                onClick: open
              });
            }
          }));
        }
      }

      var controls = (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_editor.BlockAlignmentToolbar, {
        value: align,
        onChange: this.updateAlignment
      }), toolbarEditButton);

      if (isEditing) {
        var src = isExternal ? url : undefined;
        return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)(_editor.MediaPlaceholder, {
          icon: "format-image",
          className: className,
          onSelect: this.onSelectImage,
          onSelectURL: this.onSelectURL,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice,
          accept: "image/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: {
            id: id,
            src: src
          }
        }));
      }

      var classes = (0, _classnames.default)(className, {
        'is-transient': (0, _blob.isBlobURL)(url),
        'is-resized': !!width || !!height,
        'is-focused': isSelected
      });
      var imageSizes = this.getImageSizes();
      var isResizable = ['wide', 'full'].indexOf(align) === -1 && isLargeViewport;
      var isLinkURLInputDisabled = linkDestination !== LINK_DESTINATION_CUSTOM;

      var getInspectorControls = function getInspectorControls(imageWidth, imageHeight) {
        return (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
          title: (0, _i18n.__)('Image Settings')
        }, (0, _element.createElement)(_components.TextareaControl, {
          label: (0, _i18n.__)('Alt Text (Alternative Text)'),
          value: alt,
          onChange: _this3.updateAlt,
          help: (0, _i18n.__)('Alternative text describes your image to people who can’t see it. Add a short description with its key details.')
        }), !(0, _lodash.isEmpty)(imageSizes) && (0, _element.createElement)(_components.SelectControl, {
          label: (0, _i18n.__)('Image Size'),
          value: url,
          options: (0, _lodash.map)(imageSizes, function (size, slug) {
            return {
              value: size.source_url,
              label: availableImageSizesBySlug[slug] ? availableImageSizesBySlug[slug].name : (0, _lodash.startCase)(slug)
            };
          }),
          onChange: _this3.updateImageURL
        }), isResizable && (0, _element.createElement)("div", {
          className: "block-library-image__dimensions"
        }, (0, _element.createElement)("p", {
          className: "block-library-image__dimensions__row"
        }, (0, _i18n.__)('Image Dimensions')), (0, _element.createElement)("div", {
          className: "block-library-image__dimensions__row"
        }, (0, _element.createElement)(_components.TextControl, {
          type: "number",
          className: "block-library-image__dimensions__width",
          label: (0, _i18n.__)('Width'),
          value: width !== undefined ? width : '',
          placeholder: imageWidth,
          min: 1,
          onChange: _this3.updateWidth
        }), (0, _element.createElement)(_components.TextControl, {
          type: "number",
          className: "block-library-image__dimensions__height",
          label: (0, _i18n.__)('Height'),
          value: height !== undefined ? height : '',
          placeholder: imageHeight,
          min: 1,
          onChange: _this3.updateHeight
        })), (0, _element.createElement)("div", {
          className: "block-library-image__dimensions__row"
        }, (0, _element.createElement)(_components.ButtonGroup, {
          "aria-label": (0, _i18n.__)('Image Size')
        }, [25, 50, 75, 100].map(function (scale) {
          var scaledWidth = Math.round(imageWidth * (scale / 100));
          var scaledHeight = Math.round(imageHeight * (scale / 100));
          var isCurrent = width === scaledWidth && height === scaledHeight;
          return (0, _element.createElement)(_components.Button, {
            key: scale,
            isSmall: true,
            isPrimary: isCurrent,
            "aria-pressed": isCurrent,
            onClick: _this3.updateDimensions(scaledWidth, scaledHeight)
          }, scale, "%");
        })), (0, _element.createElement)(_components.Button, {
          isSmall: true,
          onClick: _this3.updateDimensions()
        }, (0, _i18n.__)('Reset'))))), (0, _element.createElement)(_components.PanelBody, {
          title: (0, _i18n.__)('Link Settings')
        }, (0, _element.createElement)(_components.SelectControl, {
          label: (0, _i18n.__)('Link To'),
          value: linkDestination,
          options: _this3.getLinkDestinationOptions(),
          onChange: _this3.onSetLinkDestination
        }), linkDestination !== LINK_DESTINATION_NONE && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.TextControl, {
          label: (0, _i18n.__)('Link URL'),
          value: href || '',
          onChange: _this3.onSetCustomHref,
          placeholder: !isLinkURLInputDisabled ? 'https://' : undefined,
          disabled: isLinkURLInputDisabled
        }), (0, _element.createElement)(_components.ToggleControl, {
          label: (0, _i18n.__)('Open in New Tab'),
          onChange: function onChange() {
            return setAttributes({
              linkTarget: !linkTarget ? '_blank' : undefined
            });
          },
          checked: linkTarget === '_blank'
        }))));
      }; // Disable reason: Each block can be selected by clicking on it

      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */


      return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)("figure", {
        className: classes
      }, (0, _element.createElement)(_imageSize.default, {
        src: url,
        dirtynessTrigger: align
      }, function (sizes) {
        var imageWidthWithinContainer = sizes.imageWidthWithinContainer,
            imageHeightWithinContainer = sizes.imageHeightWithinContainer,
            imageWidth = sizes.imageWidth,
            imageHeight = sizes.imageHeight; // Disable reason: Image itself is not meant to be
        // interactive, but should direct focus to block
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions

        var img = (0, _element.createElement)("img", {
          src: url,
          alt: alt,
          onClick: _this3.onImageClick
        });

        if (!isResizable || !imageWidthWithinContainer) {
          return (0, _element.createElement)(_element.Fragment, null, getInspectorControls(imageWidth, imageHeight), (0, _element.createElement)("div", {
            style: {
              width: width,
              height: height
            }
          }, img));
        }

        var currentWidth = width || imageWidthWithinContainer;
        var currentHeight = height || imageHeightWithinContainer;
        var ratio = imageWidth / imageHeight;
        var minWidth = imageWidth < imageHeight ? MIN_SIZE : MIN_SIZE * ratio;
        var minHeight = imageHeight < imageWidth ? MIN_SIZE : MIN_SIZE / ratio;
        var showRightHandle = false;
        var showLeftHandle = false;
        /* eslint-disable no-lonely-if */
        // See https://github.com/WordPress/gutenberg/issues/7584.

        if (align === 'center') {
          // When the image is centered, show both handles.
          showRightHandle = true;
          showLeftHandle = true;
        } else if (isRTL) {
          // In RTL mode the image is on the right by default.
          // Show the right handle and hide the left handle only when it is aligned left.
          // Otherwise always show the left handle.
          if (align === 'left') {
            showRightHandle = true;
          } else {
            showLeftHandle = true;
          }
        } else {
          // Show the left handle and hide the right handle only when the image is aligned right.
          // Otherwise always show the right handle.
          if (align === 'right') {
            showLeftHandle = true;
          } else {
            showRightHandle = true;
          }
        }
        /* eslint-enable no-lonely-if */


        return (0, _element.createElement)(_element.Fragment, null, getInspectorControls(imageWidth, imageHeight), (0, _element.createElement)(_components.ResizableBox, {
          size: width && height ? {
            width: width,
            height: height
          } : undefined,
          minWidth: minWidth,
          maxWidth: maxWidth,
          minHeight: minHeight,
          maxHeight: maxWidth / ratio,
          lockAspectRatio: true,
          enable: {
            top: false,
            right: showRightHandle,
            bottom: true,
            left: showLeftHandle
          },
          onResizeStart: function onResizeStart() {
            toggleSelection(false);
          },
          onResizeStop: function onResizeStop(event, direction, elt, delta) {
            setAttributes({
              width: parseInt(currentWidth + delta.width, 10),
              height: parseInt(currentHeight + delta.height, 10)
            });
            toggleSelection(true);
          }
        }, img));
      }), (!_editor.RichText.isEmpty(caption) || isSelected) && (0, _element.createElement)(_editor.RichText, {
        tagName: "figcaption",
        placeholder: (0, _i18n.__)('Write caption…'),
        value: caption,
        unstableOnFocus: this.onFocusCaption,
        onChange: function onChange(value) {
          return setAttributes({
            caption: value
          });
        },
        isSelected: this.state.captionFocused,
        inlineToolbar: true
      })));
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    }
  }]);
  return ImageEdit;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, props) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var _select2 = select('core/editor'),
      getEditorSettings = _select2.getEditorSettings;

  var id = props.attributes.id;

  var _getEditorSettings = getEditorSettings(),
      maxWidth = _getEditorSettings.maxWidth,
      isRTL = _getEditorSettings.isRTL,
      availableImageSizes = _getEditorSettings.availableImageSizes;

  return {
    image: id ? getMedia(id) : null,
    maxWidth: maxWidth,
    isRTL: isRTL,
    availableImageSizes: availableImageSizes
  };
}), (0, _viewport.withViewportMatch)({
  isLargeViewport: 'medium'
}), _components.withNotices])(ImageEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map