import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { compose } from '@wordpress/compose';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isReusableBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
export function ReusableBlockDeleteButton(_ref) {
  var reusableBlock = _ref.reusableBlock,
      onDelete = _ref.onDelete;

  if (!reusableBlock) {
    return null;
  }

  return createElement(MenuItem, {
    className: "editor-block-settings-menu__control",
    icon: "no",
    disabled: reusableBlock.isTemporary,
    onClick: function onClick() {
      return onDelete(reusableBlock.id);
    }
  }, __('Remove from Reusable Blocks'));
}
export default compose([withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/editor'),
      getBlock = _select.getBlock,
      getReusableBlock = _select.__experimentalGetReusableBlock;

  var block = getBlock(clientId);
  return {
    reusableBlock: block && isReusableBlock(block) ? getReusableBlock(block.attributes.ref) : null
  };
}), withDispatch(function (dispatch, _ref3) {
  var _ref3$onToggle = _ref3.onToggle,
      onToggle = _ref3$onToggle === void 0 ? noop : _ref3$onToggle;

  var _dispatch = dispatch('core/editor'),
      deleteReusableBlock = _dispatch.__experimentalDeleteReusableBlock;

  return {
    onDelete: function onDelete(id) {
      // TODO: Make this a <Confirm /> component or similar
      // eslint-disable-next-line no-alert
      var hasConfirmed = window.confirm(__('Are you sure you want to delete this Reusable Block?\n\n' + 'It will be permanently removed from all posts and pages that use it.'));

      if (hasConfirmed) {
        deleteReusableBlock(id);
        onToggle();
      }
    }
  };
})])(ReusableBlockDeleteButton);
//# sourceMappingURL=reusable-block-delete-button.js.map