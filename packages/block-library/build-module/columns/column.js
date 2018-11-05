import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';
export var name = 'core/column';
export var settings = {
  title: __('Column'),
  parent: ['core/columns'],
  icon: createElement(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(Path, {
    d: "M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"
  })),
  description: __('A single column within a columns block.'),
  category: 'common',
  supports: {
    inserter: false
  },
  edit: function edit() {
    return createElement(InnerBlocks, {
      templateLock: false
    });
  },
  save: function save() {
    return createElement("div", null, createElement(InnerBlocks.Content, null));
  }
};
//# sourceMappingURL=column.js.map