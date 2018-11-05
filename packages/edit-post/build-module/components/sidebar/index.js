import { createElement } from "@wordpress/element";

/**
 * WordPress Dependencies
 */
import { createSlotFill, withFocusReturn } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { ifCondition, compose } from '@wordpress/compose';

var _createSlotFill = createSlotFill('Sidebar'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;
/**
 * Renders a sidebar with its content.
 *
 * @return {Object} The rendered sidebar.
 */


var Sidebar = function Sidebar(_ref) {
  var children = _ref.children,
      label = _ref.label;
  return createElement(Fill, null, createElement("div", {
    className: "edit-post-sidebar",
    role: "region",
    "aria-label": label,
    tabIndex: "-1"
  }, children));
};

var WrappedSidebar = compose(withSelect(function (select, _ref2) {
  var name = _ref2.name;
  return {
    isActive: select('core/edit-post').getActiveGeneralSidebarName() === name
  };
}), ifCondition(function (_ref3) {
  var isActive = _ref3.isActive;
  return isActive;
}), withFocusReturn)(Sidebar);
WrappedSidebar.Slot = Slot;
export default WrappedSidebar;
//# sourceMappingURL=index.js.map