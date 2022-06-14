import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
  isInfinite: boolean;
  animationDuration: number,
};

export const Carousel: React.FC<Props> = ({
  images, frameSize, step, itemWidth, isInfinite, animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransition, setIsTransition] = useState(true);

  useEffect(() => {
    if (isInfinite) {
      if (currentIndex === frameSize || currentIndex === images.length) {
        setIsTransition(true);
      }
    }
  }, [currentIndex, isInfinite, frameSize, images.length]);

  const nextButton = () => {
    const maxIndex = isInfinite
      ? images.length + frameSize
      : images.length - frameSize;

    if (currentIndex + step > maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prevState => prevState + step);
    }
  };

  const previousButton = () => {
    if (isInfinite || currentIndex > 0) {
      if (currentIndex - step < 0) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prevState => prevState - step);
      }
    }
  };

  const handleTransition = () => {
    if (isInfinite) {
      if (currentIndex === 0) {
        setIsTransition(false);
        setCurrentIndex(images.length);
      } else if (currentIndex === images.length + frameSize) {
        setIsTransition(false);
        setCurrentIndex(frameSize);
      }
    }
  };

  const renderPrevious = () => {
    const output = [];

    for (let index = 0; index < frameSize; index += 1) {
      output.push(images[images.length - 1 - index]);
    }

    output.reverse();

    return output;
  };

  const newPrevious = renderPrevious();

  const renderNewNext = () => {
    const output = [];

    for (let index = 0; index < frameSize; index += 1) {
      output.push(images[index]);
    }

    return output;
  };

  const newNext = renderNewNext();

  const disabled = currentIndex >= images.length - frameSize && !isInfinite;
  const customTransform = `translateX(-${currentIndex * (100 / frameSize)}%)`;
  const customTransition = `transform ${isTransition ? animationDuration : 0}ms`;
  const customWidth = `${frameSize * itemWidth}px`;

  return (
    <>
      <div className="container">
        <div className="title">Carousel</div>
        <div className="carousel__family">
          <button
            type="button"
            className="button"
            disabled={currentIndex <= 0 && !isInfinite}
            onClick={previousButton}
          >
            Previous
          </button>
          <div
            className="carousel__container"
            style={{ width: customWidth }}
          >
            <div
              className={`carousel__content item-count--${frameSize}`}
              style={{
                transform: customTransform,
                transition: customTransition,
              }}
              onTransitionEnd={() => handleTransition()}
            >
              {isTransition}
              {isInfinite && newPrevious.map(item => (
                <img
                  key={`${item}`}
                  src={`${item}`}
                  alt="smiley"
                />
              ))}
              {images.map(image => (
                <img
                  key={`${image}`}
                  src={`${image}`}
                  alt="smiley"
                />
              ))}
              {isInfinite && newNext.map(item => (
                <img
                  key={`${item}`}
                  src={`${item}`}
                  alt="smiley"
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="button"
            disabled={disabled}
            onClick={nextButton}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
