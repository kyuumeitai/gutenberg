"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _richText = require("@wordpress/rich-text");

var _components = require("@wordpress/components");

var _keycodes = require("@wordpress/keycodes");

var _inserterListItem = _interopRequireDefault(require("../inserter-list-item"));

var _menu = require("../inserter/menu");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function isResult(_ref, filterValue) {
  var title = _ref.title,
      _ref$keywords = _ref.keywords,
      keywords = _ref$keywords === void 0 ? [] : _ref$keywords;
  var normalizedSearchTerm = (0, _menu.normalizeTerm)(filterValue);

  var matchSearch = function matchSearch(string) {
    return (0, _menu.normalizeTerm)(string).indexOf(normalizedSearchTerm) !== -1;
  };

  return matchSearch(title) || keywords.some(matchSearch);
}

function FillToolbarButton(_ref2) {
  var name = _ref2.name,
      shortcutType = _ref2.shortcutType,
      shortcutCharacter = _ref2.shortcutCharacter,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["name", "shortcutType", "shortcutCharacter"]);
  var shortcut;
  var fillName = 'RichText.ToolbarControls';

  if (name) {
    fillName += ".".concat(name);
  }

  if (shortcutType && shortcutCharacter) {
    shortcut = _keycodes.displayShortcut[shortcutType](shortcutCharacter);
  }

  return (0, _element.createElement)(_components.Fill, {
    name: fillName
  }, (0, _element.createElement)(_components.ToolbarButton, (0, _extends2.default)({}, props, {
    shortcut: shortcut
  })));
}

function FillInserterListItem(props) {
  return (0, _element.createElement)(_components.Fill, {
    name: "Inserter.InlineElements"
  }, function (_ref3) {
    var filterValue = _ref3.filterValue;

    if (filterValue && !isResult(props, filterValue)) {
      return null;
    }

    return (0, _element.createElement)(_inserterListItem.default, (0, _extends2.default)({}, props, {
      icon: (0, _blocks.normalizeIconObject)(props.icon)
    }));
  });
}

var Shortcut =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Shortcut, _Component);

  function Shortcut() {
    var _this;

    (0, _classCallCheck2.default)(this, Shortcut);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Shortcut).apply(this, arguments));
    _this.onUse = _this.onUse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(Shortcut, [{
    key: "onUse",
    value: function onUse() {
      this.props.onUse();
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          character = _this$props.character,
          type = _this$props.type;
      return (0, _element.createElement)(_components.KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: (0, _defineProperty2.default)({}, _keycodes.rawShortcut[type](character), this.onUse)
      });
    }
  }]);
  return Shortcut;
}(_element.Component);

var FormatEdit = function FormatEdit(_ref5) {
  var formatTypes = _ref5.formatTypes,
      onChange = _ref5.onChange,
      value = _ref5.value;
  return (0, _element.createElement)(_element.Fragment, null, formatTypes.map(function (_ref6) {
    var name = _ref6.name,
        Edit = _ref6.edit,
        keywords = _ref6.keywords;

    if (!Edit) {
      return null;
    }

    var activeFormat = (0, _richText.getActiveFormat)(value, name);
    var isActive = activeFormat !== undefined;
    var activeAttributes = isActive ? activeFormat.attributes || {} : {};
    return (0, _element.createElement)(Edit, {
      key: name,
      isActive: isActive,
      activeAttributes: activeAttributes,
      value: value,
      onChange: onChange,
      ToolbarButton: FillToolbarButton,
      InserterListItem: function InserterListItem(props) {
        return (0, _element.createElement)(FillInserterListItem, (0, _extends2.default)({
          keywords: keywords
        }, props));
      },
      Shortcut: Shortcut
    });
  }));
};

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/rich-text'),
      getFormatTypes = _select.getFormatTypes;

  return {
    formatTypes: getFormatTypes()
  };
})(FormatEdit);

exports.default = _default;
//# sourceMappingURL=format-edit.js.map