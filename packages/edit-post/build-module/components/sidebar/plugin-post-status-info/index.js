import { createElement } from "@wordpress/element";

/**
 * Defines as extensibility slot for the Status & Visibility panel.
 */

/**
 * WordPress dependencies
 */
import { createSlotFill, PanelRow } from '@wordpress/components';

var _createSlotFill = createSlotFill('PluginPostStatusInfo'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

export { Fill, Slot };

var PluginPostStatusInfo = function PluginPostStatusInfo(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return createElement(Fill, null, createElement(PanelRow, {
    className: className
  }, children));
};

PluginPostStatusInfo.Slot = Slot;
export default PluginPostStatusInfo;
//# sourceMappingURL=index.js.map