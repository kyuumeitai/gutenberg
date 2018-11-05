"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PlainText: true,
  RichText: true,
  MediaPlaceholder: true
};
Object.defineProperty(exports, "PlainText", {
  enumerable: true,
  get: function get() {
    return _plainText.default;
  }
});
Object.defineProperty(exports, "RichText", {
  enumerable: true,
  get: function get() {
    return _richText.default;
  }
});
Object.defineProperty(exports, "MediaPlaceholder", {
  enumerable: true,
  get: function get() {
    return _mediaPlaceholder.default;
  }
});

var _colors = require("./colors");

Object.keys(_colors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _colors[key];
    }
  });
});

var _fontSizes = require("./font-sizes");

Object.keys(_fontSizes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fontSizes[key];
    }
  });
});

var _plainText = _interopRequireDefault(require("./plain-text"));

var _richText = _interopRequireDefault(require("./rich-text"));

var _mediaPlaceholder = _interopRequireDefault(require("./media-placeholder"));
//# sourceMappingURL=index.native.js.map