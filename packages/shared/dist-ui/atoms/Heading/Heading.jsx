import React from "react";

const Heading = props => {
  const HeadingLevel = `h${props.level}`;
  return <HeadingLevel>{'Hello! Alpha App'}</HeadingLevel>;
};

export default Heading;
