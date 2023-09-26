import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const newImages = images.map((image, index) => ({
    imageUrl: image,
    imageId: index + 1,
  }));

  const [slide, setSlide] = useState(0);

  const slideNext = () => {
    if (slide + step < newImages.length - frameSize) {
      setSlide(Math.min(slide + step, newImages.length - frameSize));
    } else {
      setSlide(newImages.length - frameSize);
    }

    if (slide === newImages.length - frameSize && infinite) {
      setSlide(0);
    }
  };

  const slidePrev = () => {
    if (slide - step > 0) {
      setSlide(Math.max(slide - step, 0));
    } else {
      setSlide(0);
    }

    if (infinite && !slide) {
      setSlide(newImages.length - frameSize);
    }
  };

  const disabledPrev = !infinite && !slide;
  const disabledNext = !infinite && slide === newImages.length - frameSize;

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        transition: `width ${animationDuration}ms`,
      }}
    >
      <ul
        className="Carousel__list"
      >
        {newImages.map(({ imageUrl, imageId }) => (
          <li
            key={imageId}
            style={{
              transform: `translateX(${-slide * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              src={imageUrl}
              alt={String(imageId)}
              width={itemWidth}
              style={{
                transition: `width ${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__button-wrapper">
        <button
          className="Carousel__button"
          type="button"
          onClick={slidePrev}
          disabled={disabledPrev}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          onClick={slideNext}
          disabled={disabledNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
