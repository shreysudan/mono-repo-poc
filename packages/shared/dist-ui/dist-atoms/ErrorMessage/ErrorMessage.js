"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Error Message: A <p> tag that displays the error information
 * @param  {[string]} className [string of all the classnames given by the user]
 * @param  {[bool]} isVisible [switch for whether to render error message or not]
 * @param  {[string]} type [type of error: error/ warning/ info, will be added as a className]
 * @param  {[string]} errorColor [custom color to be given to error]
 * @param  {[any]} children [the information displayed as error; required parameter]
 * @return {[html tag]} <p> [returns a paragraph tag with all the default attributes and given by the user]
 */
const ErrorMessage = props => {
  const {
    className,
    isVisible,
    type,
    ...others
  } = props;

  if (isVisible) {
    return _react.default.createElement("p", _extends({
      className: (0, _classnames.default)(className, type)
    }, others), props.children);
  }

  return null;
};

ErrorMessage.propTypes = {
  children: _propTypes.default.any.isRequired,
  className: _propTypes.default.string,
  isVisible: _propTypes.default.bool,
  type: _propTypes.default.string
};
ErrorMessage.defaultProps = {
  children: null,
  className: null,
  isVisible: false,
  type: "error"
};
var _default = ErrorMessage;
exports.default = _default;