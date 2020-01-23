import React from "react";
import PropTypes from "prop-types";

const Img = props => {
  const { src, alt, loading, ...others } = props;

  // By default images will get lazy loaded
  return <img src={src} alt={alt} loading={loading} {...others} />;
};

Img.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired
  ]),
  loading: PropTypes.string
};

Img.defaultProps = {
  alt: "",
  src: null,
  loading: 'lazy'
};

export default Img;
