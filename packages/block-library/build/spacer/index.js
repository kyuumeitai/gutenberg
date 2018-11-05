"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress
 */
var name = 'core/spacer';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Spacer'),
  description: (0, _i18n.__)('Add white space between blocks and customize its height.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M13 4v2h3.59L6 16.59V13H4v7h7v-2H7.41L18 7.41V11h2V4h-7"
  }))),
  category: 'layout',
  attributes: {
    height: {
      type: 'number',
      default: 100
    }
  },
  edit: (0, _compose.withInstanceId)(function (_ref) {
    var attributes = _ref.attributes,
        isSelected = _ref.isSelected,
        setAttributes = _ref.setAttributes,
        toggleSelection = _ref.toggleSelection,
        instanceId = _ref.instanceId;
    var height = attributes.height;
    var id = "block-spacer-height-input-".concat(instanceId);
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.ResizableBox, {
      className: (0, _classnames.default)('block-library-spacer__resize-container', {
        'is-selected': isSelected
      }),
      size: {
        height: height
      },
      minHeight: "20",
      enable: {
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      },
      onResizeStop: function onResizeStop(event, direction, elt, delta) {
        setAttributes({
          height: parseInt(height + delta.height, 10)
        });
        toggleSelection(true);
      },
      onResizeStart: function onResizeStart() {
        toggleSelection(false);
      }
    }), (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
      title: (0, _i18n.__)('Spacer Settings')
    }, (0, _element.createElement)(_components.BaseControl, {
      label: (0, _i18n.__)('Height in pixels'),
      id: id
    }, (0, _element.createElement)("input", {
      type: "number",
      id: id,
      onChange: function onChange(event) {
        setAttributes({
          height: parseInt(event.target.value, 10)
        });
      },
      value: height,
      min: "20",
      step: "10"
    })))));
  }),
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    return (0, _element.createElement)("div", {
      style: {
        height: attributes.height
      },
      "aria-hidden": true
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map