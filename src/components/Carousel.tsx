import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  inifinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  inifinite,
}) => {
  const [currentImage, setCurrentImage] = useState(1);

  const rightImage = (currentImage - 1) * itemWidth;
  const leftImage = images.length - frameSize + 1;

  const carouselWidth = frameSize * itemWidth;
  const carouselEnd = currentImage === leftImage;
  const carouselStart = currentImage === 1;

  const handlePrev = () => {
    let prevImage = currentImage - step;

    if (prevImage < 1) {
      prevImage = 1;
    }

    if (inifinite && (currentImage === prevImage)) {
      prevImage = 10 - (step - 1);
    }

    setCurrentImage(prevImage);
  };

  const handleNext = () => {
    let nextImage = currentImage + 1;

    if ((nextImage + frameSize) > images.length) {
      nextImage = images.length - frameSize + 1;
    }

    if (inifinite && (currentImage === nextImage)) {
      nextImage = 1;
    }

    setCurrentImage(nextImage);
  };

  return (
    <div className="Carousel">
      <button
        className={cn('Carousel__button',
          { 'Carousel__button--disabled': (carouselStart && !inifinite) })}
        type="button"
        onClick={handlePrev}
      >
        Prev
      </button>
      <ul
        className="Carousel__list"
        style={{ width: carouselWidth }}
      >
        {images.map((img) => (
          <li
            key={img}
            className="Carousel__list--link"
            style={{
              transform: `translateX(-${rightImage}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={img}
              alt={img}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className={cn('Carousel__button',
            { 'Carousel__button--disabled': (carouselEnd && !inifinite) })}
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
