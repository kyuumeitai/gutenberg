"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _blockIcon = _interopRequireDefault(require("../block-icon"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockNavigationList(_ref) {
  var blocks = _ref.blocks,
      selectedBlockClientId = _ref.selectedBlockClientId,
      selectBlock = _ref.selectBlock,
      showNestedBlocks = _ref.showNestedBlocks;
  return (0, _element.createElement)("ul", {
    className: "editor-block-navigation__list",
    role: "presentation"
  }, (0, _lodash.map)(blocks, function (block) {
    var blockType = (0, _blocks.getBlockType)(block.name);
    return (0, _element.createElement)("li", {
      key: block.clientId,
      role: "presentation"
    }, (0, _element.createElement)("div", {
      role: "presentation",
      className: "editor-block-navigation__item"
    }, (0, _element.createElement)(_components.MenuItem, {
      className: (0, _classnames.default)('editor-block-navigation__item-button', {
        'is-selected': block.clientId === selectedBlockClientId
      }),
      onClick: function onClick() {
        return selectBlock(block.clientId);
      },
      isSelected: block.clientId === selectedBlockClientId
    }, (0, _element.createElement)(_blockIcon.default, {
      icon: blockType.icon,
      showColors: true
    }), blockType.title)), showNestedBlocks && !!block.innerBlocks && !!block.innerBlocks.length && (0, _element.createElement)(BlockNavigationList, {
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
  return (0, _element.createElement)(_components.MenuGroup, {
    label: (0, _i18n.__)('Block Navigation')
  }, hasHierarchy && (0, _element.createElement)(BlockNavigationList, {
    blocks: [rootBlock],
    selectedBlockClientId: selectedBlockClientId,
    selectBlock: selectBlock,
    showNestedBlocks: true
  }), !hasHierarchy && (0, _element.createElement)(BlockNavigationList, {
    blocks: rootBlocks,
    selectedBlockClientId: selectedBlockClientId,
    selectBlock: selectBlock
  }), (!rootBlocks || rootBlocks.length === 0) && // If there are no blocks in this document, don't render a list of blocks.
  // Instead: inform the user no blocks exist yet.
  (0, _element.createElement)("p", {
    className: "editor-block-navigation__paragraph"
  }, (0, _i18n.__)('No blocks created yet.')));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
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
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var _ref3$onSelect = _ref3.onSelect,
      onSelect = _ref3$onSelect === void 0 ? _lodash.noop : _ref3$onSelect;
  return {
    selectBlock: function selectBlock(clientId) {
      dispatch('core/editor').selectBlock(clientId);
      onSelect(clientId);
    }
  };
}))(BlockNavigation);

exports.default = _default;
//# sourceMappingURL=index.js.map