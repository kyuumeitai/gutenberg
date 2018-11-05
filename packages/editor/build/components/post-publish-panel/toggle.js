"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostPublishPanelToggle = PostPublishPanelToggle;
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _nux = require("@wordpress/nux");

/**
 * WordPress Dependencies
 */
function PostPublishPanelToggle(_ref) {
  var isSaving = _ref.isSaving,
      isPublishable = _ref.isPublishable,
      isSaveable = _ref.isSaveable,
      isPublished = _ref.isPublished,
      isBeingScheduled = _ref.isBeingScheduled,
      onToggle = _ref.onToggle,
      isOpen = _ref.isOpen,
      forceIsSaving = _ref.forceIsSaving;
  var isButtonEnabled = !isSaving && !forceIsSaving && isPublishable && isSaveable || isPublished;
  return (0, _element.createElement)(_components.Button, {
    className: "editor-post-publish-panel__toggle",
    isPrimary: true,
    onClick: onToggle,
    "aria-expanded": isOpen,
    disabled: !isButtonEnabled,
    isBusy: isSaving && isPublished
  }, isBeingScheduled ? (0, _i18n.__)('Schedule…') : (0, _i18n.__)('Publish…'), (0, _element.createElement)(_nux.DotTip, {
    tipId: "core/editor.publish"
  }, (0, _i18n.__)('Finished writing? That’s great, let’s get this published right now. Just click “Publish” and you’re good to go.')));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isSavingPost = _select.isSavingPost,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      isEditedPostPublishable = _select.isEditedPostPublishable,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      isEditedPostBeingScheduled = _select.isEditedPostBeingScheduled;

  return {
    isSaving: isSavingPost(),
    isSaveable: isEditedPostSaveable(),
    isPublishable: isEditedPostPublishable(),
    isPublished: isCurrentPostPublished(),
    isBeingScheduled: isEditedPostBeingScheduled()
  };
})])(PostPublishPanelToggle);

exports.default = _default;
//# sourceMappingURL=toggle.js.map