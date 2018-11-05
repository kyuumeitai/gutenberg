import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { omit } from 'lodash';
import { Svg } from 'react-native-svg';
/**
 * Internal dependencies
 */

import styles from '../../dashicon/style.scss';
export { Circle, G, Path, Polygon, Rect } from 'react-native-svg';
export var SVG = function SVG(props) {
  // We're using the react-native-classname-to-style plugin, so when a `className` prop is passed it gets converted to `style` here.
  // Given it carries a string (as it was originally className) but an object is expected for `style`,
  // we need to check whether `style` exists and is a string, and convert it to an object
  var styleKeys = new Array();
  var styleValues = new Array();

  if (typeof props.style === 'string' || props.style instanceof String) {
    styleKeys = props.style.split(' ');
    styleKeys.forEach(function (element) {
      var oneStyle = styles[element];

      if (oneStyle !== undefined) {
        styleValues.push(oneStyle);
      }
    });
  }

  var safeProps = styleValues.length === 0 ? _objectSpread({}, omit(props, ['style'])) : _objectSpread({}, props, {
    style: styleValues
  });
  return createElement(Svg, _extends({
    height: "100%",
    width: "100%"
  }, safeProps));
};
//# sourceMappingURL=index.native.js.map