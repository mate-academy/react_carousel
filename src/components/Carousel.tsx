import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSize] = useState(130);
  const [visibleImages] = useState(3);
  const [step] = useState(3);

  const containerWidth = (currentIndex + visibleImages) * imageSize;

  const handleNextClick = () => {
    const nextIndex = currentIndex + step;

    if (nextIndex < images.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevClick = () => {
    const prevIndex = currentIndex - step;

    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const translateValue = `translateX(-${currentIndex * imageSize}px)`;

  return (
    <>
      <div className="Carousel">
        <div
          className="Container"
          style={{ width: `${containerWidth}px`, transform: translateValue }}
        >
          <ul className="Carousel__list">
            {images.map((img, index) => (
              <li
                key={img}
                className="Carousel__list--item"
                style={{ width: `${imageSize}` }}
              >
                <img src={img} alt={`${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
