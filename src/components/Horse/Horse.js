import React from 'react';
import './Horse.scss';
import { HorseTypes } from '../../constants/proptypes';

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

Horse.propTypes = HorseTypes;

export default Horse;
