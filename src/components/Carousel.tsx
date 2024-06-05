import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hidden = itemWidth * (images.length - frameSize);

  useEffect(() => {
    // Adjust currentIndex if it goes out of bounds due to frameSize change
    if (currentIndex > hidden) {
      setCurrentIndex(Math.max(0, hidden));
    }
  }, [frameSize, hidden, currentIndex]);

  const handleNext = () => {
    setCurrentIndex(prevSet => {
      const newSet = prevSet + itemWidth * step;

      if (newSet > hidden && currentIndex < hidden) {
        return hidden;
      } else if (newSet > hidden) {
        return infinite ? 0 : hidden;
      }

      return newSet;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prevSet => {
      const newSet = prevSet - itemWidth * step;

      if (newSet < 0 && currentIndex > 0) {
        return 0;
      } else if (newSet < 0) {
        return infinite ? hidden : 0;
      }

      return newSet;
    });
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= hidden;

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: itemWidth * frameSize }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <li key={img} className="Carousel__item">
              <img
                className="Carusel__img"
                src={img}
                alt={`Slide ${index + 1}`}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrev}
          className={cn({ disabled: isPrevDisabled })}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          className={cn({ disabled: isNextDisabled })}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
