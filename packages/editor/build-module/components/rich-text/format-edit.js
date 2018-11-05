import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { normalizeIconObject } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { getActiveFormat } from '@wordpress/rich-text';
import { Fill, KeyboardShortcuts, ToolbarButton } from '@wordpress/components';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import InserterListItem from '../inserter-list-item';
import { normalizeTerm } from '../inserter/menu';

function isResult(_ref, filterValue) {
  var title = _ref.title,
      _ref$keywords = _ref.keywords,
      keywords = _ref$keywords === void 0 ? [] : _ref$keywords;
  var normalizedSearchTerm = normalizeTerm(filterValue);

  var matchSearch = function matchSearch(string) {
    return normalizeTerm(string).indexOf(normalizedSearchTerm) !== -1;
  };

  return matchSearch(title) || keywords.some(matchSearch);
}

function FillToolbarButton(_ref2) {
  var name = _ref2.name,
      shortcutType = _ref2.shortcutType,
      shortcutCharacter = _ref2.shortcutCharacter,
      props = _objectWithoutProperties(_ref2, ["name", "shortcutType", "shortcutCharacter"]);

  var shortcut;
  var fillName = 'RichText.ToolbarControls';

  if (name) {
    fillName += ".".concat(name);
  }

  if (shortcutType && shortcutCharacter) {
    shortcut = displayShortcut[shortcutType](shortcutCharacter);
  }

  return createElement(Fill, {
    name: fillName
  }, createElement(ToolbarButton, _extends({}, props, {
    shortcut: shortcut
  })));
}

function FillInserterListItem(props) {
  return createElement(Fill, {
    name: "Inserter.InlineElements"
  }, function (_ref3) {
    var filterValue = _ref3.filterValue;

    if (filterValue && !isResult(props, filterValue)) {
      return null;
    }

    return createElement(InserterListItem, _extends({}, props, {
      icon: normalizeIconObject(props.icon)
    }));
  });
}

var Shortcut =
/*#__PURE__*/
function (_Component) {
  _inherits(Shortcut, _Component);

  function Shortcut() {
    var _this;

    _classCallCheck(this, Shortcut);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Shortcut).apply(this, arguments));
    _this.onUse = _this.onUse.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Shortcut, [{
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
      return createElement(KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: _defineProperty({}, rawShortcut[type](character), this.onUse)
      });
    }
  }]);

  return Shortcut;
}(Component);

var FormatEdit = function FormatEdit(_ref5) {
  var formatTypes = _ref5.formatTypes,
      onChange = _ref5.onChange,
      value = _ref5.value;
  return createElement(Fragment, null, formatTypes.map(function (_ref6) {
    var name = _ref6.name,
        Edit = _ref6.edit,
        keywords = _ref6.keywords;

    if (!Edit) {
      return null;
    }

    var activeFormat = getActiveFormat(value, name);
    var isActive = activeFormat !== undefined;
    var activeAttributes = isActive ? activeFormat.attributes || {} : {};
    return createElement(Edit, {
      key: name,
      isActive: isActive,
      activeAttributes: activeAttributes,
      value: value,
      onChange: onChange,
      ToolbarButton: FillToolbarButton,
      InserterListItem: function InserterListItem(props) {
        return createElement(FillInserterListItem, _extends({
          keywords: keywords
        }, props));
      },
      Shortcut: Shortcut
    });
  }));
};

export default withSelect(function (select) {
  var _select = select('core/rich-text'),
      getFormatTypes = _select.getFormatTypes;

  return {
    formatTypes: getFormatTypes()
  };
})(FormatEdit);
//# sourceMappingURL=format-edit.js.map