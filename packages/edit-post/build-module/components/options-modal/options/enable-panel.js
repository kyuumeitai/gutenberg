/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import BaseOption from './base';
export default compose(withSelect(function (select, _ref) {
  var panelName = _ref.panelName;
  return {
    isChecked: select('core/edit-post').isEditorPanelEnabled(panelName)
  };
}), withDispatch(function (dispatch, _ref2) {
  var panelName = _ref2.panelName;
  return {
    onChange: function onChange() {
      return dispatch('core/edit-post').toggleEditorPanelEnabled(panelName);
    }
  };
}))(BaseOption);
//# sourceMappingURL=enable-panel.js.map