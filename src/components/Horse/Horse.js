import React from 'react';
import './Horse.scss';
import { HorseTypes } from '../../constants/proptypes';

const Horse = ({ horse, alt }) => (
  <li>
    <img className="carousel__horse" src={horse} alt={alt} />
  </li>
);

Horse.propTypes = HorseTypes;

export default Horse;
