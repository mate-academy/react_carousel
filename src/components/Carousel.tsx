import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex(prev => {
    if (infinite) {
      if (prev === (images.length - frameSize)) {
        return 0;
      }

      return Math.min(prev + step, images.length - frameSize);
    }

    return Math.min(prev + step, images.length - frameSize);
  });

  const prev = () => setCurrentIndex(prevIndex => {
    if (infinite) {
      if (prevIndex === 0) {
        return images.length - frameSize;
      }

      return Math.max(prevIndex - step, 0);
    }

    return Math.max(prevIndex - step, 0);
  });

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.map((img) => (
          <li
            key={img}
            style={{
              transform: `translateX(${-currentIndex * itemWidth}px)`,
              transition: `${animationDuration}ms all ease`,
            }}
          >
            <img
              src={img}
              alt={img}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__wrapper">
        <button
          onClick={prev}
          type="button"
          className="Carousel__btn"
        >
          Prev
        </button>

        <button
          onClick={next}
          type="button"
          className="Carousel__btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
