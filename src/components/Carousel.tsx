import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const lastPosition = images.length - frameSize;

    if (position < 0) {
      setPosition(infinite ? lastPosition : 0);
    } else if (position > lastPosition) {
      setPosition(infinite ? 0 : lastPosition);
    }
  }, [position, images.length, frameSize, infinite]);

  const handlePrevButton = () => {
    setPosition(prevPosition => prevPosition - step);
  };

  const handleNextButton = () => {
    setPosition(prevPosition => prevPosition + step);
  };

  const isPrevDisabled = position <= 0 && !infinite;
  const isNextDisabled = position >= images.length - frameSize && !infinite;

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.slice(position, position + frameSize).map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} style={{ width: `${itemWidth}px` }}>
            <img src={image} alt={`images-${index}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="button is-success is-light is-normal"
          disabled={isPrevDisabled}
          onClick={handlePrevButton}
        >
          &larr; Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="button is-success is-light is-normal"
          disabled={isNextDisabled}
          onClick={handleNextButton}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
