import React from 'react';

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
      {images.map((image, index) => (
        <li
          className="Carousel__item"
          key={image}
        >
          <img
            src={image}
            alt={`icon-${index + 1}`}
            width={imageSize}
          />
        </li>
      ))}
    </ul>
  );
};
