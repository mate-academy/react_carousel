import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  // infinite: boolean
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  // infinite,
}) => {
  const [slidesMoveLength, setSlidesMoveLength] = useState(0);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  function handleSlide(type: string): void {
    const maxWidth = images.length * itemWidth;
    const slidesFrameWidth = itemWidth * frameSize;

    if (prevButtonDisabled) {
      setPrevButtonDisabled(false);
    }

    if (nextButtonDisabled) {
      setNextButtonDisabled(false);
    }

    if (type === 'prev') {
      setSlidesMoveLength(val => {
        const length = val + itemWidth * step;

        if (length >= 0) {
          setPrevButtonDisabled(true);

          return 0;
        }

        return length;
      });
    }

    if (type === 'next') {
      setSlidesMoveLength(val => {
        const length = val - itemWidth * step;

        if ((slidesFrameWidth + -length) >= maxWidth) {
          setNextButtonDisabled(true);

          return slidesFrameWidth - maxWidth;
        }

        return length;
      });
    }
  }

  return (
    <div className="Carousel">
      <button
        type="button"
        className={cn('Carousel__button', { disabled: prevButtonDisabled })}
        onClick={() => handleSlide('prev')}
      >
        {'<'}
      </button>

      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${slidesMoveLength}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__list-item"
              key={image}
              style={{ height: `${itemWidth}px` }}
            >
              <img
                className="Carousel__list-img"
                src={image}
                alt={String(index)}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        className={cn('Carousel__button', { disabled: nextButtonDisabled })}
        onClick={() => handleSlide('next')}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
