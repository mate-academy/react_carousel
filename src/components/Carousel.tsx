import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const prevHandler = () => {
    setCurrentIndex(prev => {
      if (infinite) {
        return prev - step < 0 ? maxIndex : prev - step;
      }

      return Math.max(prev - step, 0);
    });
  };

  const nextHandler = () => {
    setCurrentIndex(prev => {
      if (infinite) {
        return prev + step > maxIndex ? 0 : prev + step;
      }

      return Math.min(prev + step, maxIndex);
    });
  };

  const offset = -currentIndex * itemWidth;

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${animationDuration / 1000}s ease`,
          transform: `translateX(${offset}px)`,
        }}
      >
        {images.map((item, i) => {
          return (
            <li className="Carousel__item" key={i}>
              <img src={item} alt={`${i + 1}`} width={itemWidth} />
            </li>
          );
        })}
      </ul>
      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={prevHandler}
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={nextHandler}
          disabled={!infinite && currentIndex >= maxIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
