"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _editor = require("@wordpress/editor");

var _richText = require("@wordpress/rich-text");

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var listContentSchema = (0, _objectSpread2.default)({}, (0, _blocks.getPhrasingContentSchema)(), {
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
var name = 'core/list';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('List'),
  description: (0, _i18n.__)('Create a bulleted or numbered list.'),
  icon: (0, _element.createElement)(_components.SVG, {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _element.createElement)(_components.G, null, (0, _element.createElement)(_components.Path, {
    d: "M9 19h12v-2H9v2zm0-6h12v-2H9v2zm0-8v2h12V5H9zm-4-.5c-.828 0-1.5.672-1.5 1.5S4.172 7.5 5 7.5 6.5 6.828 6.5 6 5.828 4.5 5 4.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"
  }))),
  category: 'common',
  keywords: [(0, _i18n.__)('bullet list'), (0, _i18n.__)('ordered list'), (0, _i18n.__)('numbered list')],
  attributes: schema,
  supports: supports,
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(blockAttributes) {
        return (0, _blocks.createBlock)('core/list', {
          values: (0, _richText.toHTMLString)({
            value: (0, _richText.join)(blockAttributes.map(function (_ref) {
              var content = _ref.content;
              return (0, _richText.replace)((0, _richText.create)({
                html: content
              }), /\n/g, _richText.LINE_SEPARATOR);
            }), _richText.LINE_SEPARATOR),
            multilineTag: 'li'
          })
        });
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      transform: function transform(_ref2) {
        var value = _ref2.value;
        return (0, _blocks.createBlock)('core/list', {
          values: (0, _richText.toHTMLString)({
            value: (0, _richText.create)({
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
        return (0, _blocks.createBlock)('core/list', (0, _objectSpread2.default)({}, (0, _blocks.getBlockAttributes)((0, _blocks.getBlockType)('core/list'), node.outerHTML), {
          ordered: node.nodeName === 'OL'
        }));
      }
    }, {
      type: 'pattern',
      regExp: /^[*-]\s/,
      transform: function transform(_ref3) {
        var content = _ref3.content;
        return (0, _blocks.createBlock)('core/list', {
          values: "<li>".concat(content, "</li>")
        });
      }
    }, {
      type: 'pattern',
      regExp: /^1[.)]\s/,
      transform: function transform(_ref4) {
        var content = _ref4.content;
        return (0, _blocks.createBlock)('core/list', {
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
        return (0, _richText.split)((0, _richText.create)({
          html: values,
          multilineTag: 'li',
          multilineWrapperTags: ['ul', 'ol']
        }), _richText.LINE_SEPARATOR).map(function (piece) {
          return (0, _blocks.createBlock)('core/paragraph', {
            content: (0, _richText.toHTMLString)({
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
        return (0, _blocks.createBlock)('core/quote', {
          value: (0, _richText.toHTMLString)({
            value: (0, _richText.create)({
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
    attributes: (0, _objectSpread2.default)({}, (0, _lodash.omit)(schema, ['ordered']), {
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
          migratedAttributes = (0, _objectWithoutProperties2.default)(attributes, ["nodeName"]);
      return (0, _objectSpread2.default)({}, migratedAttributes, {
        ordered: 'OL' === nodeName
      });
    },
    save: function save(_ref7) {
      var attributes = _ref7.attributes;
      var nodeName = attributes.nodeName,
          values = attributes.values;
      return (0, _element.createElement)(_editor.RichText.Content, {
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

    return (0, _objectSpread2.default)({}, attributes, {
      values: attributes.values + values
    });
  },
  edit:
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(edit, _Component);

    function edit() {
      var _this;

      (0, _classCallCheck2.default)(this, edit);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(edit).apply(this, arguments));
      _this.setupEditor = _this.setupEditor.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.getEditorSettings = _this.getEditorSettings.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.setNextValues = _this.setNextValues.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.state = {
        internalListType: null
      };
      return _this;
    }

    (0, _createClass2.default)(edit, [{
      key: "findInternalListType",
      value: function findInternalListType(_ref8) {
        var parents = _ref8.parents;
        var list = (0, _lodash.find)(parents, function (node) {
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
        return (0, _objectSpread2.default)({}, editorSettings, {
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
        return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, {
          controls: [{
            icon: 'editor-ul',
            title: (0, _i18n.__)('Convert to unordered list'),
            isActive: !ordered,
            onClick: this.createSetListType('UL', 'InsertUnorderedList')
          }, {
            icon: 'editor-ol',
            title: (0, _i18n.__)('Convert to ordered list'),
            isActive: ordered,
            onClick: this.createSetListType('OL', 'InsertOrderedList')
          }, {
            icon: 'editor-outdent',
            title: (0, _i18n.__)('Outdent list item'),
            onClick: this.createExecCommand('Outdent')
          }, {
            icon: 'editor-indent',
            title: (0, _i18n.__)('Indent list item'),
            onClick: this.createExecCommand('Indent')
          }]
        }), (0, _element.createElement)(_editor.RichText, {
          multiline: "li",
          tagName: tagName,
          unstableGetSettings: this.getEditorSettings,
          unstableOnSetup: this.setupEditor,
          onChange: this.setNextValues,
          value: values,
          wrapperClassName: "block-library-list",
          className: className,
          placeholder: (0, _i18n.__)('Write list…'),
          onMerge: mergeBlocks,
          onSplit: insertBlocksAfter ? function (before, after) {
            for (var _len = arguments.length, blocks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              blocks[_key - 2] = arguments[_key];
            }

            if (!blocks.length) {
              blocks.push((0, _blocks.createBlock)('core/paragraph'));
            }

            if (after !== '<li></li>') {
              blocks.push((0, _blocks.createBlock)('core/list', {
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
  }(_element.Component),
  save: function save(_ref9) {
    var attributes = _ref9.attributes;
    var ordered = attributes.ordered,
        values = attributes.values;
    var tagName = ordered ? 'ol' : 'ul';
    return (0, _element.createElement)(_editor.RichText.Content, {
      tagName: tagName,
      value: values,
      multiline: "li"
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map