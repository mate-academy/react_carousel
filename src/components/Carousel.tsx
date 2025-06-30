import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [count, setCount] = useState(0);
  const maxIndex = images.length - frameSize;

  const nextButton = () => {
    if (infinite) {
      setCount(prev => (prev + step) % images.length);
    } else {
      const nextIndex = count + step;

      if (nextIndex + frameSize > images.length) {
        setCount(images.length - frameSize);
      } else {
        setCount(nextIndex);
      }
    }
  };

  const prevButton = () => {
    if (infinite) {
      setCount(prev => (prev - step + images.length) % images.length);
    } else {
      const prevIndex = count - step;

      setCount(prevIndex < 0 ? 0 : prevIndex);
    }
  };

  const getVisibleImages = () => {
    if (infinite) {
      const result: string[] = [];

      for (let i = 0; i < frameSize; i++) {
        const index = (count + i) % images.length;

        result.push(images[index]);
      }

      return result;
    } else {
      return images.slice(count, count + frameSize);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__list"
        style={{ transitionDuration: `${animationDuration}ms` }}
      >
        {getVisibleImages().map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${count + index + 1}`}
            className="Carousel__item"
            style={{ width: `${itemWidth}px` }}
          />
        ))}
      </div>

      <div className="Button__centered">
        <div
          className="Carousel__button"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <button
            type="button"
            className={`Button__prev ${!infinite && count === 0 ? 'disabled' : ''}`}
            onClick={prevButton}
            disabled={!infinite && count === 0}
          >
            <img
              src="./img/butPrev.png"
              className="Button__img"
              alt="prevButton"
            />
          </button>
          <button
            type="button"
            className={`Button__next ${!infinite && count >= maxIndex ? 'disabled' : ''}`}
            onClick={nextButton}
            disabled={!infinite && count >= maxIndex}
          >
            <img
              src="./img/butNext.png"
              className="Button__img"
              alt="nextButton"
              data-cy="next"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
