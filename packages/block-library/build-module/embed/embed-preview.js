import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { HOSTS_NO_PREVIEWS } from './constants';
import { getPhotoHtml } from './util';
/**
 * External dependencies
 */

import { parse } from 'url';
import { includes } from 'lodash';
import classnames from 'classnames/dedupe';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { Placeholder, SandBox } from '@wordpress/components';
import { RichText, BlockIcon } from '@wordpress/editor';

var EmbedPreview = function EmbedPreview(props) {
  var preview = props.preview,
      url = props.url,
      type = props.type,
      caption = props.caption,
      onCaptionChange = props.onCaptionChange,
      isSelected = props.isSelected,
      className = props.className,
      icon = props.icon,
      label = props.label;
  var scripts = preview.scripts;
  var html = 'photo' === type ? getPhotoHtml(preview) : preview.html;
  var parsedUrl = parse(url);
  var cannotPreview = includes(HOSTS_NO_PREVIEWS, parsedUrl.host.replace(/^www\./, '')); // translators: %s: host providing embed content e.g: www.youtube.com

  var iframeTitle = sprintf(__('Embedded content from %s'), parsedUrl.host);
  var sandboxClassnames = classnames(type, className, 'wp-block-embed__wrapper');
  var embedWrapper = 'wp-embed' === type ? createElement("div", {
    className: sandboxClassnames,
    dangerouslySetInnerHTML: {
      __html: html
    }
  }) : createElement("div", {
    className: "wp-block-embed__wrapper"
  }, createElement(SandBox, {
    html: html,
    scripts: scripts,
    title: iframeTitle,
    type: sandboxClassnames
  }));
  return createElement("figure", {
    className: classnames(className, 'wp-block-embed', {
      'is-type-video': 'video' === type
    })
  }, cannotPreview ? createElement(Placeholder, {
    icon: createElement(BlockIcon, {
      icon: icon,
      showColors: true
    }),
    label: label
  }, createElement("p", {
    className: "components-placeholder__error"
  }, createElement("a", {
    href: url
  }, url)), createElement("p", {
    className: "components-placeholder__error"
  }, __('Previews for this are unavailable in the editor, sorry!'))) : embedWrapper, (!RichText.isEmpty(caption) || isSelected) && createElement(RichText, {
    tagName: "figcaption",
    placeholder: __('Write caption…'),
    value: caption,
    onChange: onCaptionChange,
    inlineToolbar: true
  }));
};

export default EmbedPreview;
//# sourceMappingURL=embed-preview.js.map