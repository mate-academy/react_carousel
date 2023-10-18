import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth:number;
  animationDuration:number;
  infinite:boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const maxImages = images.length - frameSize;
  const widthOfCarousel = itemWidth * frameSize;

  const handleNextImage = () => {
    if (currentImage !== maxImages) {
      setCurrentImage((prev) => Math.min(prev + step, maxImages));
    } else {
      setCurrentImage(0);
    }
  };

  const handlePrevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => Math.max(prev - step, 0));
    } else {
      setCurrentImage(maxImages);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${widthOfCarousel}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul
        className="Carousel__list"
      >
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transform: `translateX(${-currentImage * itemWidth}px)`,
            }}
          >
            <img
              src={image}
              alt={`${index + 1}`}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="button"
          onClick={handlePrevImage}
          disabled={currentImage === 0 && !infinite}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="button"
          onClick={handleNextImage}
          disabled={currentImage === maxImages && !infinite}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
