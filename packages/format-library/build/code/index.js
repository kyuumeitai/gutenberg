"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.code = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

/**
 * WordPress dependencies
 */
var name = 'core/code';
var code = {
  name: name,
  title: (0, _i18n.__)('Code'),
  match: {
    tagName: 'code'
  },
  edit: function edit(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange,
        Shortcut = _ref.Shortcut;

    var onToggle = function onToggle() {
      return onChange((0, _richText.toggleFormat)(value, {
        type: name
      }));
    };

    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(Shortcut, {
      type: "access",
      character: "x",
      onUse: onToggle
    }));
  }
};
exports.code = code;
//# sourceMappingURL=index.js.map