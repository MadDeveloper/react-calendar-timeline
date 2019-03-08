'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineStateConsumer = exports.TimelineStateProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactContext2 = require('create-react-context');

var _createReactContext3 = _interopRequireDefault(_createReactContext2);

var _calendar = require('../utility/calendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/

/* eslint-disable no-console */
var defaultContextState = {
  getTimelineState: function getTimelineState() {
    console.warn('"getTimelineState" default func is being used');
  },
  getLeftOffsetFromDate: function getLeftOffsetFromDate() {
    console.warn('"getLeftOffsetFromDate" default func is being used');
  },
  getDateFromLeftOffsetPosition: function getDateFromLeftOffsetPosition() {
    console.warn('"getDateFromLeftOffsetPosition" default func is being used');
  }
  /* eslint-enable */

};
var _createReactContext = (0, _createReactContext3.default)(defaultContextState),
    Consumer = _createReactContext.Consumer,
    Provider = _createReactContext.Provider;

var TimelineStateProvider = exports.TimelineStateProvider = function (_React$Component) {
  _inherits(TimelineStateProvider, _React$Component);

  function TimelineStateProvider(props) {
    _classCallCheck(this, TimelineStateProvider);

    var _this = _possibleConstructorReturn(this, (TimelineStateProvider.__proto__ || Object.getPrototypeOf(TimelineStateProvider)).call(this, props));

    _this.getTimelineState = function () {
      return _extends({}, _this.state);
    };

    _this.getLeftOffsetFromDate = function (date) {
      var _this$props = _this.props,
          canvasTimeStart = _this$props.canvasTimeStart,
          canvasTimeEnd = _this$props.canvasTimeEnd,
          canvasWidth = _this$props.canvasWidth;

      return (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, date);
    };

    _this.getDateFromLeftOffsetPosition = function (leftOffset) {
      var _this$props2 = _this.props,
          canvasTimeStart = _this$props2.canvasTimeStart,
          canvasTimeEnd = _this$props2.canvasTimeEnd,
          canvasWidth = _this$props2.canvasWidth;

      return (0, _calendar.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset);
    };

    _this.state = {
      timelineContext: {
        getTimelineState: _this.getTimelineState,
        getLeftOffsetFromDate: _this.getLeftOffsetFromDate,
        getDateFromLeftOffsetPosition: _this.getDateFromLeftOffsetPosition,
        utcOffset: _this.props.utcOffset,
        applyLocalOffset: _this.props.applyLocalOffset
      }
    };
    return _this;
  }
  /* eslint-disable react/no-unused-prop-types */


  _createClass(TimelineStateProvider, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Provider,
        { value: this.state.timelineContext },
        this.props.children
      );
    }
  }]);

  return TimelineStateProvider;
}(_react2.default.Component);

TimelineStateProvider.propTypes = {
  children: _propTypes2.default.element.isRequired,
  visibleTimeStart: _propTypes2.default.number.isRequired,
  visibleTimeEnd: _propTypes2.default.number.isRequired,
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  utcOffset: _propTypes2.default.number.isRequired,
  applyLocalOffset: _propTypes2.default.bool.isRequired
};
var TimelineStateConsumer = exports.TimelineStateConsumer = Consumer;