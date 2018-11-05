import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
var name = 'core/italic';
export var italic = {
  name: name,
  title: __('Italic'),
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
      return onChange(toggleFormat(value, {
        type: name
      }));
    };

    return createElement(Fragment, null, createElement(Shortcut, {
      type: "primary",
      character: "i",
      onUse: onToggle
    }), createElement(ToolbarButton, {
      name: "italic",
      icon: "editor-italic",
      title: __('Italic'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "i"
    }));
  }
};
//# sourceMappingURL=index.js.map