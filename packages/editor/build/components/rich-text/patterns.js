"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPatterns = getPatterns;

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _richText = require("@wordpress/rich-text");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function getPatterns(_ref) {
  var onReplace = _ref.onReplace,
      multiline = _ref.multiline,
      valueToFormat = _ref.valueToFormat;
  var patterns = (0, _lodash.filter)((0, _blocks.getBlockTransforms)('from'), function (_ref2) {
    var type = _ref2.type,
        trigger = _ref2.trigger;
    return type === 'pattern' && trigger === undefined;
  });
  return [function (record) {
    if (!onReplace) {
      return record;
    }

    var text = (0, _richText.getTextContent)(record);
    var transformation = (0, _blocks.findTransform)(patterns, function (item) {
      return item.regExp.test(text);
    });

    if (!transformation) {
      return record;
    }

    var result = text.match(transformation.regExp);
    var block = transformation.transform({
      content: valueToFormat((0, _richText.remove)(record, 0, result[0].length)),
      match: result
    });
    onReplace([block]);
    return record;
  }, function (record) {
    if (multiline) {
      return record;
    }

    var text = (0, _richText.getTextContent)(record); // Quick check the text for the necessary character.

    if (text.indexOf('`') === -1) {
      return record;
    }

    var match = text.match(/`([^`]+)`/);

    if (!match) {
      return record;
    }

    var start = match.index;
    var end = start + match[1].length;
    record = (0, _richText.remove)(record, start, start + 1);
    record = (0, _richText.remove)(record, end, end + 1);
    record = (0, _richText.applyFormat)(record, {
      type: 'code'
    }, start, end);
    return record;
  }];
}
//# sourceMappingURL=patterns.js.map