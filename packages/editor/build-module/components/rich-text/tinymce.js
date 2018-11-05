import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";

/**
 * External dependencies
 */
import tinymce from 'tinymce';
import { isEqual, noop } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Component, createElement } from '@wordpress/element';
import { BACKSPACE, DELETE, ENTER, LEFT, RIGHT } from '@wordpress/keycodes';
import { toHTMLString } from '@wordpress/rich-text';
import { children } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { diffAriaProps, pickAriaProps } from './aria';
/**
 * Browser dependencies
 */

var _window = window,
    getSelection = _window.getSelection;
var TEXT_NODE = window.Node.TEXT_NODE;
/**
 * Zero-width space character used by TinyMCE as a caret landing point for
 * inline boundary nodes.
 *
 * @see tinymce/src/core/main/ts/text/Zwsp.ts
 *
 * @type {string}
 */

export var TINYMCE_ZWSP = "\uFEFF";
/**
 * Determines whether we need a fix to provide `input` events for contenteditable.
 *
 * @param {Element} editorNode The root editor node.
 *
 * @return {boolean} A boolean indicating whether the fix is needed.
 */

function needsInternetExplorerInputFix(editorNode) {
  return (// Rely on userAgent in the absence of a reasonable feature test for contenteditable `input` events.
    /Trident/.test(window.navigator.userAgent) && // IE11 dispatches input events for `<input>` and `<textarea>`.
    !/input/i.test(editorNode.tagName) && !/textarea/i.test(editorNode.tagName)
  );
}
/**
 * Applies a fix that provides `input` events for contenteditable in Internet Explorer.
 *
 * @param {Element} editorNode The root editor node.
 *
 * @return {Function} A function to remove the fix (for cleanup).
 */


function applyInternetExplorerInputFix(editorNode) {
  /**
   * Dispatches `input` events in response to `textinput` events.
   *
   * IE provides a `textinput` event that is similar to an `input` event,
   * and we use it to manually dispatch an `input` event.
   * `textinput` is dispatched for text entry but for not deletions.
   *
   * @param {Event} textInputEvent An Internet Explorer `textinput` event.
   */
  function mapTextInputEvent(textInputEvent) {
    textInputEvent.stopImmediatePropagation();
    var inputEvent = document.createEvent('Event');
    inputEvent.initEvent('input', true, false);
    inputEvent.data = textInputEvent.data;
    textInputEvent.target.dispatchEvent(inputEvent);
  }
  /**
   * Dispatches `input` events in response to Delete and Backspace keyup.
   *
   * It would be better dispatch an `input` event after each deleting
   * `keydown` because the DOM is updated after each, but it is challenging
   * to determine the right time to dispatch `input` since propagation of
   * `keydown` can be stopped at any point.
   *
   * It's easier to listen for `keyup` in the capture phase and dispatch
   * `input` before `keyup` propagates further. It's not perfect, but should
   * be good enough.
   *
   * @param {KeyboardEvent} keyUp
   * @param {Node}          keyUp.target  The event target.
   * @param {number}        keyUp.keyCode The key code.
   */


  function mapDeletionKeyUpEvents(_ref) {
    var target = _ref.target,
        keyCode = _ref.keyCode;
    var isDeletion = BACKSPACE === keyCode || DELETE === keyCode;

    if (isDeletion && editorNode.contains(target)) {
      var inputEvent = document.createEvent('Event');
      inputEvent.initEvent('input', true, false);
      inputEvent.data = null;
      target.dispatchEvent(inputEvent);
    }
  }

  editorNode.addEventListener('textinput', mapTextInputEvent);
  document.addEventListener('keyup', mapDeletionKeyUpEvents, true);
  return function removeInternetExplorerInputFix() {
    editorNode.removeEventListener('textinput', mapTextInputEvent);
    document.removeEventListener('keyup', mapDeletionKeyUpEvents, true);
  };
}

var IS_PLACEHOLDER_VISIBLE_ATTR_NAME = 'data-is-placeholder-visible';

var TinyMCE =
/*#__PURE__*/
function (_Component) {
  _inherits(TinyMCE, _Component);

  function TinyMCE() {
    var _this;

    _classCallCheck(this, TinyMCE);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TinyMCE).call(this));
    _this.bindEditorNode = _this.bindEditorNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TinyMCE, [{
    key: "onFocus",
    value: function onFocus() {
      if (this.props.onFocus) {
        this.props.onFocus();
      }

      this.initialize();
    } // We must prevent rerenders because RichText, the browser, and TinyMCE will
    // modify the DOM. React will rerender the DOM fine, but we're losing
    // selection and it would be more expensive to do so as it would just set
    // the inner HTML through `dangerouslySetInnerHTML`. Instead RichText does
    // it's own diffing and selection setting.
    //
    // Because we never update the component, we have to look through props and
    // update the attributes on the wrapper nodes here. `componentDidUpdate`
    // will never be called.

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      this.configureIsPlaceholderVisible(nextProps.isPlaceholderVisible);

      if (!isEqual(this.props.style, nextProps.style)) {
        this.editorNode.setAttribute('style', '');
        Object.assign(this.editorNode.style, nextProps.style);
      }

      if (!isEqual(this.props.className, nextProps.className)) {
        this.editorNode.className = classnames(nextProps.className, 'editor-rich-text__tinymce');
      }

      var _diffAriaProps = diffAriaProps(this.props, nextProps),
          removedKeys = _diffAriaProps.removedKeys,
          updatedKeys = _diffAriaProps.updatedKeys;

      removedKeys.forEach(function (key) {
        return _this2.editorNode.removeAttribute(key);
      });
      updatedKeys.forEach(function (key) {
        return _this2.editorNode.setAttribute(key, nextProps[key]);
      });
      return false;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.editor) {
        return;
      }

      this.editor.destroy();
      delete this.editor;
    }
  }, {
    key: "configureIsPlaceholderVisible",
    value: function configureIsPlaceholderVisible(isPlaceholderVisible) {
      var isPlaceholderVisibleString = String(!!isPlaceholderVisible);

      if (this.editorNode.getAttribute(IS_PLACEHOLDER_VISIBLE_ATTR_NAME) !== isPlaceholderVisibleString) {
        this.editorNode.setAttribute(IS_PLACEHOLDER_VISIBLE_ATTR_NAME, isPlaceholderVisibleString);
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this3 = this;

      var settings = this.props.getSettings({
        theme: false,
        inline: true,
        toolbar: false,
        browser_spellcheck: true,
        entity_encoding: 'raw',
        convert_urls: false,
        // Disables TinyMCE's parsing to verify HTML. It makes
        // initialisation a bit faster. Since we're setting raw HTML
        // already with dangerouslySetInnerHTML, we don't need this to be
        // verified.
        verify_html: false,
        inline_boundaries_selector: 'a[href],code,b,i,strong,em,del,ins,sup,sub',
        plugins: []
      });
      tinymce.init(_objectSpread({}, settings, {
        target: this.editorNode,
        setup: function setup(editor) {
          _this3.editor = editor;

          _this3.props.onSetup(editor); // TinyMCE resets the element content on initialization, even
          // when it's already identical to what exists currently. This
          // behavior clobbers a selection which exists at the time of
          // initialization, thus breaking writing flow navigation. The
          // hack here neutralizes setHTML during initialization.


          var setHTML;
          editor.on('preinit', function () {
            setHTML = editor.dom.setHTML;

            editor.dom.setHTML = function () {};
          });
          editor.on('init', function () {
            // See https://github.com/tinymce/tinymce/blob/master/src/core/main/ts/keyboard/FormatShortcuts.ts
            ['b', 'i', 'u'].forEach(function (character) {
              editor.shortcuts.remove("meta+".concat(character));
            });
            [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function (number) {
              editor.shortcuts.remove("access+".concat(number));
            });
            editor.dom.setHTML = setHTML;
          });
          editor.on('keydown', _this3.onKeyDown, true);
        }
      }));
    }
  }, {
    key: "bindEditorNode",
    value: function bindEditorNode(editorNode) {
      this.editorNode = editorNode;

      if (this.props.setRef) {
        this.props.setRef(editorNode);
      }
      /**
       * A ref function can be used for cleanup because React calls it with
       * `null` when unmounting.
       */


      if (this.removeInternetExplorerInputFix) {
        this.removeInternetExplorerInputFix();
        this.removeInternetExplorerInputFix = null;
      }

      if (editorNode && needsInternetExplorerInputFix(editorNode)) {
        this.removeInternetExplorerInputFix = applyInternetExplorerInputFix(editorNode);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var keyCode = event.keyCode; // Disables TinyMCE behaviour.

      if (keyCode === ENTER || keyCode === BACKSPACE || keyCode === DELETE) {
        event.preventDefault(); // For some reason this is needed to also prevent the insertion of
        // line breaks.

        return false;
      } // Handles a horizontal navigation key down event to handle the case
      // where TinyMCE attempts to preventDefault when on the outside edge of
      // an inline boundary when arrowing _away_ from the boundary, not within
      // it. Replaces the TinyMCE event `preventDefault` behavior with a noop,
      // such that those relying on `defaultPrevented` are not misinformed
      // about the arrow event.
      //
      // If TinyMCE#4476 is resolved, this handling may be removed.
      //
      // @see https://github.com/tinymce/tinymce/issues/4476


      if (keyCode !== LEFT && keyCode !== RIGHT) {
        return;
      }

      var _getSelection = getSelection(),
          focusNode = _getSelection.focusNode;

      var nodeType = focusNode.nodeType,
          nodeValue = focusNode.nodeValue;

      if (nodeType !== TEXT_NODE) {
        return;
      }

      if (nodeValue.length !== 1 || nodeValue[0] !== TINYMCE_ZWSP) {
        return;
      } // Consider to be moving away from inline boundary based on:
      //
      // 1. Within a text fragment consisting only of ZWSP.
      // 2. If in reverse, there is no previous sibling. If forward, there is
      //    no next sibling (i.e. end of node).


      var isReverse = event.keyCode === LEFT;
      var edgeSibling = isReverse ? 'previousSibling' : 'nextSibling';

      if (!focusNode[edgeSibling]) {
        // Note: This is not reassigning on the native event, rather the
        // "fixed" TinyMCE copy, which proxies its preventDefault to the
        // native event. By reassigning here, we're effectively preventing
        // the proxied call on the native event, but not otherwise mutating
        // the original event object.
        event.preventDefault = noop;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _objectSpread2;

      var ariaProps = pickAriaProps(this.props);
      var _this$props = this.props,
          _this$props$tagName = _this$props.tagName,
          tagName = _this$props$tagName === void 0 ? 'div' : _this$props$tagName,
          style = _this$props.style,
          defaultValue = _this$props.defaultValue,
          className = _this$props.className,
          isPlaceholderVisible = _this$props.isPlaceholderVisible,
          onPaste = _this$props.onPaste,
          onInput = _this$props.onInput,
          multilineTag = _this$props.multilineTag,
          multilineWrapperTags = _this$props.multilineWrapperTags,
          onKeyDown = _this$props.onKeyDown,
          onKeyUp = _this$props.onKeyUp;
      /*
       * The role=textbox and aria-multiline=true must always be used together
       * as TinyMCE always behaves like a sort of textarea where text wraps in
       * multiple lines. Only the table block editable element is excluded.
       */

      if (tagName !== 'table') {
        ariaProps.role = 'textbox';
        ariaProps['aria-multiline'] = true;
      } // If a default value is provided, render it into the DOM even before
      // TinyMCE finishes initializing. This avoids a short delay by allowing
      // us to show and focus the content before it's truly ready to edit.


      var initialHTML = defaultValue; // Guard for blocks passing `null` in onSplit callbacks. May be removed
      // if onSplit is revised to not pass a `null` value.

      if (defaultValue === null) {
        initialHTML = ''; // Handle deprecated `children` and `node` sources.
      } else if (Array.isArray(defaultValue)) {
        initialHTML = children.toHTML(defaultValue);
      } else if (typeof defaultValue !== 'string') {
        initialHTML = toHTMLString({
          value: defaultValue,
          multilineTag: multilineTag,
          multilineWrapperTags: multilineWrapperTags
        });
      }

      if (initialHTML === '') {
        // Ensure the field is ready to receive focus by TinyMCE.
        initialHTML = '<br data-mce-bogus="1">';
      }

      return createElement(tagName, _objectSpread({}, ariaProps, (_objectSpread2 = {
        className: classnames(className, 'editor-rich-text__tinymce'),
        contentEditable: true
      }, _defineProperty(_objectSpread2, IS_PLACEHOLDER_VISIBLE_ATTR_NAME, isPlaceholderVisible), _defineProperty(_objectSpread2, "ref", this.bindEditorNode), _defineProperty(_objectSpread2, "style", style), _defineProperty(_objectSpread2, "suppressContentEditableWarning", true), _defineProperty(_objectSpread2, "dangerouslySetInnerHTML", {
        __html: initialHTML
      }), _defineProperty(_objectSpread2, "onPaste", onPaste), _defineProperty(_objectSpread2, "onInput", onInput), _defineProperty(_objectSpread2, "onFocus", this.onFocus), _defineProperty(_objectSpread2, "onKeyDown", onKeyDown), _defineProperty(_objectSpread2, "onKeyUp", onKeyUp), _objectSpread2)));
    }
  }]);

  return TinyMCE;
}(Component);

export { TinyMCE as default };
//# sourceMappingURL=tinymce.js.map