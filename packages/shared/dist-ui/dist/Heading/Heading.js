import React from "react";

var Heading = function Heading(props) {
  var HeadingLevel = "h".concat(props.level);
  return React.createElement(HeadingLevel, null, 'Hello! Alpha App');
};

export default Heading;