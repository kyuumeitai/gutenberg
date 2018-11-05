"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _section = _interopRequireDefault(require("./section"));

var _options = require("./options");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function MetaBoxesSection(_ref) {
  var hasCustomFieldsSupport = _ref.hasCustomFieldsSupport,
      metaBoxes = _ref.metaBoxes,
      sectionProps = (0, _objectWithoutProperties2.default)(_ref, ["hasCustomFieldsSupport", "metaBoxes"]);

  if (!hasCustomFieldsSupport && metaBoxes.length === 0) {
    return null;
  }

  return (0, _element.createElement)(_section.default, sectionProps, hasCustomFieldsSupport && (0, _element.createElement)(_options.EnableCustomFieldsOption, {
    label: (0, _i18n.__)('Custom Fields')
  }), (0, _lodash.map)(metaBoxes, function (_ref2) {
    var id = _ref2.id,
        title = _ref2.title;
    return (// The 'Custom Fields' meta box is a special case handled above.
      id !== 'postcustom' && (0, _element.createElement)(_options.EnablePanelOption, {
        key: id,
        label: title,
        panelName: "meta-box-".concat(id)
      })
    );
  }));
}

var _default = (0, _data.withSelect)(function (select) {
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

exports.default = _default;
//# sourceMappingURL=meta-boxes-section.js.map