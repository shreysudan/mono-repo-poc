"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AnchorTag = props => {
  return _react.default.createElement("a", {
    href: props.href
  }, props.content);
};

var _default = AnchorTag;
exports.default = _default;