import React from 'react';
import './CarouselItem.scss';

type Props = {
  images: string[];
  animationDuration: number;
  frameSize: number;
  itemWidth: number,
  currentIndex: number,
};

export const CarouselItem: React.FC<Props> = ({
  images,
  animationDuration,
  frameSize,
  itemWidth,
  currentIndex,
}) => {
  return (
    <div
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
      className="gallery"
    >
      <ul className="gallery__list">
        {images.map((image) => (
          <li
            key={image}
            style={{
              transform: `translateX(${-currentIndex * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              style={{ width: `${itemWidth}px` }}
              src={`../img/${image}`}
              alt={`Imagin-${image}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
