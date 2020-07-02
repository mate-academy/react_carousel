import React from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';
import { CarouselList } from '../CarouselList/CarouselList';

export const Carousel = (props) => {
  const { images,
    frameSize,
    itemWidth,
    animationDuration,
    onNext,
    onPrev,
    translate } = props;

  return (
    <div className="carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <CarouselList
        images={images}
        itemWidth={itemWidth}
        translate={translate}
        animationDuration={animationDuration}
      />

      <button type="button" onClick={onPrev}>Prev</button>
      <button type="button" onClick={onNext}>Next</button>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  translate: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};
