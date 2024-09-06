import React, { useState } from "react";
import "./Carousel.scss";

type CarouselProps = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerWidth = itemWidth * frameSize;
  const maxScroll = (images.length - frameSize) * itemWidth;

  const handleNext = () => {
    if (scrollPosition < maxScroll) {
      setScrollPosition(scrollPosition + step * itemWidth);
    } else if (infinite) {
      setScrollPosition(0);
    }
  };

  const handlePrevious = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - step * itemWidth);
    } else if (infinite) {
      setScrollPosition(maxScroll);
    }
  };

  return (
    <div className="Carousel__wrapper" style={{ width: `${containerWidth}px` }}>
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
            />
          ))}
        </div>
      </div>
      <button
        className={`Carousel__button Carousel__button--left ${scrollPosition === 0 ? "Carousel__button--disabled" : ""}`}
        onClick={handlePrevious}
        disabled={scrollPosition === 0}
      >
        &#8592;
      </button>
      <button
        className={`Carousel__button Carousel__button--right ${scrollPosition === maxScroll ? "Carousel__button--disabled" : ""}`}
        onClick={handleNext}
        disabled={scrollPosition === maxScroll}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
