"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bold = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

/**
 * WordPress dependencies
 */
var name = 'core/bold';
var bold = {
  name: name,
  title: (0, _i18n.__)('Bold'),
  match: {
    tagName: 'strong'
  },
  edit: function edit(_ref) {
    var isActive = _ref.isActive,
        value = _ref.value,
        onChange = _ref.onChange,
        ToolbarButton = _ref.ToolbarButton,
        Shortcut = _ref.Shortcut;

    var onToggle = function onToggle() {
      return onChange((0, _richText.toggleFormat)(value, {
        type: name
      }));
    };

    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(Shortcut, {
      type: "primary",
      character: "b",
      onUse: onToggle
    }), (0, _element.createElement)(ToolbarButton, {
      name: "bold",
      icon: "editor-bold",
      title: (0, _i18n.__)('Bold'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "b"
    }));
  }
};
exports.bold = bold;
//# sourceMappingURL=index.js.map