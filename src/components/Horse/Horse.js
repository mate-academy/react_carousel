import React from 'react';
import './Horse.scss';
import { HorseTypes } from '../../constants/proptypes';

const Horse = ({ horse, alt, itemWidth }) => (
  <li>
    <img
      className="carousel__horse"
      src={horse}
      alt={alt}
      style={{
        width: itemWidth,
        height: itemWidth,
      }}
    />
  </li>
);

Horse.propTypes = HorseTypes;

export default Horse;
