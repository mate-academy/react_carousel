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

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const sliderWidth = images.length * itemWidth;
  const containerWidth = `${itemWidth * frameSize}px`;
  const carouselListWidth = `${sliderWidth}px`;
  const moveForvard = `translateX(-${currentPosition}px)`;
  const stepWidth = step * itemWidth;
  const frameWidth = frameSize * itemWidth;
  const scrolProgress = sliderWidth - stepWidth - currentPosition;
  const distanceToEnd = sliderWidth - stepWidth - scrolProgress;
  const animationSpeed = `${animationDuration}ms`;

  const handelDownCurrentPosition = () => {
    if (currentPosition > 0) {
      if (distanceToEnd >= frameWidth) {
        setCurrentPosition(currentPosition - stepWidth);
      } else {
        setCurrentPosition(currentPosition - (frameWidth - stepWidth));
      }
    } else if (infinite) {
      setCurrentPosition(sliderWidth - frameWidth);
    }
  };

  const handelUpCurrentPosition = () => {
    if (currentPosition < (images.length - frameSize) * itemWidth) {

      if (scrolProgress >= frameWidth) {
        setCurrentPosition(currentPosition + stepWidth);
      } else {
        setCurrentPosition(currentPosition + (frameWidth - stepWidth));
      }
    } else if (infinite) {
      setCurrentPosition(0);
    }
  };

  const containerStyles = {
    width: containerWidth,
  };

  const carouselListStyle = {
    width: carouselListWidth,
    transform: moveForvard,
    transitionDuration: animationSpeed,
  };

  return (
    <div className="Carousel">
      <div
        className="container"
        style={containerStyles}
      >
        <ul
          className="Carousel__list"
          style={carouselListStyle}
        >
          {images.map((image: string, key) => {
            const altNum = `${key + 1}`;

            return (
              <li key={altNum}>
                <img
                  src={image}
                  id={altNum}
                  alt={altNum}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__buttons-box">
          <button
            type="button"
            onClick={handelDownCurrentPosition}
            data-cy="prev"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={handelUpCurrentPosition}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
