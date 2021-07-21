import PropTypes from 'prop-types';

export const carouselPropTypees = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
};
