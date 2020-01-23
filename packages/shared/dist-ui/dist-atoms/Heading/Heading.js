"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Heading = props => {
  const HeadingLevel = `h${props.level}`;
  return _react.default.createElement(HeadingLevel, null, 'Hello! Alpha App');
};

var _default = Heading;
exports.default = _default;