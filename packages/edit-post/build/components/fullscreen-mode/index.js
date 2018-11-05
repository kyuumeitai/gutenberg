"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var FullscreenMode =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FullscreenMode, _Component);

  function FullscreenMode() {
    (0, _classCallCheck2.default)(this, FullscreenMode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FullscreenMode).apply(this, arguments));
  }

  (0, _createClass2.default)(FullscreenMode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.sync();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isActive !== prevProps.isActive) {
        this.sync();
      }
    }
  }, {
    key: "sync",
    value: function sync() {
      var isActive = this.props.isActive;

      if (isActive) {
        document.body.classList.add('is-fullscreen-mode');
      } else {
        document.body.classList.remove('is-fullscreen-mode');
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return FullscreenMode;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  return {
    isActive: select('core/edit-post').isFeatureActive('fullscreenMode')
  };
})(FullscreenMode);

exports.default = _default;
//# sourceMappingURL=index.js.map