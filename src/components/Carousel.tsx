import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Carousel.scss';
import { Images } from '../types/Images';

type Props = {
  images: Images;
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [index, setIndex] = useState(frameSize);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    setIndex(frameSize);
    setOffsetX(0);
  }, [step, frameSize, itemWidth]);

  const updateSlide = (newOffsetX: number, newIndex: number) => {
    setOffsetX(newOffsetX);

    setIndex(newIndex);
  };

  const handlePrevSlide = () => {
    const currentStep = step < index - frameSize
      ? step
      : index - frameSize;

    updateSlide(
      offsetX + (currentStep * (itemWidth + 20)),
      index - currentStep,
    );
  };

  const handleNextSlide = () => {
    const currentStep = step < images.length - index
      ? step
      : images.length - index;

    updateSlide(
      offsetX - (currentStep * (itemWidth + 20)),
      index + currentStep,
    );
  };

  return (
    <div className="container">
      <button
        onClick={handlePrevSlide}
        type="button"
        disabled={index <= frameSize}
      >
        <img
          src="./img/arrow.jpg"
          alt="arrow"
          className="Carousel__btn-img"
        />
      </button>

      <div
        className="Carousel"
        style={{ width: `${frameSize * itemWidth + (frameSize - 1) * 20}px ` }}
      >
        <ul
          className="Carousel__list"
          style={
            {
              transform: `translateX(${offsetX}px)`,
              transition: `transform ${animationDuration}ms`,
            }
          }
        >
          {
            images.map(image => (
              <li key={uuidv4()}>
                <img
                  className="Carousel__img"
                  style={{ width: `${itemWidth}px` }}
                  src={image}
                  alt={image}
                />
              </li>
            ))
          }
        </ul>
      </div>

      <button
        onClick={handleNextSlide}
        type="button"
        data-cy="next"
        disabled={index >= images.length}

      >
        <img
          src="./img/arrow.jpg"
          alt="arrow"
          className="Carousel__btn-img Carousel__btn-img--transform-scaleX"
        />
      </button>
    </div>
  );
};

export default Carousel;
