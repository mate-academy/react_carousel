import React from 'react';
import { CarouselFullShape } from '../Shapes/CarouselFullShape';
import './Carousel.css';
import CarouselList from '../CarouselList/CarouselList';

const Carousel = ({ frameSize, itemWidth, images }) => (
  <div className="Carousel">
    <CarouselList
      itemWidth={itemWidth}
      frameSize={frameSize}
      images={images}
    />
  </div>
);

Carousel.propTypes = CarouselFullShape.isRequired;

export default Carousel;
