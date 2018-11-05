"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _classnames2 = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _date = require("@wordpress/date");

var _htmlEntities = require("@wordpress/html-entities");

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var MAX_POSTS_COLUMNS = 6;

var LatestPostsEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LatestPostsEdit, _Component);

  function LatestPostsEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, LatestPostsEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LatestPostsEdit).apply(this, arguments));
    _this.toggleDisplayPostDate = _this.toggleDisplayPostDate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(LatestPostsEdit, [{
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
      var inspectorControls = (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Latest Posts Settings')
      }, (0, _element.createElement)(_components.QueryControls, (0, _extends2.default)({
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
      })), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Display post date'),
        checked: displayPostDate,
        onChange: this.toggleDisplayPostDate
      }), postLayout === 'grid' && (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Columns'),
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
        return (0, _element.createElement)(_element.Fragment, null, inspectorControls, (0, _element.createElement)(_components.Placeholder, {
          icon: "admin-post",
          label: (0, _i18n.__)('Latest Posts')
        }, !Array.isArray(latestPosts) ? (0, _element.createElement)(_components.Spinner, null) : (0, _i18n.__)('No posts found.')));
      } // Removing posts from display should be instant.


      var displayPosts = latestPosts.length > postsToShow ? latestPosts.slice(0, postsToShow) : latestPosts;
      var layoutControls = [{
        icon: 'list-view',
        title: (0, _i18n.__)('List View'),
        onClick: function onClick() {
          return setAttributes({
            postLayout: 'list'
          });
        },
        isActive: postLayout === 'list'
      }, {
        icon: 'grid-view',
        title: (0, _i18n.__)('Grid View'),
        onClick: function onClick() {
          return setAttributes({
            postLayout: 'grid'
          });
        },
        isActive: postLayout === 'grid'
      }];
      var dateFormat = (0, _date.__experimentalGetSettings)().formats.date;
      return (0, _element.createElement)(_element.Fragment, null, inspectorControls, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_editor.BlockAlignmentToolbar, {
        value: align,
        onChange: function onChange(nextAlign) {
          setAttributes({
            align: nextAlign
          });
        },
        controls: ['center', 'wide', 'full']
      }), (0, _element.createElement)(_components.Toolbar, {
        controls: layoutControls
      })), (0, _element.createElement)("ul", {
        className: (0, _classnames2.default)(this.props.className, (0, _defineProperty2.default)({
          'is-grid': postLayout === 'grid',
          'has-dates': displayPostDate
        }, "columns-".concat(columns), postLayout === 'grid'))
      }, displayPosts.map(function (post, i) {
        return (0, _element.createElement)("li", {
          key: i
        }, (0, _element.createElement)("a", {
          href: post.link,
          target: "_blank"
        }, (0, _htmlEntities.decodeEntities)(post.title.rendered.trim()) || (0, _i18n.__)('(Untitled)')), displayPostDate && post.date_gmt && (0, _element.createElement)("time", {
          dateTime: (0, _date.format)('c', post.date_gmt),
          className: "".concat(_this2.props.className, "__post-date")
        }, (0, _date.dateI18n)(dateFormat, post.date_gmt)));
      })));
    }
  }]);
  return LatestPostsEdit;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select, props) {
  var _props$attributes = props.attributes,
      postsToShow = _props$attributes.postsToShow,
      order = _props$attributes.order,
      orderBy = _props$attributes.orderBy,
      categories = _props$attributes.categories;

  var _select = select('core'),
      getEntityRecords = _select.getEntityRecords;

  var latestPostsQuery = (0, _lodash.pickBy)({
    categories: categories,
    order: order,
    orderby: orderBy,
    per_page: postsToShow
  }, function (value) {
    return !(0, _lodash.isUndefined)(value);
  });
  var categoriesListQuery = {
    per_page: 100
  };
  return {
    latestPosts: getEntityRecords('postType', 'post', latestPostsQuery),
    categoriesList: getEntityRecords('taxonomy', 'category', categoriesListQuery)
  };
})(LatestPostsEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map