import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { BlockIcon } from '@wordpress/editor';

var EmbedPlaceholder = function EmbedPlaceholder(props) {
  var icon = props.icon,
      label = props.label,
      value = props.value,
      onSubmit = props.onSubmit,
      onChange = props.onChange,
      cannotEmbed = props.cannotEmbed;
  return createElement(Placeholder, {
    icon: createElement(BlockIcon, {
      icon: icon,
      showColors: true
    }),
    label: label,
    className: "wp-block-embed"
  }, createElement("form", {
    onSubmit: onSubmit
  }, createElement("input", {
    type: "url",
    value: value || '',
    className: "components-placeholder__input",
    "aria-label": label,
    placeholder: __('Enter URL to embed here…'),
    onChange: onChange
  }), createElement(Button, {
    isLarge: true,
    type: "submit"
  }, _x('Embed', 'button label')), cannotEmbed && createElement("p", {
    className: "components-placeholder__error"
  }, __('Sorry, we could not embed that content.'))));
};

export default EmbedPlaceholder;
//# sourceMappingURL=embed-placeholder.js.map