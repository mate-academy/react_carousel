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
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0);
  const widthContainer = itemWidth * frameSize;

  const handlePrevClick = () => {
    const newIndex = currentIndex - step;

    if (infinite) {
      setCurrentIndex(newIndex < 0 ? images.length + newIndex : newIndex);
    } else {
      setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    }

    setTransitionDuration(animationDuration);
  };

  const handleNextClick = () => {
    const newIndex = currentIndex + step;

    if (infinite) {
      setCurrentIndex(newIndex >= images.length
        ? newIndex - images.length
        : newIndex);
    } else {
      setCurrentIndex(newIndex + frameSize <= images.length
        ? newIndex
        : images.length - frameSize);
    }

    setTransitionDuration(animationDuration);
  };

  return (
    <div className="Carousel" style={{ width: widthContainer }}>
      {/* <h1 data-cy="title">Carousel</h1> */}

      <div
        className="Carousel__wrapper"
        style={{
          transform: `translateX(${-currentIndex * itemWidth}px)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li className="Carousel__item" key={image}>
              <img
                style={{ width: itemWidth }}
                src={image}
                alt={(index + 1).toString()}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          className={`Carousel__button Carousel__prev ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrevClick}
          type="button"
          data-cy="next"
        >
          Prev
        </button>
        <button
          className={`Carousel__button Carousel__next ${currentIndex + frameSize >= images.length ? 'disabled' : ''}`}
          onClick={handleNextClick}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
