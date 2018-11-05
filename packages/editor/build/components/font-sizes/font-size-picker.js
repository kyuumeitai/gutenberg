"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var _default = (0, _data.withSelect)(function (select) {
  var _select$getEditorSett = select('core/editor').getEditorSettings(),
      disableCustomFontSizes = _select$getEditorSett.disableCustomFontSizes,
      fontSizes = _select$getEditorSett.fontSizes;

  return {
    disableCustomFontSizes: disableCustomFontSizes,
    fontSizes: fontSizes
  };
})(_components.FontSizePicker);

exports.default = _default;
//# sourceMappingURL=font-size-picker.js.map