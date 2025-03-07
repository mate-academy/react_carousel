import React, { useState } from 'react';
import './Carousel.scss';
import Form from './Form';

interface CarouselProp {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProp> = ({
  images,
  // step,
  // frameSize,
  // itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentPosition, setcurrentPosition] = useState<number>(0);

  const [step, setStep] = useState<number>(3);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [itemWidth, setItemWidth] = useState<number>(130);

  const checkNext = () => {
    if (infinite) {
      if (currentPosition + step < images.length) {
        setcurrentPosition(currentPosition + step);
      } else {
        // setcurrentPosition(0 + step);
        setcurrentPosition((currentPosition + step) % images.length);
      }
    } else {
      if (currentPosition + step < images.length) {
        setcurrentPosition(currentPosition + step);
      }
    }
  };

  const checkPrev = () => {
    if (infinite) {
      if (currentPosition - step >= 0) {
        setcurrentPosition(currentPosition - step);
      } else {
        // setcurrentPosition(images.length - step);
        setcurrentPosition(
          (images.length + currentPosition - step) % images.length,
        );
      }
    } else {
      if (currentPosition - step >= 0) {
        setcurrentPosition(currentPosition - step);
      }
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__content"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translate(-${itemWidth * currentPosition}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img
                src={image}
                alt={`${index + 1}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__buttons">
          <button type="button" onClick={checkPrev}>
            Prev
          </button>
          <button data-cy="next" type="button" onClick={checkNext}>
            Next
          </button>
        </div>
      </div>

      <Form
        onStep={setStep}
        onItemWidth={setItemWidth}
        onFrameSize={setFrameSize}
      />
    </div>
  );
};

export default Carousel;
