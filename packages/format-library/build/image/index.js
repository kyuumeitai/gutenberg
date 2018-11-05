"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.image = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
var ALLOWED_MEDIA_TYPES = ['image'];
var name = 'core/image';
var image = {
  name: name,
  title: (0, _i18n.__)('Image'),
  keywords: [(0, _i18n.__)('photo'), (0, _i18n.__)('media')],
  object: true,
  match: {
    tagName: 'img'
  },
  attributes: {
    className: 'class',
    style: 'style',
    url: 'src',
    alt: 'alt'
  },
  edit:
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(ImageEdit, _Component);

    function ImageEdit() {
      var _this;

      (0, _classCallCheck2.default)(this, ImageEdit);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageEdit).apply(this, arguments));
      _this.openModal = _this.openModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.closeModal = _this.closeModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.state = {
        modal: false
      };
      return _this;
    }

    (0, _createClass2.default)(ImageEdit, [{
      key: "openModal",
      value: function openModal() {
        this.setState({
          modal: true
        });
      }
    }, {
      key: "closeModal",
      value: function closeModal() {
        this.setState({
          modal: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange,
            InserterListItem = _this$props.InserterListItem;
        return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(InserterListItem, {
          icon: (0, _element.createElement)(_components.SVG, {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
          }, (0, _element.createElement)(_components.Path, {
            d: "M4 16h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2zM4 5h10v9H4V5zm14 9v2h4v-2h-4zM2 20h20v-2H2v2zm6.4-8.8L7 9.4 5 12h8l-2.6-3.4-2 2.6z"
          })),
          title: (0, _i18n.__)('Inline Image'),
          onClick: this.openModal
        }), this.state.modal && (0, _element.createElement)(_editor.MediaUpload, {
          allowedTypes: ALLOWED_MEDIA_TYPES,
          onSelect: function onSelect(_ref) {
            var id = _ref.id,
                url = _ref.url,
                alt = _ref.alt,
                width = _ref.width;

            _this2.closeModal();

            onChange((0, _richText.insertObject)(value, {
              type: name,
              attributes: {
                className: "wp-image-".concat(id),
                style: "width: ".concat(Math.min(width, 150), "px;"),
                url: url,
                alt: alt
              }
            }));
          },
          onClose: this.closeModal,
          render: function render(_ref2) {
            var open = _ref2.open;
            open();
            return null;
          }
        }));
      }
    }]);
    return ImageEdit;
  }(_element.Component)
};
exports.image = image;
//# sourceMappingURL=index.js.map