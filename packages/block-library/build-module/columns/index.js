import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { times } from 'lodash';
import classnames from 'classnames';
import memoize from 'memize';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, G, SVG, Path } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks } from '@wordpress/editor';
/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
*/

var ALLOWED_BLOCKS = ['core/column'];
/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */

var getColumnsTemplate = memoize(function (columns) {
  return times(columns, function () {
    return ['core/column'];
  });
});
/**
 * Given an HTML string for a deprecated columns inner block, returns the
 * column index to which the migrated inner block should be assigned. Returns
 * undefined if the inner block was not assigned to a column.
 *
 * @param {string} originalContent Deprecated Columns inner block HTML.
 *
 * @return {?number} Column to which inner block is to be assigned.
 */

function getDeprecatedLayoutColumn(originalContent) {
  var doc = getDeprecatedLayoutColumn.doc;

  if (!doc) {
    doc = document.implementation.createHTMLDocument('');
    getDeprecatedLayoutColumn.doc = doc;
  }

  var columnMatch;
  doc.body.innerHTML = originalContent;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = doc.body.firstChild.classList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var classListItem = _step.value;

      if (columnMatch = classListItem.match(/^layout-column-(\d+)$/)) {
        return Number(columnMatch[1]) - 1;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

export var name = 'core/columns';
export var settings = {
  title: __('Columns'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(G, null, createElement(Path, {
    d: "M21 4H3L2 5v14l1 1h18l1-1V5l-1-1zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z"
  }))),
  category: 'layout',
  attributes: {
    columns: {
      type: 'number',
      default: 2
    }
  },
  description: __('Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'),
  supports: {
    align: ['wide', 'full']
  },
  deprecated: [{
    attributes: {
      columns: {
        type: 'number',
        default: 2
      }
    },
    isEligible: function isEligible(attributes, innerBlocks) {
      // Since isEligible is called on every valid instance of the
      // Columns block and a deprecation is the unlikely case due to
      // its subsequent migration, optimize for the `false` condition
      // by performing a naive, inaccurate pass at inner blocks.
      var isFastPassEligible = innerBlocks.some(function (innerBlock) {
        return /layout-column-\d+/.test(innerBlock.originalContent);
      });

      if (!isFastPassEligible) {
        return false;
      } // Only if the fast pass is considered eligible is the more
      // accurate, durable, slower condition performed.


      return innerBlocks.some(function (innerBlock) {
        return getDeprecatedLayoutColumn(innerBlock.originalContent) !== undefined;
      });
    },
    migrate: function migrate(attributes, innerBlocks) {
      var columns = innerBlocks.reduce(function (result, innerBlock) {
        var originalContent = innerBlock.originalContent;
        var columnIndex = getDeprecatedLayoutColumn(originalContent);

        if (columnIndex === undefined) {
          columnIndex = 0;
        }

        if (!result[columnIndex]) {
          result[columnIndex] = [];
        }

        result[columnIndex].push(innerBlock);
        return result;
      }, []);
      var migratedInnerBlocks = columns.map(function (columnBlocks) {
        return createBlock('core/column', {}, columnBlocks);
      });
      return [attributes, migratedInnerBlocks];
    },
    save: function save(_ref) {
      var attributes = _ref.attributes;
      var columns = attributes.columns;
      return createElement("div", {
        className: "has-".concat(columns, "-columns")
      }, createElement(InnerBlocks.Content, null));
    }
  }],
  edit: function edit(_ref2) {
    var attributes = _ref2.attributes,
        setAttributes = _ref2.setAttributes,
        className = _ref2.className;
    var columns = attributes.columns;
    var classes = classnames(className, "has-".concat(columns, "-columns"));
    return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, null, createElement(RangeControl, {
      label: __('Columns'),
      value: columns,
      onChange: function onChange(nextColumns) {
        setAttributes({
          columns: nextColumns
        });
      },
      min: 2,
      max: 6
    }))), createElement("div", {
      className: classes
    }, createElement(InnerBlocks, {
      template: getColumnsTemplate(columns),
      templateLock: "all",
      allowedBlocks: ALLOWED_BLOCKS
    })));
  },
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    var columns = attributes.columns;
    return createElement("div", {
      className: "has-".concat(columns, "-columns")
    }, createElement(InnerBlocks.Content, null));
  }
};
//# sourceMappingURL=index.js.map