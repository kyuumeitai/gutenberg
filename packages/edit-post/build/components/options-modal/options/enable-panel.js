"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _base = _interopRequireDefault(require("./base"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref) {
  var panelName = _ref.panelName;
  return {
    isChecked: select('core/edit-post').isEditorPanelEnabled(panelName)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref2) {
  var panelName = _ref2.panelName;
  return {
    onChange: function onChange() {
      return dispatch('core/edit-post').toggleEditorPanelEnabled(panelName);
    }
  };
}))(_base.default);

exports.default = _default;
//# sourceMappingURL=enable-panel.js.map