import React, { useState } from 'react';
import './Carousel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

type Props = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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

  const frameWight = {
    width: frameSize * itemWidth,
  };

  const translateImg = {
    transform: `translateX(-${position * itemWidth}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const handleNextClick = () => {
    setPosition(currentPosition => {
      const nextPosition = Math.min(
        currentPosition + step, images.length - frameSize,
      );

      return infinite && nextPosition === currentPosition ? 0 : nextPosition;
    });
  };

  const handlePrevClick = () => {
    setPosition(currentPosition => {
      const prevPosition = Math.max(currentPosition - step, 0);

      return infinite && prevPosition === currentPosition
        ? images.length - frameSize
        : prevPosition;
    });
  };

  return (
    <div
      className="Carousel"
    >
      <div
        className="Carousel__wrapper"
        style={frameWight}
      >
        <ul
          className="Carousel__list"
          style={translateImg}
        >
          {images.map((image: string, index: number) => {
            const isVisible = index >= position && index < position + frameSize;

            return (
              <li
                key={image}
                className={`Carousel__item ${isVisible ? 'Carousel__item--visible' : ''}`}
                style={{ transition: `visibility ${animationDuration}ms` }}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="Carousel__button-wrapper"
        style={{
          width: `${frameSize * itemWidth + 100}px`,
          transform: `translate(-${50}px, -${100}%)`,
        }}
      >
        <button
          type="button"
          data-cy="prev"
          className="Carousel__button Carousel__button--left"
          onClick={handlePrevClick}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <button
          type="button"
          data-cy="next"
          className="Carousel__button Carousel__button--right"
          onClick={handleNextClick}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};
