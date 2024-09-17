import { useCarouselItem, type UseCarouselItemProps } from './useCarouselItem';
import './CarouselItem.scss';

interface ImageProps {
  url: string;
  alt: string;
}

export interface CarouselItemProps extends UseCarouselItemProps {
  imageProps: ImageProps;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  imageProps,
  ...rest
}) => {
  const { imgRef, imgWidth, carouselItemStyles, imageStyles } = useCarouselItem(
    {
      ...rest,
    },
  );

  return (
    <li className="carousel-item" style={carouselItemStyles}>
      <img
        ref={imgRef}
        width={imgWidth}
        src={imageProps.url}
        style={imageStyles}
        alt={`${imageProps.alt}`}
      />
    </li>
  );
};
