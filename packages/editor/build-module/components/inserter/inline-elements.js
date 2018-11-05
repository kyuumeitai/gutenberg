import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, Slot } from '@wordpress/components';
/**
 * Internal dependencies
 */

import BlockTypesList from '../block-types-list';

var InserterInlineElements = function InserterInlineElements(_ref) {
  var filterValue = _ref.filterValue;
  return createElement(Slot, {
    name: "Inserter.InlineElements",
    fillProps: {
      filterValue: filterValue
    }
  }, function (fills) {
    return !isEmpty(fills) && createElement(PanelBody, {
      title: __('Inline Elements'),
      initialOpen: false,
      className: "editor-inserter__inline-elements"
    }, createElement(BlockTypesList, null, fills));
  });
};

export default InserterInlineElements;
//# sourceMappingURL=inline-elements.js.map