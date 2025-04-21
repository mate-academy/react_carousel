import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: string;
  frameSize: string;
  itemWidth: string;
  animationDuration: string;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const arrImg = [...images];
  const totalIndex = arrImg.length;
  const gapImg = 20;

  const stepSize = +itemWidth + +gapImg;
  const transformList = currentIndex * stepSize;

  const arrLastImg = Math.max(totalIndex - +frameSize, 0);
  const disabledButtonNext = +currentIndex >= arrLastImg && !infinite;
  const disabledButtonPrev = +currentIndex <= 0 && !infinite;

  const handlePrev = () => {
    if (+currentIndex >= +step) {
      setCurrentIndex(currentIndex - +step);
    } else if (currentIndex > 0) {
      setCurrentIndex(0);
    } else if (infinite) {
      setCurrentIndex(arrLastImg);
    }
  };

  const handleNext = () => {
    if (+currentIndex + +step <= arrLastImg) {
      setCurrentIndex(+currentIndex + +step);
    } else if (currentIndex < arrLastImg) {
      setCurrentIndex(arrLastImg);
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          className={`Carousel__button ${disabledButtonPrev ? 'Carousel__button--disabled' : ''}`}
          type="button"
          data-cy="prev"
          onClick={handlePrev}
          disabled={disabledButtonPrev}
        >
          <div className="Carousel__button--text">{'<'}</div>
        </button>
        <ul
          className="Carousel__list"
          style={{
            width: +itemWidth * +frameSize,
            gap: '20px',
          }}
        >
          {arrImg.map((img, index) => (
            <li
              className="Carousel__img"
              key={index}
              style={{
                transform: `translateX(-${transformList}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              <img
                className="Carousel__img--img"
                src={`${img}`}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <button
          className={`Carousel__button ${disabledButtonNext ? 'Carousel__button--disabled' : ''}`}
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={disabledButtonNext}
        >
          <div className="Carousel__button--text">{'>'}</div>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
