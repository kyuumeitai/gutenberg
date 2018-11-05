import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { RawHTML, Fragment } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { getBlockType, createBlock } from '@wordpress/blocks';
import { withDispatch } from '@wordpress/data';
import { Warning } from '@wordpress/editor';

function MissingBlockWarning(_ref) {
  var attributes = _ref.attributes,
      convertToHTML = _ref.convertToHTML;
  var originalName = attributes.originalName,
      originalUndelimitedContent = attributes.originalUndelimitedContent;
  var hasContent = !!originalUndelimitedContent;
  var hasHTMLBlock = getBlockType('core/html');
  var actions = [];
  var messageHTML;

  if (hasContent && hasHTMLBlock) {
    messageHTML = sprintf(__('Your site doesn\'t include support for the "%s" block. You can leave this block intact, convert its content to a Custom HTML block, or remove it entirely.'), originalName);
    actions.push(createElement(Button, {
      key: "convert",
      onClick: convertToHTML,
      isLarge: true,
      isPrimary: true
    }, __('Keep as HTML')));
  } else {
    messageHTML = sprintf(__('Your site doesn\'t include support for the "%s" block. You can leave this block intact or remove it entirely.'), originalName);
  }

  return createElement(Fragment, null, createElement(Warning, {
    actions: actions
  }, messageHTML), createElement(RawHTML, null, originalUndelimitedContent));
}

var edit = withDispatch(function (dispatch, _ref2) {
  var clientId = _ref2.clientId,
      attributes = _ref2.attributes;

  var _dispatch = dispatch('core/editor'),
      replaceBlock = _dispatch.replaceBlock;

  return {
    convertToHTML: function convertToHTML() {
      replaceBlock(clientId, createBlock('core/html', {
        content: attributes.originalUndelimitedContent
      }));
    }
  };
})(MissingBlockWarning);
export var name = 'core/missing';
export var settings = {
  name: name,
  category: 'common',
  title: __('Unrecognized Block'),
  description: __('Your site doesn\'t include support for this block.'),
  supports: {
    className: false,
    customClassName: false,
    inserter: false,
    html: false
  },
  attributes: {
    originalName: {
      type: 'string'
    },
    originalUndelimitedContent: {
      type: 'string'
    },
    originalContent: {
      type: 'string',
      source: 'html'
    }
  },
  edit: edit,
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    // Preserve the missing block's content.
    return createElement(RawHTML, null, attributes.originalContent);
  }
};
//# sourceMappingURL=index.js.map