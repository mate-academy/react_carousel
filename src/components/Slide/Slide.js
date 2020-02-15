import React from 'react';
import PropTypes from 'prop-types';

export const Slide = (props) => {
  const { image } = props;

  return (
    <li>
      <img src={image} alt="Smile." />
    </li>
  );
};

Slide.propTypes = {
  image: PropTypes.string.isRequired,
};
