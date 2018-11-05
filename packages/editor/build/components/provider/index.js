"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _editorStyles = require("../../editor-styles");

/**
 * External dependencies
 */

/**
 * WordPress Dependencies
 */

/**
 * Internal dependencies
 */
var EditorProvider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(EditorProvider, _Component);

  function EditorProvider(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EditorProvider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EditorProvider).apply(this, arguments)); // Assume that we don't need to initialize in the case of an error recovery.

    if (props.recovery) {
      return (0, _possibleConstructorReturn2.default)(_this);
    }

    props.updateEditorSettings(props.settings);
    props.updatePostLock(props.settings.postLock);
    props.setupEditor(props.post);

    if (props.settings.autosave) {
      props.createWarningNotice((0, _i18n.__)('There is an autosave of this post that is more recent than the version below.'), {
        id: 'autosave-exists',
        actions: [{
          label: (0, _i18n.__)('View the autosave'),
          url: props.settings.autosave.editLink
        }]
      });
    }

    return _this;
  }

  (0, _createClass2.default)(EditorProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.settings.styles) {
        return;
      }

      (0, _lodash.map)(this.props.settings.styles, function (_ref) {
        var css = _ref.css,
            baseURL = _ref.baseURL;
        var transforms = [(0, _editorStyles.wrap)('.editor-styles-wrapper')];

        if (baseURL) {
          transforms.push((0, _editorStyles.urlRewrite)(baseURL));
        }

        var updatedCSS = (0, _editorStyles.traverse)(css, (0, _compose.compose)(transforms));

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
      [_components.SlotFillProvider], // DropZone provider:
      [_components.DropZoneProvider]];
      var createEditorElement = (0, _lodash.flow)(providers.map(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            Provider = _ref3[0],
            props = _ref3[1];

        return function (arg) {
          return (0, _element.createElement)(Provider, props, arg);
        };
      }));
      return createEditorElement(children);
    }
  }]);
  return EditorProvider;
}(_element.Component);

var _default = (0, _data.withDispatch)(function (dispatch) {
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

exports.default = _default;
//# sourceMappingURL=index.js.map