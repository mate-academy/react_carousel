
import PropType from 'prop-types';

export const CarouselShape = {
  images: PropType.arrayOf(PropType.string).isRequired,
  itemWidth: PropType.number,
  frameSize: PropType.number,
  step: PropType.number,
  animationDuration: PropType.number,
  infinite: PropType.bool,
};

export const CarouselDefaults = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

export const ImageShape = {
  image: PropType.string.isRequired,
  alt: PropType.number.isRequired,
  imageWidth: PropType.number,
};
