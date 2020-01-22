import React from "react";
import PropTypes from "prop-types";

const Img = props => {
  const { src, alt, ...others } = props;

  return <img src={src} alt={alt} {...others} />;
};

Img.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired
  ])
};

Img.defaultProps = {
  alt: "",
  src: null
};

export default Img;
