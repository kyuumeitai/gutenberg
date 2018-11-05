import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
var name = 'core/strikethrough';
export var strikethrough = {
  name: name,
  title: __('Strikethrough'),
  match: {
    tagName: 'del'
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
      type: "access",
      character: "d",
      onUse: onToggle
    }), createElement(ToolbarButton, {
      name: "strikethrough",
      icon: "editor-strikethrough",
      title: __('Strikethrough'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "access",
      shortcutCharacter: "d"
    }));
  }
};
//# sourceMappingURL=index.js.map