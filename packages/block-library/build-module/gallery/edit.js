import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External Dependencies
 */
import { filter, pick } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { IconButton, DropZone, FormFileUpload, PanelBody, RangeControl, SelectControl, ToggleControl, Toolbar, withNotices } from '@wordpress/components';
import { BlockControls, MediaUpload, MediaPlaceholder, InspectorControls, mediaUpload } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import GalleryImage from './gallery-image';
var MAX_COLUMNS = 8;
var linkOptions = [{
  value: 'attachment',
  label: __('Attachment Page')
}, {
  value: 'media',
  label: __('Media File')
}, {
  value: 'none',
  label: __('None')
}];
var ALLOWED_MEDIA_TYPES = ['image'];
export function defaultColumnsNumber(attributes) {
  return Math.min(3, attributes.images.length);
}
export var pickRelevantMediaFiles = function pickRelevantMediaFiles(image) {
  return pick(image, ['alt', 'id', 'link', 'url', 'caption']);
};

var GalleryEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(GalleryEdit, _Component);

  function GalleryEdit() {
    var _this;

    _classCallCheck(this, GalleryEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GalleryEdit).apply(this, arguments));
    _this.onSelectImage = _this.onSelectImage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectImages = _this.onSelectImages.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setLinkTo = _this.setLinkTo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setColumnsNumber = _this.setColumnsNumber.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleImageCrop = _this.toggleImageCrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onRemoveImage = _this.onRemoveImage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setImageAttributes = _this.setImageAttributes.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.addFiles = _this.addFiles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.uploadFromFiles = _this.uploadFromFiles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      selectedImage: null
    };
    return _this;
  }

  _createClass(GalleryEdit, [{
    key: "onSelectImage",
    value: function onSelectImage(index) {
      var _this2 = this;

      return function () {
        if (_this2.state.selectedImage !== index) {
          _this2.setState({
            selectedImage: index
          });
        }
      };
    }
  }, {
    key: "onRemoveImage",
    value: function onRemoveImage(index) {
      var _this3 = this;

      return function () {
        var images = filter(_this3.props.attributes.images, function (img, i) {
          return index !== i;
        });
        var columns = _this3.props.attributes.columns;

        _this3.setState({
          selectedImage: null
        });

        _this3.props.setAttributes({
          images: images,
          columns: columns ? Math.min(images.length, columns) : columns
        });
      };
    }
  }, {
    key: "onSelectImages",
    value: function onSelectImages(images) {
      this.props.setAttributes({
        images: images.map(function (image) {
          return pickRelevantMediaFiles(image);
        })
      });
    }
  }, {
    key: "setLinkTo",
    value: function setLinkTo(value) {
      this.props.setAttributes({
        linkTo: value
      });
    }
  }, {
    key: "setColumnsNumber",
    value: function setColumnsNumber(value) {
      this.props.setAttributes({
        columns: value
      });
    }
  }, {
    key: "toggleImageCrop",
    value: function toggleImageCrop() {
      this.props.setAttributes({
        imageCrop: !this.props.attributes.imageCrop
      });
    }
  }, {
    key: "getImageCropHelp",
    value: function getImageCropHelp(checked) {
      return checked ? __('Thumbnails are cropped to align.') : __('Thumbnails are not cropped.');
    }
  }, {
    key: "setImageAttributes",
    value: function setImageAttributes(index, attributes) {
      var _this$props = this.props,
          images = _this$props.attributes.images,
          setAttributes = _this$props.setAttributes;

      if (!images[index]) {
        return;
      }

      setAttributes({
        images: _toConsumableArray(images.slice(0, index)).concat([_objectSpread({}, images[index], attributes)], _toConsumableArray(images.slice(index + 1)))
      });
    }
  }, {
    key: "uploadFromFiles",
    value: function uploadFromFiles(event) {
      this.addFiles(event.target.files);
    }
  }, {
    key: "addFiles",
    value: function addFiles(files) {
      var currentImages = this.props.attributes.images || [];
      var _this$props2 = this.props,
          noticeOperations = _this$props2.noticeOperations,
          setAttributes = _this$props2.setAttributes;
      mediaUpload({
        allowedTypes: ALLOWED_MEDIA_TYPES,
        filesList: files,
        onFileChange: function onFileChange(images) {
          var imagesNormalized = images.map(function (image) {
            return pickRelevantMediaFiles(image);
          });
          setAttributes({
            images: currentImages.concat(imagesNormalized)
          });
        },
        onError: noticeOperations.createErrorNotice
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Deselect images when deselecting the block
      if (!this.props.isSelected && prevProps.isSelected) {
        this.setState({
          selectedImage: null,
          captionSelected: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          attributes = _this$props3.attributes,
          isSelected = _this$props3.isSelected,
          className = _this$props3.className,
          noticeOperations = _this$props3.noticeOperations,
          noticeUI = _this$props3.noticeUI;
      var images = attributes.images,
          _attributes$columns = attributes.columns,
          columns = _attributes$columns === void 0 ? defaultColumnsNumber(attributes) : _attributes$columns,
          align = attributes.align,
          imageCrop = attributes.imageCrop,
          linkTo = attributes.linkTo;
      var dropZone = createElement(DropZone, {
        onFilesDrop: this.addFiles
      });
      var controls = createElement(BlockControls, null, !!images.length && createElement(Toolbar, null, createElement(MediaUpload, {
        onSelect: this.onSelectImages,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        multiple: true,
        gallery: true,
        value: images.map(function (img) {
          return img.id;
        }),
        render: function render(_ref) {
          var open = _ref.open;
          return createElement(IconButton, {
            className: "components-toolbar__control",
            label: __('Edit Gallery'),
            icon: "edit",
            onClick: open
          });
        }
      })));

      if (images.length === 0) {
        return createElement(Fragment, null, controls, createElement(MediaPlaceholder, {
          icon: "format-gallery",
          className: className,
          labels: {
            title: __('Gallery'),
            instructions: __('Drag images, upload new ones or select files from your library.')
          },
          onSelect: this.onSelectImages,
          accept: "image/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          multiple: true,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice
        }));
      }

      return createElement(Fragment, null, controls, createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Gallery Settings')
      }, images.length > 1 && createElement(RangeControl, {
        label: __('Columns'),
        value: columns,
        onChange: this.setColumnsNumber,
        min: 1,
        max: Math.min(MAX_COLUMNS, images.length)
      }), createElement(ToggleControl, {
        label: __('Crop Images'),
        checked: !!imageCrop,
        onChange: this.toggleImageCrop,
        help: this.getImageCropHelp
      }), createElement(SelectControl, {
        label: __('Link To'),
        value: linkTo,
        onChange: this.setLinkTo,
        options: linkOptions
      }))), noticeUI, createElement("ul", {
        className: "".concat(className, " align").concat(align, " columns-").concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
      }, dropZone, images.map(function (img, index) {
        /* translators: %1$d is the order number of the image, %2$d is the total number of images. */
        var ariaLabel = __(sprintf('image %1$d of %2$d in gallery', index + 1, images.length));

        return createElement("li", {
          className: "blocks-gallery-item",
          key: img.id || img.url
        }, createElement(GalleryImage, {
          url: img.url,
          alt: img.alt,
          id: img.id,
          isSelected: isSelected && _this4.state.selectedImage === index,
          onRemove: _this4.onRemoveImage(index),
          onSelect: _this4.onSelectImage(index),
          setAttributes: function setAttributes(attrs) {
            return _this4.setImageAttributes(index, attrs);
          },
          caption: img.caption,
          "aria-label": ariaLabel
        }));
      }), isSelected && createElement("li", {
        className: "blocks-gallery-item has-add-item-button"
      }, createElement(FormFileUpload, {
        multiple: true,
        isLarge: true,
        className: "block-library-gallery-add-item-button",
        onChange: this.uploadFromFiles,
        accept: "image/*",
        icon: "insert"
      }, __('Upload an image')))));
    }
  }]);

  return GalleryEdit;
}(Component);

export default withNotices(GalleryEdit);
//# sourceMappingURL=edit.js.map