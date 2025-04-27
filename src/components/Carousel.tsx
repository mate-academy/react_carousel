import React, { useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
  infinity,
}) => {
  const [position, setPosition] = useState(0);

  const imagesLength = images.length;
  const maxPosition = imagesLength - frameSize;
  const canHandlePrev = position !== 0;
  const canHandleNext = position !== maxPosition;

  const handlePrev = () => {
    if (canHandlePrev || infinity) {
      setPosition(prevPosition => {
        if (prevPosition === 0) {
          return imagesLength - 1;
        }

        return Math.max(prevPosition - step, 0);
      });
    }
  };

  const handleNext = () => {
    if (canHandleNext || infinity) {
      setPosition(prevPosition => {
        if (prevPosition + 1 > maxPosition) {
          return 0;
        }

        return Math.min(prevPosition + step, maxPosition);
      });
    }
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(${-position * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img src={image} alt={image} width={itemWidth} />
          </li>
        ))}
      </ul>
      <div>
        <button
          type="button"
          className={classNames({
            Carousel__button: true,
            'Carousel__button--disabled': !canHandlePrev && infinity == false,
          })}
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className={classNames({
            Carousel__button: true,
            'Carousel__button--disabled': !canHandleNext && infinity == false,
          })}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
