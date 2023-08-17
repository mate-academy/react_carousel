import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const lastSlide = images.length - frameSize + 1;
  const translateX = currentSlide * itemWidth - itemWidth;
  const isPrevDisabled = !infinite && currentSlide <= 1;
  const isNextDisabled = !infinite && currentSlide >= lastSlide;

  const handleSlideChange = (slide: number) => {
    if (slide < 1) {
      if (infinite) {
        setCurrentSlide(lastSlide);
      } else {
        setCurrentSlide(1);
      }
    } else if (slide > lastSlide) {
      if (infinite) {
        setCurrentSlide(currentSlide < lastSlide ? lastSlide : 1);
      } else {
        setCurrentSlide(lastSlide);
      }
    } else {
      setCurrentSlide(slide);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          maxWidth: `${frameSize * itemWidth}px`,
          transform: `translateX(-${translateX}px)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map((img, index) => (
          <li key={img}>
            <img
              width={itemWidth}
              src={img}
              alt={String(index + 1)}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button
          type="button"
          disabled={isPrevDisabled}
          onClick={() => handleSlideChange(currentSlide - step)}
        >
          ⬅️
        </button>
        <button
          type="button"
          disabled={isNextDisabled}
          onClick={() => handleSlideChange(currentSlide + step)}
          data-cy="next"
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default Carousel;
