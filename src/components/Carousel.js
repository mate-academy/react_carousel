import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';
import FlipButtons from './FlipButtons';
import '../components_css/Carousel.css';

const Carousel = ({
  images, handleFlip, currIndex, frameSize, itemWidth, animationDuration,
}) => (
  <div className="Carousel">
    <ul
      className="Carousel__list"
      style={{ width: `${frameSize * itemWidth}px` }}
    >
      <ImageItem
        images={images}
        currIndex={currIndex}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </ul>

    <FlipButtons handleFlip={handleFlip} />
  </div>
);

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFlip: PropTypes.func.isRequired,
  currIndex: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
