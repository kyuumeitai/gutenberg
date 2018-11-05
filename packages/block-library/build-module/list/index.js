import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { find, omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { createBlock, getPhrasingContentSchema, getBlockAttributes, getBlockType } from '@wordpress/blocks';
import { BlockControls, RichText } from '@wordpress/editor';
import { replace, join, split, create, toHTMLString, LINE_SEPARATOR } from '@wordpress/rich-text';
import { G, Path, SVG } from '@wordpress/components';

var listContentSchema = _objectSpread({}, getPhrasingContentSchema(), {
  ul: {},
  ol: {
    attributes: ['type']
  }
}); // Recursion is needed.
// Possible: ul > li > ul.
// Impossible: ul > ul.


['ul', 'ol'].forEach(function (tag) {
  listContentSchema[tag].children = {
    li: {
      children: listContentSchema
    }
  };
});
var supports = {
  className: false
};
var schema = {
  ordered: {
    type: 'boolean',
    default: false
  },
  values: {
    type: 'string',
    source: 'html',
    selector: 'ol,ul',
    multiline: 'li',
    default: ''
  }
};
export var name = 'core/list';
export var settings = {
  title: __('List'),
  description: __('Create a bulleted or numbered list.'),
  icon: createElement(SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(G, null, createElement(Path, {
    d: "M9 19h12v-2H9v2zm0-6h12v-2H9v2zm0-8v2h12V5H9zm-4-.5c-.828 0-1.5.672-1.5 1.5S4.172 7.5 5 7.5 6.5 6.828 6.5 6 5.828 4.5 5 4.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"
  }))),
  category: 'common',
  keywords: [__('bullet list'), __('ordered list'), __('numbered list')],
  attributes: schema,
  supports: supports,
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(blockAttributes) {
        return createBlock('core/list', {
          values: toHTMLString({
            value: join(blockAttributes.map(function (_ref) {
              var content = _ref.content;
              return replace(create({
                html: content
              }), /\n/g, LINE_SEPARATOR);
            }), LINE_SEPARATOR),
            multilineTag: 'li'
          })
        });
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      transform: function transform(_ref2) {
        var value = _ref2.value;
        return createBlock('core/list', {
          values: toHTMLString({
            value: create({
              html: value,
              multilineTag: 'p'
            }),
            multilineTag: 'li'
          })
        });
      }
    }, {
      type: 'raw',
      selector: 'ol,ul',
      schema: {
        ol: listContentSchema.ol,
        ul: listContentSchema.ul
      },
      transform: function transform(node) {
        return createBlock('core/list', _objectSpread({}, getBlockAttributes(getBlockType('core/list'), node.outerHTML), {
          ordered: node.nodeName === 'OL'
        }));
      }
    }, {
      type: 'pattern',
      regExp: /^[*-]\s/,
      transform: function transform(_ref3) {
        var content = _ref3.content;
        return createBlock('core/list', {
          values: "<li>".concat(content, "</li>")
        });
      }
    }, {
      type: 'pattern',
      regExp: /^1[.)]\s/,
      transform: function transform(_ref4) {
        var content = _ref4.content;
        return createBlock('core/list', {
          ordered: true,
          values: "<li>".concat(content, "</li>")
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref5) {
        var values = _ref5.values;
        return split(create({
          html: values,
          multilineTag: 'li',
          multilineWrapperTags: ['ul', 'ol']
        }), LINE_SEPARATOR).map(function (piece) {
          return createBlock('core/paragraph', {
            content: toHTMLString({
              value: piece
            })
          });
        });
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      transform: function transform(_ref6) {
        var values = _ref6.values;
        return createBlock('core/quote', {
          value: toHTMLString({
            value: create({
              html: values,
              multilineTag: 'li',
              multilineWrapperTags: ['ul', 'ol']
            }),
            multilineTag: 'p'
          })
        });
      }
    }]
  },
  deprecated: [{
    supports: supports,
    attributes: _objectSpread({}, omit(schema, ['ordered']), {
      nodeName: {
        type: 'string',
        source: 'property',
        selector: 'ol,ul',
        property: 'nodeName',
        default: 'UL'
      }
    }),
    migrate: function migrate(attributes) {
      var nodeName = attributes.nodeName,
          migratedAttributes = _objectWithoutProperties(attributes, ["nodeName"]);

      return _objectSpread({}, migratedAttributes, {
        ordered: 'OL' === nodeName
      });
    },
    save: function save(_ref7) {
      var attributes = _ref7.attributes;
      var nodeName = attributes.nodeName,
          values = attributes.values;
      return createElement(RichText.Content, {
        tagName: nodeName.toLowerCase(),
        value: values
      });
    }
  }],
  merge: function merge(attributes, attributesToMerge) {
    var values = attributesToMerge.values;

    if (!values || values === '<li></li>') {
      return attributes;
    }

    return _objectSpread({}, attributes, {
      values: attributes.values + values
    });
  },
  edit:
  /*#__PURE__*/
  function (_Component) {
    _inherits(edit, _Component);

    function edit() {
      var _this;

      _classCallCheck(this, edit);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(edit).apply(this, arguments));
      _this.setupEditor = _this.setupEditor.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getEditorSettings = _this.getEditorSettings.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.setNextValues = _this.setNextValues.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        internalListType: null
      };
      return _this;
    }

    _createClass(edit, [{
      key: "findInternalListType",
      value: function findInternalListType(_ref8) {
        var parents = _ref8.parents;
        var list = find(parents, function (node) {
          return node.nodeName === 'UL' || node.nodeName === 'OL';
        });
        return list ? list.nodeName : null;
      }
    }, {
      key: "setupEditor",
      value: function setupEditor(editor) {
        var _this2 = this;

        editor.on('nodeChange', function (nodeInfo) {
          _this2.setState({
            internalListType: _this2.findInternalListType(nodeInfo)
          });
        }); // Check for languages that do not have square brackets on their keyboards.

        var lang = window.navigator.browserLanguage || window.navigator.language;
        var keyboardHasSquareBracket = !/^(?:fr|nl|sv|ru|de|es|it)/.test(lang);

        if (keyboardHasSquareBracket) {
          // `[` is keycode 219; `]` is keycode 221.
          editor.shortcuts.add('meta+219', 'Decrease indent', 'Outdent');
          editor.shortcuts.add('meta+221', 'Increase indent', 'Indent');
        } else {
          editor.shortcuts.add('meta+shift+m', 'Decrease indent', 'Outdent');
          editor.shortcuts.add('meta+m', 'Increase indent', 'Indent');
        }

        this.editor = editor;
      }
    }, {
      key: "createSetListType",
      value: function createSetListType(type, command) {
        var _this3 = this;

        return function () {
          var setAttributes = _this3.props.setAttributes;
          var internalListType = _this3.state.internalListType;

          if (internalListType) {
            // Only change list types, don't toggle off internal lists.
            if (internalListType !== type && _this3.editor) {
              _this3.editor.execCommand(command);
            }
          } else {
            setAttributes({
              ordered: type === 'OL'
            });
          }
        };
      }
    }, {
      key: "createExecCommand",
      value: function createExecCommand(command) {
        var _this4 = this;

        return function () {
          if (_this4.editor) {
            _this4.editor.execCommand(command);
          }
        };
      }
    }, {
      key: "getEditorSettings",
      value: function getEditorSettings(editorSettings) {
        return _objectSpread({}, editorSettings, {
          plugins: (editorSettings.plugins || []).concat('lists'),
          lists_indent_on_tab: false
        });
      }
    }, {
      key: "setNextValues",
      value: function setNextValues(nextValues) {
        this.props.setAttributes({
          values: nextValues
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            attributes = _this$props.attributes,
            insertBlocksAfter = _this$props.insertBlocksAfter,
            setAttributes = _this$props.setAttributes,
            mergeBlocks = _this$props.mergeBlocks,
            onReplace = _this$props.onReplace,
            className = _this$props.className;
        var ordered = attributes.ordered,
            values = attributes.values;
        var tagName = ordered ? 'ol' : 'ul';
        return createElement(Fragment, null, createElement(BlockControls, {
          controls: [{
            icon: 'editor-ul',
            title: __('Convert to unordered list'),
            isActive: !ordered,
            onClick: this.createSetListType('UL', 'InsertUnorderedList')
          }, {
            icon: 'editor-ol',
            title: __('Convert to ordered list'),
            isActive: ordered,
            onClick: this.createSetListType('OL', 'InsertOrderedList')
          }, {
            icon: 'editor-outdent',
            title: __('Outdent list item'),
            onClick: this.createExecCommand('Outdent')
          }, {
            icon: 'editor-indent',
            title: __('Indent list item'),
            onClick: this.createExecCommand('Indent')
          }]
        }), createElement(RichText, {
          multiline: "li",
          tagName: tagName,
          unstableGetSettings: this.getEditorSettings,
          unstableOnSetup: this.setupEditor,
          onChange: this.setNextValues,
          value: values,
          wrapperClassName: "block-library-list",
          className: className,
          placeholder: __('Write list…'),
          onMerge: mergeBlocks,
          onSplit: insertBlocksAfter ? function (before, after) {
            for (var _len = arguments.length, blocks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              blocks[_key - 2] = arguments[_key];
            }

            if (!blocks.length) {
              blocks.push(createBlock('core/paragraph'));
            }

            if (after !== '<li></li>') {
              blocks.push(createBlock('core/list', {
                ordered: ordered,
                values: after
              }));
            }

            setAttributes({
              values: before
            });
            insertBlocksAfter(blocks);
          } : undefined,
          onRemove: function onRemove() {
            return onReplace([]);
          }
        }));
      }
    }]);

    return edit;
  }(Component),
  save: function save(_ref9) {
    var attributes = _ref9.attributes;
    var ordered = attributes.ordered,
        values = attributes.values;
    var tagName = ordered ? 'ol' : 'ul';
    return createElement(RichText.Content, {
      tagName: tagName,
      value: values,
      multiline: "li"
    });
  }
};
//# sourceMappingURL=index.js.map