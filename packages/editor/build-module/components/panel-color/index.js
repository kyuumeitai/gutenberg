import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { PanelColor as PanelColorComponent } from '@wordpress/components';
import { ifCondition, compose } from '@wordpress/compose';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */

import ColorPalette from '../color-palette';
import withColorContext from '../color-palette/with-color-context';
import { getColorObjectByColorValue } from '../colors';

function PanelColor(_ref) {
  var colors = _ref.colors,
      title = _ref.title,
      colorValue = _ref.colorValue,
      initialOpen = _ref.initialOpen,
      props = _objectWithoutProperties(_ref, ["colors", "title", "colorValue", "initialOpen"]);

  deprecated('wp.editor.PanelColor', {
    version: '4.3',
    alternative: 'wp.editor.PanelColorSettings',
    plugin: 'Gutenberg'
  });
  var colorObject = getColorObjectByColorValue(colors, colorValue);
  var colorName = colorObject && colorObject.name;
  return createElement(PanelColorComponent, {
    title: title,
    colorName: colorName,
    colorValue: colorValue,
    initialOpen: initialOpen
  }, createElement(ColorPalette, _extends({
    value: colorValue
  }, omit(props, ['disableCustomColors']))));
}

export default compose([withColorContext, ifCondition(function (_ref2) {
  var hasColorsToChoose = _ref2.hasColorsToChoose;
  return hasColorsToChoose;
})])(PanelColor);
//# sourceMappingURL=index.js.map