"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _memize = _interopRequireDefault(require("memize"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

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

var getColumnsTemplate = (0, _memize.default)(function (columns) {
  return (0, _lodash.times)(columns, function () {
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

var name = 'core/columns';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Columns'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M21 4H3L2 5v14l1 1h18l1-1V5l-1-1zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z"
  }))),
  category: 'layout',
  attributes: {
    columns: {
      type: 'number',
      default: 2
    }
  },
  description: (0, _i18n.__)('Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'),
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
        return (0, _blocks.createBlock)('core/column', {}, columnBlocks);
      });
      return [attributes, migratedInnerBlocks];
    },
    save: function save(_ref) {
      var attributes = _ref.attributes;
      var columns = attributes.columns;
      return (0, _element.createElement)("div", {
        className: "has-".concat(columns, "-columns")
      }, (0, _element.createElement)(_editor.InnerBlocks.Content, null));
    }
  }],
  edit: function edit(_ref2) {
    var attributes = _ref2.attributes,
        setAttributes = _ref2.setAttributes,
        className = _ref2.className;
    var columns = attributes.columns;
    var classes = (0, _classnames.default)(className, "has-".concat(columns, "-columns"));
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, null, (0, _element.createElement)(_components.RangeControl, {
      label: (0, _i18n.__)('Columns'),
      value: columns,
      onChange: function onChange(nextColumns) {
        setAttributes({
          columns: nextColumns
        });
      },
      min: 2,
      max: 6
    }))), (0, _element.createElement)("div", {
      className: classes
    }, (0, _element.createElement)(_editor.InnerBlocks, {
      template: getColumnsTemplate(columns),
      templateLock: "all",
      allowedBlocks: ALLOWED_BLOCKS
    })));
  },
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    var columns = attributes.columns;
    return (0, _element.createElement)("div", {
      className: "has-".concat(columns, "-columns")
    }, (0, _element.createElement)(_editor.InnerBlocks.Content, null));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map