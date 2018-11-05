import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map, noop } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { withSelect, withDispatch } from '@wordpress/data';
import { MenuItem, MenuGroup } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockIcon from '../block-icon';

function BlockNavigationList(_ref) {
  var blocks = _ref.blocks,
      selectedBlockClientId = _ref.selectedBlockClientId,
      selectBlock = _ref.selectBlock,
      showNestedBlocks = _ref.showNestedBlocks;
  return createElement("ul", {
    className: "editor-block-navigation__list",
    role: "presentation"
  }, map(blocks, function (block) {
    var blockType = getBlockType(block.name);
    return createElement("li", {
      key: block.clientId,
      role: "presentation"
    }, createElement("div", {
      role: "presentation",
      className: "editor-block-navigation__item"
    }, createElement(MenuItem, {
      className: classnames('editor-block-navigation__item-button', {
        'is-selected': block.clientId === selectedBlockClientId
      }),
      onClick: function onClick() {
        return selectBlock(block.clientId);
      },
      isSelected: block.clientId === selectedBlockClientId
    }, createElement(BlockIcon, {
      icon: blockType.icon,
      showColors: true
    }), blockType.title)), showNestedBlocks && !!block.innerBlocks && !!block.innerBlocks.length && createElement(BlockNavigationList, {
      blocks: block.innerBlocks,
      selectedBlockClientId: selectedBlockClientId,
      selectBlock: selectBlock,
      showNestedBlocks: true
    }));
  }));
}

function BlockNavigation(_ref2) {
  var rootBlock = _ref2.rootBlock,
      rootBlocks = _ref2.rootBlocks,
      selectedBlockClientId = _ref2.selectedBlockClientId,
      selectBlock = _ref2.selectBlock;
  var hasHierarchy = rootBlock && (rootBlock.clientId !== selectedBlockClientId || rootBlock.innerBlocks && rootBlock.innerBlocks.length !== 0);
  return createElement(MenuGroup, {
    label: __('Block Navigation')
  }, hasHierarchy && createElement(BlockNavigationList, {
    blocks: [rootBlock],
    selectedBlockClientId: selectedBlockClientId,
    selectBlock: selectBlock,
    showNestedBlocks: true
  }), !hasHierarchy && createElement(BlockNavigationList, {
    blocks: rootBlocks,
    selectedBlockClientId: selectedBlockClientId,
    selectBlock: selectBlock
  }), (!rootBlocks || rootBlocks.length === 0) && // If there are no blocks in this document, don't render a list of blocks.
  // Instead: inform the user no blocks exist yet.
  createElement("p", {
    className: "editor-block-navigation__paragraph"
  }, __('No blocks created yet.')));
}

export default compose(withSelect(function (select) {
  var _select = select('core/editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getBlockHierarchyRootClientId = _select.getBlockHierarchyRootClientId,
      getBlock = _select.getBlock,
      getBlocks = _select.getBlocks;

  var selectedBlockClientId = getSelectedBlockClientId();
  return {
    rootBlocks: getBlocks(),
    rootBlock: selectedBlockClientId ? getBlock(getBlockHierarchyRootClientId(selectedBlockClientId)) : null,
    selectedBlockClientId: selectedBlockClientId
  };
}), withDispatch(function (dispatch, _ref3) {
  var _ref3$onSelect = _ref3.onSelect,
      onSelect = _ref3$onSelect === void 0 ? noop : _ref3$onSelect;
  return {
    selectBlock: function selectBlock(clientId) {
      dispatch('core/editor').selectBlock(clientId);
      onSelect(clientId);
    }
  };
}))(BlockNavigation);
//# sourceMappingURL=index.js.map