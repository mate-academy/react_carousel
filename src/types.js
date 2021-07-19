import PropTypes, { string } from 'prop-types';

export const carouselShape = {
  images: PropTypes.arrayOf(string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export const imegeListShape = {
  listStyles: PropTypes.shape({
    width: PropTypes.string.isRequired,
    transitionDuration: PropTypes.string.isRequired,
    transform: PropTypes.string.isRequired,
  }).isRequired,
  imgStyles: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string.isRequired,
};
