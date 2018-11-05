import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import Dashicon from '../dashicon';
import BaseControl from '../base-control';
import Button from '../button';
import Dropdown from '../dropdown';
import RangeControl from '../range-control';
import { NavigableMenu } from '../navigable-container';

function FontSizePicker(_ref) {
  var fallbackFontSize = _ref.fallbackFontSize,
      _ref$fontSizes = _ref.fontSizes,
      fontSizes = _ref$fontSizes === void 0 ? [] : _ref$fontSizes,
      _ref$disableCustomFon = _ref.disableCustomFontSizes,
      disableCustomFontSizes = _ref$disableCustomFon === void 0 ? false : _ref$disableCustomFon,
      onChange = _ref.onChange,
      value = _ref.value,
      withSlider = _ref.withSlider;

  var onChangeValue = function onChangeValue(event) {
    var newValue = event.target.value;

    if (newValue === '') {
      onChange(undefined);
      return;
    }

    onChange(Number(newValue));
  };

  var currentFont = fontSizes.find(function (font) {
    return font.size === value;
  });
  return createElement(BaseControl, {
    label: __('Font Size')
  }, createElement("div", {
    className: "components-font-size-picker__buttons"
  }, createElement(Dropdown, {
    className: "components-font-size-picker__dropdown",
    contentClassName: "components-font-size-picker__dropdown-content",
    position: "bottom",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return createElement(Button, {
        className: "components-font-size-picker__selector",
        isLarge: true,
        onClick: onToggle,
        "aria-expanded": isOpen,
        "aria-label": __('Custom font size')
      }, currentFont && currentFont.name || !value && _x('Normal', 'font size name') || _x('Custom', 'font size name'));
    },
    renderContent: function renderContent() {
      return createElement(NavigableMenu, null, map(fontSizes, function (_ref3) {
        var name = _ref3.name,
            size = _ref3.size,
            slug = _ref3.slug;
        return createElement(Button, {
          key: slug,
          onClick: function onClick() {
            return onChange(slug === 'normal' ? undefined : size);
          },
          className: 'is-font-' + slug,
          role: "menuitem"
        }, (value === size || !value && slug === 'normal') && createElement(Dashicon, {
          icon: "saved"
        }), createElement("span", {
          className: "components-font-size-picker__dropdown-text-size",
          style: {
            fontSize: size
          }
        }, name));
      }));
    }
  }), !withSlider && !disableCustomFontSizes && createElement("input", {
    className: "components-range-control__number",
    type: "number",
    onChange: onChangeValue,
    "aria-label": __('Custom font size'),
    value: value || ''
  }), createElement(Button, {
    className: "components-color-palette__clear",
    type: "button",
    disabled: value === undefined,
    onClick: function onClick() {
      return onChange(undefined);
    },
    isSmall: true,
    isDefault: true,
    "aria-label": __('Reset font size')
  }, __('Reset'))), withSlider && createElement(RangeControl, {
    className: "components-font-size-picker__custom-input",
    label: __('Custom Size'),
    value: value || '',
    initialPosition: fallbackFontSize,
    onChange: onChange,
    min: 12,
    max: 100,
    beforeIcon: "editor-textcolor",
    afterIcon: "editor-textcolor"
  }));
}

export default withInstanceId(FontSizePicker);
//# sourceMappingURL=index.js.map