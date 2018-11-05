"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.italic = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

/**
 * WordPress dependencies
 */
var name = 'core/italic';
var italic = {
  name: name,
  title: (0, _i18n.__)('Italic'),
  match: {
    tagName: 'em'
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
      character: "i",
      onUse: onToggle
    }), (0, _element.createElement)(ToolbarButton, {
      name: "italic",
      icon: "editor-italic",
      title: (0, _i18n.__)('Italic'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "i"
    }));
  }
};
exports.italic = italic;
//# sourceMappingURL=index.js.map