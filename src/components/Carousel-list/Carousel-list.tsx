import React from 'react';
import { Image } from '../Image';

interface Props {
  images: string[];
  transformImage: number;
  frameSize: number;
  animationDuration: number;
  imageSize: number;
}
export const CarouselList: React.FC<Props> = ({
  images,
  transformImage,
  frameSize,
  animationDuration,
  imageSize,
}) => {
  return (
    <ul
      className="Carousel__list"
      style={{
        transform: `translateX(${transformImage}px)`,
        width: `${frameSize * imageSize}px`,
        transition: `transform ${animationDuration}ms`,
      }}
    >
      {images.map((image, index) => {
        return (
          <Image
            key={image}
            image={image}
            index={index}
            imageSize={imageSize}
          />
        );
      })}
    </ul>
  );
};
