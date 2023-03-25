import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const listSize = images.length * itemWidth;
  const animationString = `translate ${animationDuration}ms ease-in-out`;
  const carouselWidth = frameSize * itemWidth;
  const amountOfSlides = images.length;
  const isSlideLast = currentSlide + frameSize === amountOfSlides;
  const isSlideFirst = currentSlide === 0;
  let correctStep: number;

  const handleNextButton = () => {
    const lastSlideAfterStep = (currentSlide + 1) + (frameSize - 1) + step;

    if (isSlideLast && infinite) {
      setCurrentSlide(0);
    }

    if (lastSlideAfterStep > amountOfSlides) {
      const slidesOverload = lastSlideAfterStep - amountOfSlides;

      correctStep = step - slidesOverload;

      setCurrentSlide(current => current + correctStep);

      return;
    }

    setCurrentSlide((current) => current + step);
  };

  const handlePrevButton = () => {
    const firstSlideAfterStep = currentSlide - step;

    if (isSlideFirst && infinite) {
      setCurrentSlide(amountOfSlides - frameSize);

      return;
    }

    if (firstSlideAfterStep < 0) {
      const slidesOverload = -firstSlideAfterStep - 0;

      correctStep = step - slidesOverload;

      setCurrentSlide(current => current - correctStep);

      return;
    }

    setCurrentSlide((current) => current - step);
  };

  return (
    <div style={{ width: carouselWidth }} className="Carousel">
      <ul
        style={{
          width: listSize,
          translate: currentSlide * -itemWidth,
          transition: animationString,
        }}
        className="Carousel__list"
      >
        {images.map((image, i) => (
          <li key={image}>
            <img width={itemWidth} src={image} alt={`${i}`} />
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button
          type="button"
          onClick={handlePrevButton}
          disabled={isSlideFirst && !infinite}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={handleNextButton}
          disabled={isSlideLast && !infinite}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
