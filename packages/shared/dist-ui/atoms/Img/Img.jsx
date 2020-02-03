import React from "react";
import PropTypes from "prop-types";

const Img = props => {
  const { src, alt, loading, ...others } = props;

  return <React.Fragment />;
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
  src: null,
  loading: 'lazy',
};

export default Img;
