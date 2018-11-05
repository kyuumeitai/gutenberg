import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { createSlotFill, PanelBody } from '@wordpress/components';

var _createSlotFill = createSlotFill('PluginPrePublishPanel'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var PluginPrePublishPanel = function PluginPrePublishPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      title = _ref.title,
      _ref$initialOpen = _ref.initialOpen,
      initialOpen = _ref$initialOpen === void 0 ? false : _ref$initialOpen;
  return createElement(Fill, null, createElement(PanelBody, {
    className: className,
    initialOpen: initialOpen || !title,
    title: title
  }, children));
};

PluginPrePublishPanel.Slot = Slot;
export default PluginPrePublishPanel;
//# sourceMappingURL=index.js.map