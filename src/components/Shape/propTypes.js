import PropTypes from 'prop-types';

export const CarouselTypes = {
  images: PropTypes.arrayOf(PropTypes.number).isRequired,
  CarouselWidth: PropTypes.number.isRequired,
  animation: PropTypes.number.isRequired,
  transform: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,

};

export const ButtonsTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};
