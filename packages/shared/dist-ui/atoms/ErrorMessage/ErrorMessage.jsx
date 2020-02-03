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

const ErrorMessage = props => {
  const { className, isVisible, enabled, type, ...others } = props;

  if (isVisible && enabled) {
    return (
      <p className={classnames(className, type)} {...others}>
        {props.children}
      </p>
    );
  }
  return null;
};

ErrorMessage.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  enabled: PropTypes.bool
};

ErrorMessage.defaultProps = {
  children: null,
  className: null,
  isVisible: false,
  type: "error"
};

export default ErrorMessage;
