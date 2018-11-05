import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockTitle from '../block-title';

var TableOfContentsItem = function TableOfContentsItem(_ref) {
  var children = _ref.children,
      isValid = _ref.isValid,
      level = _ref.level,
      onClick = _ref.onClick,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? [] : _ref$path;
  return createElement("li", {
    className: classnames('document-outline__item', "is-".concat(level.toLowerCase()), {
      'is-invalid': !isValid
    })
  }, createElement("button", {
    className: "document-outline__button",
    onClick: onClick
  }, createElement("span", {
    className: "document-outline__emdash",
    "aria-hidden": "true"
  }), // path is an array of nodes that are ancestors of the heading starting in the top level node.
  // This mapping renders each ancestor to make it easier for the user to know where the headings are nested.
  path.map(function (_ref2, index) {
    var clientId = _ref2.clientId;
    return createElement("strong", {
      key: index,
      className: "document-outline__level"
    }, createElement(BlockTitle, {
      clientId: clientId
    }));
  }), createElement("strong", {
    className: "document-outline__level"
  }, level), createElement("span", {
    className: "document-outline__item-content"
  }, children), createElement("span", {
    className: "screen-reader-text"
  }, __('(Click to focus this heading)'))));
};

export default TableOfContentsItem;
//# sourceMappingURL=item.js.map