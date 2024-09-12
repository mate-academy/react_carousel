import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import { State } from '../utils/types';

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}: State) => {
  const [numberOfImage, setNumberOfImage] = useState(0);

  useEffect(() => {
    if (numberOfImage + frameSize > images.length) {
      setNumberOfImage(images.length - frameSize);
    }
  }, [frameSize]);

  const prevSlide = () => {
    if (numberOfImage - step <= 0) {
      setNumberOfImage(0);
    } else {
      setNumberOfImage(numberOfImage - step);
    }

    if (infinite && numberOfImage <= 0) {
      setNumberOfImage(images.length - frameSize);
    }
  };

  const nextSlide = () => {
    if (numberOfImage + step > images.length - frameSize) {
      setNumberOfImage(images.length - frameSize);
    } else {
      setNumberOfImage(numberOfImage + step);
    }

    if (infinite && numberOfImage >= images.length - frameSize) {
      setNumberOfImage(0);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          height: `${itemWidth}px`,
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              style={{
                transform: `translateX(${-numberOfImage * itemWidth}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
              key={image}
            >
              <img src={image} alt={String(1 + index)} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="Carousel__button"
        type="button"
        onClick={prevSlide}
        disabled={numberOfImage <= 0 && !infinite}
        style={{ order: '-1' }}
      >
        &#60;
      </button>
      <button
        className="Carousel__button"
        type="button"
        onClick={nextSlide}
        disabled={numberOfImage >= images.length - frameSize && !infinite}
        data-cy="next"
      >
        &#62;
      </button>
    </div>
  );
};

export default Carousel;
