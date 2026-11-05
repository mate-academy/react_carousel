import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  itemWidth?: number;
  frameSize?: number;
  animationDuration?: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  itemWidth = 130,
  frameSize = 3,
  animationDuration = 1000 }) => {
  const [startIndex, setStartIndex] = useState(0);

  return (
    <div className="Carousel"
      style={{ width: frameSize * itemWidth, }}>
      <div className="Carousel__controls">
      </div>
      <ul className="Carousel__list"
        style={{
          transform: `translateX(-${startIndex * itemWidth}px)`,
          transitionProperty: 'transform',
          transitionDuration: `${animationDuration}ms`,
        }}>
        {images.map((imageUrl, index) => (
          <li
            data-cy="carousel-item"
            key={index}
            style={{ width: itemWidth }}
          >
            <img
              data-cy="carousel-image"
              src={imageUrl}
              alt={`Image ${index}`}
              className='carousel-image'
              width={itemWidth}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button type="button"
        data-cy="prev"
        onClick={() => setStartIndex(startIndex - step)}
      >Prev</button>
      <button type="button"
        data-cy="next"
        onClick={() => setStartIndex(startIndex + step)}
      >Next</button>
    </div >
  );
};

export default Carousel;
