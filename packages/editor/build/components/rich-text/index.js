"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RichText = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _memize = _interopRequireDefault(require("memize"));

var _dom = require("@wordpress/dom");

var _blob = require("@wordpress/blob");

var _keycodes = require("@wordpress/keycodes");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _url = require("@wordpress/url");

var _richText = require("@wordpress/rich-text");

var _htmlEntities = require("@wordpress/html-entities");

var _autocomplete = _interopRequireDefault(require("../autocomplete"));

var _blockFormatControls = _interopRequireDefault(require("../block-format-controls"));

var _formatEdit = _interopRequireDefault(require("./format-edit"));

var _formatToolbar = _interopRequireDefault(require("./format-toolbar"));

var _tinymce = _interopRequireWildcard(require("./tinymce"));

var _aria = require("./aria");

var _patterns = require("./patterns");

var _context = require("../block-edit/context");

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
 * Browser dependencies
 */
var _window = window,
    getSelection = _window.getSelection;

var RichText =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RichText, _Component);

  function RichText(_ref) {
    var _this;

    var value = _ref.value,
        onReplace = _ref.onReplace,
        multiline = _ref.multiline;
    (0, _classCallCheck2.default)(this, RichText);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RichText).apply(this, arguments));

    if (multiline === true || multiline === 'p' || multiline === 'li') {
      _this.multilineTag = multiline === true ? 'p' : multiline;
    }

    if (_this.multilineTag === 'li') {
      _this.multilineWrapperTags = ['ul', 'ol'];
    }

    _this.onInit = _this.onInit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getSettings = _this.getSettings.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSetup = _this.onSetup.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onNodeChange = _this.onNodeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onDeleteKeyDown = _this.onDeleteKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onKeyUp = _this.onKeyUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onPropagateUndo = _this.onPropagateUndo.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onPaste = _this.onPaste.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onCreateUndoLevel = _this.onCreateUndoLevel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setFocusedElement = _this.setFocusedElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onInput = _this.onInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelectionChange = _this.onSelectionChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getRecord = _this.getRecord.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.createRecord = _this.createRecord.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.applyRecord = _this.applyRecord.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.isEmpty = _this.isEmpty.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.valueToFormat = _this.valueToFormat.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setRef = _this.setRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.isActive = _this.isActive.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.formatToValue = (0, _memize.default)(_this.formatToValue.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), {
      size: 1
    });
    _this.savedContent = value;
    _this.patterns = (0, _patterns.getPatterns)({
      onReplace: onReplace,
      multilineTag: _this.multilineTag,
      valueToFormat: _this.valueToFormat
    });
    _this.enterPatterns = (0, _blocks.getBlockTransforms)('from').filter(function (_ref2) {
      var type = _ref2.type,
          trigger = _ref2.trigger;
      return type === 'pattern' && trigger === 'enter';
    });
    _this.state = {};
    _this.usedDeprecatedChildrenSource = Array.isArray(value);
    return _this;
  }

  (0, _createClass2.default)(RichText, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('selectionchange', this.onSelectionChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('selectionchange', this.onSelectionChange);
    }
  }, {
    key: "setRef",
    value: function setRef(node) {
      this.editableRef = node;
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.editableRef === document.activeElement;
    }
    /**
     * Retrieves the settings for this block.
     *
     * Allows passing in settings which will be overwritten.
     *
     * @param {Object} settings The settings to overwrite.
     * @return {Object} The settings for this block.
     */

  }, {
    key: "getSettings",
    value: function getSettings(settings) {
      settings = (0, _objectSpread2.default)({}, settings, {
        forced_root_block: this.multilineTag || false,
        // Allow TinyMCE to keep one undo level for comparing changes.
        // Prevent it otherwise from accumulating any history.
        custom_undo_redo_levels: 1
      });
      var unstableGetSettings = this.props.unstableGetSettings;

      if (unstableGetSettings) {
        settings = unstableGetSettings(settings);
      }

      return settings;
    }
    /**
     * Handles the onSetup event for the TinyMCE component.
     *
     * Will setup event handlers for the TinyMCE instance.
     * An `onSetup` function in the props will be called if it is present.
     *
     * @param {tinymce} editor The editor instance as passed by TinyMCE.
     */

  }, {
    key: "onSetup",
    value: function onSetup(editor) {
      this.editor = editor;
      editor.on('init', this.onInit);
      editor.on('nodechange', this.onNodeChange);
      editor.on('BeforeExecCommand', this.onPropagateUndo); // The change event in TinyMCE fires every time an undo level is added.

      editor.on('change', this.onCreateUndoLevel);
      var unstableOnSetup = this.props.unstableOnSetup;

      if (unstableOnSetup) {
        unstableOnSetup(editor);
      }
    }
  }, {
    key: "setFocusedElement",
    value: function setFocusedElement() {
      if (this.props.setFocusedElement) {
        this.props.setFocusedElement(this.props.instanceId);
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this.editor.shortcuts.add(_keycodes.rawShortcut.primary('z'), '', 'Undo');
      this.editor.shortcuts.add(_keycodes.rawShortcut.primaryShift('z'), '', 'Redo'); // Remove TinyMCE Core shortcut for consistency with global editor
      // shortcuts. Also clashes with Mac browsers.

      this.editor.shortcuts.remove('meta+y', '', 'Redo');
    }
    /**
     * Handles an undo event from TinyMCE.
     *
     * @param {UndoEvent} event The undo event as triggered by TinyMCE.
     */

  }, {
    key: "onPropagateUndo",
    value: function onPropagateUndo(event) {
      var _this$props = this.props,
          onUndo = _this$props.onUndo,
          onRedo = _this$props.onRedo;
      var command = event.command;

      if (command === 'Undo' && onUndo) {
        (0, _lodash.defer)(onUndo);
        event.preventDefault();
      }

      if (command === 'Redo' && onRedo) {
        (0, _lodash.defer)(onRedo);
        event.preventDefault();
      }
    }
    /**
     * Get the current record (value and selection) from props and state.
     *
     * @return {Object} The current record (value and selection).
     */

  }, {
    key: "getRecord",
    value: function getRecord() {
      var _this$formatToValue = this.formatToValue(this.props.value),
          formats = _this$formatToValue.formats,
          text = _this$formatToValue.text;

      var _this$state = this.state,
          start = _this$state.start,
          end = _this$state.end;
      return {
        formats: formats,
        text: text,
        start: start,
        end: end
      };
    }
  }, {
    key: "createRecord",
    value: function createRecord() {
      var range = getSelection().getRangeAt(0);
      return (0, _richText.create)({
        element: this.editableRef,
        range: range,
        multilineTag: this.multilineTag,
        multilineWrapperTags: this.multilineWrapperTags,
        removeNode: function removeNode(node) {
          return node.getAttribute('data-mce-bogus') === 'all';
        },
        unwrapNode: function unwrapNode(node) {
          return !!node.getAttribute('data-mce-bogus');
        },
        removeAttribute: function removeAttribute(attribute) {
          return attribute.indexOf('data-mce-') === 0;
        },
        filterString: function filterString(string) {
          return string.replace(_tinymce.TINYMCE_ZWSP, '');
        }
      });
    }
  }, {
    key: "applyRecord",
    value: function applyRecord(record) {
      (0, _richText.apply)({
        value: record,
        current: this.editableRef,
        multilineTag: this.multilineTag,
        multilineWrapperTags: this.multilineWrapperTags,
        createLinePadding: function createLinePadding(doc) {
          var element = doc.createElement('br');
          element.setAttribute('data-mce-bogus', '1');
          return element;
        }
      });
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return (0, _richText.isEmpty)(this.formatToValue(this.props.value));
    }
    /**
     * Handles a paste event.
     *
     * Saves the pasted data as plain text in `pastedPlainText`.
     *
     * @param {PasteEvent} event The paste event.
     */

  }, {
    key: "onPaste",
    value: function onPaste(event) {
      var _this2 = this;

      var clipboardData = event.clipboardData;
      var items = clipboardData.items,
          files = clipboardData.files; // In Edge these properties can be null instead of undefined, so a more
      // rigorous test is required over using default values.

      items = (0, _lodash.isNil)(items) ? [] : items;
      files = (0, _lodash.isNil)(files) ? [] : files;
      var item = (0, _lodash.find)((0, _toConsumableArray2.default)(items).concat((0, _toConsumableArray2.default)(files)), function (_ref3) {
        var type = _ref3.type;
        return /^image\/(?:jpe?g|png|gif)$/.test(type);
      });
      var plainText = '';
      var html = ''; // IE11 only supports `Text` as an argument for `getData` and will
      // otherwise throw an invalid argument error, so we try the standard
      // arguments first, then fallback to `Text` if they fail.

      try {
        plainText = clipboardData.getData('text/plain');
        html = clipboardData.getData('text/html');
      } catch (error1) {
        try {
          html = clipboardData.getData('Text');
        } catch (error2) {
          // Some browsers like UC Browser paste plain text by default and
          // don't support clipboardData at all, so allow default
          // behaviour.
          return;
        }
      }

      event.preventDefault(); // Allows us to ask for this information when we get a report.

      window.console.log('Received HTML:\n\n', html);
      window.console.log('Received plain text:\n\n', plainText); // Only process file if no HTML is present.
      // Note: a pasted file may have the URL as plain text.

      if (item && !html) {
        var file = item.getAsFile ? item.getAsFile() : item;

        var _content = (0, _blocks.rawHandler)({
          HTML: "<img src=\"".concat((0, _blob.createBlobURL)(file), "\">"),
          mode: 'BLOCKS',
          tagName: this.props.tagName
        });

        var _shouldReplace = this.props.onReplace && this.isEmpty(); // Allows us to ask for this information when we get a report.


        window.console.log('Received item:\n\n', file);

        if (_shouldReplace) {
          // Necessary to allow the paste bin to be removed without errors.
          this.props.setTimeout(function () {
            return _this2.props.onReplace(_content);
          });
        } else if (this.props.onSplit) {
          // Necessary to get the right range.
          // Also done in the TinyMCE paste plugin.
          this.props.setTimeout(function () {
            return _this2.splitContent(_content);
          });
        }

        return;
      } // There is a selection, check if a URL is pasted.


      if (!this.editor.selection.isCollapsed()) {
        var pastedText = (html || plainText).replace(/<[^>]+>/g, '').trim(); // A URL was pasted, turn the selection into a link

        if ((0, _url.isURL)(pastedText)) {
          this.onChange((0, _richText.applyFormat)(this.getRecord(), {
            type: 'a',
            attributes: {
              href: (0, _htmlEntities.decodeEntities)(pastedText)
            }
          })); // Allows us to ask for this information when we get a report.

          window.console.log('Created link:\n\n', pastedText);
          return;
        }
      }

      var shouldReplace = this.props.onReplace && this.isEmpty();
      var mode = 'INLINE';

      if (shouldReplace) {
        mode = 'BLOCKS';
      } else if (this.props.onSplit) {
        mode = 'AUTO';
      }

      var content = (0, _blocks.rawHandler)({
        HTML: html,
        plainText: plainText,
        mode: mode,
        tagName: this.props.tagName,
        canUserUseUnfilteredHTML: this.props.canUserUseUnfilteredHTML
      });

      if (typeof content === 'string') {
        var recordToInsert = (0, _richText.create)({
          html: content
        });
        this.onChange((0, _richText.insert)(this.getRecord(), recordToInsert));
      } else if (this.props.onSplit) {
        if (!content.length) {
          return;
        }

        if (shouldReplace) {
          this.props.onReplace(content);
        } else {
          this.splitContent(content, {
            paste: true
          });
        }
      }
    }
    /**
     * Handles a focus event on the contenteditable field, calling the
     * `unstableOnFocus` prop callback if one is defined. The callback does not
     * receive any arguments.
     *
     * This is marked as a private API and the `unstableOnFocus` prop is not
     * documented, as the current requirements where it is used are subject to
     * future refactoring following `isSelected` handling.
     *
     * In contrast with `setFocusedElement`, this is only triggered in response
     * to focus within the contenteditable field, whereas `setFocusedElement`
     * is triggered on focus within any `RichText` descendent element.
     *
     * @see setFocusedElement
     *
     * @private
     */

  }, {
    key: "onFocus",
    value: function onFocus() {
      var unstableOnFocus = this.props.unstableOnFocus;

      if (unstableOnFocus) {
        unstableOnFocus();
      }
    }
    /**
     * Handle input on the next selection change event.
     */

  }, {
    key: "onInput",
    value: function onInput() {
      var record = this.createRecord();
      var transformed = this.patterns.reduce(function (accumlator, transform) {
        return transform(accumlator);
      }, record); // Don't apply changes if there's no transform. Content will be up to
      // date. In the future we could always let it flow back in the live DOM
      // if there are no performance issues.

      this.onChange(transformed, record === transformed);
    }
    /**
     * Handles the `selectionchange` event: sync the selection to local state.
     */

  }, {
    key: "onSelectionChange",
    value: function onSelectionChange() {
      // Ensure it's the active element. This is a global event.
      if (!this.isActive()) {
        return;
      }

      var _this$createRecord = this.createRecord(),
          start = _this$createRecord.start,
          end = _this$createRecord.end,
          formats = _this$createRecord.formats;

      if (start !== this.state.start || end !== this.state.end) {
        var isCaretWithinFormattedText = this.props.isCaretWithinFormattedText;

        if (!isCaretWithinFormattedText && formats[start]) {
          this.props.onEnterFormattedText();
        } else if (isCaretWithinFormattedText && !formats[start]) {
          this.props.onExitFormattedText();
        }

        this.setState({
          start: start,
          end: end
        });
      }
    }
    /**
     * Sync the value to global state. The node tree and selection will also be
     * updated if differences are found.
     *
     * @param {Object}  record        The record to sync and apply.
     * @param {boolean} _withoutApply If true, the record won't be applied to
     *                                the live DOM.
     */

  }, {
    key: "onChange",
    value: function onChange(record, _withoutApply) {
      if (!_withoutApply) {
        this.applyRecord(record);
      }

      var start = record.start,
          end = record.end;
      this.savedContent = this.valueToFormat(record);
      this.props.onChange(this.savedContent);
      this.setState({
        start: start,
        end: end
      });
    }
  }, {
    key: "onCreateUndoLevel",
    value: function onCreateUndoLevel(event) {
      // TinyMCE fires a `change` event when the first letter in an instance
      // is typed. This should not create a history record in Gutenberg.
      // https://github.com/tinymce/tinymce/blob/4.7.11/src/core/main/ts/api/UndoManager.ts#L116-L125
      // In other cases TinyMCE won't fire a `change` with at least a previous
      // record present, so this is a reliable check.
      // https://github.com/tinymce/tinymce/blob/4.7.11/src/core/main/ts/api/UndoManager.ts#L272-L275
      if (event && event.lastLevel === null) {
        return;
      } // Always ensure the content is up-to-date. This is needed because e.g.
      // making something bold will trigger a TinyMCE change event but no
      // input event. Avoid dispatching an action if the original event is
      // blur because the content will already be up-to-date.


      if (!event || !event.originalEvent || event.originalEvent.type !== 'blur') {
        this.onChange(this.createRecord(), true);
      }

      this.props.onCreateUndoLevel();
    }
    /**
     * Handles a delete keyDown event to handle merge or removal for collapsed
     * selection where caret is at directional edge: forward for a delete key,
     * reverse for a backspace key.
     *
     * @link https://en.wikipedia.org/wiki/Caret_navigation
     *
     * @param {KeyboardEvent} event Keydown event.
     *
     * @return {?boolean} True if the event was handled.
     */

  }, {
    key: "onDeleteKeyDown",
    value: function onDeleteKeyDown(event) {
      var _this$props2 = this.props,
          onMerge = _this$props2.onMerge,
          onRemove = _this$props2.onRemove;

      if (!onMerge && !onRemove) {
        return;
      }

      var keyCode = event.keyCode;
      var isReverse = keyCode === _keycodes.BACKSPACE; // Only process delete if the key press occurs at uncollapsed edge.

      if (!(0, _richText.isCollapsed)(this.createRecord())) {
        return;
      }

      var empty = this.isEmpty(); // It is important to consider emptiness because an empty container
      // will include a bogus TinyMCE BR node _after_ the caret, so in a
      // forward deletion the isHorizontalEdge function will incorrectly
      // interpret the presence of the bogus node as not being at the edge.

      var isEdge = empty || (0, _dom.isHorizontalEdge)(this.editableRef, isReverse);

      if (!isEdge) {
        return;
      }

      if (onMerge) {
        onMerge(!isReverse);
      } // Only handle remove on Backspace. This serves dual-purpose of being
      // an intentional user interaction distinguishing between Backspace and
      // Delete to remove the empty field, but also to avoid merge & remove
      // causing destruction of two fields (merge, then removed merged).


      if (onRemove && empty && isReverse) {
        onRemove(!isReverse);
      }

      return true;
    }
    /**
     * Handles a keydown event.
     *
     * @param {KeyboardEvent} event The keydown event.
     */

  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var keyCode = event.keyCode;

      if (keyCode === _keycodes.DELETE || keyCode === _keycodes.BACKSPACE) {
        event.preventDefault();

        if (this.onDeleteKeyDown(event)) {
          return;
        }

        var value = this.createRecord();
        var start = (0, _richText.getSelectionStart)(value);
        var end = (0, _richText.getSelectionEnd)(value);

        if (keyCode === _keycodes.BACKSPACE) {
          this.onChange((0, _richText.remove)(value, // Only remove the line if the selection is
          // collapsed.
          (0, _richText.isCollapsed)(value) ? start - 1 : start, end));
        } else {
          this.onChange((0, _richText.remove)(value, start, // Only remove the line if the selection is collapsed.
          (0, _richText.isCollapsed)(value) ? end + 1 : end));
        }
      } else if (keyCode === _keycodes.ENTER) {
        event.preventDefault();
        var record = this.createRecord();

        if (this.props.onReplace) {
          var text = (0, _richText.getTextContent)(record);
          var transformation = (0, _blocks.findTransform)(this.enterPatterns, function (item) {
            return item.regExp.test(text);
          });

          if (transformation) {
            this.props.onReplace([transformation.transform({
              content: text
            })]);
            return;
          }
        }

        if (this.multilineTag) {
          if (this.props.onSplit && (0, _richText.isEmptyLine)(record)) {
            var _this$props3;

            (_this$props3 = this.props).onSplit.apply(_this$props3, (0, _toConsumableArray2.default)((0, _richText.split)(record).map(this.valueToFormat)));
          } else {
            this.onChange((0, _richText.insertLineSeparator)(record));
          }
        } else if (event.shiftKey || !this.props.onSplit) {
          var _text = (0, _richText.getTextContent)(record);

          var length = _text.length;
          var toInsert = '\n'; // If the caret is at the end of the text, and there is no
          // trailing line break or no text at all, we have to insert two
          // line breaks in order to create a new line visually and place
          // the caret there.

          if (record.end === length && (_text.charAt(length - 1) !== '\n' || length === 0)) {
            toInsert = '\n\n';
          }

          this.onChange((0, _richText.insert)(record, toInsert));
        } else {
          this.splitContent();
        }
      }
    }
    /**
     * Handles a keyup event.
     *
     * @param {number} $1.keyCode The key code that has been pressed on the
     *                            keyboard.
     */

  }, {
    key: "onKeyUp",
    value: function onKeyUp(_ref4) {
      var keyCode = _ref4.keyCode;

      // The input event does not fire when the whole field is selected and
      // BACKSPACE is pressed.
      if (keyCode === _keycodes.BACKSPACE) {
        this.onChange(this.createRecord(), true);
      } // `scrollToRect` is called on `nodechange`, whereas calling it on
      // `keyup` *when* moving to a new RichText element results in incorrect
      // scrolling. Though the following allows false positives, it results
      // in much smoother scrolling.


      if (this.props.isViewportSmall && keyCode !== _keycodes.BACKSPACE && keyCode !== _keycodes.ENTER) {
        this.scrollToRect((0, _dom.getRectangleFromRange)(this.editor.selection.getRng()));
      }
    }
  }, {
    key: "scrollToRect",
    value: function scrollToRect(rect) {
      var caretTop = rect.top;
      var container = (0, _dom.getScrollContainer)(this.editableRef);

      if (!container) {
        return;
      } // When scrolling, avoid positioning the caret at the very top of
      // the viewport, providing some "air" and some textual context for
      // the user, and avoiding toolbars.


      var graceOffset = 100; // Avoid pointless scrolling by establishing a threshold under
      // which scrolling should be skipped;

      var epsilon = 10;
      var delta = caretTop - graceOffset;

      if (Math.abs(delta) > epsilon) {
        container.scrollTo(container.scrollLeft, container.scrollTop + delta);
      }
    }
    /**
     * Splits the content at the location of the selection.
     *
     * Replaces the content of the editor inside this element with the contents
     * before the selection. Sends the elements after the selection to the `onSplit`
     * handler.
     *
     * @param {Array}  blocks  The blocks to add after the split point.
     * @param {Object} context The context for splitting.
     */

  }, {
    key: "splitContent",
    value: function splitContent() {
      var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var onSplit = this.props.onSplit;
      var record = this.createRecord();

      if (!onSplit) {
        return;
      }

      var _split = (0, _richText.split)(record),
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
      } // If pasting and the split would result in no content other than the
      // pasted blocks, remove the before and after blocks.


      if (context.paste) {
        before = (0, _richText.isEmpty)(before) ? null : before;
        after = (0, _richText.isEmpty)(after) ? null : after;
      }

      if (before) {
        before = this.valueToFormat(before);
      }

      if (after) {
        after = this.valueToFormat(after);
      }

      onSplit.apply(void 0, [before, after].concat((0, _toConsumableArray2.default)(blocks)));
    }
  }, {
    key: "onNodeChange",
    value: function onNodeChange(_ref5) {
      var parents = _ref5.parents;

      if (!this.isActive()) {
        return;
      }

      if (this.props.isViewportSmall) {
        var rect;
        var selectedAnchor = (0, _lodash.find)(parents, function (node) {
          return node.tagName === 'A';
        });

        if (selectedAnchor) {
          // If we selected a link, position the Link UI below the link
          rect = selectedAnchor.getBoundingClientRect();
        } else {
          // Otherwise, position the Link UI below the cursor or text selection
          rect = (0, _dom.getRectangleFromRange)(this.editor.selection.getRng());
        } // Originally called on `focusin`, that hook turned out to be
        // premature. On `nodechange` we can work with the finalized TinyMCE
        // instance and scroll to proper position.


        this.scrollToRect(rect);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props4 = this.props,
          tagName = _this$props4.tagName,
          value = _this$props4.value,
          isSelected = _this$props4.isSelected;

      if (tagName === prevProps.tagName && value !== prevProps.value && value !== this.savedContent) {
        // Handle deprecated `children` and `node` sources.
        // The old way of passing a value with the `node` matcher required
        // the value to be mapped first, creating a new array each time, so
        // a shallow check wouldn't work. We need to check deep equality.
        // This is only executed for a deprecated API and will eventually be
        // removed.
        if (Array.isArray(value) && (0, _lodash.isEqual)(value, this.savedContent)) {
          return;
        }

        var record = this.formatToValue(value);

        if (isSelected) {
          var prevRecord = this.formatToValue(prevProps.value);
          var length = (0, _richText.getTextContent)(prevRecord).length;
          record.start = length;
          record.end = length;
        }

        this.applyRecord(record);
        this.savedContent = value;
      } // If blocks are merged, but the content remains the same, e.g. merging
      // an empty paragraph into another, then also set the selection to the
      // end.


      if (isSelected && !prevProps.isSelected && !this.isActive()) {
        var _record = this.formatToValue(value);

        var _prevRecord = this.formatToValue(prevProps.value);

        var _length = (0, _richText.getTextContent)(_prevRecord).length;
        _record.start = _length;
        _record.end = _length;
        this.applyRecord(_record);
      }
    }
  }, {
    key: "formatToValue",
    value: function formatToValue(value) {
      // Handle deprecated `children` and `node` sources.
      if (Array.isArray(value)) {
        return (0, _richText.create)({
          html: _blocks.children.toHTML(value),
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags
        });
      }

      if (this.props.format === 'string') {
        return (0, _richText.create)({
          html: value,
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags
        });
      } // Guard for blocks passing `null` in onSplit callbacks. May be removed
      // if onSplit is revised to not pass a `null` value.


      if (value === null) {
        return (0, _richText.create)();
      }

      return value;
    }
  }, {
    key: "valueToFormat",
    value: function valueToFormat(_ref6) {
      var formats = _ref6.formats,
          text = _ref6.text;

      // Handle deprecated `children` and `node` sources.
      if (this.usedDeprecatedChildrenSource) {
        return _blocks.children.fromDOM((0, _richText.unstableToDom)({
          value: {
            formats: formats,
            text: text
          },
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags
        }).body.childNodes);
      }

      if (this.props.format === 'string') {
        return (0, _richText.toHTMLString)({
          value: {
            formats: formats,
            text: text
          },
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags
        });
      }

      return {
        formats: formats,
        text: text
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props5 = this.props,
          _this$props5$tagName = _this$props5.tagName,
          Tagname = _this$props5$tagName === void 0 ? 'div' : _this$props5$tagName,
          style = _this$props5.style,
          value = _this$props5.value,
          wrapperClassName = _this$props5.wrapperClassName,
          className = _this$props5.className,
          _this$props5$inlineTo = _this$props5.inlineToolbar,
          inlineToolbar = _this$props5$inlineTo === void 0 ? false : _this$props5$inlineTo,
          formattingControls = _this$props5.formattingControls,
          placeholder = _this$props5.placeholder,
          _this$props5$keepPlac = _this$props5.keepPlaceholderOnFocus,
          keepPlaceholderOnFocus = _this$props5$keepPlac === void 0 ? false : _this$props5$keepPlac,
          isSelected = _this$props5.isSelected,
          autocompleters = _this$props5.autocompleters;
      var MultilineTag = this.multilineTag;
      var ariaProps = (0, _aria.pickAriaProps)(this.props); // Generating a key that includes `tagName` ensures that if the tag
      // changes, we unmount and destroy the previous TinyMCE element, then
      // mount and initialize a new child element in its place.

      var key = ['editor', Tagname].join();
      var isPlaceholderVisible = placeholder && (!isSelected || keepPlaceholderOnFocus) && this.isEmpty();
      var classes = (0, _classnames.default)(wrapperClassName, 'editor-rich-text');
      var record = this.getRecord();
      return (0, _element.createElement)("div", {
        className: classes,
        onFocus: this.setFocusedElement
      }, isSelected && !inlineToolbar && (0, _element.createElement)(_blockFormatControls.default, null, (0, _element.createElement)(_formatToolbar.default, {
        controls: formattingControls
      })), isSelected && inlineToolbar && (0, _element.createElement)("div", {
        className: "editor-rich-text__inline-toolbar"
      }, (0, _element.createElement)(_formatToolbar.default, {
        controls: formattingControls
      })), (0, _element.createElement)(_autocomplete.default, {
        onReplace: this.props.onReplace,
        completers: autocompleters,
        record: record,
        onChange: this.onChange
      }, function (_ref7) {
        var isExpanded = _ref7.isExpanded,
            listBoxId = _ref7.listBoxId,
            activeId = _ref7.activeId;
        return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_tinymce.default, (0, _extends2.default)({
          tagName: Tagname,
          getSettings: _this3.getSettings,
          onSetup: _this3.onSetup,
          style: style,
          defaultValue: value,
          isPlaceholderVisible: isPlaceholderVisible,
          "aria-label": placeholder,
          "aria-autocomplete": "list",
          "aria-expanded": isExpanded,
          "aria-owns": listBoxId,
          "aria-activedescendant": activeId
        }, ariaProps, {
          className: className,
          key: key,
          onPaste: _this3.onPaste,
          onInput: _this3.onInput,
          onKeyDown: _this3.onKeyDown,
          onKeyUp: _this3.onKeyUp,
          onFocus: _this3.onFocus,
          multilineTag: _this3.multilineTag,
          multilineWrapperTags: _this3.multilineWrapperTags,
          setRef: _this3.setRef
        })), isPlaceholderVisible && (0, _element.createElement)(Tagname, {
          className: (0, _classnames.default)('editor-rich-text__tinymce', className),
          style: style
        }, MultilineTag ? (0, _element.createElement)(MultilineTag, null, placeholder) : placeholder), isSelected && (0, _element.createElement)(_formatEdit.default, {
          value: record,
          onChange: _this3.onChange
        }));
      }));
    }
  }]);
  return RichText;
}(_element.Component);

exports.RichText = RichText;
RichText.defaultProps = {
  formattingControls: ['bold', 'italic', 'link', 'strikethrough'],
  format: 'string',
  value: ''
};
var RichTextContainer = (0, _compose.compose)([_compose.withInstanceId, (0, _context.withBlockEditContext)(function (context, ownProps) {
  // When explicitly set as not selected, do nothing.
  if (ownProps.isSelected === false) {
    return {};
  } // When explicitly set as selected, use the value stored in the context instead.


  if (ownProps.isSelected === true) {
    return {
      isSelected: context.isSelected
    };
  } // Ensures that only one RichText component can be focused.


  return {
    isSelected: context.isSelected && context.focusedElement === ownProps.instanceId,
    setFocusedElement: context.setFocusedElement
  };
}), (0, _data.withSelect)(function (select) {
  var _select = select('core/viewport'),
      isViewportMatch = _select.isViewportMatch;

  var _select2 = select('core/editor'),
      canUserUseUnfilteredHTML = _select2.canUserUseUnfilteredHTML,
      isCaretWithinFormattedText = _select2.isCaretWithinFormattedText;

  return {
    isViewportSmall: isViewportMatch('< small'),
    canUserUseUnfilteredHTML: canUserUseUnfilteredHTML(),
    isCaretWithinFormattedText: isCaretWithinFormattedText()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      createUndoLevel = _dispatch.createUndoLevel,
      redo = _dispatch.redo,
      undo = _dispatch.undo,
      enterFormattedText = _dispatch.enterFormattedText,
      exitFormattedText = _dispatch.exitFormattedText;

  return {
    onCreateUndoLevel: createUndoLevel,
    onRedo: redo,
    onUndo: undo,
    onEnterFormattedText: enterFormattedText,
    onExitFormattedText: exitFormattedText
  };
}), _compose.withSafeTimeout])(RichText);

RichTextContainer.Content = function (_ref8) {
  var value = _ref8.value,
      Tag = _ref8.tagName,
      multiline = _ref8.multiline,
      props = (0, _objectWithoutProperties2.default)(_ref8, ["value", "tagName", "multiline"]);
  var html = value;
  var MultilineTag;

  if (multiline === true || multiline === 'p' || multiline === 'li') {
    MultilineTag = multiline === true ? 'p' : multiline;
  } // Handle deprecated `children` and `node` sources.


  if (Array.isArray(value)) {
    html = _blocks.children.toHTML(value);
  }

  if (!html && MultilineTag) {
    html = "<".concat(MultilineTag, "></").concat(MultilineTag, ">");
  }

  var content = (0, _element.createElement)(_element.RawHTML, null, html);

  if (Tag) {
    return (0, _element.createElement)(Tag, (0, _lodash.omit)(props, ['format']), content);
  }

  return content;
};

RichTextContainer.isEmpty = function () {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Handle deprecated `children` and `node` sources.
  if (Array.isArray(value)) {
    return !value || value.length === 0;
  }

  return value.length === 0;
};

RichTextContainer.Content.defaultProps = {
  format: 'string',
  value: ''
};
var _default = RichTextContainer;
exports.default = _default;
//# sourceMappingURL=index.js.map