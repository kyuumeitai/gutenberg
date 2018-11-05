import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { getPhrasingContentSchema } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';
import { G, Path, SVG } from '@wordpress/components';
/**
 * Internal dependencies
 */

import edit from './edit';
var tableContentPasteSchema = {
  tr: {
    children: {
      th: {
        children: getPhrasingContentSchema()
      },
      td: {
        children: getPhrasingContentSchema()
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

export var name = 'core/table';
export var settings = {
  title: __('Table'),
  description: __('Insert a table — perfect for sharing charts and data.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(G, null, createElement(Path, {
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
    label: _x('Regular', 'block style'),
    isDefault: true
  }, {
    name: 'stripes',
    label: __('Stripes')
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
  edit: edit,
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

    var classes = classnames({
      'has-fixed-layout': hasFixedLayout
    });

    var Section = function Section(_ref2) {
      var type = _ref2.type,
          rows = _ref2.rows;

      if (!rows.length) {
        return null;
      }

      var Tag = "t".concat(type);
      return createElement(Tag, null, rows.map(function (_ref3, rowIndex) {
        var cells = _ref3.cells;
        return createElement("tr", {
          key: rowIndex
        }, cells.map(function (_ref4, cellIndex) {
          var content = _ref4.content,
              tag = _ref4.tag;
          return createElement(RichText.Content, {
            tagName: tag,
            value: content,
            key: cellIndex
          });
        }));
      }));
    };

    return createElement("table", {
      className: classes
    }, createElement(Section, {
      type: "head",
      rows: head
    }), createElement(Section, {
      type: "body",
      rows: body
    }), createElement(Section, {
      type: "foot",
      rows: foot
    }));
  }
};
//# sourceMappingURL=index.js.map