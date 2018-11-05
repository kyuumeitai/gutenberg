import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop, every, map } from 'lodash';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isReusableBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
export function ReusableBlockConvertButton(_ref) {
  var isVisible = _ref.isVisible,
      isStaticBlock = _ref.isStaticBlock,
      onConvertToStatic = _ref.onConvertToStatic,
      onConvertToReusable = _ref.onConvertToReusable;

  if (!isVisible) {
    return null;
  }

  return createElement(Fragment, null, isStaticBlock && createElement(MenuItem, {
    className: "editor-block-settings-menu__control",
    icon: "controls-repeat",
    onClick: onConvertToReusable
  }, __('Add to Reusable Blocks')), !isStaticBlock && createElement(MenuItem, {
    className: "editor-block-settings-menu__control",
    icon: "controls-repeat",
    onClick: onConvertToStatic
  }, __('Convert to Regular Block')));
}
export default compose([withSelect(function (select, _ref2) {
  var clientIds = _ref2.clientIds;

  var _select = select('core/editor'),
      getBlock = _select.getBlock,
      canInsertBlockType = _select.canInsertBlockType,
      getReusableBlock = _select.__experimentalGetReusableBlock;

  var _select2 = select('core/blocks'),
      getFreeformFallbackBlockName = _select2.getFreeformFallbackBlockName,
      getUnregisteredFallbackBlockName = _select2.getUnregisteredFallbackBlockName;

  var blocks = map(clientIds, function (clientId) {
    return getBlock(clientId);
  });
  var isVisible = // Guard against the case where a regular block has *just* been converted to a
  // reusable block and doesn't yet exist in the editor store.
  every(blocks, function (block) {
    return !!block;
  }) && // Hide 'Add to Reusable Blocks' when Reusable Blocks are disabled, i.e. when
  // core/block is not in the allowed_block_types filter.
  canInsertBlockType('core/block') && ( // Hide 'Add to Reusable Blocks' on Classic blocks. Showing it causes a
  // confusing UX, because of its similarity to the 'Convert to Blocks' button.
  blocks.length !== 1 || blocks[0].name !== getFreeformFallbackBlockName() && blocks[0].name !== getUnregisteredFallbackBlockName());
  return {
    isVisible: isVisible,
    isStaticBlock: isVisible && (blocks.length !== 1 || !isReusableBlock(blocks[0]) || !getReusableBlock(blocks[0].attributes.ref))
  };
}), withDispatch(function (dispatch, _ref3) {
  var clientIds = _ref3.clientIds,
      _ref3$onToggle = _ref3.onToggle,
      onToggle = _ref3$onToggle === void 0 ? noop : _ref3$onToggle;

  var _dispatch = dispatch('core/editor'),
      convertBlockToReusable = _dispatch.__experimentalConvertBlockToReusable,
      convertBlockToStatic = _dispatch.__experimentalConvertBlockToStatic;

  return {
    onConvertToStatic: function onConvertToStatic() {
      if (clientIds.length !== 1) {
        return;
      }

      convertBlockToStatic(clientIds[0]);
      onToggle();
    },
    onConvertToReusable: function onConvertToReusable() {
      convertBlockToReusable(clientIds);
      onToggle();
    }
  };
})])(ReusableBlockConvertButton);
//# sourceMappingURL=reusable-block-convert-button.js.map