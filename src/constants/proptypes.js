import PropTypes from 'prop-types';

export const CarouselTypes = {
  horses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const HorseTypes = {
  horse: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
