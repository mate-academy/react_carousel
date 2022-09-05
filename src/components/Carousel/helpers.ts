import CarouselType from '../../types/CarouselType';

type Props = CarouselType;

export const getFrameSize = (props: Props): number => {
  const {
    frameSize,
    itemWidth,
    itemGap,
    carouselMaxWidth,
  } = props;
  const maxFrames = Math.floor(
    (carouselMaxWidth + itemGap) / (itemWidth + itemGap),
  );

  return frameSize <= maxFrames ? frameSize : maxFrames;
};
