"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _skipToSelectedBlock = _interopRequireDefault(require("../skip-to-selected-block"));

var _blockIcon = _interopRequireDefault(require("../block-icon"));

var _inspectorControls = _interopRequireDefault(require("../inspector-controls"));

var _inspectorAdvancedControls = _interopRequireDefault(require("../inspector-advanced-controls"));

var _blockStyles = _interopRequireDefault(require("../block-styles"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal Dependencies
 */
var BlockInspector = function BlockInspector(_ref) {
  var selectedBlock = _ref.selectedBlock,
      blockType = _ref.blockType,
      count = _ref.count;

  if (count > 1) {
    return (0, _element.createElement)("span", {
      className: "editor-block-inspector__multi-blocks"
    }, (0, _i18n.__)('Coming Soon'));
  }

  var isSelectedBlockUnregistered = !!selectedBlock && selectedBlock.name === (0, _blocks.getUnregisteredTypeHandlerName)();
  /*
   * If the selected block is of an unregistered type, avoid showing it as an actual selection
   * because we want the user to focus on the unregistered block warning, not block settings.
   */

  if (!selectedBlock || isSelectedBlockUnregistered) {
    return (0, _element.createElement)("span", {
      className: "editor-block-inspector__no-blocks"
    }, (0, _i18n.__)('No block selected.'));
  }

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "editor-block-inspector__card"
  }, (0, _element.createElement)(_blockIcon.default, {
    icon: blockType.icon,
    showColors: true
  }), (0, _element.createElement)("div", {
    className: "editor-block-inspector__card-content"
  }, (0, _element.createElement)("div", {
    className: "editor-block-inspector__card-title"
  }, blockType.title), (0, _element.createElement)("div", {
    className: "editor-block-inspector__card-description"
  }, blockType.description))), !!blockType.styles && (0, _element.createElement)("div", null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Styles'),
    initialOpen: false
  }, (0, _element.createElement)(_blockStyles.default, {
    clientId: selectedBlock.clientId
  }))), (0, _element.createElement)("div", null, (0, _element.createElement)(_inspectorControls.default.Slot, null)), (0, _element.createElement)("div", null, (0, _element.createElement)(_inspectorAdvancedControls.default.Slot, null, function (fills) {
    return !(0, _lodash.isEmpty)(fills) && (0, _element.createElement)(_components.PanelBody, {
      className: "editor-block-inspector__advanced",
      title: (0, _i18n.__)('Advanced'),
      initialOpen: false
    }, fills);
  })), (0, _element.createElement)(_skipToSelectedBlock.default, {
    key: "back"
  }));
};

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getSelectedBlock = _select.getSelectedBlock,
      getSelectedBlockCount = _select.getSelectedBlockCount;

  var selectedBlock = getSelectedBlock();
  var blockType = selectedBlock && (0, _blocks.getBlockType)(selectedBlock.name);
  return {
    selectedBlock: selectedBlock,
    blockType: blockType,
    count: getSelectedBlockCount()
  };
})(BlockInspector);

exports.default = _default;
//# sourceMappingURL=index.js.map