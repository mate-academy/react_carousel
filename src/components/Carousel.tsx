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
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    const newIndex = infinite
      ? (currentIndex + step) % images.length
      : Math.min(currentIndex + step, images.length - frameSize);

    setCurrentIndex(newIndex);
  };

  const prev = () => {
    const newIndex = infinite
      ? (currentIndex - step + images.length) % images.length
      : Math.max(currentIndex - step, 0);

    setCurrentIndex(newIndex);
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.map((img) => (
          <li style={{
            transform: `translateX(${-currentIndex * itemWidth}px)`,
            transition: `${animationDuration}ms all ease`,
          }}
          >
            <img
              src={img}
              alt={img}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__wrapper">
        <button
          onClick={prev}
          type="button"
          className="Carousel__btn"
        >
          Prev
        </button>

        <button
          onClick={next}
          type="button"
          className="Carousel__btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
