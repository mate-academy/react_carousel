import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const imagesToShow = 2;
  const imageWidth = 130;
  const imageGap = 24;
  const itemWidth = imageWidth + imageGap;

  const handlePrevImage = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - imagesToShow);
    }
  };

  const handleNextImage = () => {
    const maxPosition = images.length - imagesToShow;

    if (currentPosition < maxPosition) {
      setCurrentPosition(currentPosition + imagesToShow);
    }
  };

  const translateX = -currentPosition * itemWidth;
  const PrevDisabled = currentPosition <= 0;
  const NextDisabled = currentPosition >= images.length - imagesToShow;

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.3s ease',
        }}
      >
        {images.map((src, index) => (
          <li key={src}>
            <img src={src} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button
          className="Carousel__button Carousel__button--prev"
          type="button"
          onClick={handlePrevImage}
          disabled={PrevDisabled}
        >
          {'<--'}
        </button>
        <button
          className="Carousel__button Carousel__button--next"
          type="button"
          onClick={handleNextImage}
          disabled={NextDisabled}
        >
          {'-->'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
