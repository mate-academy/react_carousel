import PropTypes from 'prop-types';

export const ShapeCarouselImg = PropTypes.shape({
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
});

export const ShapeCarousel = PropTypes.shape({
  images: PropTypes.arrayOf(ShapeCarouselImg).isRequired,
  marginItem: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  slide: PropTypes.func.isRequired,
});

export const ShapePrevious = PropTypes.shape({
  previous: PropTypes.func.isRequired,
});
