import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import { insertObject } from '@wordpress/rich-text';
import { MediaUpload } from '@wordpress/editor';
var ALLOWED_MEDIA_TYPES = ['image'];
var name = 'core/image';
export var image = {
  name: name,
  title: __('Image'),
  keywords: [__('photo'), __('media')],
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
    _inherits(ImageEdit, _Component);

    function ImageEdit() {
      var _this;

      _classCallCheck(this, ImageEdit);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageEdit).apply(this, arguments));
      _this.openModal = _this.openModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        modal: false
      };
      return _this;
    }

    _createClass(ImageEdit, [{
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
        return createElement(Fragment, null, createElement(InserterListItem, {
          icon: createElement(SVG, {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
          }, createElement(Path, {
            d: "M4 16h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2zM4 5h10v9H4V5zm14 9v2h4v-2h-4zM2 20h20v-2H2v2zm6.4-8.8L7 9.4 5 12h8l-2.6-3.4-2 2.6z"
          })),
          title: __('Inline Image'),
          onClick: this.openModal
        }), this.state.modal && createElement(MediaUpload, {
          allowedTypes: ALLOWED_MEDIA_TYPES,
          onSelect: function onSelect(_ref) {
            var id = _ref.id,
                url = _ref.url,
                alt = _ref.alt,
                width = _ref.width;

            _this2.closeModal();

            onChange(insertObject(value, {
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
  }(Component)
};
//# sourceMappingURL=index.js.map