"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReusableBlockConvertButton = ReusableBlockConvertButton;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function ReusableBlockConvertButton(_ref) {
  var isVisible = _ref.isVisible,
      isStaticBlock = _ref.isStaticBlock,
      onConvertToStatic = _ref.onConvertToStatic,
      onConvertToReusable = _ref.onConvertToReusable;

  if (!isVisible) {
    return null;
  }

  return (0, _element.createElement)(_element.Fragment, null, isStaticBlock && (0, _element.createElement)(_components.MenuItem, {
    className: "editor-block-settings-menu__control",
    icon: "controls-repeat",
    onClick: onConvertToReusable
  }, (0, _i18n.__)('Add to Reusable Blocks')), !isStaticBlock && (0, _element.createElement)(_components.MenuItem, {
    className: "editor-block-settings-menu__control",
    icon: "controls-repeat",
    onClick: onConvertToStatic
  }, (0, _i18n.__)('Convert to Regular Block')));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var clientIds = _ref2.clientIds;

  var _select = select('core/editor'),
      getBlock = _select.getBlock,
      canInsertBlockType = _select.canInsertBlockType,
      getReusableBlock = _select.__experimentalGetReusableBlock;

  var _select2 = select('core/blocks'),
      getFreeformFallbackBlockName = _select2.getFreeformFallbackBlockName,
      getUnregisteredFallbackBlockName = _select2.getUnregisteredFallbackBlockName;

  var blocks = (0, _lodash.map)(clientIds, function (clientId) {
    return getBlock(clientId);
  });
  var isVisible = // Guard against the case where a regular block has *just* been converted to a
  // reusable block and doesn't yet exist in the editor store.
  (0, _lodash.every)(blocks, function (block) {
    return !!block;
  }) && // Hide 'Add to Reusable Blocks' when Reusable Blocks are disabled, i.e. when
  // core/block is not in the allowed_block_types filter.
  canInsertBlockType('core/block') && ( // Hide 'Add to Reusable Blocks' on Classic blocks. Showing it causes a
  // confusing UX, because of its similarity to the 'Convert to Blocks' button.
  blocks.length !== 1 || blocks[0].name !== getFreeformFallbackBlockName() && blocks[0].name !== getUnregisteredFallbackBlockName());
  return {
    isVisible: isVisible,
    isStaticBlock: isVisible && (blocks.length !== 1 || !(0, _blocks.isReusableBlock)(blocks[0]) || !getReusableBlock(blocks[0].attributes.ref))
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var clientIds = _ref3.clientIds,
      _ref3$onToggle = _ref3.onToggle,
      onToggle = _ref3$onToggle === void 0 ? _lodash.noop : _ref3$onToggle;

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

exports.default = _default;
//# sourceMappingURL=reusable-block-convert-button.js.map