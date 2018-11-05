/**
 * External dependencies
 */
import { castArray, first, last, every } from 'lodash';
/**
 * WordPress dependencies
 */

import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { cloneBlock, hasBlockSupport } from '@wordpress/blocks';

function BlockActions(_ref) {
  var onDuplicate = _ref.onDuplicate,
      onRemove = _ref.onRemove,
      onInsertBefore = _ref.onInsertBefore,
      onInsertAfter = _ref.onInsertAfter,
      isLocked = _ref.isLocked,
      canDuplicate = _ref.canDuplicate,
      children = _ref.children;
  return children({
    onDuplicate: onDuplicate,
    onRemove: onRemove,
    onInsertAfter: onInsertAfter,
    onInsertBefore: onInsertBefore,
    isLocked: isLocked,
    canDuplicate: canDuplicate
  });
}

export default compose([withSelect(function (select, props) {
  var _select = select('core/editor'),
      getBlocksByClientId = _select.getBlocksByClientId,
      getBlockIndex = _select.getBlockIndex,
      getTemplateLock = _select.getTemplateLock,
      getBlockRootClientId = _select.getBlockRootClientId;

  var blocks = getBlocksByClientId(props.clientIds);
  var canDuplicate = every(blocks, function (block) {
    return !!block && hasBlockSupport(block.name, 'multiple', true);
  });
  var rootClientId = getBlockRootClientId(props.clientIds[0]);
  return {
    firstSelectedIndex: getBlockIndex(first(castArray(props.clientIds)), rootClientId),
    lastSelectedIndex: getBlockIndex(last(castArray(props.clientIds)), rootClientId),
    isLocked: !!getTemplateLock(rootClientId),
    blocks: blocks,
    canDuplicate: canDuplicate,
    rootClientId: rootClientId,
    extraProps: props
  };
}), withDispatch(function (dispatch, props) {
  var clientIds = props.clientIds,
      rootClientId = props.rootClientId,
      blocks = props.blocks,
      firstSelectedIndex = props.firstSelectedIndex,
      lastSelectedIndex = props.lastSelectedIndex,
      isLocked = props.isLocked,
      canDuplicate = props.canDuplicate;

  var _dispatch = dispatch('core/editor'),
      insertBlocks = _dispatch.insertBlocks,
      multiSelect = _dispatch.multiSelect,
      removeBlocks = _dispatch.removeBlocks,
      insertDefaultBlock = _dispatch.insertDefaultBlock;

  return {
    onDuplicate: function onDuplicate() {
      if (isLocked || !canDuplicate) {
        return;
      }

      var clonedBlocks = blocks.map(function (block) {
        return cloneBlock(block);
      });
      insertBlocks(clonedBlocks, lastSelectedIndex + 1, rootClientId);

      if (clonedBlocks.length > 1) {
        multiSelect(first(clonedBlocks).clientId, last(clonedBlocks).clientId);
      }
    },
    onRemove: function onRemove() {
      if (!isLocked) {
        removeBlocks(clientIds);
      }
    },
    onInsertBefore: function onInsertBefore() {
      if (!isLocked) {
        insertDefaultBlock({}, rootClientId, firstSelectedIndex);
      }
    },
    onInsertAfter: function onInsertAfter() {
      if (!isLocked) {
        insertDefaultBlock({}, rootClientId, lastSelectedIndex + 1);
      }
    }
  };
})])(BlockActions);
//# sourceMappingURL=index.js.map