import PropTypes from 'prop-types';

export const CarouselShapes = PropTypes.shape({
  images: PropTypes.string.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  currentPos: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
});
