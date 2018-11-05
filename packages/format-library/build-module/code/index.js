import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
var name = 'core/code';
export var code = {
  name: name,
  title: __('Code'),
  match: {
    tagName: 'code'
  },
  edit: function edit(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange,
        Shortcut = _ref.Shortcut;

    var onToggle = function onToggle() {
      return onChange(toggleFormat(value, {
        type: name
      }));
    };

    return createElement(Fragment, null, createElement(Shortcut, {
      type: "access",
      character: "x",
      onUse: onToggle
    }));
  }
};
//# sourceMappingURL=index.js.map