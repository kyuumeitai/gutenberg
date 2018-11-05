import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { getBlockType, getUnregisteredTypeHandlerName } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
/**
 * Internal Dependencies
 */

import SkipToSelectedBlock from '../skip-to-selected-block';
import BlockIcon from '../block-icon';
import InspectorControls from '../inspector-controls';
import InspectorAdvancedControls from '../inspector-advanced-controls';
import BlockStyles from '../block-styles';

var BlockInspector = function BlockInspector(_ref) {
  var selectedBlock = _ref.selectedBlock,
      blockType = _ref.blockType,
      count = _ref.count;

  if (count > 1) {
    return createElement("span", {
      className: "editor-block-inspector__multi-blocks"
    }, __('Coming Soon'));
  }

  var isSelectedBlockUnregistered = !!selectedBlock && selectedBlock.name === getUnregisteredTypeHandlerName();
  /*
   * If the selected block is of an unregistered type, avoid showing it as an actual selection
   * because we want the user to focus on the unregistered block warning, not block settings.
   */

  if (!selectedBlock || isSelectedBlockUnregistered) {
    return createElement("span", {
      className: "editor-block-inspector__no-blocks"
    }, __('No block selected.'));
  }

  return createElement(Fragment, null, createElement("div", {
    className: "editor-block-inspector__card"
  }, createElement(BlockIcon, {
    icon: blockType.icon,
    showColors: true
  }), createElement("div", {
    className: "editor-block-inspector__card-content"
  }, createElement("div", {
    className: "editor-block-inspector__card-title"
  }, blockType.title), createElement("div", {
    className: "editor-block-inspector__card-description"
  }, blockType.description))), !!blockType.styles && createElement("div", null, createElement(PanelBody, {
    title: __('Styles'),
    initialOpen: false
  }, createElement(BlockStyles, {
    clientId: selectedBlock.clientId
  }))), createElement("div", null, createElement(InspectorControls.Slot, null)), createElement("div", null, createElement(InspectorAdvancedControls.Slot, null, function (fills) {
    return !isEmpty(fills) && createElement(PanelBody, {
      className: "editor-block-inspector__advanced",
      title: __('Advanced'),
      initialOpen: false
    }, fills);
  })), createElement(SkipToSelectedBlock, {
    key: "back"
  }));
};

export default withSelect(function (select) {
  var _select = select('core/editor'),
      getSelectedBlock = _select.getSelectedBlock,
      getSelectedBlockCount = _select.getSelectedBlockCount;

  var selectedBlock = getSelectedBlock();
  var blockType = selectedBlock && getBlockType(selectedBlock.name);
  return {
    selectedBlock: selectedBlock,
    blockType: blockType,
    count: getSelectedBlockCount()
  };
})(BlockInspector);
//# sourceMappingURL=index.js.map