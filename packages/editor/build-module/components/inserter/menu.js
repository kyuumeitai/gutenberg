import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
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
import { filter as _filter, find, findIndex, flow, groupBy, isEmpty, map, some, sortBy, without, includes, deburr } from 'lodash';
import scrollIntoView from 'dom-scroll-into-view';
/**
 * WordPress dependencies
 */

import { __, _n, _x, sprintf } from '@wordpress/i18n';
import { Component, createRef } from '@wordpress/element';
import { withSpokenMessages, PanelBody } from '@wordpress/components';
import { getCategories, isReusableBlock, createBlock, isUnmodifiedDefaultBlock } from '@wordpress/blocks';
import { withDispatch, withSelect } from '@wordpress/data';
import { withInstanceId, compose, withSafeTimeout } from '@wordpress/compose';
import { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import BlockPreview from '../block-preview';
import BlockTypesList from '../block-types-list';
import ChildBlocks from './child-blocks';
import InserterInlineElements from './inline-elements';
var MAX_SUGGESTED_ITEMS = 9;

var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};
/**
 * Filters an item list given a search term.
 *
 * @param {Array} items        Item list
 * @param {string} searchTerm  Search term.
 *
 * @return {Array}             Filtered item list.
 */


export var searchItems = function searchItems(items, searchTerm) {
  var normalizedSearchTerm = normalizeTerm(searchTerm);

  var matchSearch = function matchSearch(string) {
    return normalizeTerm(string).indexOf(normalizedSearchTerm) !== -1;
  };

  var categories = getCategories();
  return items.filter(function (item) {
    var itemCategory = find(categories, {
      slug: item.category
    });
    return matchSearch(item.title) || some(item.keywords, matchSearch) || itemCategory && matchSearch(itemCategory.title);
  });
};
/**
 * Converts the search term into a normalized term.
 *
 * @param {string} term The search term to normalize.
 *
 * @return {string} The normalized search term.
 */

export var normalizeTerm = function normalizeTerm(term) {
  // Disregard diacritics.
  //  Input: "média"
  term = deburr(term); // Accommodate leading slash, matching autocomplete expectations.
  //  Input: "/media"

  term = term.replace(/^\//, ''); // Lowercase.
  //  Input: "MEDIA"

  term = term.toLowerCase(); // Strip leading and trailing whitespace.
  //  Input: " media "

  term = term.trim();
  return term;
};
export var InserterMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(InserterMenu, _Component);

  function InserterMenu() {
    var _this;

    _classCallCheck(this, InserterMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InserterMenu).apply(this, arguments));
    _this.state = {
      childItems: [],
      filterValue: '',
      hoveredItem: null,
      suggestedItems: [],
      reusableItems: [],
      itemsPerCategory: {},
      openPanels: ['suggested']
    };
    _this.onChangeSearchInput = _this.onChangeSearchInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onHover = _this.onHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.panels = {};
    _this.inserterResults = createRef();
    return _this;
  }

  _createClass(InserterMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // This could be replaced by a resolver.
      this.props.fetchReusableBlocks();
      this.filter();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.items !== this.props.items) {
        this.filter(this.state.filterValue);
      }
    }
  }, {
    key: "onChangeSearchInput",
    value: function onChangeSearchInput(event) {
      this.filter(event.target.value);
    }
  }, {
    key: "onHover",
    value: function onHover(item) {
      this.setState({
        hoveredItem: item
      });
      var _this$props = this.props,
          showInsertionPoint = _this$props.showInsertionPoint,
          hideInsertionPoint = _this$props.hideInsertionPoint;

      if (item) {
        var _this$props2 = this.props,
            rootClientId = _this$props2.rootClientId,
            index = _this$props2.index;
        showInsertionPoint(rootClientId, index);
      } else {
        hideInsertionPoint();
      }
    }
  }, {
    key: "bindPanel",
    value: function bindPanel(name) {
      var _this2 = this;

      return function (ref) {
        _this2.panels[name] = ref;
      };
    }
  }, {
    key: "onTogglePanel",
    value: function onTogglePanel(panel) {
      var _this3 = this;

      return function () {
        var isOpened = _this3.state.openPanels.indexOf(panel) !== -1;

        if (isOpened) {
          _this3.setState({
            openPanels: without(_this3.state.openPanels, panel)
          });
        } else {
          _this3.setState({
            openPanels: _toConsumableArray(_this3.state.openPanels).concat([panel])
          });

          _this3.props.setTimeout(function () {
            // We need a generic way to access the panel's container
            // eslint-disable-next-line react/no-find-dom-node
            scrollIntoView(_this3.panels[panel], _this3.inserterResults.current, {
              alignWithTop: true
            });
          });
        }
      };
    }
  }, {
    key: "filter",
    value: function filter() {
      var filterValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var _this$props3 = this.props,
          debouncedSpeak = _this$props3.debouncedSpeak,
          items = _this$props3.items,
          rootChildBlocks = _this$props3.rootChildBlocks;
      var filteredItems = searchItems(items, filterValue);

      var childItems = _filter(filteredItems, function (_ref) {
        var name = _ref.name;
        return includes(rootChildBlocks, name);
      });

      var suggestedItems = [];

      if (!filterValue) {
        var maxSuggestedItems = this.props.maxSuggestedItems || MAX_SUGGESTED_ITEMS;
        suggestedItems = _filter(items, function (item) {
          return item.utility > 0;
        }).slice(0, maxSuggestedItems);
      }

      var reusableItems = _filter(filteredItems, {
        category: 'reusable'
      });

      var getCategoryIndex = function getCategoryIndex(item) {
        return findIndex(getCategories(), function (category) {
          return category.slug === item.category;
        });
      };

      var itemsPerCategory = flow(function (itemList) {
        return _filter(itemList, function (item) {
          return item.category !== 'reusable';
        });
      }, function (itemList) {
        return sortBy(itemList, getCategoryIndex);
      }, function (itemList) {
        return groupBy(itemList, 'category');
      })(filteredItems);
      var openPanels = this.state.openPanels;

      if (filterValue !== this.state.filterValue) {
        if (!filterValue) {
          openPanels = ['suggested'];
        } else if (reusableItems.length) {
          openPanels = ['reusable'];
        } else if (filteredItems.length) {
          var firstCategory = find(getCategories(), function (_ref2) {
            var slug = _ref2.slug;
            return itemsPerCategory[slug] && itemsPerCategory[slug].length;
          });
          openPanels = [firstCategory.slug];
        }
      }

      this.setState({
        hoveredItem: null,
        childItems: childItems,
        filterValue: filterValue,
        suggestedItems: suggestedItems,
        reusableItems: reusableItems,
        itemsPerCategory: itemsPerCategory,
        openPanels: openPanels
      });
      var resultCount = Object.keys(itemsPerCategory).reduce(function (accumulator, currentCategorySlug) {
        return accumulator + itemsPerCategory[currentCategorySlug].length;
      }, 0);
      var resultsFoundMessage = sprintf(_n('%d result found.', '%d results found.', resultCount), resultCount);
      debouncedSpeak(resultsFoundMessage, 'assertive');
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (includes([LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER], event.keyCode)) {
        // Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
        event.stopPropagation();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          instanceId = _this$props4.instanceId,
          onSelect = _this$props4.onSelect,
          rootClientId = _this$props4.rootClientId;
      var _this$state = this.state,
          childItems = _this$state.childItems,
          filterValue = _this$state.filterValue,
          hoveredItem = _this$state.hoveredItem,
          suggestedItems = _this$state.suggestedItems,
          reusableItems = _this$state.reusableItems,
          itemsPerCategory = _this$state.itemsPerCategory,
          openPanels = _this$state.openPanels;

      var isPanelOpen = function isPanelOpen(panel) {
        return openPanels.indexOf(panel) !== -1;
      };

      var isSearching = !!filterValue; // Disable reason (no-autofocus): The inserter menu is a modal display, not one which
      // is always visible, and one which already incurs this behavior of autoFocus via
      // Popover's focusOnMount.
      // Disable reason (no-static-element-interactions): Navigational key-presses within
      // the menu are prevented from triggering WritingFlow and ObserveTyping interactions.

      /* eslint-disable jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */

      return createElement("div", {
        className: "editor-inserter__menu",
        onKeyPress: stopKeyPropagation,
        onKeyDown: this.onKeyDown
      }, createElement("label", {
        htmlFor: "editor-inserter__search-".concat(instanceId),
        className: "screen-reader-text"
      }, __('Search for a block')), createElement("input", {
        id: "editor-inserter__search-".concat(instanceId),
        type: "search",
        placeholder: __('Search for a block'),
        className: "editor-inserter__search",
        autoFocus: true,
        onChange: this.onChangeSearchInput
      }), createElement("div", {
        className: "editor-inserter__results",
        ref: this.inserterResults,
        tabIndex: "0",
        role: "region",
        "aria-label": __('Available block types')
      }, createElement(ChildBlocks, {
        rootClientId: rootClientId,
        items: childItems,
        onSelect: onSelect,
        onHover: this.onHover
      }), !!suggestedItems.length && createElement(PanelBody, {
        title: _x('Most Used', 'blocks'),
        opened: isPanelOpen('suggested'),
        onToggle: this.onTogglePanel('suggested'),
        ref: this.bindPanel('suggested')
      }, createElement(BlockTypesList, {
        items: suggestedItems,
        onSelect: onSelect,
        onHover: this.onHover
      })), createElement(InserterInlineElements, {
        filterValue: filterValue
      }), map(getCategories(), function (category) {
        var categoryItems = itemsPerCategory[category.slug];

        if (!categoryItems || !categoryItems.length) {
          return null;
        }

        return createElement(PanelBody, {
          key: category.slug,
          title: category.title,
          icon: category.icon,
          opened: isSearching || isPanelOpen(category.slug),
          onToggle: _this4.onTogglePanel(category.slug),
          ref: _this4.bindPanel(category.slug)
        }, createElement(BlockTypesList, {
          items: categoryItems,
          onSelect: onSelect,
          onHover: _this4.onHover
        }));
      }), !!reusableItems.length && createElement(PanelBody, {
        className: "editor-inserter__reusable-blocks-panel",
        title: __('Reusable'),
        opened: isPanelOpen('reusable'),
        onToggle: this.onTogglePanel('reusable'),
        icon: "controls-repeat",
        ref: this.bindPanel('reusable')
      }, createElement(BlockTypesList, {
        items: reusableItems,
        onSelect: onSelect,
        onHover: this.onHover
      }), createElement("a", {
        className: "editor-inserter__manage-reusable-blocks",
        href: "edit.php?post_type=wp_block"
      }, __('Manage All Reusable Blocks'))), isEmpty(suggestedItems) && isEmpty(reusableItems) && isEmpty(itemsPerCategory) && createElement("p", {
        className: "editor-inserter__no-results"
      }, __('No blocks found.'))), hoveredItem && isReusableBlock(hoveredItem) && createElement(BlockPreview, {
        name: hoveredItem.name,
        attributes: hoveredItem.initialAttributes
      }));
      /* eslint-enable jsx-a11y/no-autofocus, jsx-a11y/no-noninteractive-element-interactions */
    }
  }]);

  return InserterMenu;
}(Component);
export default compose(withSelect(function (select, _ref3) {
  var rootClientId = _ref3.rootClientId;

  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getSelectedBlock = _select.getSelectedBlock,
      getInserterItems = _select.getInserterItems,
      getBlockName = _select.getBlockName;

  var _select2 = select('core/blocks'),
      getChildBlockNames = _select2.getChildBlockNames;

  var rootBlockName = getBlockName(rootClientId);
  return {
    selectedBlock: getSelectedBlock(),
    rootChildBlocks: getChildBlockNames(rootBlockName),
    title: getEditedPostAttribute('title'),
    items: getInserterItems(rootClientId),
    rootClientId: rootClientId
  };
}), withDispatch(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/editor'),
      fetchReusableBlocks = _dispatch.__experimentalFetchReusableBlocks,
      showInsertionPoint = _dispatch.showInsertionPoint,
      hideInsertionPoint = _dispatch.hideInsertionPoint;

  return {
    fetchReusableBlocks: fetchReusableBlocks,
    showInsertionPoint: showInsertionPoint,
    hideInsertionPoint: hideInsertionPoint,
    onSelect: function onSelect(item) {
      var _dispatch2 = dispatch('core/editor'),
          replaceBlocks = _dispatch2.replaceBlocks,
          insertBlock = _dispatch2.insertBlock;

      var selectedBlock = ownProps.selectedBlock,
          index = ownProps.index,
          rootClientId = ownProps.rootClientId;
      var name = item.name,
          initialAttributes = item.initialAttributes;
      var insertedBlock = createBlock(name, initialAttributes);

      if (selectedBlock && isUnmodifiedDefaultBlock(selectedBlock)) {
        replaceBlocks(selectedBlock.clientId, insertedBlock);
      } else {
        insertBlock(insertedBlock, index, rootClientId);
      }

      ownProps.onSelect();
    }
  };
}), withSpokenMessages, withInstanceId, withSafeTimeout)(InserterMenu);
//# sourceMappingURL=menu.js.map