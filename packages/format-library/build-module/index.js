import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * Internal dependencies
 */
import { bold } from './bold';
import { code } from './code';
import { image } from './image';
import { italic } from './italic';
import { link } from './link';
import { strikethrough } from './strikethrough';
/**
 * WordPress dependencies
 */

import { registerFormatType } from '@wordpress/rich-text';
[bold, code, image, italic, link, strikethrough].forEach(function (_ref) {
  var name = _ref.name,
      settings = _objectWithoutProperties(_ref, ["name"]);

  return registerFormatType(name, settings);
});
//# sourceMappingURL=index.js.map