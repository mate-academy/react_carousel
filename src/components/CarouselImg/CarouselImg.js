import React from 'react';
import { ShapeCarouselImg } from '../Shapes';

export const CarouselImg = props => (
  <li className="images">
    <img
      key={props.image}
      src={props.image}
      alt={props.index + 1}
    />
  </li>
);

CarouselImg.propTypes = ShapeCarouselImg.isRequired;
