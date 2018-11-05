"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AutosaveMonitor = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var AutosaveMonitor =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AutosaveMonitor, _Component);

  function AutosaveMonitor() {
    (0, _classCallCheck2.default)(this, AutosaveMonitor);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AutosaveMonitor).apply(this, arguments));
  }

  (0, _createClass2.default)(AutosaveMonitor, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          isDirty = _this$props.isDirty,
          editsReference = _this$props.editsReference,
          isAutosaveable = _this$props.isAutosaveable;

      if (prevProps.isDirty !== isDirty || prevProps.isAutosaveable !== isAutosaveable || prevProps.editsReference !== editsReference) {
        this.toggleTimer(isDirty && isAutosaveable);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleTimer(false);
    }
  }, {
    key: "toggleTimer",
    value: function toggleTimer(isPendingSave) {
      var _this = this;

      clearTimeout(this.pendingSave);
      var autosaveInterval = this.props.autosaveInterval;

      if (isPendingSave) {
        this.pendingSave = setTimeout(function () {
          return _this.props.autosave();
        }, autosaveInterval * 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return AutosaveMonitor;
}(_element.Component);

exports.AutosaveMonitor = AutosaveMonitor;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isEditedPostDirty = _select.isEditedPostDirty,
      isEditedPostAutosaveable = _select.isEditedPostAutosaveable,
      getEditorSettings = _select.getEditorSettings,
      getReferenceByDistinctEdits = _select.getReferenceByDistinctEdits;

  var _getEditorSettings = getEditorSettings(),
      autosaveInterval = _getEditorSettings.autosaveInterval;

  return {
    isDirty: isEditedPostDirty(),
    isAutosaveable: isEditedPostAutosaveable(),
    editsReference: getReferenceByDistinctEdits(),
    autosaveInterval: autosaveInterval
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    autosave: dispatch('core/editor').autosave
  };
})])(AutosaveMonitor);

exports.default = _default;
//# sourceMappingURL=index.js.map