function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
/**
 * Error Message: A <p> tag that displays the error information
 * @param  {[string]} className [string of all the classnames given by the user]
 * @param  {[bool]} isVisible [switch for whether to render error message or not]
 * @param  {[string]} type [type of error: error/ warning/ info, will be added as a className]
 * @param  {[string]} errorColor [custom color to be given to error]
 * @param  {[any]} children [the information displayed as error; required parameter]
 * @return {[html tag]} <p> [returns a paragraph tag with all the default attributes and given by the user]
 */

var ErrorMessage = function ErrorMessage(props) {
  var className = props.className,
      isVisible = props.isVisible,
      type = props.type,
      others = _objectWithoutProperties(props, ["className", "isVisible", "type"]);

  if (isVisible) {
    return React.createElement("p", _extends({
      className: classnames(className, type)
    }, others), props.children);
  }

  return null;
};

ErrorMessage.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  type: PropTypes.string
};
ErrorMessage.defaultProps = {
  children: null,
  className: null,
  isVisible: false,
  type: "error"
};
export default ErrorMessage;