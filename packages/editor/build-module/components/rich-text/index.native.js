import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import RCTAztecView from 'react-native-aztec';
import { View } from 'react-native';
import { forEach, merge } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, RawHTML } from '@wordpress/element';
import { withInstanceId, compose } from '@wordpress/compose';
import { Toolbar } from '@wordpress/components';
import { isEmpty as _isEmpty, create, split, toHTMLString } from '@wordpress/rich-text';
import { BACKSPACE } from '@wordpress/keycodes';
import { children } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var FORMATTING_CONTROLS = [{
  icon: 'editor-bold',
  title: __('Bold'),
  format: 'bold'
}, {
  icon: 'editor-italic',
  title: __('Italic'),
  format: 'italic'
}, {
  icon: 'admin-links',
  title: __('Link'),
  format: 'link'
}, {
  icon: 'editor-strikethrough',
  title: __('Strikethrough'),
  format: 'strikethrough'
}];

var isRichTextValueEmpty = function isRichTextValueEmpty(value) {
  return !value || !value.length;
};

export function getFormatValue(formatName) {
  if ('link' === formatName) {//TODO: Implement link command
  }

  return {
    isActive: true
  };
}
export var RichText =
/*#__PURE__*/
function (_Component) {
  _inherits(RichText, _Component);

  function RichText() {
    var _this;

    _classCallCheck(this, RichText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RichText).apply(this, arguments));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBackspace = _this.onBackspace.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onContentSizeChange = _this.onContentSizeChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeFormats = _this.changeFormats.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleFormat = _this.toggleFormat.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onActiveFormatsChange = _this.onActiveFormatsChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.isEmpty = _this.isEmpty.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.valueToFormat = _this.valueToFormat.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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


  _createClass(RichText, [{
    key: "splitContent",
    value: function splitContent(htmlText, start, end) {
      var onSplit = this.props.onSplit;

      if (!onSplit) {
        return;
      }

      var record = create({
        html: htmlText,
        range: null,
        multilineTag: false,
        removeNode: null,
        unwrapNode: null,
        removeAttribute: null,
        filterString: null
      }); // TODO : Fix the index position in AztecNative for Android

      var _split = split(_objectSpread({
        start: start,
        end: end
      }, record)),
          _split2 = _slicedToArray(_split, 2),
          before = _split2[0],
          after = _split2[1]; // In case split occurs at the trailing or leading edge of the field,
      // assume that the before/after values respectively reflect the current
      // value. This also provides an opportunity for the parent component to
      // determine whether the before/after value has changed using a trivial
      //  strict equality operation.


      if (_isEmpty(after)) {
        before = record;
      } else if (_isEmpty(before)) {
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
      var value = toHTMLString({
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
        formats: merge({}, newFormats),
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

      var keyCode = BACKSPACE; // TODO : should we differentiate BACKSPACE and DELETE?

      var isReverse = keyCode === BACKSPACE;
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
      return _isEmpty(this.formatToValue(this.props.value));
    }
  }, {
    key: "formatToValue",
    value: function formatToValue(value) {
      // Handle deprecated `children` and `node` sources.
      if (Array.isArray(value)) {
        return create({
          html: children.toHTML(value),
          multilineTag: this.multilineTag
        });
      }

      if (this.props.format === 'string') {
        return create({
          html: value,
          multilineTag: this.multilineTag
        });
      } // Guard for blocks passing `null` in onSplit callbacks. May be removed
      // if onSplit is revised to not pass a `null` value.


      if (value === null) {
        return create();
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
      forEach(formats, function (formatValue, format) {
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
          formats: merge({}, state.formats, newStateFormats)
        };
      });
    }
  }, {
    key: "toggleFormat",
    value: function toggleFormat(format) {
      var _this3 = this;

      return function () {
        return _this3.changeFormats(_defineProperty({}, format, !_this3.state.formats[format]));
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
        return _objectSpread({}, control, {
          onClick: _this4.toggleFormat(control.format),
          isActive: _this4.isFormatActive(control.format)
        });
      }); // Save back to HTML from React tree

      var html = '<' + tagName + '>' + value + '</' + tagName + '>';
      return createElement(View, null, createElement(View, {
        style: {
          flex: 1
        }
      }, createElement(Toolbar, {
        controls: toolbarControls
      })), createElement(RCTAztecView, {
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
}(Component);
RichText.defaultProps = {
  formattingControls: FORMATTING_CONTROLS.map(function (_ref3) {
    var format = _ref3.format;
    return format;
  }),
  format: 'string'
};
var RichTextContainer = compose([withInstanceId])(RichText);

RichTextContainer.Content = function (_ref4) {
  var value = _ref4.value,
      format = _ref4.format,
      Tag = _ref4.tagName,
      props = _objectWithoutProperties(_ref4, ["value", "format", "tagName"]);

  var content;

  switch (format) {
    case 'string':
      content = createElement(RawHTML, null, value);
      break;
  }

  if (Tag) {
    return createElement(Tag, props, content);
  }

  return content;
};

RichTextContainer.isEmpty = isRichTextValueEmpty;
RichTextContainer.Content.defaultProps = {
  format: 'string'
};
export default RichTextContainer;
//# sourceMappingURL=index.native.js.map