import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import CarouselList from './CarouselList';
import CarouselButton from './CarouselButton';

const Carousel = ({
  images,
  settings,
  handleScroll,
  offset,
  shift,
}) => (
  <div className="carousel">
    <div
      className="carousel__container"
      style={{
        width: `${settings.frameSize * settings.itemWidth}px`,
        height: `${settings.itemHeight}px`,
      }}
    >
      <CarouselList
        images={images}
        itemWidth={settings.itemWidth}
        itemHeight={settings.itemHeight}
        offset={offset}
        shift={shift}
        animationDuration={settings.animationDuration}
      />
    </div>
    <CarouselButton dir={1} handler={handleScroll} />
    <CarouselButton dir={-1} handler={handleScroll} />
  </div>
);

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  settings: PropTypes.shape({
    step: PropTypes.number,
    frameSize: PropTypes.number,
    itemWidth: PropTypes.number,
    itemHeight: PropTypes.number,
    animationDuration: PropTypes.number.isRequired,
  }).isRequired,
  handleScroll: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  shift: PropTypes.number.isRequired,
};

export default Carousel;
