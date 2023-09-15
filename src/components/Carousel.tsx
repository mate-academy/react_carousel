import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const maxCurrentImage = images.length - frameSize;

  const nextImage = () => {
    if (currentImageIndex !== maxCurrentImage) {
      setCurrentImageIndex(
        (prevIndex) => Math.min(prevIndex + step, maxCurrentImage),
      );
    } else {
      setCurrentImageIndex(0);
    }
  };

  const prevImage = () => {
    if (currentImageIndex !== 0) {
      setCurrentImageIndex((prevIndex) => Math.max(prevIndex - step, 0));
    } else {
      setCurrentImageIndex(maxCurrentImage);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(${-currentImageIndex * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img src={image} alt={(index + 1).toString()} width={itemWidth} />
          </li>
        ))}
      </ul>
      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={prevImage}
          disabled={currentImageIndex === 0 && !infinite}
        >
          {'<<'}
        </button>
        <button
          type="button"
          onClick={nextImage}
          disabled={currentImageIndex === maxCurrentImage && !infinite}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
