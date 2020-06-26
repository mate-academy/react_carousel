import React from 'react';
import { MainShape } from '../../shapes';

export const CarouselItem = (props) => {
  const { img, itemWidth } = props;

  return (
    <img src={img} style={{ width: itemWidth }} alt="Smile" />
  );
};

CarouselItem.propTypes = MainShape.isRequired;
