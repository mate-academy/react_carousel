import React, { useState } from 'react';
import './Carousel.scss';

type Px = number;

type Settings = {
  imageWidth: Px;
  imageHeight: Px;
  carouselWidth: Px;
};

type CarouselProps = {
  images: string[];
  frameSize: Px;
  step: Px;
  itemWidth: Px;
  animationDuration: number;
  isInfinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  frameSize,
  step,
  itemWidth,
  animationDuration,
  isInfinite,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const imageWidth = itemWidth;

  const carouselWidth = frameSize * imageWidth;

  const carouselSettings: Settings = {
    imageWidth: imageWidth,
    imageHeight: imageWidth,
    carouselWidth: carouselWidth,
  };

  const handlePrev = () => {
    setCurrentSlide(prevSlide => Math.max(0, prevSlide - step));
  };

  const handleNext = () => {
    setCurrentSlide(prevSlide =>
      Math.min(images.length - frameSize, prevSlide + step),
    );

    const lastSlide = images.length - frameSize;

    if (currentSlide === lastSlide && isInfinite) {
      setCurrentSlide(0);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{ width: `${carouselSettings.carouselWidth}px` }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li
              key={index}
              style={{
                transform: `translateX(-${currentSlide * imageWidth}px)`,
                transition: `transform ${animationDuration}ms ease`,
              }}
            >
              <img
                width={carouselSettings.imageWidth}
                height={carouselSettings.imageHeight}
                src={image}
                alt={String(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button type="button" onClick={handlePrev}>
          Prev
        </button>
        <button data-cy="next" type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
