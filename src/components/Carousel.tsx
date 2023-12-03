import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [slide, setSlide] = useState(0);

  const newImages = images.map((image, index) => ({
    imageId: index + 1,
    imageUrl: image,
  }));

  const lastSlide = newImages.length - frameSize;

  const slidePrev = () => {
    if (slide - step > 0) {
      setSlide(prevState => prevState - step);
    } else {
      setSlide(0);
    }

    if (infinite && !slide) {
      setSlide(lastSlide);
    }
  };

  const slideNext = () => {
    if (slide + step < lastSlide) {
      setSlide(prevState => prevState + step);
    } else {
      setSlide(lastSlide);
    }

    if (infinite && slide === lastSlide) {
      setSlide(0);
    }
  };

  const isPrevDisabled = !slide && !infinite;
  const isNextDisabled = slide === lastSlide && !infinite;

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul
        className="Carousel__list"
      >
        {newImages.map(({ imageId, imageUrl }) => (
          <li
            key={imageId}
            style={{
              transform: `translateX(${-slide * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={imageUrl}
              alt={String(imageId)}
              width={itemWidth}
              style={{
                transition: `${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={slidePrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={slideNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
