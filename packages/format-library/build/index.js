"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _bold = require("./bold");

var _code = require("./code");

var _image = require("./image");

var _italic = require("./italic");

var _link = require("./link");

var _strikethrough = require("./strikethrough");

var _richText = require("@wordpress/rich-text");

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
[_bold.bold, _code.code, _image.image, _italic.italic, _link.link, _strikethrough.strikethrough].forEach(function (_ref) {
  var name = _ref.name,
      settings = (0, _objectWithoutProperties2.default)(_ref, ["name"]);
  return (0, _richText.registerFormatType)(name, settings);
});
//# sourceMappingURL=index.js.map