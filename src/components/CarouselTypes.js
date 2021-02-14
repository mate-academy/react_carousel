import PropTypes from 'prop-types';

export const CarouselTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
  indexFrame: PropTypes.number,
};

export const CarouselDefault = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
  indexFrame: 0,
};
