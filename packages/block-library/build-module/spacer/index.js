import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress
 */

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/editor';
import { BaseControl, PanelBody, ResizableBox, G, SVG, Path } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
export var name = 'core/spacer';
export var settings = {
  title: __('Spacer'),
  description: __('Add white space between blocks and customize its height.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(G, null, createElement(Path, {
    d: "M13 4v2h3.59L6 16.59V13H4v7h7v-2H7.41L18 7.41V11h2V4h-7"
  }))),
  category: 'layout',
  attributes: {
    height: {
      type: 'number',
      default: 100
    }
  },
  edit: withInstanceId(function (_ref) {
    var attributes = _ref.attributes,
        isSelected = _ref.isSelected,
        setAttributes = _ref.setAttributes,
        toggleSelection = _ref.toggleSelection,
        instanceId = _ref.instanceId;
    var height = attributes.height;
    var id = "block-spacer-height-input-".concat(instanceId);
    return createElement(Fragment, null, createElement(ResizableBox, {
      className: classnames('block-library-spacer__resize-container', {
        'is-selected': isSelected
      }),
      size: {
        height: height
      },
      minHeight: "20",
      enable: {
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      },
      onResizeStop: function onResizeStop(event, direction, elt, delta) {
        setAttributes({
          height: parseInt(height + delta.height, 10)
        });
        toggleSelection(true);
      },
      onResizeStart: function onResizeStart() {
        toggleSelection(false);
      }
    }), createElement(InspectorControls, null, createElement(PanelBody, {
      title: __('Spacer Settings')
    }, createElement(BaseControl, {
      label: __('Height in pixels'),
      id: id
    }, createElement("input", {
      type: "number",
      id: id,
      onChange: function onChange(event) {
        setAttributes({
          height: parseInt(event.target.value, 10)
        });
      },
      value: height,
      min: "20",
      step: "10"
    })))));
  }),
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    return createElement("div", {
      style: {
        height: attributes.height
      },
      "aria-hidden": true
    });
  }
};
//# sourceMappingURL=index.js.map