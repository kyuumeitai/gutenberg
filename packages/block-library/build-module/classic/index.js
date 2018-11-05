import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { Path, Rect, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/freeform';
export var settings = {
  title: _x('Classic', 'block title'),
  description: __('Use the classic WordPress editor.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    d: "M0,0h24v24H0V0z M0,0h24v24H0V0z",
    fill: "none"
  }), createElement(Path, {
    d: "m20 7v10h-16v-10h16m0-2h-16c-1.1 0-1.99 0.9-1.99 2l-0.01 10c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2z"
  }), createElement(Rect, {
    x: "11",
    y: "8",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "11",
    y: "11",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "8",
    y: "8",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "8",
    y: "11",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "5",
    y: "11",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "5",
    y: "8",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "8",
    y: "14",
    width: "8",
    height: "2"
  }), createElement(Rect, {
    x: "14",
    y: "11",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "14",
    y: "8",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "17",
    y: "11",
    width: "2",
    height: "2"
  }), createElement(Rect, {
    x: "17",
    y: "8",
    width: "2",
    height: "2"
  })),
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html'
    }
  },
  supports: {
    className: false,
    customClassName: false
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var content = attributes.content;
    return createElement(RawHTML, null, content);
  }
};
//# sourceMappingURL=index.js.map