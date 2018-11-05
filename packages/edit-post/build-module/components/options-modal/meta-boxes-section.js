import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import Section from './section';
import { EnableCustomFieldsOption, EnablePanelOption } from './options';

function MetaBoxesSection(_ref) {
  var hasCustomFieldsSupport = _ref.hasCustomFieldsSupport,
      metaBoxes = _ref.metaBoxes,
      sectionProps = _objectWithoutProperties(_ref, ["hasCustomFieldsSupport", "metaBoxes"]);

  if (!hasCustomFieldsSupport && metaBoxes.length === 0) {
    return null;
  }

  return createElement(Section, sectionProps, hasCustomFieldsSupport && createElement(EnableCustomFieldsOption, {
    label: __('Custom Fields')
  }), map(metaBoxes, function (_ref2) {
    var id = _ref2.id,
        title = _ref2.title;
    return (// The 'Custom Fields' meta box is a special case handled above.
      id !== 'postcustom' && createElement(EnablePanelOption, {
        key: id,
        label: title,
        panelName: "meta-box-".concat(id)
      })
    );
  }));
}

export default withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  var _select3 = select('core/edit-post'),
      getAllMetaBoxes = _select3.getAllMetaBoxes;

  var postType = getPostType(getEditedPostAttribute('type'));
  return {
    hasCustomFieldsSupport: postType.supports['custom-fields'],
    metaBoxes: getAllMetaBoxes()
  };
})(MetaBoxesSection);
//# sourceMappingURL=meta-boxes-section.js.map