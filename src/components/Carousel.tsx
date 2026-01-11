import React, { useState } from 'react';
import './Carousel.scss';

type CarouselType = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselType> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);
  const moveX = position * itemWidth * step;
  const carouselListWidth = images.length * itemWidth;

  return (
    <div className="Carousel" style={{ width: frameSize * itemWidth }}>
      <ul
        className="Carousel__list"
        style={{
          width: carouselListWidth,
          transform: `translateX(-${moveX}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, idx) => (
          <li key={image + idx} style={{ width: itemWidth }}>
            <img src={image} alt={image} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          if (moveX < 0) {
            setPosition(prev => prev - 1);
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          if (moveX < carouselListWidth) {
            setPosition(prev => prev + 1);
          } else {
            setPosition(0);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
