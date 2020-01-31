import React from "react";

const Heading = props => {
  const HeadingLevel = `h${props.level}`;
  return <HeadingLevel>{props.content}</HeadingLevel>;
};

export default Heading;
