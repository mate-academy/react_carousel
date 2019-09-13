import PropTypes from 'prop-types';

export const ButtonTypes = {
  text: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
};

export const CarouselTypes = {
  horses: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export const HorseTypes = {
  horse: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
};
