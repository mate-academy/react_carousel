import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startImage, setStartImage] = useState(0);
  const [endImage, setEndImage] = useState(frameSize);

  useEffect(() => {
    setEndImage(startImage + frameSize);
  }, [frameSize, startImage]);

  const handlePrev = () => {
    if (startImage > 0) {
      setStartImage(startImage - step);
      setEndImage(endImage - step);
    }
  };

  const handleNext = () => {
    if (endImage < images.length) {
      setEndImage(endImage + step);
      setStartImage(startImage + step);
    }

    if (infinite && endImage === images.length - 1) {
      setStartImage(0);
      setEndImage(frameSize);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.slice(startImage, endImage).map((image: string) => (
          <li
            key={image}
            className="Carousel__image"
          >
            <img
              src={image}
              alt={image}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>
      <div className="Carousel__buttons">
        <button
          className="Carousel__bnt"
          type="button"
          onClick={handlePrev}
          disabled={startImage === 0}
        >
          Prev
        </button>
        <button
          className="Carousel__bnt"
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={endImage >= images.length && infinite === false}
        >
          Next
        </button>
      </div>
    </div>
  );
};
