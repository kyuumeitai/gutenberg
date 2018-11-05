/**
 * External dependencies
 */
import { filter } from 'lodash';
/**
 * WordPress dependencies
 */

import { getBlockTransforms, findTransform } from '@wordpress/blocks';
import { remove, applyFormat, getTextContent } from '@wordpress/rich-text';
export function getPatterns(_ref) {
  var onReplace = _ref.onReplace,
      multiline = _ref.multiline,
      valueToFormat = _ref.valueToFormat;
  var patterns = filter(getBlockTransforms('from'), function (_ref2) {
    var type = _ref2.type,
        trigger = _ref2.trigger;
    return type === 'pattern' && trigger === undefined;
  });
  return [function (record) {
    if (!onReplace) {
      return record;
    }

    var text = getTextContent(record);
    var transformation = findTransform(patterns, function (item) {
      return item.regExp.test(text);
    });

    if (!transformation) {
      return record;
    }

    var result = text.match(transformation.regExp);
    var block = transformation.transform({
      content: valueToFormat(remove(record, 0, result[0].length)),
      match: result
    });
    onReplace([block]);
    return record;
  }, function (record) {
    if (multiline) {
      return record;
    }

    var text = getTextContent(record); // Quick check the text for the necessary character.

    if (text.indexOf('`') === -1) {
      return record;
    }

    var match = text.match(/`([^`]+)`/);

    if (!match) {
      return record;
    }

    var start = match.index;
    var end = start + match[1].length;
    record = remove(record, start, start + 1);
    record = remove(record, end, end + 1);
    record = applyFormat(record, {
      type: 'code'
    }, start, end);
    return record;
  }];
}
//# sourceMappingURL=patterns.js.map