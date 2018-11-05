"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _mediaUpload = _interopRequireDefault(require("../media-upload"));

var _urlPopover = _interopRequireDefault(require("../url-popover"));

var _utils = require("../../utils/");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var InsertFromURLPopover = function InsertFromURLPopover(_ref) {
  var src = _ref.src,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      onClose = _ref.onClose;
  return (0, _element.createElement)(_urlPopover.default, {
    onClose: onClose
  }, (0, _element.createElement)("form", {
    className: "editor-media-placeholder__url-input-form",
    onSubmit: onSubmit
  }, (0, _element.createElement)("input", {
    className: "editor-media-placeholder__url-input-field",
    type: "url",
    "aria-label": (0, _i18n.__)('URL'),
    placeholder: (0, _i18n.__)('Paste or type URL'),
    onChange: onChange,
    value: src
  }), (0, _element.createElement)(_components.IconButton, {
    className: "editor-media-placeholder__url-input-submit-button",
    icon: "editor-break",
    label: (0, _i18n.__)('Apply'),
    type: "submit"
  })));
};

var MediaPlaceholder =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MediaPlaceholder, _Component);

  function MediaPlaceholder() {
    var _this;

    (0, _classCallCheck2.default)(this, MediaPlaceholder);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MediaPlaceholder).apply(this, arguments));
    _this.state = {
      src: '',
      isURLInputVisible: false
    };
    _this.onChangeSrc = _this.onChangeSrc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSubmitSrc = _this.onSubmitSrc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onUpload = _this.onUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFilesUpload = _this.onFilesUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.openURLInput = _this.openURLInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.closeURLInput = _this.closeURLInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(MediaPlaceholder, [{
    key: "onlyAllowsImages",
    value: function onlyAllowsImages() {
      var allowedTypes = this.props.allowedTypes;

      if (!allowedTypes) {
        return false;
      }

      return (0, _lodash.every)(allowedTypes, function (allowedType) {
        return allowedType === 'image' || (0, _lodash.startsWith)(allowedType, 'image/');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        src: (0, _lodash.get)(this.props.value, ['src'], '')
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if ((0, _lodash.get)(prevProps.value, ['src'], '') !== (0, _lodash.get)(this.props.value, ['src'], '')) {
        this.setState({
          src: (0, _lodash.get)(this.props.value, ['src'], '')
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
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 1),
            media = _ref3[0];

        return onSelect(media);
      };
      (0, _utils.mediaUpload)({
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
          onHTMLDrop = _this$props2$onHTMLDr === void 0 ? _lodash.noop : _this$props2$onHTMLDr,
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
          instructions = (0, _i18n.__)('Drag a media file, upload a new one or select a file from your library.');

          if (isAudio) {
            instructions = (0, _i18n.__)('Drag an audio, upload a new one or select a file from your library.');
          } else if (isImage) {
            instructions = (0, _i18n.__)('Drag an image, upload a new one or select a file from your library.');
          } else if (isVideo) {
            instructions = (0, _i18n.__)('Drag a video, upload a new one or select a file from your library.');
          }
        }

        if (!title) {
          title = (0, _i18n.__)('Media');

          if (isAudio) {
            title = (0, _i18n.__)('Audio');
          } else if (isImage) {
            title = (0, _i18n.__)('Image');
          } else if (isVideo) {
            title = (0, _i18n.__)('Video');
          }
        }
      }

      return (0, _element.createElement)(_components.Placeholder, {
        icon: icon,
        label: title,
        instructions: instructions,
        className: (0, _classnames.default)('editor-media-placeholder', className),
        notices: notices
      }, (0, _element.createElement)(_components.DropZone, {
        onFilesDrop: this.onFilesUpload,
        onHTMLDrop: onHTMLDrop
      }), (0, _element.createElement)(_components.FormFileUpload, {
        isLarge: true,
        className: "editor-media-placeholder__button",
        onChange: this.onUpload,
        accept: accept,
        multiple: multiple
      }, (0, _i18n.__)('Upload')), (0, _element.createElement)(_mediaUpload.default, {
        gallery: multiple && this.onlyAllowsImages(),
        multiple: multiple,
        onSelect: onSelect,
        allowedTypes: allowedTypes,
        value: value.id,
        render: function render(_ref4) {
          var open = _ref4.open;
          return (0, _element.createElement)(_components.Button, {
            isLarge: true,
            className: "editor-media-placeholder__button",
            onClick: open
          }, (0, _i18n.__)('Media Library'));
        }
      }), onSelectURL && (0, _element.createElement)("div", {
        className: "editor-media-placeholder__url-input-container"
      }, (0, _element.createElement)(_components.Button, {
        className: "editor-media-placeholder__button",
        onClick: this.openURLInput,
        isToggled: isURLInputVisible,
        isLarge: true
      }, (0, _i18n.__)('Insert from URL')), isURLInputVisible && (0, _element.createElement)(InsertFromURLPopover, {
        src: src,
        onChange: this.onChangeSrc,
        onSubmit: this.onSubmitSrc,
        onClose: this.closeURLInput
      })));
    }
  }]);
  return MediaPlaceholder;
}(_element.Component);

var _default = (0, _components.withFilters)('editor.MediaPlaceholder')(MediaPlaceholder);

exports.default = _default;
//# sourceMappingURL=index.js.map