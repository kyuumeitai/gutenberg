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
import { sprintf, __ } from '@wordpress/i18n';
import { Component, createRef } from '@wordpress/element';
import { ExternalLink, IconButton, ToggleControl, withSpokenMessages } from '@wordpress/components';
import { ESCAPE, LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
import { prependHTTP, safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { create, insert, isCollapsed, applyFormat } from '@wordpress/rich-text';
import { URLInput, URLPopover } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import PositionedAtSelection from './positioned-at-selection';

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
    var label = sprintf(__('%s (opens in a new tab)'), text).trim();
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
    createElement("form", {
      className: "editor-format-toolbar__link-container-content",
      onKeyPress: stopKeyPropagation,
      onKeyDown: onKeyDown,
      onSubmit: submitLink
    }, createElement(URLInput, {
      value: value,
      onChange: onChangeInputValue,
      autocompleteRef: autocompleteRef
    }), createElement(IconButton, {
      icon: "editor-break",
      label: __('Apply'),
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
    createElement("div", {
      className: "editor-format-toolbar__link-container-content",
      onKeyPress: stopKeyPropagation
    }, createElement(ExternalLink, {
      className: "editor-format-toolbar__link-container-value",
      href: url
    }, filterURLForDisplay(safeDecodeURI(url))), createElement(IconButton, {
      icon: "edit",
      label: __('Edit'),
      onClick: editLink
    }))
    /* eslint-enable jsx-a11y/no-static-element-interactions */

  );
};

var InlineLinkUI =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineLinkUI, _Component);

  function InlineLinkUI() {
    var _this;

    _classCallCheck(this, InlineLinkUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InlineLinkUI).apply(this, arguments));
    _this.editLink = _this.editLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.submitLink = _this.submitLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeInputValue = _this.onChangeInputValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setLinkTarget = _this.setLinkTarget.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onClickOutside = _this.onClickOutside.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resetState = _this.resetState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.autocompleteRef = createRef();
    _this.state = {};
    return _this;
  }

  _createClass(InlineLinkUI, [{
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.keyCode === ESCAPE) {
        event.stopPropagation();
        this.resetState();
      }

      if ([LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER].indexOf(event.keyCode) > -1) {
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
        onChange(applyFormat(value, createLinkFormat({
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
      var url = prependHTTP(inputValue);
      var format = createLinkFormat({
        url: url,
        opensInNewWindow: opensInNewWindow,
        text: value.text
      });
      event.preventDefault();

      if (isCollapsed(value) && !isActive) {
        var toInsert = applyFormat(create({
          text: url
        }), format, 0, url.length);
        onChange(insert(value, toInsert));
      } else {
        onChange(applyFormat(value, format));
      }

      this.resetState();

      if (isActive) {
        speak(__('Link edited.'), 'assertive');
      } else {
        speak(__('Link added.'), 'assertive');
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
      return createElement(PositionedAtSelection, {
        key: "".concat(value.start).concat(value.end)
        /* Used to force rerender on selection change */

      }, createElement(URLPopover, {
        onClickOutside: this.onClickOutside,
        focusOnMount: showInput ? 'firstElement' : false,
        renderSettings: function renderSettings() {
          return createElement(ToggleControl, {
            label: __('Open in New Tab'),
            checked: opensInNewWindow,
            onChange: _this2.setLinkTarget
          });
        }
      }, showInput ? createElement(LinkEditor, {
        value: inputValue,
        onChangeInputValue: this.onChangeInputValue,
        onKeyDown: this.onKeyDown,
        submitLink: this.submitLink,
        autocompleteRef: this.autocompleteRef
      }) : createElement(LinkViewer, {
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
}(Component);

export default withSpokenMessages(InlineLinkUI);
//# sourceMappingURL=inline.js.map