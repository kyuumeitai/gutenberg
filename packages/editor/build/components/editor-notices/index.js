"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _templateValidationNotice = _interopRequireDefault(require("../template-validation-notice"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function EditorNotices(props) {
  return (0, _element.createElement)(_components.NoticeList, props, (0, _element.createElement)(_templateValidationNotice.default, null));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    notices: select('core/notices').getNotices()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onRemove: dispatch('core/notices').removeNotice
  };
})])(EditorNotices);

exports.default = _default;
//# sourceMappingURL=index.js.map