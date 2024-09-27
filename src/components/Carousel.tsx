/* eslint-disable jsx-a11y/label-has-associated-control */
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

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const prevClick = () => {
    setPosition(position - step);
    if (position < step) {
      setPosition(0);
    }

    if (position === 0 && infinite === true) {
      setPosition(images.length - frameSize);
    }
  };

  const nextClick = () => {
    setPosition(position + step);
    if (position >= images.length - frameSize - 1) {
      setPosition(images.length - frameSize);
    }

    if (position >= images.length - frameSize && infinite === true) {
      setPosition(0);
    }
  };

  return (
    <>
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${frameSize * itemWidth}px`,
              transform: `translateX(-${position * itemWidth}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            {images.map((image, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="Carousel__item" key={index}>
                <img src={image} alt={`${index + 1}`} width={itemWidth} />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className={
              position === 0 && infinite === false ? 'button' : 'button-active'
            }
            disabled={position === 0 && infinite === false}
            type="button"
            onClick={prevClick}
          >
            Prev
          </button>
          <button
            data-cy="next"
            className={
              position === images.length - frameSize && infinite === false
                ? 'button'
                : 'button-active'
            }
            disabled={
              position === images.length - frameSize && infinite === false
            }
            type="button"
            onClick={nextClick}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
