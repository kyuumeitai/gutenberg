"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

/**
 * WordPress Dependencies
 */
function FeatureToggle(_ref) {
  var onToggle = _ref.onToggle,
      isActive = _ref.isActive,
      label = _ref.label,
      info = _ref.info;
  return (0, _element.createElement)(_components.MenuItem, {
    icon: isActive && 'yes',
    isSelected: isActive,
    onClick: onToggle,
    role: "menuitemcheckbox",
    label: label,
    info: info
  }, label);
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var feature = _ref2.feature;
  return {
    isActive: select('core/edit-post').isFeatureActive(feature)
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  return {
    onToggle: function onToggle() {
      dispatch('core/edit-post').toggleFeature(ownProps.feature);
      ownProps.onToggle();
    }
  };
})])(FeatureToggle);

exports.default = _default;
//# sourceMappingURL=index.js.map