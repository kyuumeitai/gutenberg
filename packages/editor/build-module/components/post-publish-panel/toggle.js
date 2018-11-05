import { createElement } from "@wordpress/element";

/**
 * WordPress Dependencies
 */
import { Button } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { DotTip } from '@wordpress/nux';
export function PostPublishPanelToggle(_ref) {
  var isSaving = _ref.isSaving,
      isPublishable = _ref.isPublishable,
      isSaveable = _ref.isSaveable,
      isPublished = _ref.isPublished,
      isBeingScheduled = _ref.isBeingScheduled,
      onToggle = _ref.onToggle,
      isOpen = _ref.isOpen,
      forceIsSaving = _ref.forceIsSaving;
  var isButtonEnabled = !isSaving && !forceIsSaving && isPublishable && isSaveable || isPublished;
  return createElement(Button, {
    className: "editor-post-publish-panel__toggle",
    isPrimary: true,
    onClick: onToggle,
    "aria-expanded": isOpen,
    disabled: !isButtonEnabled,
    isBusy: isSaving && isPublished
  }, isBeingScheduled ? __('Schedule…') : __('Publish…'), createElement(DotTip, {
    tipId: "core/editor.publish"
  }, __('Finished writing? That’s great, let’s get this published right now. Just click “Publish” and you’re good to go.')));
}
export default compose([withSelect(function (select) {
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
//# sourceMappingURL=toggle.js.map