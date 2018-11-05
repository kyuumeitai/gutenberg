import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
var name = 'core/bold';
export var bold = {
  name: name,
  title: __('Bold'),
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
      return onChange(toggleFormat(value, {
        type: name
      }));
    };

    return createElement(Fragment, null, createElement(Shortcut, {
      type: "primary",
      character: "b",
      onUse: onToggle
    }), createElement(ToolbarButton, {
      name: "bold",
      icon: "editor-bold",
      title: __('Bold'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "b"
    }));
  }
};
//# sourceMappingURL=index.js.map