import React, { useState } from 'react';
// import cn from 'classnames';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const containerLength = itemWidth * images.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;
  const minIndex = 0;

  const prevBtn = () => {
    const newIndex = Math.max(currentIndex - step, minIndex);

    if (currentIndex === 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const nextBtn = () => {
    const newIndex = Math.min(currentIndex + step, maxIndex);

    if (currentIndex === maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: containerLength,
            transform: `translate(-${currentIndex * itemWidth}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((img, idx) => (
            <li key={idx + 1} className="Carousel__item">
              <img
                className="Carousel__img"
                src={img}
                alt={(idx + 1).toString()}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Button-prev"
          onClick={prevBtn}
          disabled={!infinite && currentIndex === 0}
        >
          <div className="Button-prev-label">PREV</div>
        </button>

        <button
          type="button"
          className="Button-next"
          onClick={nextBtn}
          disabled={!infinite && currentIndex >= maxIndex}
        >
          <div className="Button-next-label">NEXT</div>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
