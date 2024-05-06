import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
  infinite = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handlePrev = () => {
    setCurrentSlide(prevSlide => Math.max(0, prevSlide - step));
  };

  const handleNext = () => {
    setCurrentSlide(prevSlide =>
      Math.min(images.length - frameSize, prevSlide + step),
    );

    const endOfSlides = images.length - frameSize;

    if (currentSlide === endOfSlides && infinite) {
      setCurrentSlide(0);
    }
  };

  return (
    <>
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
          transition: `${animationDuration}ms}`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li
              key={index}
              style={{
                transform: `translateX(-${currentSlide * itemWidth}px)`,
                transition: `transform ${animationDuration}ms ease-out`,
              }}
            >
              <img width={itemWidth} src={image} alt={`${index + 1}}`} />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__buttons--middle"
            type="button"
            onClick={handlePrev}
            disabled={currentSlide === 0}
          >
            Prev
          </button>

          <button
            data-cy={'next'}
            className="Carousel__buttons--middle"
            type="button"
            onClick={handleNext}
            disabled={currentSlide >= images.length - frameSize && !infinite}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
