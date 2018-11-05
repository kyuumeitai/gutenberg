import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { SVG, Path } from '@wordpress/components';
export var name = 'core/separator';
export var settings = {
  title: __('Separator'),
  description: __('Create a break between ideas or sections with a horizontal separator.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(Path, {
    d: "M19 13H5v-2h14v2z"
  })),
  category: 'layout',
  keywords: [__('horizontal-line'), 'hr', __('divider')],
  styles: [{
    name: 'default',
    label: __('Short Line'),
    isDefault: true
  }, {
    name: 'wide',
    label: __('Wide Line')
  }, {
    name: 'dots',
    label: __('Dots')
  }],
  transforms: {
    from: [{
      type: 'pattern',
      trigger: 'enter',
      regExp: /^-{3,}$/,
      transform: function transform() {
        return createBlock('core/separator');
      }
    }, {
      type: 'raw',
      selector: 'hr',
      schema: {
        hr: {}
      }
    }]
  },
  edit: function edit(_ref) {
    var className = _ref.className;
    return createElement("hr", {
      className: className
    });
  },
  save: function save() {
    return createElement("hr", null);
  }
};
//# sourceMappingURL=index.js.map