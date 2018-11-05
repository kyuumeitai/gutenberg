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
import { throttle } from 'lodash';
import classnames from 'classnames';
import scrollIntoView from 'dom-scroll-into-view';
/**
 * WordPress dependencies
 */

import { __, sprintf, _n } from '@wordpress/i18n';
import { Component, Fragment, createRef } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { UP, DOWN, ENTER } from '@wordpress/keycodes';
import { Spinner, withSpokenMessages, Popover } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url'; // Since URLInput is rendered in the context of other inputs, but should be
// considered a separate modal node, prevent keyboard events from propagating
// as being considered from the input.

var stopEventPropagation = function stopEventPropagation(event) {
  return event.stopPropagation();
};

var URLInput =
/*#__PURE__*/
function (_Component) {
  _inherits(URLInput, _Component);

  function URLInput(_ref) {
    var _this;

    var autocompleteRef = _ref.autocompleteRef;

    _classCallCheck(this, URLInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(URLInput).apply(this, arguments));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.autocompleteRef = autocompleteRef || createRef();
    _this.updateSuggestions = throttle(_this.updateSuggestions.bind(_assertThisInitialized(_assertThisInitialized(_this))), 200);
    _this.suggestionNodes = [];
    _this.state = {
      posts: [],
      showSuggestions: false,
      selectedSuggestion: null
    };
    return _this;
  }

  _createClass(URLInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var _this$state = this.state,
          showSuggestions = _this$state.showSuggestions,
          selectedSuggestion = _this$state.selectedSuggestion; // only have to worry about scrolling selected suggestion into view
      // when already expanded

      if (showSuggestions && selectedSuggestion !== null && !this.scrollingIntoView) {
        this.scrollingIntoView = true;
        scrollIntoView(this.suggestionNodes[selectedSuggestion], this.autocompleteRef.current, {
          onlyScrollIfNeeded: true
        });
        setTimeout(function () {
          _this2.scrollingIntoView = false;
        }, 100);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      delete this.suggestionsRequest;
    }
  }, {
    key: "bindSuggestionNode",
    value: function bindSuggestionNode(index) {
      var _this3 = this;

      return function (ref) {
        _this3.suggestionNodes[index] = ref;
      };
    }
  }, {
    key: "updateSuggestions",
    value: function updateSuggestions(value) {
      var _this4 = this;

      // Show the suggestions after typing at least 2 characters
      // and also for URLs
      if (value.length < 2 || /^https?:/.test(value)) {
        this.setState({
          showSuggestions: false,
          selectedSuggestion: null,
          loading: false
        });
        return;
      }

      this.setState({
        showSuggestions: true,
        selectedSuggestion: null,
        loading: true
      });
      var request = apiFetch({
        path: addQueryArgs('/wp/v2/search', {
          search: value,
          per_page: 20,
          type: 'post'
        })
      });
      request.then(function (posts) {
        // A fetch Promise doesn't have an abort option. It's mimicked by
        // comparing the request reference in on the instance, which is
        // reset or deleted on subsequent requests or unmounting.
        if (_this4.suggestionsRequest !== request) {
          return;
        }

        _this4.setState({
          posts: posts,
          loading: false
        });

        if (!!posts.length) {
          _this4.props.debouncedSpeak(sprintf(_n('%d result found, use up and down arrow keys to navigate.', '%d results found, use up and down arrow keys to navigate.', posts.length), posts.length), 'assertive');
        } else {
          _this4.props.debouncedSpeak(__('No results.'), 'assertive');
        }
      }).catch(function () {
        if (_this4.suggestionsRequest === request) {
          _this4.setState({
            loading: false
          });
        }
      });
      this.suggestionsRequest = request;
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var inputValue = event.target.value;
      this.props.onChange(inputValue);
      this.updateSuggestions(inputValue);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var _this$state2 = this.state,
          showSuggestions = _this$state2.showSuggestions,
          selectedSuggestion = _this$state2.selectedSuggestion,
          posts = _this$state2.posts,
          loading = _this$state2.loading; // If the suggestions are not shown or loading, we shouldn't handle the arrow keys
      // We shouldn't preventDefault to allow block arrow keys navigation

      if (!showSuggestions || !posts.length || loading) {
        return;
      }

      switch (event.keyCode) {
        case UP:
          {
            event.stopPropagation();
            event.preventDefault();
            var previousIndex = !selectedSuggestion ? posts.length - 1 : selectedSuggestion - 1;
            this.setState({
              selectedSuggestion: previousIndex
            });
            break;
          }

        case DOWN:
          {
            event.stopPropagation();
            event.preventDefault();
            var nextIndex = selectedSuggestion === null || selectedSuggestion === posts.length - 1 ? 0 : selectedSuggestion + 1;
            this.setState({
              selectedSuggestion: nextIndex
            });
            break;
          }

        case ENTER:
          {
            if (this.state.selectedSuggestion !== null) {
              event.stopPropagation();
              var post = this.state.posts[this.state.selectedSuggestion];
              this.selectLink(post);
            }
          }
      }
    }
  }, {
    key: "selectLink",
    value: function selectLink(post) {
      this.props.onChange(post.url, post);
      this.setState({
        selectedSuggestion: null,
        showSuggestions: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props = this.props,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? '' : _this$props$value,
          _this$props$autoFocus = _this$props.autoFocus,
          autoFocus = _this$props$autoFocus === void 0 ? true : _this$props$autoFocus,
          instanceId = _this$props.instanceId;
      var _this$state3 = this.state,
          showSuggestions = _this$state3.showSuggestions,
          posts = _this$state3.posts,
          selectedSuggestion = _this$state3.selectedSuggestion,
          loading = _this$state3.loading;
      /* eslint-disable jsx-a11y/no-autofocus */

      return createElement(Fragment, null, createElement("div", {
        className: "editor-url-input"
      }, createElement("input", {
        autoFocus: autoFocus,
        type: "text",
        "aria-label": __('URL'),
        required: true,
        value: value,
        onChange: this.onChange,
        onInput: stopEventPropagation,
        placeholder: __('Paste URL or type to search'),
        onKeyDown: this.onKeyDown,
        role: "combobox",
        "aria-expanded": showSuggestions,
        "aria-autocomplete": "list",
        "aria-owns": "editor-url-input-suggestions-".concat(instanceId),
        "aria-activedescendant": selectedSuggestion !== null ? "editor-url-input-suggestion-".concat(instanceId, "-").concat(selectedSuggestion) : undefined
      }), loading && createElement(Spinner, null)), showSuggestions && !!posts.length && createElement(Popover, {
        position: "bottom",
        noArrow: true,
        focusOnMount: false
      }, createElement("div", {
        className: "editor-url-input__suggestions",
        id: "editor-url-input-suggestions-".concat(instanceId),
        ref: this.autocompleteRef,
        role: "listbox"
      }, posts.map(function (post, index) {
        return createElement("button", {
          key: post.id,
          role: "option",
          tabIndex: "-1",
          id: "editor-url-input-suggestion-".concat(instanceId, "-").concat(index),
          ref: _this5.bindSuggestionNode(index),
          className: classnames('editor-url-input__suggestion', {
            'is-selected': index === selectedSuggestion
          }),
          onClick: function onClick() {
            return _this5.selectLink(post);
          },
          "aria-selected": index === selectedSuggestion
        }, decodeEntities(post.title) || __('(no title)'));
      }))));
      /* eslint-enable jsx-a11y/no-autofocus */
    }
  }]);

  return URLInput;
}(Component);

export default withSpokenMessages(withInstanceId(URLInput));
//# sourceMappingURL=index.js.map