import React from 'react';
import PropTypes from 'prop-types';

import './Horse.scss';

const Horse = ({ horse, alt, itemSize }) => (
  <li>
    <img
      className="carousel__horse"
      src={horse}
      alt={alt}
      style={{
        width: itemSize,
        height: itemSize,
      }}
    />
  </li>
);

Horse.propTypes = {
  horse: PropTypes.string.isRequired,
  alt: PropTypes.number.isRequired,
  itemSize: PropTypes.number.isRequired,
};

export default Horse;
