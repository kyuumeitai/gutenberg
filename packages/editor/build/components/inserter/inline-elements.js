"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockTypesList = _interopRequireDefault(require("../block-types-list"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var InserterInlineElements = function InserterInlineElements(_ref) {
  var filterValue = _ref.filterValue;
  return (0, _element.createElement)(_components.Slot, {
    name: "Inserter.InlineElements",
    fillProps: {
      filterValue: filterValue
    }
  }, function (fills) {
    return !(0, _lodash.isEmpty)(fills) && (0, _element.createElement)(_components.PanelBody, {
      title: (0, _i18n.__)('Inline Elements'),
      initialOpen: false,
      className: "editor-inserter__inline-elements"
    }, (0, _element.createElement)(_blockTypesList.default, null, fills));
  });
};

var _default = InserterInlineElements;
exports.default = _default;
//# sourceMappingURL=inline-elements.js.map