import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

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
  const [currentShift, setCurrentShift] = useState(0);
  const maxShift = images.length * itemWidth - frameSize * itemWidth;
  const handlerButtonNext = (): void => {
    if (infinite && currentShift === maxShift) {
      setCurrentShift(0);
    } else {
      setCurrentShift(current =>
        Math.min(current + step * itemWidth, maxShift),
      );
    }
  };

  const handlerButtonPrev = (): void => {
    if (infinite && currentShift === 0) {
      setCurrentShift(maxShift);
    } else {
      setCurrentShift(current => Math.max(current - step * itemWidth, 0));
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--move', `-${maxShift}px`);
    document.documentElement.style.setProperty(
      '--animation-time',
      `${animationDuration}ms`,
    );
  }, [animationDuration, maxShift]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className={classNames('Carousel__list', {
            'Carousel__list--animate': infinite,
          })}
          style={
            {
              transition: `transform ${animationDuration}ms`,
              transform: `translateX(-${currentShift}px)`,
            } as React.CSSProperties
          }
        >
          {images.map((img, index) => (
            <li className="Carousel__item" key={index}>
              <img
                className="Carousel__img"
                src={img}
                alt={index + 1 + ''}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__container__buttons">
          <button
            type="button"
            onClick={handlerButtonPrev}
            disabled={!infinite && currentShift === 0}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={handlerButtonNext}
            data-cy="next"
            disabled={!infinite && currentShift === maxShift}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
