/**
 * WordPress dependencies
 */
import { FontSizePicker } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
export default withSelect(function (select) {
  var _select$getEditorSett = select('core/editor').getEditorSettings(),
      disableCustomFontSizes = _select$getEditorSett.disableCustomFontSizes,
      fontSizes = _select$getEditorSett.fontSizes;

  return {
    disableCustomFontSizes: disableCustomFontSizes,
    fontSizes: fontSizes
  };
})(FontSizePicker);
//# sourceMappingURL=font-size-picker.js.map