"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Img = props => {
  const {
    src,
    alt,
    ...others
  } = props;
  return _react.default.createElement("img", _extends({
    src: src,
    alt: alt
  }, others));
};

Img.propTypes = {
  alt: _propTypes.default.string.isRequired,
  src: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.array.isRequired])
};
Img.defaultProps = {
  alt: "",
  src: null
};
var _default = Img;
exports.default = _default;