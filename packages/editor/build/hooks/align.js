"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAttribute = addAttribute;
exports.getBlockValidAlignments = getBlockValidAlignments;
exports.addAssignedAlign = addAssignedAlign;
exports.withDataAlign = exports.withToolbarControls = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _hooks = require("@wordpress/hooks");

var _blocks = require("@wordpress/blocks");

var _components = require("../components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Filters registered block settings, extending attributes to include `align`.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */
function addAttribute(settings) {
  // allow blocks to specify their own attribute definition with default values if needed.
  if ((0, _lodash.has)(settings.attributes, ['align', 'type'])) {
    return settings;
  }

  if ((0, _blocks.hasBlockSupport)(settings, 'align')) {
    // Use Lodash's assign to gracefully handle if attributes are undefined
    settings.attributes = (0, _lodash.assign)(settings.attributes, {
      align: {
        type: 'string'
      }
    });
  }

  return settings;
}
/**
 * Returns an array of valid alignments for a block type depending on its
 * defined supports. Returns an empty array if block does not support align.
 *
 * @param  {string}   blockName Block name to check
 * @return {string[]}           Valid alignments for block
 */


function getBlockValidAlignments(blockName) {
  // Explicitly defined array set of valid alignments
  var blockAlign = (0, _blocks.getBlockSupport)(blockName, 'align');

  if (Array.isArray(blockAlign)) {
    return blockAlign;
  }

  var validAlignments = [];

  if (true === blockAlign) {
    // `true` includes all alignments...
    validAlignments.push('left', 'center', 'right');

    if ((0, _blocks.hasBlockSupport)(blockName, 'alignWide', true)) {
      validAlignments.push('wide', 'full');
    }
  }

  return validAlignments;
}
/**
 * Override the default edit UI to include new toolbar controls for block
 * alignment, if block defines support.
 *
 * @param  {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */


var withToolbarControls = (0, _compose.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    var validAlignments = getBlockValidAlignments(props.name);

    var updateAlignment = function updateAlignment(nextAlign) {
      if (!nextAlign) {
        var blockType = (0, _blocks.getBlockType)(props.name);
        var blockDefaultAlign = (0, _lodash.get)(blockType, ['attributes', 'align', 'default']);

        if (blockDefaultAlign) {
          nextAlign = '';
        }
      }

      props.setAttributes({
        align: nextAlign
      });
    };

    return [validAlignments.length > 0 && props.isSelected && (0, _element.createElement)(_components.BlockControls, {
      key: "align-controls"
    }, (0, _element.createElement)(_components.BlockAlignmentToolbar, {
      value: props.attributes.align,
      onChange: updateAlignment,
      controls: validAlignments
    })), (0, _element.createElement)(BlockEdit, (0, _extends2.default)({
      key: "edit"
    }, props))];
  };
}, 'withToolbarControls');
/**
 * Override the default block element to add alignment wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */

exports.withToolbarControls = withToolbarControls;
var withDataAlign = (0, _compose.createHigherOrderComponent)(function (BlockListBlock) {
  return function (props) {
    var align = props.block.attributes.align;
    var validAlignments = getBlockValidAlignments(props.block.name);
    var wrapperProps = props.wrapperProps;

    if ((0, _lodash.includes)(validAlignments, align)) {
      wrapperProps = (0, _objectSpread2.default)({}, wrapperProps, {
        'data-align': align
      });
    }

    return (0, _element.createElement)(BlockListBlock, (0, _extends2.default)({}, props, {
      wrapperProps: wrapperProps
    }));
  };
}, 'withDataAlign');
/**
 * Override props assigned to save component to inject alignment class name if
 * block supports it.
 *
 * @param  {Object} props      Additional props applied to save element
 * @param  {Object} blockType  Block type
 * @param  {Object} attributes Block attributes
 * @return {Object}            Filtered props applied to save element
 */

exports.withDataAlign = withDataAlign;

function addAssignedAlign(props, blockType, attributes) {
  var align = attributes.align;

  if ((0, _lodash.includes)(getBlockValidAlignments(blockType), align)) {
    props.className = (0, _classnames.default)("align".concat(align), props.className);
  }

  return props;
}

(0, _hooks.addFilter)('blocks.registerBlockType', 'core/align/addAttribute', addAttribute);
(0, _hooks.addFilter)('editor.BlockListBlock', 'core/editor/align/with-data-align', withDataAlign);
(0, _hooks.addFilter)('editor.BlockEdit', 'core/editor/align/with-toolbar-controls', withToolbarControls);
(0, _hooks.addFilter)('blocks.getSaveContent.extraProps', 'core/align/addAssignedAlign', addAssignedAlign);
//# sourceMappingURL=align.js.map