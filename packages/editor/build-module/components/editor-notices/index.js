import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { NoticeList } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import TemplateValidationNotice from '../template-validation-notice';

function EditorNotices(props) {
  return createElement(NoticeList, props, createElement(TemplateValidationNotice, null));
}

export default compose([withSelect(function (select) {
  return {
    notices: select('core/notices').getNotices()
  };
}), withDispatch(function (dispatch) {
  return {
    onRemove: dispatch('core/notices').removeNotice
  };
})])(EditorNotices);
//# sourceMappingURL=index.js.map