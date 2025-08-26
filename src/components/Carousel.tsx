import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration: number;
  infinite?: boolean;
  carouselWidth: number;
};

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  animationDuration = 1000,
  carouselWidth,
}) => {
  return (
    <div className="Carousel">
      <div
        className="container"
        style={{ width: itemWidth * frameSize + 'px' }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${carouselWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li key={image} style={{ width: `${itemWidth}px` }}>
              <img
                src={image}
                alt={`Image ${image.match(/\d+/)?.[0] || 'img'}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
