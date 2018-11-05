/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/block';
export var settings = {
  title: __('Reusable Block'),
  category: 'reusable',
  description: __('Create content, and save it to reuse across your site. Update the block, and the changes apply everywhere it’s used.'),
  attributes: {
    ref: {
      type: 'number'
    }
  },
  supports: {
    customClassName: false,
    html: false,
    inserter: false
  },
  edit: edit,
  save: function save() {
    return null;
  }
};
//# sourceMappingURL=index.js.map