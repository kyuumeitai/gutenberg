"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blockConvertButton = _interopRequireDefault(require("./block-convert-button"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref) {
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
}), (0, _data.withDispatch)(function (dispatch, _ref2) {
  var block = _ref2.block,
      canUserUseUnfilteredHTML = _ref2.canUserUseUnfilteredHTML;
  return {
    onClick: function onClick() {
      return dispatch('core/editor').replaceBlocks(block.clientId, (0, _blocks.rawHandler)({
        HTML: (0, _blocks.getBlockContent)(block),
        mode: 'BLOCKS',
        canUserUseUnfilteredHTML: canUserUseUnfilteredHTML
      }));
    }
  };
}))(_blockConvertButton.default);

exports.default = _default;
//# sourceMappingURL=block-html-convert-button.js.map