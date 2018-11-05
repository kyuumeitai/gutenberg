import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { InspectorControls, BlockAlignmentToolbar, BlockControls, ServerSideRender } from '@wordpress/editor';
export default function ArchivesEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var align = attributes.align,
      showPostCounts = attributes.showPostCounts,
      displayAsDropdown = attributes.displayAsDropdown;
  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Archives Settings')
  }, createElement(ToggleControl, {
    label: __('Display as Dropdown'),
    checked: displayAsDropdown,
    onChange: function onChange() {
      return setAttributes({
        displayAsDropdown: !displayAsDropdown
      });
    }
  }), createElement(ToggleControl, {
    label: __('Show Post Counts'),
    checked: showPostCounts,
    onChange: function onChange() {
      return setAttributes({
        showPostCounts: !showPostCounts
      });
    }
  }))), createElement(BlockControls, null, createElement(BlockAlignmentToolbar, {
    value: align,
    onChange: function onChange(nextAlign) {
      setAttributes({
        align: nextAlign
      });
    },
    controls: ['left', 'center', 'right']
  })), createElement(Disabled, null, createElement(ServerSideRender, {
    block: "core/archives",
    attributes: attributes
  })));
}
//# sourceMappingURL=edit.js.map