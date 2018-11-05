import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { has, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { Button, Spinner, ResponsiveWrapper, withFilters } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import PostFeaturedImageCheck from './check';
import MediaUpload from '../media-upload';
var ALLOWED_MEDIA_TYPES = ['image']; // Used when labels from post type were not yet loaded or when they are not present.

var DEFAULT_FEATURE_IMAGE_LABEL = __('Featured Image');

var DEFAULT_SET_FEATURE_IMAGE_LABEL = __('Set featured image');

var DEFAULT_REMOVE_FEATURE_IMAGE_LABEL = __('Remove image');

function PostFeaturedImage(_ref) {
  var currentPostId = _ref.currentPostId,
      featuredImageId = _ref.featuredImageId,
      onUpdateImage = _ref.onUpdateImage,
      onRemoveImage = _ref.onRemoveImage,
      media = _ref.media,
      postType = _ref.postType;
  var postLabel = get(postType, ['labels'], {});
  var mediaWidth, mediaHeight, mediaSourceUrl;

  if (media) {
    var mediaSize = applyFilters('editor.PostFeaturedImage.imageSize', 'post-thumbnail', media.id, currentPostId);

    if (has(media, ['media_details', 'sizes', mediaSize])) {
      mediaWidth = media.media_details.sizes[mediaSize].width;
      mediaHeight = media.media_details.sizes[mediaSize].height;
      mediaSourceUrl = media.media_details.sizes[mediaSize].source_url;
    } else {
      mediaWidth = media.media_details.width;
      mediaHeight = media.media_details.height;
      mediaSourceUrl = media.source_url;
    }
  }

  return createElement(PostFeaturedImageCheck, null, createElement("div", {
    className: "editor-post-featured-image"
  }, !!featuredImageId && createElement(MediaUpload, {
    title: postLabel.featured_image || DEFAULT_FEATURE_IMAGE_LABEL,
    onSelect: onUpdateImage,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    modalClass: "editor-post-featured-image__media-modal",
    render: function render(_ref2) {
      var open = _ref2.open;
      return createElement(Button, {
        className: "editor-post-featured-image__preview",
        onClick: open,
        "aria-label": __('Edit or update the image')
      }, media && createElement(ResponsiveWrapper, {
        naturalWidth: mediaWidth,
        naturalHeight: mediaHeight
      }, createElement("img", {
        src: mediaSourceUrl,
        alt: ""
      })), !media && createElement(Spinner, null));
    },
    value: featuredImageId
  }), !!featuredImageId && media && !media.isLoading && createElement(MediaUpload, {
    title: postLabel.featured_image || DEFAULT_FEATURE_IMAGE_LABEL,
    onSelect: onUpdateImage,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    modalClass: "editor-post-featured-image__media-modal",
    render: function render(_ref3) {
      var open = _ref3.open;
      return createElement(Button, {
        onClick: open,
        isDefault: true,
        isLarge: true
      }, __('Replace image'));
    }
  }), !featuredImageId && createElement("div", null, createElement(MediaUpload, {
    title: postLabel.featured_image || DEFAULT_FEATURE_IMAGE_LABEL,
    onSelect: onUpdateImage,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    modalClass: "editor-post-featured-image__media-modal",
    render: function render(_ref4) {
      var open = _ref4.open;
      return createElement(Button, {
        className: "editor-post-featured-image__toggle",
        onClick: open
      }, postLabel.set_featured_image || DEFAULT_SET_FEATURE_IMAGE_LABEL);
    }
  })), !!featuredImageId && createElement(Button, {
    onClick: onRemoveImage,
    isLink: true,
    isDestructive: true
  }, postLabel.remove_featured_image || DEFAULT_REMOVE_FEATURE_IMAGE_LABEL)));
}

var applyWithSelect = withSelect(function (select) {
  var _select = select('core'),
      getMedia = _select.getMedia,
      getPostType = _select.getPostType;

  var _select2 = select('core/editor'),
      getCurrentPostId = _select2.getCurrentPostId,
      getEditedPostAttribute = _select2.getEditedPostAttribute;

  var featuredImageId = getEditedPostAttribute('featured_media');
  return {
    media: featuredImageId ? getMedia(featuredImageId) : null,
    currentPostId: getCurrentPostId(),
    postType: getPostType(getEditedPostAttribute('type')),
    featuredImageId: featuredImageId
  };
});
var applyWithDispatch = withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost;

  return {
    onUpdateImage: function onUpdateImage(image) {
      editPost({
        featured_media: image.id
      });
    },
    onRemoveImage: function onRemoveImage() {
      editPost({
        featured_media: 0
      });
    }
  };
});
export default compose(applyWithSelect, applyWithDispatch, withFilters('editor.PostFeaturedImage'))(PostFeaturedImage);
//# sourceMappingURL=index.js.map