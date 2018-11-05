/**
 * WordPress dependencies
 */
import { rawHandler, getBlockContent } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import BlockConvertButton from './block-convert-button';
export default compose(withSelect(function (select, _ref) {
  var clientId = _ref.clientId;

  var _select = select('core/editor'),
      getBlock = _select.getBlock,
      canUserUseUnfilteredHTML = _select.canUserUseUnfilteredHTML;

  var block = getBlock(clientId);
  return {
    block: block,
    canUserUseUnfilteredHTML: canUserUseUnfilteredHTML(),
    shouldRender: block && block.name === 'core/html'
  };
}), withDispatch(function (dispatch, _ref2) {
  var block = _ref2.block,
      canUserUseUnfilteredHTML = _ref2.canUserUseUnfilteredHTML;
  return {
    onClick: function onClick() {
      return dispatch('core/editor').replaceBlocks(block.clientId, rawHandler({
        HTML: getBlockContent(block),
        mode: 'BLOCKS',
        canUserUseUnfilteredHTML: canUserUseUnfilteredHTML
      }));
    }
  };
}))(BlockConvertButton);
//# sourceMappingURL=block-html-convert-button.js.map