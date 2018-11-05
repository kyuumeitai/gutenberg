"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _keycodes = require("@wordpress/keycodes");

var _url = require("@wordpress/url");

var _richText = require("@wordpress/rich-text");

var _editor = require("@wordpress/editor");

var _positionedAtSelection = _interopRequireDefault(require("./positioned-at-selection"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};
/**
 * Generates the format object that will be applied to the link text.
 *
 * @param {string}  url              The href of the link.
 * @param {boolean} opensInNewWindow Whether this link will open in a new window.
 * @param {Object}  text             The text that is being hyperlinked.
 *
 * @return {Object} The final format object.
 */


function createLinkFormat(_ref) {
  var url = _ref.url,
      opensInNewWindow = _ref.opensInNewWindow,
      text = _ref.text;
  var format = {
    type: 'core/link',
    attributes: {
      url: url
    }
  };

  if (opensInNewWindow) {
    // translators: accessibility label for external links, where the argument is the link text
    var label = (0, _i18n.sprintf)((0, _i18n.__)('%s (opens in a new tab)'), text).trim();
    format.attributes.target = '_blank';
    format.attributes.rel = 'noreferrer noopener';
    format.attributes['aria-label'] = label;
  }

  return format;
}

function isShowingInput(props, state) {
  return props.addingLink || state.editLink;
}

var LinkEditor = function LinkEditor(_ref2) {
  var value = _ref2.value,
      onChangeInputValue = _ref2.onChangeInputValue,
      onKeyDown = _ref2.onKeyDown,
      submitLink = _ref2.submitLink,
      autocompleteRef = _ref2.autocompleteRef;
  return (// Disable reason: KeyPress must be suppressed so the block doesn't hide the toolbar

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    (0, _element.createElement)("form", {
      className: "editor-format-toolbar__link-container-content",
      onKeyPress: stopKeyPropagation,
      onKeyDown: onKeyDown,
      onSubmit: submitLink
    }, (0, _element.createElement)(_editor.URLInput, {
      value: value,
      onChange: onChangeInputValue,
      autocompleteRef: autocompleteRef
    }), (0, _element.createElement)(_components.IconButton, {
      icon: "editor-break",
      label: (0, _i18n.__)('Apply'),
      type: "submit"
    }))
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */

  );
};

var LinkViewer = function LinkViewer(_ref3) {
  var url = _ref3.url,
      editLink = _ref3.editLink;
  return (// Disable reason: KeyPress must be suppressed so the block doesn't hide the toolbar

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    (0, _element.createElement)("div", {
      className: "editor-format-toolbar__link-container-content",
      onKeyPress: stopKeyPropagation
    }, (0, _element.createElement)(_components.ExternalLink, {
      className: "editor-format-toolbar__link-container-value",
      href: url
    }, (0, _url.filterURLForDisplay)((0, _url.safeDecodeURI)(url))), (0, _element.createElement)(_components.IconButton, {
      icon: "edit",
      label: (0, _i18n.__)('Edit'),
      onClick: editLink
    }))
    /* eslint-enable jsx-a11y/no-static-element-interactions */

  );
};

var InlineLinkUI =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InlineLinkUI, _Component);

  function InlineLinkUI() {
    var _this;

    (0, _classCallCheck2.default)(this, InlineLinkUI);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InlineLinkUI).apply(this, arguments));
    _this.editLink = _this.editLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.submitLink = _this.submitLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onChangeInputValue = _this.onChangeInputValue.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setLinkTarget = _this.setLinkTarget.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onClickOutside = _this.onClickOutside.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resetState = _this.resetState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.autocompleteRef = (0, _element.createRef)();
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(InlineLinkUI, [{
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.keyCode === _keycodes.ESCAPE) {
        event.stopPropagation();
        this.resetState();
      }

      if ([_keycodes.LEFT, _keycodes.DOWN, _keycodes.RIGHT, _keycodes.UP, _keycodes.BACKSPACE, _keycodes.ENTER].indexOf(event.keyCode) > -1) {
        // Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
        event.stopPropagation();
      }
    }
  }, {
    key: "onChangeInputValue",
    value: function onChangeInputValue(inputValue) {
      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "setLinkTarget",
    value: function setLinkTarget(opensInNewWindow) {
      var _this$props = this.props,
          url = _this$props.activeAttributes.url,
          value = _this$props.value,
          onChange = _this$props.onChange;
      this.setState({
        opensInNewWindow: opensInNewWindow
      }); // Apply now if URL is not being edited.

      if (!isShowingInput(this.props, this.state)) {
        onChange((0, _richText.applyFormat)(value, createLinkFormat({
          url: url,
          opensInNewWindow: opensInNewWindow,
          text: value.text
        })));
      }
    }
  }, {
    key: "editLink",
    value: function editLink(event) {
      this.setState({
        editLink: true
      });
      event.preventDefault();
    }
  }, {
    key: "submitLink",
    value: function submitLink(event) {
      var _this$props2 = this.props,
          isActive = _this$props2.isActive,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          speak = _this$props2.speak;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          opensInNewWindow = _this$state.opensInNewWindow;
      var url = (0, _url.prependHTTP)(inputValue);
      var format = createLinkFormat({
        url: url,
        opensInNewWindow: opensInNewWindow,
        text: value.text
      });
      event.preventDefault();

      if ((0, _richText.isCollapsed)(value) && !isActive) {
        var toInsert = (0, _richText.applyFormat)((0, _richText.create)({
          text: url
        }), format, 0, url.length);
        onChange((0, _richText.insert)(value, toInsert));
      } else {
        onChange((0, _richText.applyFormat)(value, format));
      }

      this.resetState();

      if (isActive) {
        speak((0, _i18n.__)('Link edited.'), 'assertive');
      } else {
        speak((0, _i18n.__)('Link added.'), 'assertive');
      }
    }
  }, {
    key: "onClickOutside",
    value: function onClickOutside(event) {
      // The autocomplete suggestions list renders in a separate popover (in a portal),
      // so onClickOutside fails to detect that a click on a suggestion occured in the
      // LinkContainer. Detect clicks on autocomplete suggestions using a ref here, and
      // return to avoid the popover being closed.
      var autocompleteElement = this.autocompleteRef.current;

      if (autocompleteElement && autocompleteElement.contains(event.target)) {
        return;
      }

      this.resetState();
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.props.stopAddingLink();
      this.setState({
        editLink: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          isActive = _this$props3.isActive,
          url = _this$props3.activeAttributes.url,
          addingLink = _this$props3.addingLink,
          value = _this$props3.value;

      if (!isActive && !addingLink) {
        return null;
      }

      var _this$state2 = this.state,
          inputValue = _this$state2.inputValue,
          opensInNewWindow = _this$state2.opensInNewWindow;
      var showInput = isShowingInput(this.props, this.state);
      return (0, _element.createElement)(_positionedAtSelection.default, {
        key: "".concat(value.start).concat(value.end)
        /* Used to force rerender on selection change */

      }, (0, _element.createElement)(_editor.URLPopover, {
        onClickOutside: this.onClickOutside,
        focusOnMount: showInput ? 'firstElement' : false,
        renderSettings: function renderSettings() {
          return (0, _element.createElement)(_components.ToggleControl, {
            label: (0, _i18n.__)('Open in New Tab'),
            checked: opensInNewWindow,
            onChange: _this2.setLinkTarget
          });
        }
      }, showInput ? (0, _element.createElement)(LinkEditor, {
        value: inputValue,
        onChangeInputValue: this.onChangeInputValue,
        onKeyDown: this.onKeyDown,
        submitLink: this.submitLink,
        autocompleteRef: this.autocompleteRef
      }) : (0, _element.createElement)(LinkViewer, {
        url: url,
        editLink: this.editLink
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var _props$activeAttribut = props.activeAttributes,
          url = _props$activeAttribut.url,
          target = _props$activeAttribut.target;
      var opensInNewWindow = target === '_blank';

      if (!isShowingInput(props, state)) {
        if (url !== state.inputValue) {
          return {
            inputValue: url
          };
        }

        if (opensInNewWindow !== state.opensInNewWindow) {
          return {
            opensInNewWindow: opensInNewWindow
          };
        }
      }

      return null;
    }
  }]);
  return InlineLinkUI;
}(_element.Component);

var _default = (0, _components.withSpokenMessages)(InlineLinkUI);

exports.default = _default;
//# sourceMappingURL=inline.js.map