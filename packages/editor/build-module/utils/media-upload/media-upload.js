import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External Dependencies
 */
import { compact, flatMap, forEach, get, has, includes, map, noop, omit, some, startsWith } from 'lodash';
/**
 * WordPress dependencies
 */

import apiFetch from '@wordpress/api-fetch';
import { createBlobURL, revokeBlobURL } from '@wordpress/blob';
import { __, sprintf } from '@wordpress/i18n';
/**
 * Browsers may use unexpected mime types, and they differ from browser to browser.
 * This function computes a flexible array of mime types from the mime type structured provided by the server.
 * Converts { jpg|jpeg|jpe: "image/jpeg" } into [ "image/jpeg", "image/jpg", "image/jpeg", "image/jpe" ]
 * The computation of this array instead of directly using the object,
 * solves the problem in chrome where mp3 files have audio/mp3 as mime type instead of audio/mpeg.
 * https://bugs.chromium.org/p/chromium/issues/detail?id=227004
 *
 * @param {?Object} wpMimeTypesObject Mime type object received from the server.
 *                                    Extensions are keys separated by '|' and values are mime types associated with an extension.
 *
 * @return {?Array} An array of mime types or the parameter passed if it was "falsy".
 */

export function getMimeTypesArray(wpMimeTypesObject) {
  if (!wpMimeTypesObject) {
    return wpMimeTypesObject;
  }

  return flatMap(wpMimeTypesObject, function (mime, extensionsString) {
    var _mime$split = mime.split('/'),
        _mime$split2 = _slicedToArray(_mime$split, 1),
        type = _mime$split2[0];

    var extensions = extensionsString.split('|');
    return [mime].concat(_toConsumableArray(map(extensions, function (extension) {
      return "".concat(type, "/").concat(extension);
    })));
  });
}
/**
 *	Media Upload is used by audio, image, gallery, video, and file blocks to
 *	handle uploading a media file when a file upload button is activated.
 *
 *	TODO: future enhancement to add an upload indicator.
 *
 * @param   {Object}   $0                    Parameters object passed to the function.
 * @param   {?Array}   $0.allowedTypes       Array with the types of media that can be uploaded, if unset all types are allowed.
 * @param   {?Object}  $0.additionalData     Additional data to include in the request.
 * @param   {Array}    $0.filesList          List of files.
 * @param   {?number}  $0.maxUploadFileSize  Maximum upload size in bytes allowed for the site.
 * @param   {Function} $0.onError            Function called when an error happens.
 * @param   {Function} $0.onFileChange       Function called each time a file or a temporary representation of the file is available.
 * @param   {?Object}  $0.wpAllowedMimeTypes List of allowed mime types and file extensions.
 */

export function mediaUpload(_ref) {
  var allowedTypes = _ref.allowedTypes,
      _ref$additionalData = _ref.additionalData,
      additionalData = _ref$additionalData === void 0 ? {} : _ref$additionalData,
      filesList = _ref.filesList,
      maxUploadFileSize = _ref.maxUploadFileSize,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? noop : _ref$onError,
      onFileChange = _ref.onFileChange,
      _ref$wpAllowedMimeTyp = _ref.wpAllowedMimeTypes,
      wpAllowedMimeTypes = _ref$wpAllowedMimeTyp === void 0 ? null : _ref$wpAllowedMimeTyp;

  // Cast filesList to array
  var files = _toConsumableArray(filesList);

  var filesSet = [];

  var setAndUpdateFiles = function setAndUpdateFiles(idx, value) {
    revokeBlobURL(get(filesSet, [idx, 'url']));
    filesSet[idx] = value;
    onFileChange(compact(filesSet));
  }; // Allowed type specified by consumer


  var isAllowedType = function isAllowedType(fileType) {
    if (!allowedTypes) {
      return true;
    }

    return some(allowedTypes, function (allowedType) {
      // If a complete mimetype is specified verify if it matches exactly the mime type of the file.
      if (includes(allowedType, '/')) {
        return allowedType === fileType;
      } // Otherwise a general mime type is used and we should verify if the file mimetype starts with it.


      return startsWith(fileType, "".concat(allowedType, "/"));
    });
  }; // Allowed types for the current WP_User


  var allowedMimeTypesForUser = getMimeTypesArray(wpAllowedMimeTypes);

  var isAllowedMimeTypeForUser = function isAllowedMimeTypeForUser(fileType) {
    return includes(allowedMimeTypesForUser, fileType);
  }; // Build the error message including the filename


  var triggerError = function triggerError(error) {
    error.message = [createElement("strong", {
      key: "filename"
    }, error.file.name), ': ', error.message];
    onError(error);
  };

  files.forEach(function (mediaFile, idx) {
    // verify if user is allowed to upload this mime type
    if (allowedMimeTypesForUser && !isAllowedMimeTypeForUser(mediaFile.type)) {
      triggerError({
        code: 'MIME_TYPE_NOT_ALLOWED_FOR_USER',
        message: __('Sorry, this file type is not permitted for security reasons.'),
        file: mediaFile
      });
      return;
    } // Check if the block supports this mime type


    if (!isAllowedType(mediaFile.type)) {
      triggerError({
        code: 'MIME_TYPE_NOT_SUPPORTED',
        message: __('Sorry, this file type is not supported here.'),
        file: mediaFile
      });
      return;
    } // verify if file is greater than the maximum file upload size allowed for the site.


    if (maxUploadFileSize && mediaFile.size > maxUploadFileSize) {
      triggerError({
        code: 'SIZE_ABOVE_LIMIT',
        message: __('This file exceeds the maximum upload size for this site.'),
        file: mediaFile
      });
      return;
    } // Don't allow empty files to be uploaded.


    if (mediaFile.size <= 0) {
      triggerError({
        code: 'EMPTY_FILE',
        message: __('This file is empty.'),
        file: mediaFile
      });
      return;
    } // Set temporary URL to create placeholder media file, this is replaced
    // with final file from media gallery when upload is `done` below


    filesSet.push({
      url: createBlobURL(mediaFile)
    });
    onFileChange(filesSet);
    return createMediaFromFile(mediaFile, additionalData).then(function (savedMedia) {
      var mediaObject = _objectSpread({}, omit(savedMedia, ['alt_text', 'source_url']), {
        alt: savedMedia.alt_text,
        caption: get(savedMedia, ['caption', 'raw'], ''),
        title: savedMedia.title.raw,
        url: savedMedia.source_url
      });

      setAndUpdateFiles(idx, mediaObject);
    }).catch(function (error) {
      // Reset to empty on failure.
      setAndUpdateFiles(idx, null);
      var message;

      if (has(error, ['message'])) {
        message = get(error, ['message']);
      } else {
        message = sprintf( // translators: %s: file name
        __('Error while uploading file %s to the media library.'), mediaFile.name);
      }

      onError({
        code: 'GENERAL',
        message: message,
        file: mediaFile
      });
    });
  });
}
/**
 * @param {File}    file           Media File to Save.
 * @param {?Object} additionalData Additional data to include in the request.
 *
 * @return {Promise} Media Object Promise.
 */

function createMediaFromFile(file, additionalData) {
  // Create upload payload
  var data = new window.FormData();
  data.append('file', file, file.name || file.type.replace('/', '.'));
  data.append('title', file.name ? file.name.replace(/\.[^.]+$/, '') : file.type.replace('/', '.'));
  forEach(additionalData, function (value, key) {
    return data.append(key, value);
  });
  return apiFetch({
    path: '/wp/v2/media',
    body: data,
    method: 'POST'
  });
}
//# sourceMappingURL=media-upload.js.map