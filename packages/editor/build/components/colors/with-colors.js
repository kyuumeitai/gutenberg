"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var DEFAULT_COLORS = [];
/**
 * Higher-order component, which handles color logic for class generation
 * color value, retrieval and color attribute setting.
 *
 * @param {...(object|string)} args The arguments can be strings or objects. If the argument is an object,
 *                                  it should contain the color attribute name as key and the color context as value.
 *                                  If the argument is a string the value should be the color attribute name,
 *                                  the color context is computed by applying a kebab case transform to the value.
 *                                  Color context represents the context/place where the color is going to be used.
 *                                  The class name of the color is generated using 'has' followed by the color name
 *                                  and ending with the color context all in kebab case e.g: has-green-background-color.
 *
 *
 * @return {Function} Higher-order component.
 */

var _default = function _default() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var colorMap = (0, _lodash.reduce)(args, function (colorObject, arg) {
    return (0, _objectSpread2.default)({}, colorObject, (0, _lodash.isString)(arg) ? (0, _defineProperty2.default)({}, arg, (0, _lodash.kebabCase)(arg)) : arg);
  }, {});
  return (0, _compose.createHigherOrderComponent)((0, _compose.compose)([(0, _data.withSelect)(function (select) {
    var settings = select('core/editor').getEditorSettings();
    return {
      colors: (0, _lodash.get)(settings, ['colors'], DEFAULT_COLORS)
    };
  }), function (WrappedComponent) {
    return (
      /*#__PURE__*/
      function (_Component) {
        (0, _inherits2.default)(_class, _Component);

        function _class(props) {
          var _this;

          (0, _classCallCheck2.default)(this, _class);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).call(this, props));
          _this.setters = _this.createSetters();
          _this.colorUtils = {
            getMostReadableColor: _this.getMostReadableColor.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)))
          };
          _this.state = {};
          return _this;
        }

        (0, _createClass2.default)(_class, [{
          key: "getMostReadableColor",
          value: function getMostReadableColor(colorValue) {
            var colors = this.props.colors;
            return (0, _utils.getMostReadableColor)(colors, colorValue);
          }
        }, {
          key: "createSetters",
          value: function createSetters() {
            var _this2 = this;

            return (0, _lodash.reduce)(colorMap, function (settersAccumulator, colorContext, colorAttributeName) {
              var upperFirstColorAttributeName = (0, _lodash.upperFirst)(colorAttributeName);
              var customColorAttributeName = "custom".concat(upperFirstColorAttributeName);
              settersAccumulator["set".concat(upperFirstColorAttributeName)] = _this2.createSetColor(colorAttributeName, customColorAttributeName);
              return settersAccumulator;
            }, {});
          }
        }, {
          key: "createSetColor",
          value: function createSetColor(colorAttributeName, customColorAttributeName) {
            var _this3 = this;

            return function (colorValue) {
              var _this3$props$setAttri;

              var colorObject = (0, _utils.getColorObjectByColorValue)(_this3.props.colors, colorValue);

              _this3.props.setAttributes((_this3$props$setAttri = {}, (0, _defineProperty2.default)(_this3$props$setAttri, colorAttributeName, colorObject && colorObject.slug ? colorObject.slug : undefined), (0, _defineProperty2.default)(_this3$props$setAttri, customColorAttributeName, colorObject && colorObject.slug ? undefined : colorValue), _this3$props$setAttri));
            };
          }
        }, {
          key: "render",
          value: function render() {
            return (0, _element.createElement)(WrappedComponent, (0, _objectSpread2.default)({}, this.props, {
              colors: undefined
            }, this.state, this.setters, {
              colorUtils: this.colorUtils
            }));
          }
        }], [{
          key: "getDerivedStateFromProps",
          value: function getDerivedStateFromProps(_ref2, previousState) {
            var attributes = _ref2.attributes,
                colors = _ref2.colors;
            return (0, _lodash.reduce)(colorMap, function (newState, colorContext, colorAttributeName) {
              var colorObject = (0, _utils.getColorObjectByAttributeValues)(colors, attributes[colorAttributeName], attributes["custom".concat((0, _lodash.upperFirst)(colorAttributeName))]);
              var previousColorObject = previousState[colorAttributeName];
              var previousColor = (0, _lodash.get)(previousColorObject, ['color']);
              /**
              * The "and previousColorObject" condition checks that a previous color object was already computed.
              * At the start previousColorObject and colorValue are both equal to undefined
              * bus as previousColorObject does not exist we should compute the object.
              */

              if (previousColor === colorObject.color && previousColorObject) {
                newState[colorAttributeName] = previousColorObject;
              } else {
                newState[colorAttributeName] = (0, _objectSpread2.default)({}, colorObject, {
                  class: (0, _utils.getColorClassName)(colorContext, colorObject.slug)
                });
              }

              return newState;
            }, {});
          }
        }]);
        return _class;
      }(_element.Component)
    );
  }]), 'withColors');
};

exports.default = _default;
//# sourceMappingURL=with-colors.js.map