import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { castArray, filter, first, get, mapKeys, orderBy } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _n, sprintf } from '@wordpress/i18n';
import { Dropdown, IconButton, Toolbar, PanelBody, Path, SVG } from '@wordpress/components';
import { getBlockType, getPossibleBlockTransformations, switchToBlockType, hasChildBlocksWithInserterSupport } from '@wordpress/blocks';
import { Component, Fragment } from '@wordpress/element';
import { DOWN } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockIcon from '../block-icon';
import BlockStyles from '../block-styles';
import BlockPreview from '../block-preview';
import BlockTypesList from '../block-types-list';
export var BlockSwitcher =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockSwitcher, _Component);

  function BlockSwitcher() {
    var _this;

    _classCallCheck(this, BlockSwitcher);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockSwitcher).apply(this, arguments));
    _this.state = {
      hoveredClassName: null
    };
    _this.onHoverClassName = _this.onHoverClassName.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockSwitcher, [{
    key: "onHoverClassName",
    value: function onHoverClassName(className) {
      this.setState({
        hoveredClassName: className
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          blocks = _this$props.blocks,
          onTransform = _this$props.onTransform,
          inserterItems = _this$props.inserterItems;
      var hoveredClassName = this.state.hoveredClassName;

      if (!blocks || !blocks.length) {
        return null;
      }

      var itemsByName = mapKeys(inserterItems, function (_ref) {
        var name = _ref.name;
        return name;
      });
      var possibleBlockTransformations = orderBy(filter(getPossibleBlockTransformations(blocks), function (block) {
        return !!itemsByName[block.name];
      }), function (block) {
        return itemsByName[block.name].frecency;
      }, 'desc');
      var sourceBlockName = blocks[0].name;
      var blockType = getBlockType(sourceBlockName);
      var hasStyles = blocks.length === 1 && get(blockType, ['styles'], []).length !== 0;

      if (!hasStyles && !possibleBlockTransformations.length) {
        return null;
      }

      return createElement(Dropdown, {
        position: "bottom right",
        className: "editor-block-switcher",
        contentClassName: "editor-block-switcher__popover",
        renderToggle: function renderToggle(_ref2) {
          var onToggle = _ref2.onToggle,
              isOpen = _ref2.isOpen;

          var openOnArrowDown = function openOnArrowDown(event) {
            if (!isOpen && event.keyCode === DOWN) {
              event.preventDefault();
              event.stopPropagation();
              onToggle();
            }
          };

          var label = 1 === blocks.length ? __('Change block type') : sprintf(_n('Change type of %d block', 'Change type of %d blocks', blocks.length), blocks.length);
          return createElement(Toolbar, null, createElement(IconButton, {
            className: "editor-block-switcher__toggle",
            onClick: onToggle,
            "aria-haspopup": "true",
            "aria-expanded": isOpen,
            label: label,
            tooltip: label,
            onKeyDown: openOnArrowDown
          }, createElement(BlockIcon, {
            icon: blockType.icon,
            showColors: true
          }), createElement(SVG, {
            className: "editor-block-switcher__transform",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
          }, createElement(Path, {
            d: "M6.5 8.9c.6-.6 1.4-.9 2.2-.9h6.9l-1.3 1.3 1.4 1.4L19.4 7l-3.7-3.7-1.4 1.4L15.6 6H8.7c-1.4 0-2.6.5-3.6 1.5l-2.8 2.8 1.4 1.4 2.8-2.8zm13.8 2.4l-2.8 2.8c-.6.6-1.3.9-2.1.9h-7l1.3-1.3-1.4-1.4L4.6 16l3.7 3.7 1.4-1.4L8.4 17h6.9c1.3 0 2.6-.5 3.5-1.5l2.8-2.8-1.3-1.4z"
          }))));
        },
        renderContent: function renderContent(_ref3) {
          var onClose = _ref3.onClose;
          return createElement(Fragment, null, hasStyles && createElement(PanelBody, {
            title: __('Block Styles'),
            initialOpen: true
          }, createElement(BlockStyles, {
            clientId: blocks[0].clientId,
            onSwitch: onClose,
            onHoverClassName: _this2.onHoverClassName
          })), possibleBlockTransformations.length !== 0 && createElement(PanelBody, {
            title: __('Transform To:'),
            initialOpen: true
          }, createElement(BlockTypesList, {
            items: possibleBlockTransformations.map(function (destinationBlockType) {
              return {
                id: destinationBlockType.name,
                icon: destinationBlockType.icon,
                title: destinationBlockType.title,
                hasChildBlocksWithInserterSupport: hasChildBlocksWithInserterSupport(destinationBlockType.name)
              };
            }),
            onSelect: function onSelect(item) {
              onTransform(blocks, item.id);
              onClose();
            }
          })), hoveredClassName !== null && createElement(BlockPreview, {
            name: blocks[0].name,
            attributes: _objectSpread({}, blocks[0].attributes, {
              className: hoveredClassName
            })
          }));
        }
      });
    }
  }]);

  return BlockSwitcher;
}(Component);
export default compose(withSelect(function (select, _ref4) {
  var clientIds = _ref4.clientIds;

  var _select = select('core/editor'),
      getBlocksByClientId = _select.getBlocksByClientId,
      getBlockRootClientId = _select.getBlockRootClientId,
      getInserterItems = _select.getInserterItems;

  var rootClientId = getBlockRootClientId(first(castArray(clientIds)));
  return {
    blocks: getBlocksByClientId(clientIds),
    inserterItems: getInserterItems(rootClientId)
  };
}), withDispatch(function (dispatch, ownProps) {
  return {
    onTransform: function onTransform(blocks, name) {
      dispatch('core/editor').replaceBlocks(ownProps.clientIds, switchToBlockType(blocks, name));
    }
  };
}))(BlockSwitcher);
//# sourceMappingURL=index.js.map