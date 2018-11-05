"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormatValue = getFormatValue;
exports.default = exports.RichText = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _reactNativeAztec = _interopRequireDefault(require("react-native-aztec"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _richText = require("@wordpress/rich-text");

var _keycodes = require("@wordpress/keycodes");

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var FORMATTING_CONTROLS = [{
  icon: 'editor-bold',
  title: (0, _i18n.__)('Bold'),
  format: 'bold'
}, {
  icon: 'editor-italic',
  title: (0, _i18n.__)('Italic'),
  format: 'italic'
}, {
  icon: 'admin-links',
  title: (0, _i18n.__)('Link'),
  format: 'link'
}, {
  icon: 'editor-strikethrough',
  title: (0, _i18n.__)('Strikethrough'),
  format: 'strikethrough'
}];

var isRichTextValueEmpty = function isRichTextValueEmpty(value) {
  return !value || !value.length;
};

function getFormatValue(formatName) {
  if ('link' === formatName) {//TODO: Implement link command
  }

  return {
    isActive: true
  };
}

var RichText =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RichText, _Component);

  function RichText() {
    var _this;

    (0, _classCallCheck2.default)(this, RichText);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RichText).apply(this, arguments));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onEnter = _this.onEnter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBackspace = _this.onBackspace.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onContentSizeChange = _this.onContentSizeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.changeFormats = _this.changeFormats.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleFormat = _this.toggleFormat.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onActiveFormatsChange = _this.onActiveFormatsChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.isEmpty = _this.isEmpty.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.valueToFormat = _this.valueToFormat.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      formats: {},
      selectedNodeId: 0
    };
    return _this;
  }
  /*
   * Splits the content at the location of the selection.
   *
   * Replaces the content of the editor inside this element with the contents
   * before the selection. Sends the elements after the selection to the `onSplit`
   * handler.
   *
   */


  (0, _createClass2.default)(RichText, [{
    key: "splitContent",
    value: function splitContent(htmlText, start, end) {
      var onSplit = this.props.onSplit;

      if (!onSplit) {
        return;
      }

      var record = (0, _richText.create)({
        html: htmlText,
        range: null,
        multilineTag: false,
        removeNode: null,
        unwrapNode: null,
        removeAttribute: null,
        filterString: null
      }); // TODO : Fix the index position in AztecNative for Android

      var _split = (0, _richText.split)((0, _objectSpread2.default)({
        start: start,
        end: end
      }, record)),
          _split2 = (0, _slicedToArray2.default)(_split, 2),
          before = _split2[0],
          after = _split2[1]; // In case split occurs at the trailing or leading edge of the field,
      // assume that the before/after values respectively reflect the current
      // value. This also provides an opportunity for the parent component to
      // determine whether the before/after value has changed using a trivial
      //  strict equality operation.


      if ((0, _richText.isEmpty)(after)) {
        before = record;
      } else if ((0, _richText.isEmpty)(before)) {
        after = record;
      }

      if (before) {
        before = this.valueToFormat(before);
      }

      if (after) {
        after = this.valueToFormat(after);
      } // The onSplit event can cause a content update event for this block.  Such event should
      // definitely be processed by our native components, since they have no knowledge of
      // how the split works.  Setting lastEventCount to undefined forces the native component to
      // always update when provided with new content.


      this.lastEventCount = undefined;
      onSplit(before, after);
    }
  }, {
    key: "valueToFormat",
    value: function valueToFormat(_ref) {
      var formats = _ref.formats,
          text = _ref.text;
      var value = (0, _richText.toHTMLString)({
        value: {
          formats: formats,
          text: text
        },
        multilineTag: this.multilineTag
      }); // remove the outer root tags

      return this.removeRootTagsProduceByAztec(value);
    }
  }, {
    key: "onActiveFormatsChange",
    value: function onActiveFormatsChange(formats) {
      // force re-render the component skipping shouldComponentUpdate() See: https://reactjs.org/docs/react-component.html#forceupdate
      // This is needed because our shouldComponentUpdate impl. doesn't take in consideration props yet.
      this.forceUpdate();
      var newFormats = formats.reduce(function (accFormats, activeFormat) {
        accFormats[activeFormat] = getFormatValue(activeFormat);
        return accFormats;
      }, {});
      this.setState({
        formats: (0, _lodash.merge)({}, newFormats),
        selectedNodeId: this.state.selectedNodeId + 1
      });
    }
    /*
     * Cleans up any root tags produced by aztec.
     * TODO: This should be removed on a later version when aztec doesn't return the top tag of the text being edited
     */

  }, {
    key: "removeRootTagsProduceByAztec",
    value: function removeRootTagsProduceByAztec(html) {
      var openingTagRegexp = RegExp('^<' + this.props.tagName + '>', 'gim');
      var closingTagRegexp = RegExp('</' + this.props.tagName + '>$', 'gim');
      return html.replace(openingTagRegexp, '').replace(closingTagRegexp, '');
    }
    /**
     * Handles any case where the content of the AztecRN instance has changed.
     */

  }, {
    key: "onChange",
    value: function onChange(event) {
      // If we had a timer set to propagate a change, let's cancel it, because the user meanwhile typed something extra
      if (!!this.currentTimer) {
        clearTimeout(this.currentTimer);
      }

      this.lastEventCount = event.nativeEvent.eventCount;
      var contentWithoutRootTag = this.removeRootTagsProduceByAztec(event.nativeEvent.text);
      this.lastContent = contentWithoutRootTag; // Set a time to call the onChange prop if nothing changes in the next second

      this.currentTimer = setTimeout(function () {
        this.props.onChange({
          content: this.lastContent
        });
      }.bind(this), 1000);
    }
    /**
     * Handles any case where the content of the AztecRN instance has changed in size
     */

  }, {
    key: "onContentSizeChange",
    value: function onContentSizeChange(contentSize) {
      var contentHeight = contentSize.height;
      this.forceUpdate(); // force re-render the component skipping shouldComponentUpdate() See: https://reactjs.org/docs/react-component.html#forceupdate

      this.props.onContentSizeChange({
        aztecHeight: contentHeight
      });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "onEnter",
    value: function onEnter(event) {
      if (!this.props.onSplit) {
        // TODO: insert the \n char instead?
        return;
      }

      this.splitContent(event.nativeEvent.text, event.nativeEvent.selectionStart, event.nativeEvent.selectionEnd);
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "onBackspace",
    value: function onBackspace(event) {
      var _this$props = this.props,
          onMerge = _this$props.onMerge,
          onRemove = _this$props.onRemove;

      if (!onMerge && !onRemove) {
        return;
      }

      var keyCode = _keycodes.BACKSPACE; // TODO : should we differentiate BACKSPACE and DELETE?

      var isReverse = keyCode === _keycodes.BACKSPACE;
      var empty = this.isEmpty();

      if (onMerge) {
        // The onMerge event can cause a content update event for this block.  Such event should
        // definitely be processed by our native components, since they have no knowledge of
        // how the split works.  Setting lastEventCount to undefined forces the native component to
        // always update when provided with new content.
        this.lastEventCount = undefined;
        onMerge(!isReverse);
      } // Only handle remove on Backspace. This serves dual-purpose of being
      // an intentional user interaction distinguishing between Backspace and
      // Delete to remove the empty field, but also to avoid merge & remove
      // causing destruction of two fields (merge, then removed merged).


      if (onRemove && empty && isReverse) {
        onRemove(!isReverse);
      }
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return (0, _richText.isEmpty)(this.formatToValue(this.props.value));
    }
  }, {
    key: "formatToValue",
    value: function formatToValue(value) {
      // Handle deprecated `children` and `node` sources.
      if (Array.isArray(value)) {
        return (0, _richText.create)({
          html: _blocks.children.toHTML(value),
          multilineTag: this.multilineTag
        });
      }

      if (this.props.format === 'string') {
        return (0, _richText.create)({
          html: value,
          multilineTag: this.multilineTag
        });
      } // Guard for blocks passing `null` in onSplit callbacks. May be removed
      // if onSplit is revised to not pass a `null` value.


      if (value === null) {
        return (0, _richText.create)();
      }

      return value;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.tagName !== this.props.tagName) {
        this.lastEventCount = undefined;
        this.lastContent = undefined;
        return true;
      } // The check below allows us to avoid updating the content right after an `onChange` call
      // first time the component is drawn with empty content `lastContent` is undefined


      if (nextProps.value && this.lastContent && this.lastEventCount) {
        return false;
      }

      return true;
    }
  }, {
    key: "isFormatActive",
    value: function isFormatActive(format) {
      return this.state.formats[format] && this.state.formats[format].isActive;
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "removeFormat",
    value: function removeFormat(format) {
      this._editor.applyFormat(format);
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "applyFormat",
    value: function applyFormat(format, args, node) {
      this._editor.applyFormat(format);
    }
  }, {
    key: "changeFormats",
    value: function changeFormats(formats) {
      var _this2 = this;

      var newStateFormats = {};
      (0, _lodash.forEach)(formats, function (formatValue, format) {
        newStateFormats[format] = getFormatValue(format);

        var isActive = _this2.isFormatActive(format);

        if (isActive && !formatValue) {
          _this2.removeFormat(format);
        } else if (!isActive && formatValue) {
          _this2.applyFormat(format);
        }
      });
      this.setState(function (state) {
        return {
          formats: (0, _lodash.merge)({}, state.formats, newStateFormats)
        };
      });
    }
  }, {
    key: "toggleFormat",
    value: function toggleFormat(format) {
      var _this3 = this;

      return function () {
        return _this3.changeFormats((0, _defineProperty2.default)({}, format, !_this3.state.formats[format]));
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          tagName = _this$props2.tagName,
          style = _this$props2.style,
          formattingControls = _this$props2.formattingControls,
          value = _this$props2.value;
      var toolbarControls = FORMATTING_CONTROLS.filter(function (control) {
        return formattingControls.indexOf(control.format) !== -1;
      }).map(function (control) {
        return (0, _objectSpread2.default)({}, control, {
          onClick: _this4.toggleFormat(control.format),
          isActive: _this4.isFormatActive(control.format)
        });
      }); // Save back to HTML from React tree

      var html = '<' + tagName + '>' + value + '</' + tagName + '>';
      return (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_reactNative.View, {
        style: {
          flex: 1
        }
      }, (0, _element.createElement)(_components.Toolbar, {
        controls: toolbarControls
      })), (0, _element.createElement)(_reactNativeAztec.default, {
        ref: function ref(_ref2) {
          _this4._editor = _ref2;
        },
        text: {
          text: html,
          eventCount: this.lastEventCount
        },
        onChange: this.onChange,
        onEnter: this.onEnter,
        onBackspace: this.onBackspace,
        onContentSizeChange: this.onContentSizeChange,
        onActiveFormatsChange: this.onActiveFormatsChange,
        color: 'black',
        maxImagesWidth: 200,
        style: style
      }));
    }
  }]);
  return RichText;
}(_element.Component);

exports.RichText = RichText;
RichText.defaultProps = {
  formattingControls: FORMATTING_CONTROLS.map(function (_ref3) {
    var format = _ref3.format;
    return format;
  }),
  format: 'string'
};
var RichTextContainer = (0, _compose.compose)([_compose.withInstanceId])(RichText);

RichTextContainer.Content = function (_ref4) {
  var value = _ref4.value,
      format = _ref4.format,
      Tag = _ref4.tagName,
      props = (0, _objectWithoutProperties2.default)(_ref4, ["value", "format", "tagName"]);
  var content;

  switch (format) {
    case 'string':
      content = (0, _element.createElement)(_element.RawHTML, null, value);
      break;
  }

  if (Tag) {
    return (0, _element.createElement)(Tag, props, content);
  }

  return content;
};

RichTextContainer.isEmpty = isRichTextValueEmpty;
RichTextContainer.Content.defaultProps = {
  format: 'string'
};
var _default = RichTextContainer;
exports.default = _default;
//# sourceMappingURL=index.native.js.map