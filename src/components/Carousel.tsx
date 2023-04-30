import React from 'react';
import './Carousel.scss';

type Props = {
  arrOfCarousel: string[],
  frameSize: number,
  itemWidth: number,
  animationDuration: string,
};

export const Carousel: React.FC<Props>
  = ({
    arrOfCarousel = [],
    frameSize = 390,
    itemWidth = 130,
    animationDuration,
  }) => (
    <div className="Carousel__list" style={{ width: `${frameSize}px` }}>
      <ul className="Carousel__list">
        {arrOfCarousel.map((image) => (
          <li key={image} className="Carousel__li-item">
            <img
              src={image}
              alt="1"
              className="Carousel__image"
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px`, animationDuration: `${animationDuration}s` }}
              key={image}
            />
          </li>
        ))}
      </ul>

    </div>
  );
