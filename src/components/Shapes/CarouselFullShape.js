
import PropTypes from 'prop-types';

export const CarouselFullShape = PropTypes.shape({
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
});
