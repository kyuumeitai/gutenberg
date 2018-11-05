import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { count as wordCount } from '@wordpress/wordcount';

function WordCount(_ref) {
  var content = _ref.content;
  return createElement("span", {
    className: "word-count"
  }, wordCount(content, 'words'));
}

export default withSelect(function (select) {
  return {
    content: select('core/editor').getEditedPostAttribute('content')
  };
})(WordCount);
//# sourceMappingURL=index.js.map