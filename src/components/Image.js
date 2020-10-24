import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ imgSrc, index, width }) => (
  <li>
    <img
      src={imgSrc}
      alt={index}
      className="App__image"
      width={`${width}px`}
    />
  </li>
);

Image.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Image;
