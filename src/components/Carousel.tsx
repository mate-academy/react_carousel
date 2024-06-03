import React, { useState } from 'react';
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
  const widthFrame = itemWidth * frameSize;

  const handlePrev = () => {
    const newIndex = currentIndex - step;

    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    } else if (newIndex >= 0 - step) {
      setCurrentIndex(0);
    } else if (infinite) {
      setCurrentIndex(images.length - frameSize);
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex + step;

    if (newIndex + frameSize < images.length) {
      setCurrentIndex(newIndex);
    } else if (newIndex < images.length) {
      setCurrentIndex(images.length - frameSize);
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex + step >= images.length;

  return (
    <div className="Carousel" style={{ width: widthFrame }}>
      <div className="Carousel__frame">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <li key={img} className="Carousel__item">
              <img
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
