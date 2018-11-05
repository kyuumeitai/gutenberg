import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
/**
 * Module Constants
 */

var TIMEZONELESS_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker() {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).apply(this, arguments));
    _this.onChangeMoment = _this.onChangeMoment.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DatePicker, [{
    key: "onChangeMoment",
    value: function onChangeMoment(newDate) {
      var _this$props = this.props,
          currentDate = _this$props.currentDate,
          onChange = _this$props.onChange;
      var momentDate = currentDate ? moment(currentDate) : moment();
      var momentTime = {
        hours: momentDate.hours(),
        minutes: momentDate.minutes(),
        seconds: momentDate.seconds()
      };
      onChange(newDate.set(momentTime).format(TIMEZONELESS_FORMAT));
    }
  }, {
    key: "render",
    value: function render() {
      var currentDate = this.props.currentDate;
      var momentDate = currentDate ? moment(currentDate) : moment();
      return createElement("div", {
        className: "components-datetime__date"
      }, createElement(DayPickerSingleDateController, {
        block: true,
        date: momentDate,
        daySize: 30,
        focused: true,
        hideKeyboardShortcutsPanel: true // This is a hack to force the calendar to update on month or year change
        // https://github.com/airbnb/react-dates/issues/240#issuecomment-361776665
        ,
        key: "datepicker-controller-".concat(momentDate.format('MM-YYYY')),
        noBorder: true,
        numberOfMonths: 1,
        onDateChange: this.onChangeMoment,
        transitionDuration: 0,
        weekDayFormat: "ddd"
      }));
    }
  }]);

  return DatePicker;
}(Component);

export default DatePicker;
//# sourceMappingURL=date.js.map