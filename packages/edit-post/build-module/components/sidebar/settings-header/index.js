import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { __, _n, sprintf } from '@wordpress/i18n';
import { withDispatch, withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import SidebarHeader from '../sidebar-header';

var SettingsHeader = function SettingsHeader(_ref) {
  var count = _ref.count,
      openDocumentSettings = _ref.openDocumentSettings,
      openBlockSettings = _ref.openBlockSettings,
      sidebarName = _ref.sidebarName;
  // Do not display "0 Blocks".
  var blockCount = count === 0 ? 1 : count;
  var blockLabel = blockCount === 1 ? __('Block') : sprintf(_n('%d Block', '%d Blocks', blockCount), blockCount);

  var _ref2 = sidebarName === 'edit-post/document' ? // translators: ARIA label for the Document Settings sidebar tab, selected.
  [__('Document settings (selected)'), 'is-active'] : // translators: ARIA label for the Document Settings sidebar tab, not selected.
  [__('Document settings'), ''],
      _ref3 = _slicedToArray(_ref2, 2),
      documentAriaLabel = _ref3[0],
      documentActiveClass = _ref3[1];

  var _ref4 = sidebarName === 'edit-post/block' ? // translators: ARIA label for the Block Settings sidebar tab, selected.
  [__('Block settings (selected)'), 'is-active'] : // translators: ARIA label for the Block Settings sidebar tab, not selected.
  [__('Block settings'), ''],
      _ref5 = _slicedToArray(_ref4, 2),
      blockAriaLabel = _ref5[0],
      blockActiveClass = _ref5[1];

  return createElement(SidebarHeader, {
    className: "edit-post-sidebar__panel-tabs",
    closeLabel: __('Close settings')
  }, createElement("ul", null, createElement("li", null, createElement("button", {
    onClick: openDocumentSettings,
    className: "edit-post-sidebar__panel-tab ".concat(documentActiveClass),
    "aria-label": documentAriaLabel,
    "data-label": __('Document')
  }, __('Document'))), createElement("li", null, createElement("button", {
    onClick: openBlockSettings,
    className: "edit-post-sidebar__panel-tab ".concat(blockActiveClass),
    "aria-label": blockAriaLabel,
    "data-label": blockLabel
  }, blockLabel))));
};

export default compose(withSelect(function (select) {
  return {
    count: select('core/editor').getSelectedBlockCount()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openGeneralSidebar = _dispatch.openGeneralSidebar;

  var _dispatch2 = dispatch('core/editor'),
      clearSelectedBlock = _dispatch2.clearSelectedBlock;

  return {
    openDocumentSettings: function openDocumentSettings() {
      openGeneralSidebar('edit-post/document');
      clearSelectedBlock();
    },
    openBlockSettings: function openBlockSettings() {
      openGeneralSidebar('edit-post/block');
    }
  };
}))(SettingsHeader);
//# sourceMappingURL=index.js.map