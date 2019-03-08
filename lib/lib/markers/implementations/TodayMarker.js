'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultRenderer = (0, _shared.createDefaultRenderer)('default-today-line');

/** Marker that is placed based on current date.  This component updates itself on
 * a set interval, dictated by the 'interval' prop.
 */

var TodayMarker = function (_React$Component) {
  _inherits(TodayMarker, _React$Component);

  function TodayMarker(props) {
    _classCallCheck(this, TodayMarker);

    var _this = _possibleConstructorReturn(this, (TodayMarker.__proto__ || Object.getPrototypeOf(TodayMarker)).call(this, props));

    _this.getDate = function () {
      return _this.props.applyLocalOffset ? Date.now() - new Date().getTimezoneOffset() * 60 * 1000 : Date.now();
    };

    _this.state = {
      date: _this.getDate()
    };
    return _this;
  }

  _createClass(TodayMarker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.intervalToken = this.createIntervalUpdater(this.props.interval);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.interval !== this.props.interval) {
        clearInterval(this.intervalToken);
        this.intervalToken = this.createIntervalUpdater(this.props.interval);
      }
    }
  }, {
    key: 'createIntervalUpdater',
    value: function createIntervalUpdater(interval) {
      var _this2 = this;

      return setInterval(function () {
        _this2.setState({
          date: _this2.getDate()
        });
      }, interval);
    }

    // FIXME: use date utils pass in as props

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.intervalToken);
    }
  }, {
    key: 'render',
    value: function render() {
      var date = this.state.date;

      var leftOffset = this.props.getLeftOffsetFromDate(date);
      var styles = (0, _shared.createMarkerStylesWithLeftOffset)(leftOffset);
      return this.props.renderer({ styles: styles, date: date });
    }
  }]);

  return TodayMarker;
}(_react2.default.Component);

TodayMarker.propTypes = {
  getLeftOffsetFromDate: _propTypes2.default.func.isRequired,
  renderer: _propTypes2.default.func,
  interval: _propTypes2.default.number.isRequired,
  applyLocalOffset: _propTypes2.default.bool.isRequired
};
TodayMarker.defaultProps = {
  renderer: defaultRenderer
};
exports.default = TodayMarker;