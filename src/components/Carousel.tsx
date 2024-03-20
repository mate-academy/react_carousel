import './Carousel.scss';

import React from 'react';

type CarouselProps = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [animationDurationState, setAnimationDurationState] =
    React.useState(animationDuration);

  const imageList = images.map((image, i) => {
    return (
      <li
        className="Carousel__list-item"
        style={{
          translate: `${-currentIndex * itemWidth}px`,
          transition: `${animationDurationState}ms`,
        }}
        key={i}
      >
        {i + 1}
        <img
          className="Carousel__list-img"
          style={{ width: `${itemWidth}px` }}
          src={image}
          alt={i.toString()}
        />
      </li>
    );
  });

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        {imageList}
        {infinite && imageList}
        {infinite && imageList}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={() => {
            if (infinite) {
              if (currentIndex - step < 0) {
                setAnimationDurationState(0);
                setCurrentIndex(currentIndex + images.length);

                setTimeout(() => {
                  setAnimationDurationState(animationDuration);
                  setCurrentIndex(currentIndex - step + images.length);
                }, 1);
              } else {
                setCurrentIndex(currentIndex - step);
              }
            } else {
              setCurrentIndex(
                currentIndex - step < 0 ? 0 : currentIndex - step,
              );
            }
          }}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={() => {
            if (infinite) {
              if (currentIndex + step > images.length * 2) {
                setAnimationDurationState(0);
                setCurrentIndex(currentIndex - images.length);

                setTimeout(() => {
                  setAnimationDurationState(animationDuration);
                  setCurrentIndex(currentIndex + step - images.length);
                }, 1);
              } else {
                setCurrentIndex(currentIndex + step);
              }
            } else {
              setCurrentIndex(
                currentIndex + step > images.length - frameSize
                  ? images.length - frameSize
                  : currentIndex + step,
              );
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
