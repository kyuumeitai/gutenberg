"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReusableBlockDeleteButton = ReusableBlockDeleteButton;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function ReusableBlockDeleteButton(_ref) {
  var reusableBlock = _ref.reusableBlock,
      onDelete = _ref.onDelete;

  if (!reusableBlock) {
    return null;
  }

  return (0, _element.createElement)(_components.MenuItem, {
    className: "editor-block-settings-menu__control",
    icon: "no",
    disabled: reusableBlock.isTemporary,
    onClick: function onClick() {
      return onDelete(reusableBlock.id);
    }
  }, (0, _i18n.__)('Remove from Reusable Blocks'));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/editor'),
      getBlock = _select.getBlock,
      getReusableBlock = _select.__experimentalGetReusableBlock;

  var block = getBlock(clientId);
  return {
    reusableBlock: block && (0, _blocks.isReusableBlock)(block) ? getReusableBlock(block.attributes.ref) : null
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var _ref3$onToggle = _ref3.onToggle,
      onToggle = _ref3$onToggle === void 0 ? _lodash.noop : _ref3$onToggle;

  var _dispatch = dispatch('core/editor'),
      deleteReusableBlock = _dispatch.__experimentalDeleteReusableBlock;

  return {
    onDelete: function onDelete(id) {
      // TODO: Make this a <Confirm /> component or similar
      // eslint-disable-next-line no-alert
      var hasConfirmed = window.confirm((0, _i18n.__)('Are you sure you want to delete this Reusable Block?\n\n' + 'It will be permanently removed from all posts and pages that use it.'));

      if (hasConfirmed) {
        deleteReusableBlock(id);
        onToggle();
      }
    }
  };
})])(ReusableBlockDeleteButton);

exports.default = _default;
//# sourceMappingURL=reusable-block-delete-button.js.map