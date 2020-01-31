"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Img = props => {
  const {
    src,
    alt,
    loading,
    ...others
  } = props;
  return _react.default.createElement(_react.default.Fragment, null);
};

Img.propTypes = {
  alt: _propTypes.default.string.isRequired,
  src: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.array.isRequired])
};
Img.defaultProps = {
  alt: "",
  src: null,
  loading: 'lazy'
};
var _default = Img;
exports.default = _default;