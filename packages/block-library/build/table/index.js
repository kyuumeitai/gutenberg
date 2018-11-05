"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var tableContentPasteSchema = {
  tr: {
    children: {
      th: {
        children: (0, _blocks.getPhrasingContentSchema)()
      },
      td: {
        children: (0, _blocks.getPhrasingContentSchema)()
      }
    }
  }
};
var tablePasteSchema = {
  table: {
    children: {
      thead: {
        children: tableContentPasteSchema
      },
      tfoot: {
        children: tableContentPasteSchema
      },
      tbody: {
        children: tableContentPasteSchema
      }
    }
  }
};

function getTableSectionAttributeSchema(section) {
  return {
    type: 'array',
    default: [],
    source: 'query',
    selector: "t".concat(section, " tr"),
    query: {
      cells: {
        type: 'array',
        default: [],
        source: 'query',
        selector: 'td,th',
        query: {
          content: {
            type: 'string',
            source: 'html'
          },
          tag: {
            type: 'string',
            default: 'td',
            source: 'tag'
          }
        }
      }
    }
  };
}

var name = 'core/table';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Table'),
  description: (0, _i18n.__)('Insert a table — perfect for sharing charts and data.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M20 3H5L3 5v14l2 2h15l2-2V5l-2-2zm0 2v3H5V5h15zm-5 14h-5v-9h5v9zM5 10h3v9H5v-9zm12 9v-9h3v9h-3z"
  }))),
  category: 'formatting',
  attributes: {
    hasFixedLayout: {
      type: 'boolean',
      default: false
    },
    head: getTableSectionAttributeSchema('head'),
    body: getTableSectionAttributeSchema('body'),
    foot: getTableSectionAttributeSchema('foot')
  },
  styles: [{
    name: 'regular',
    label: (0, _i18n._x)('Regular', 'block style'),
    isDefault: true
  }, {
    name: 'stripes',
    label: (0, _i18n.__)('Stripes')
  }],
  supports: {
    align: true
  },
  transforms: {
    from: [{
      type: 'raw',
      selector: 'table',
      schema: tablePasteSchema
    }]
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var hasFixedLayout = attributes.hasFixedLayout,
        head = attributes.head,
        body = attributes.body,
        foot = attributes.foot;
    var isEmpty = !head.length && !body.length && !foot.length;

    if (isEmpty) {
      return null;
    }

    var classes = (0, _classnames.default)({
      'has-fixed-layout': hasFixedLayout
    });

    var Section = function Section(_ref2) {
      var type = _ref2.type,
          rows = _ref2.rows;

      if (!rows.length) {
        return null;
      }

      var Tag = "t".concat(type);
      return (0, _element.createElement)(Tag, null, rows.map(function (_ref3, rowIndex) {
        var cells = _ref3.cells;
        return (0, _element.createElement)("tr", {
          key: rowIndex
        }, cells.map(function (_ref4, cellIndex) {
          var content = _ref4.content,
              tag = _ref4.tag;
          return (0, _element.createElement)(_editor.RichText.Content, {
            tagName: tag,
            value: content,
            key: cellIndex
          });
        }));
      }));
    };

    return (0, _element.createElement)("table", {
      className: classes
    }, (0, _element.createElement)(Section, {
      type: "head",
      rows: head
    }), (0, _element.createElement)(Section, {
      type: "body",
      rows: body
    }), (0, _element.createElement)(Section, {
      type: "foot",
      rows: foot
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map