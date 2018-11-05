import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MenuItemsChoice, MenuGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import shortcuts from '../../../keyboard-shortcuts';
/**
 * Set of available mode options.
 *
 * @type {Array}
 */

var MODES = [{
  value: 'visual',
  label: __('Visual Editor')
}, {
  value: 'text',
  label: __('Code Editor')
}];

function ModeSwitcher(_ref) {
  var onSwitch = _ref.onSwitch,
      mode = _ref.mode;
  var choices = MODES.map(function (choice) {
    if (choice.value !== mode) {
      return _objectSpread({}, choice, {
        shortcut: shortcuts.toggleEditorMode.display
      });
    }

    return choice;
  });
  return createElement(MenuGroup, {
    label: __('Editor')
  }, createElement(MenuItemsChoice, {
    choices: choices,
    value: mode,
    onSelect: onSwitch
  }));
}

export default compose([withSelect(function (select) {
  return {
    mode: select('core/edit-post').getEditorMode()
  };
}), withDispatch(function (dispatch, ownProps) {
  return {
    onSwitch: function onSwitch(mode) {
      dispatch('core/edit-post').switchEditorMode(mode);
      ownProps.onSelect(mode);
    }
  };
})])(ModeSwitcher);
//# sourceMappingURL=index.js.map