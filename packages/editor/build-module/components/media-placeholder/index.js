import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { every, get, noop, startsWith } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button, FormFileUpload, Placeholder, DropZone, IconButton, withFilters } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import MediaUpload from '../media-upload';
import URLPopover from '../url-popover';
import { mediaUpload } from '../../utils/';

var InsertFromURLPopover = function InsertFromURLPopover(_ref) {
  var src = _ref.src,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      onClose = _ref.onClose;
  return createElement(URLPopover, {
    onClose: onClose
  }, createElement("form", {
    className: "editor-media-placeholder__url-input-form",
    onSubmit: onSubmit
  }, createElement("input", {
    className: "editor-media-placeholder__url-input-field",
    type: "url",
    "aria-label": __('URL'),
    placeholder: __('Paste or type URL'),
    onChange: onChange,
    value: src
  }), createElement(IconButton, {
    className: "editor-media-placeholder__url-input-submit-button",
    icon: "editor-break",
    label: __('Apply'),
    type: "submit"
  })));
};

var MediaPlaceholder =
/*#__PURE__*/
function (_Component) {
  _inherits(MediaPlaceholder, _Component);

  function MediaPlaceholder() {
    var _this;

    _classCallCheck(this, MediaPlaceholder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MediaPlaceholder).apply(this, arguments));
    _this.state = {
      src: '',
      isURLInputVisible: false
    };
    _this.onChangeSrc = _this.onChangeSrc.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSubmitSrc = _this.onSubmitSrc.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onUpload = _this.onUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onFilesUpload = _this.onFilesUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.openURLInput = _this.openURLInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.closeURLInput = _this.closeURLInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(MediaPlaceholder, [{
    key: "onlyAllowsImages",
    value: function onlyAllowsImages() {
      var allowedTypes = this.props.allowedTypes;

      if (!allowedTypes) {
        return false;
      }

      return every(allowedTypes, function (allowedType) {
        return allowedType === 'image' || startsWith(allowedType, 'image/');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        src: get(this.props.value, ['src'], '')
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (get(prevProps.value, ['src'], '') !== get(this.props.value, ['src'], '')) {
        this.setState({
          src: get(this.props.value, ['src'], '')
        });
      }
    }
  }, {
    key: "onChangeSrc",
    value: function onChangeSrc(event) {
      this.setState({
        src: event.target.value
      });
    }
  }, {
    key: "onSubmitSrc",
    value: function onSubmitSrc(event) {
      event.preventDefault();

      if (this.state.src && this.props.onSelectURL) {
        this.props.onSelectURL(this.state.src);
        this.closeURLInput();
      }
    }
  }, {
    key: "onUpload",
    value: function onUpload(event) {
      this.onFilesUpload(event.target.files);
    }
  }, {
    key: "onFilesUpload",
    value: function onFilesUpload(files) {
      var _this$props = this.props,
          onSelect = _this$props.onSelect,
          multiple = _this$props.multiple,
          onError = _this$props.onError,
          allowedTypes = _this$props.allowedTypes;
      var setMedia = multiple ? onSelect : function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            media = _ref3[0];

        return onSelect(media);
      };
      mediaUpload({
        allowedTypes: allowedTypes,
        filesList: files,
        onFileChange: setMedia,
        onError: onError
      });
    }
  }, {
    key: "openURLInput",
    value: function openURLInput() {
      this.setState({
        isURLInputVisible: true
      });
    }
  }, {
    key: "closeURLInput",
    value: function closeURLInput() {
      this.setState({
        isURLInputVisible: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          accept = _this$props2.accept,
          icon = _this$props2.icon,
          className = _this$props2.className,
          _this$props2$labels = _this$props2.labels,
          labels = _this$props2$labels === void 0 ? {} : _this$props2$labels,
          onSelect = _this$props2.onSelect,
          _this$props2$value = _this$props2.value,
          value = _this$props2$value === void 0 ? {} : _this$props2$value,
          onSelectURL = _this$props2.onSelectURL,
          _this$props2$onHTMLDr = _this$props2.onHTMLDrop,
          onHTMLDrop = _this$props2$onHTMLDr === void 0 ? noop : _this$props2$onHTMLDr,
          _this$props2$multiple = _this$props2.multiple,
          multiple = _this$props2$multiple === void 0 ? false : _this$props2$multiple,
          notices = _this$props2.notices,
          allowedTypes = _this$props2.allowedTypes;
      var _this$state = this.state,
          isURLInputVisible = _this$state.isURLInputVisible,
          src = _this$state.src;
      var instructions = labels.instructions || '';
      var title = labels.title || '';

      if (!instructions || !title) {
        var isOneType = 1 === allowedTypes.length;
        var isAudio = isOneType && 'audio' === allowedTypes[0];
        var isImage = isOneType && 'image' === allowedTypes[0];
        var isVideo = isOneType && 'video' === allowedTypes[0];

        if (!instructions) {
          instructions = __('Drag a media file, upload a new one or select a file from your library.');

          if (isAudio) {
            instructions = __('Drag an audio, upload a new one or select a file from your library.');
          } else if (isImage) {
            instructions = __('Drag an image, upload a new one or select a file from your library.');
          } else if (isVideo) {
            instructions = __('Drag a video, upload a new one or select a file from your library.');
          }
        }

        if (!title) {
          title = __('Media');

          if (isAudio) {
            title = __('Audio');
          } else if (isImage) {
            title = __('Image');
          } else if (isVideo) {
            title = __('Video');
          }
        }
      }

      return createElement(Placeholder, {
        icon: icon,
        label: title,
        instructions: instructions,
        className: classnames('editor-media-placeholder', className),
        notices: notices
      }, createElement(DropZone, {
        onFilesDrop: this.onFilesUpload,
        onHTMLDrop: onHTMLDrop
      }), createElement(FormFileUpload, {
        isLarge: true,
        className: "editor-media-placeholder__button",
        onChange: this.onUpload,
        accept: accept,
        multiple: multiple
      }, __('Upload')), createElement(MediaUpload, {
        gallery: multiple && this.onlyAllowsImages(),
        multiple: multiple,
        onSelect: onSelect,
        allowedTypes: allowedTypes,
        value: value.id,
        render: function render(_ref4) {
          var open = _ref4.open;
          return createElement(Button, {
            isLarge: true,
            className: "editor-media-placeholder__button",
            onClick: open
          }, __('Media Library'));
        }
      }), onSelectURL && createElement("div", {
        className: "editor-media-placeholder__url-input-container"
      }, createElement(Button, {
        className: "editor-media-placeholder__button",
        onClick: this.openURLInput,
        isToggled: isURLInputVisible,
        isLarge: true
      }, __('Insert from URL')), isURLInputVisible && createElement(InsertFromURLPopover, {
        src: src,
        onChange: this.onChangeSrc,
        onSubmit: this.onSubmitSrc,
        onClose: this.closeURLInput
      })));
    }
  }]);

  return MediaPlaceholder;
}(Component);

export default withFilters('editor.MediaPlaceholder')(MediaPlaceholder);
//# sourceMappingURL=index.js.map