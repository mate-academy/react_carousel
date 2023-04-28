import React from 'react';
import './Carousel.scss';

type Props = {
  arrOfCarousel: string[],
  frameSize: number,
  itemWidth: number,
};

const Carousel: React.FC<Props>
  = ({ arrOfCarousel = [], frameSize = 390, itemWidth = 130 }) => (
    <ul className="Carousel__list" style={{ width: `${frameSize}px` }}>
      {arrOfCarousel.map((image) => (
        <li key={image}>
          <img
            src={image}
            alt="1"
            className="Carousel__image"
            style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
            key={image}
          />
        </li>
      ))}
    </ul>
  );

export default Carousel;
