import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Path, Rect, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/latest-posts';
export var settings = {
  title: __('Latest Posts'),
  description: __('Display a list of your most recent posts.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), createElement(Rect, {
    x: "11",
    y: "7",
    width: "6",
    height: "2"
  }), createElement(Rect, {
    x: "11",
    y: "11",
    width: "6",
    height: "2"
  }), createElement(Rect, {
    x: "11",
    y: "15",
    width: "6",
    height: "2"
  }), createElement(Rect, {
    x: "7",
    y: "7",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "7",
    y: "11",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "7",
    y: "15",
    width: "2",
    height: "2"
  }), createElement(Path, {
    d: "M20.1,3H3.9C3.4,3,3,3.4,3,3.9v16.2C3,20.5,3.4,21,3.9,21h16.2c0.4,0,0.9-0.5,0.9-0.9V3.9C21,3.4,20.5,3,20.1,3z M19,19H5V5h14V19z"
  })),
  category: 'widgets',
  keywords: [__('recent posts')],
  supports: {
    html: false
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align;

    if ('left' === align || 'right' === align || 'wide' === align || 'full' === align) {
      return {
        'data-align': align
      };
    }
  },
  edit: edit,
  save: function save() {
    return null;
  }
};
//# sourceMappingURL=index.js.map