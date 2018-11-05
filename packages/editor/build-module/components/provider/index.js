import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/**
 * External dependencies
 */
import { flow, map } from 'lodash';
/**
 * WordPress Dependencies
 */

import { compose } from '@wordpress/compose';
import { createElement, Component } from '@wordpress/element';
import { DropZoneProvider, SlotFillProvider } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { traverse, wrap, urlRewrite } from '../../editor-styles';

var EditorProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(EditorProvider, _Component);

  function EditorProvider(props) {
    var _this;

    _classCallCheck(this, EditorProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditorProvider).apply(this, arguments)); // Assume that we don't need to initialize in the case of an error recovery.

    if (props.recovery) {
      return _possibleConstructorReturn(_this);
    }

    props.updateEditorSettings(props.settings);
    props.updatePostLock(props.settings.postLock);
    props.setupEditor(props.post);

    if (props.settings.autosave) {
      props.createWarningNotice(__('There is an autosave of this post that is more recent than the version below.'), {
        id: 'autosave-exists',
        actions: [{
          label: __('View the autosave'),
          url: props.settings.autosave.editLink
        }]
      });
    }

    return _this;
  }

  _createClass(EditorProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.settings.styles) {
        return;
      }

      map(this.props.settings.styles, function (_ref) {
        var css = _ref.css,
            baseURL = _ref.baseURL;
        var transforms = [wrap('.editor-styles-wrapper')];

        if (baseURL) {
          transforms.push(urlRewrite(baseURL));
        }

        var updatedCSS = traverse(css, compose(transforms));

        if (updatedCSS) {
          var node = document.createElement('style');
          node.innerHTML = updatedCSS;
          document.body.appendChild(node);
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.settings !== prevProps.settings) {
        this.props.updateEditorSettings(this.props.settings);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var providers = [// Slot / Fill provider:
      //
      //  - context.getSlot
      //  - context.registerSlot
      //  - context.unregisterSlot
      [SlotFillProvider], // DropZone provider:
      [DropZoneProvider]];
      var createEditorElement = flow(providers.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            Provider = _ref3[0],
            props = _ref3[1];

        return function (arg) {
          return createElement(Provider, props, arg);
        };
      }));
      return createEditorElement(children);
    }
  }]);

  return EditorProvider;
}(Component);

export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      setupEditor = _dispatch.setupEditor,
      updateEditorSettings = _dispatch.updateEditorSettings,
      updatePostLock = _dispatch.updatePostLock;

  var _dispatch2 = dispatch('core/notices'),
      createWarningNotice = _dispatch2.createWarningNotice;

  return {
    setupEditor: setupEditor,
    updateEditorSettings: updateEditorSettings,
    updatePostLock: updatePostLock,
    createWarningNotice: createWarningNotice
  };
})(EditorProvider);
//# sourceMappingURL=index.js.map