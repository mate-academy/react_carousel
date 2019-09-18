import PropTypes from 'prop-types';

export const FormTypes = {
  onChange: PropTypes.func.isRequired,
};

export const InputTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export const CheckboxTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export const ButtonTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
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
  alt: PropTypes.number.isRequired,
  itemSize: PropTypes.number.isRequired,
};
