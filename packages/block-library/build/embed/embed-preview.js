"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _constants = require("./constants");

var _util = require("./util");

var _url = require("url");

var _lodash = require("lodash");

var _dedupe = _interopRequireDefault(require("classnames/dedupe"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * Internal dependencies
 */

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
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
  var html = 'photo' === type ? (0, _util.getPhotoHtml)(preview) : preview.html;
  var parsedUrl = (0, _url.parse)(url);
  var cannotPreview = (0, _lodash.includes)(_constants.HOSTS_NO_PREVIEWS, parsedUrl.host.replace(/^www\./, '')); // translators: %s: host providing embed content e.g: www.youtube.com

  var iframeTitle = (0, _i18n.sprintf)((0, _i18n.__)('Embedded content from %s'), parsedUrl.host);
  var sandboxClassnames = (0, _dedupe.default)(type, className, 'wp-block-embed__wrapper');
  var embedWrapper = 'wp-embed' === type ? (0, _element.createElement)("div", {
    className: sandboxClassnames,
    dangerouslySetInnerHTML: {
      __html: html
    }
  }) : (0, _element.createElement)("div", {
    className: "wp-block-embed__wrapper"
  }, (0, _element.createElement)(_components.SandBox, {
    html: html,
    scripts: scripts,
    title: iframeTitle,
    type: sandboxClassnames
  }));
  return (0, _element.createElement)("figure", {
    className: (0, _dedupe.default)(className, 'wp-block-embed', {
      'is-type-video': 'video' === type
    })
  }, cannotPreview ? (0, _element.createElement)(_components.Placeholder, {
    icon: (0, _element.createElement)(_editor.BlockIcon, {
      icon: icon,
      showColors: true
    }),
    label: label
  }, (0, _element.createElement)("p", {
    className: "components-placeholder__error"
  }, (0, _element.createElement)("a", {
    href: url
  }, url)), (0, _element.createElement)("p", {
    className: "components-placeholder__error"
  }, (0, _i18n.__)('Previews for this are unavailable in the editor, sorry!'))) : embedWrapper, (!_editor.RichText.isEmpty(caption) || isSelected) && (0, _element.createElement)(_editor.RichText, {
    tagName: "figcaption",
    placeholder: (0, _i18n.__)('Write caption…'),
    value: caption,
    onChange: onCaptionChange,
    inlineToolbar: true
  }));
};

var _default = EmbedPreview;
exports.default = _default;
//# sourceMappingURL=embed-preview.js.map