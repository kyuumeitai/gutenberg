"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blockTitle = _interopRequireDefault(require("../block-title"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var TableOfContentsItem = function TableOfContentsItem(_ref) {
  var children = _ref.children,
      isValid = _ref.isValid,
      level = _ref.level,
      onClick = _ref.onClick,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? [] : _ref$path;
  return (0, _element.createElement)("li", {
    className: (0, _classnames.default)('document-outline__item', "is-".concat(level.toLowerCase()), {
      'is-invalid': !isValid
    })
  }, (0, _element.createElement)("button", {
    className: "document-outline__button",
    onClick: onClick
  }, (0, _element.createElement)("span", {
    className: "document-outline__emdash",
    "aria-hidden": "true"
  }), // path is an array of nodes that are ancestors of the heading starting in the top level node.
  // This mapping renders each ancestor to make it easier for the user to know where the headings are nested.
  path.map(function (_ref2, index) {
    var clientId = _ref2.clientId;
    return (0, _element.createElement)("strong", {
      key: index,
      className: "document-outline__level"
    }, (0, _element.createElement)(_blockTitle.default, {
      clientId: clientId
    }));
  }), (0, _element.createElement)("strong", {
    className: "document-outline__level"
  }, level), (0, _element.createElement)("span", {
    className: "document-outline__item-content"
  }, children), (0, _element.createElement)("span", {
    className: "screen-reader-text"
  }, (0, _i18n.__)('(Click to focus this heading)'))));
};

var _default = TableOfContentsItem;
exports.default = _default;
//# sourceMappingURL=item.js.map