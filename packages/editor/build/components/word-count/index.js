"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _wordcount = require("@wordpress/wordcount");

/**
 * WordPress dependencies
 */
function WordCount(_ref) {
  var content = _ref.content;
  return (0, _element.createElement)("span", {
    className: "word-count"
  }, (0, _wordcount.count)(content, 'words'));
}

var _default = (0, _data.withSelect)(function (select) {
  return {
    content: select('core/editor').getEditedPostAttribute('content')
  };
})(WordCount);

exports.default = _default;
//# sourceMappingURL=index.js.map