import PropTypes from 'prop-types';

export const MainShape = PropTypes.shape({
  images: PropTypes.arrayOf(PropTypes.string.isRequired),
  step: PropTypes.number,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
});

export const ButtonsShape = PropTypes.shape({
  prevSlide: PropTypes.func,
  nextSlide: PropTypes.func,
});
