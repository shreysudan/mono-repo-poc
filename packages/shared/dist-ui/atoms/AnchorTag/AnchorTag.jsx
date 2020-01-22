import React from "react";

const AnchorTag = props => {
  return <a href={props.href}>{props.content}</a>;
};

export default AnchorTag;
