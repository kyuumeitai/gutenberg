"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostPublishButton = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _label = _interopRequireDefault(require("./label"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostPublishButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostPublishButton, _Component);

  function PostPublishButton(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PostPublishButton);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostPublishButton).call(this, props));
    _this.buttonNode = (0, _element.createRef)();
    return _this;
  }

  (0, _createClass2.default)(PostPublishButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.buttonNode.current.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isSaving = _this$props.isSaving,
          onStatusChange = _this$props.onStatusChange,
          onSave = _this$props.onSave,
          isBeingScheduled = _this$props.isBeingScheduled,
          visibility = _this$props.visibility,
          isPublishable = _this$props.isPublishable,
          isSaveable = _this$props.isSaveable,
          hasPublishAction = _this$props.hasPublishAction,
          _this$props$onSubmit = _this$props.onSubmit,
          onSubmit = _this$props$onSubmit === void 0 ? _lodash.noop : _this$props$onSubmit,
          forceIsSaving = _this$props.forceIsSaving;
      var isButtonEnabled = isPublishable && isSaveable;
      var publishStatus;

      if (!hasPublishAction) {
        publishStatus = 'pending';
      } else if (isBeingScheduled) {
        publishStatus = 'future';
      } else if (visibility === 'private') {
        publishStatus = 'private';
      } else {
        publishStatus = 'publish';
      }

      var onClick = function onClick() {
        onSubmit();
        onStatusChange(publishStatus);
        onSave();
      };

      return (0, _element.createElement)(_components.Button, {
        ref: this.buttonNode,
        className: "editor-post-publish-button",
        isPrimary: true,
        isLarge: true,
        onClick: onClick,
        disabled: !isButtonEnabled,
        isBusy: isSaving
      }, (0, _element.createElement)(_label.default, {
        forceIsSaving: forceIsSaving
      }));
    }
  }]);
  return PostPublishButton;
}(_element.Component);

exports.PostPublishButton = PostPublishButton;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref) {
  var forceIsSaving = _ref.forceIsSaving,
      forceIsDirty = _ref.forceIsDirty;

  var _select = select('core/editor'),
      isSavingPost = _select.isSavingPost,
      isEditedPostBeingScheduled = _select.isEditedPostBeingScheduled,
      getEditedPostVisibility = _select.getEditedPostVisibility,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      isEditedPostPublishable = _select.isEditedPostPublishable,
      isPostSavingLocked = _select.isPostSavingLocked,
      getCurrentPost = _select.getCurrentPost,
      getCurrentPostType = _select.getCurrentPostType;

  return {
    isSaving: forceIsSaving || isSavingPost(),
    isBeingScheduled: isEditedPostBeingScheduled(),
    visibility: getEditedPostVisibility(),
    isSaveable: isEditedPostSaveable() && !isPostSavingLocked(),
    isPublishable: forceIsDirty || isEditedPostPublishable(),
    hasPublishAction: (0, _lodash.get)(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    postType: getCurrentPostType()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost,
      savePost = _dispatch.savePost;

  return {
    onStatusChange: function onStatusChange(status) {
      return editPost({
        status: status
      });
    },
    onSave: savePost
  };
})])(PostPublishButton);

exports.default = _default;
//# sourceMappingURL=index.js.map