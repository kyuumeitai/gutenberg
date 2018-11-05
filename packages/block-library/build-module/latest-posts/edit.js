import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
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
import { isUndefined, pickBy } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { PanelBody, Placeholder, QueryControls, RangeControl, Spinner, ToggleControl, Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { decodeEntities } from '@wordpress/html-entities';
import { InspectorControls, BlockAlignmentToolbar, BlockControls } from '@wordpress/editor';
import { withSelect } from '@wordpress/data';
var MAX_POSTS_COLUMNS = 6;

var LatestPostsEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(LatestPostsEdit, _Component);

  function LatestPostsEdit() {
    var _this;

    _classCallCheck(this, LatestPostsEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LatestPostsEdit).apply(this, arguments));
    _this.toggleDisplayPostDate = _this.toggleDisplayPostDate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(LatestPostsEdit, [{
    key: "toggleDisplayPostDate",
    value: function toggleDisplayPostDate() {
      var displayPostDate = this.props.attributes.displayPostDate;
      var setAttributes = this.props.setAttributes;
      setAttributes({
        displayPostDate: !displayPostDate
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          categoriesList = _this$props.categoriesList,
          setAttributes = _this$props.setAttributes,
          latestPosts = _this$props.latestPosts;
      var displayPostDate = attributes.displayPostDate,
          align = attributes.align,
          postLayout = attributes.postLayout,
          columns = attributes.columns,
          order = attributes.order,
          orderBy = attributes.orderBy,
          categories = attributes.categories,
          postsToShow = attributes.postsToShow;
      var inspectorControls = createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Latest Posts Settings')
      }, createElement(QueryControls, _extends({
        order: order,
        orderBy: orderBy
      }, {
        numberOfItems: postsToShow,
        categoriesList: categoriesList,
        selectedCategoryId: categories,
        onOrderChange: function onOrderChange(value) {
          return setAttributes({
            order: value
          });
        },
        onOrderByChange: function onOrderByChange(value) {
          return setAttributes({
            orderBy: value
          });
        },
        onCategoryChange: function onCategoryChange(value) {
          return setAttributes({
            categories: '' !== value ? value : undefined
          });
        },
        onNumberOfItemsChange: function onNumberOfItemsChange(value) {
          return setAttributes({
            postsToShow: value
          });
        }
      })), createElement(ToggleControl, {
        label: __('Display post date'),
        checked: displayPostDate,
        onChange: this.toggleDisplayPostDate
      }), postLayout === 'grid' && createElement(RangeControl, {
        label: __('Columns'),
        value: columns,
        onChange: function onChange(value) {
          return setAttributes({
            columns: value
          });
        },
        min: 2,
        max: !hasPosts ? MAX_POSTS_COLUMNS : Math.min(MAX_POSTS_COLUMNS, latestPosts.length)
      })));
      var hasPosts = Array.isArray(latestPosts) && latestPosts.length;

      if (!hasPosts) {
        return createElement(Fragment, null, inspectorControls, createElement(Placeholder, {
          icon: "admin-post",
          label: __('Latest Posts')
        }, !Array.isArray(latestPosts) ? createElement(Spinner, null) : __('No posts found.')));
      } // Removing posts from display should be instant.


      var displayPosts = latestPosts.length > postsToShow ? latestPosts.slice(0, postsToShow) : latestPosts;
      var layoutControls = [{
        icon: 'list-view',
        title: __('List View'),
        onClick: function onClick() {
          return setAttributes({
            postLayout: 'list'
          });
        },
        isActive: postLayout === 'list'
      }, {
        icon: 'grid-view',
        title: __('Grid View'),
        onClick: function onClick() {
          return setAttributes({
            postLayout: 'grid'
          });
        },
        isActive: postLayout === 'grid'
      }];

      var dateFormat = __experimentalGetSettings().formats.date;

      return createElement(Fragment, null, inspectorControls, createElement(BlockControls, null, createElement(BlockAlignmentToolbar, {
        value: align,
        onChange: function onChange(nextAlign) {
          setAttributes({
            align: nextAlign
          });
        },
        controls: ['center', 'wide', 'full']
      }), createElement(Toolbar, {
        controls: layoutControls
      })), createElement("ul", {
        className: classnames(this.props.className, _defineProperty({
          'is-grid': postLayout === 'grid',
          'has-dates': displayPostDate
        }, "columns-".concat(columns), postLayout === 'grid'))
      }, displayPosts.map(function (post, i) {
        return createElement("li", {
          key: i
        }, createElement("a", {
          href: post.link,
          target: "_blank"
        }, decodeEntities(post.title.rendered.trim()) || __('(Untitled)')), displayPostDate && post.date_gmt && createElement("time", {
          dateTime: format('c', post.date_gmt),
          className: "".concat(_this2.props.className, "__post-date")
        }, dateI18n(dateFormat, post.date_gmt)));
      })));
    }
  }]);

  return LatestPostsEdit;
}(Component);

export default withSelect(function (select, props) {
  var _props$attributes = props.attributes,
      postsToShow = _props$attributes.postsToShow,
      order = _props$attributes.order,
      orderBy = _props$attributes.orderBy,
      categories = _props$attributes.categories;

  var _select = select('core'),
      getEntityRecords = _select.getEntityRecords;

  var latestPostsQuery = pickBy({
    categories: categories,
    order: order,
    orderby: orderBy,
    per_page: postsToShow
  }, function (value) {
    return !isUndefined(value);
  });
  var categoriesListQuery = {
    per_page: 100
  };
  return {
    latestPosts: getEntityRecords('postType', 'post', latestPostsQuery),
    categoriesList: getEntityRecords('taxonomy', 'category', categoriesListQuery)
  };
})(LatestPostsEdit);
//# sourceMappingURL=edit.js.map