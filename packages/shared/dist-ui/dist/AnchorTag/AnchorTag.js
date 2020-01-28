import React from "react";

var AnchorTag = function AnchorTag(props) {
  return React.createElement("a", {
    href: props.href
  }, props.content);
};

export default AnchorTag;