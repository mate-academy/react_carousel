import React, { useEffect, useState } from 'react';
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
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (!infinite) {
      const maxStartIndex = images.length - frameSize;

      setStartIndex(Math.min(startIndex, maxStartIndex));
    }
  }, [frameSize, images, infinite, startIndex]);

  const handlePrevClick = () => {
    const newStartIndex = startIndex - step;

    if (infinite) {
      setStartIndex(
        newStartIndex < 0
          ? images.length - frameSize
          : newStartIndex,
      );
    } else {
      setStartIndex(Math.max(newStartIndex, 0));
    }
  };

  const handleNextClick = () => {
    let newStartIndex;

    if (infinite) {
      newStartIndex = (startIndex + step) % images.length;
    } else {
      const maxStartIndex = images.length - frameSize;

      newStartIndex = Math.min(startIndex + step, maxStartIndex);
    }

    setStartIndex(newStartIndex);
  };

  const carouselContainerStyles = {
    width: `${itemWidth * frameSize}px`,
    transitionDuration: `${animationDuration}ms`,
  };

  const carouselListStyles = {
    width: `${itemWidth * images.length}px`,
    height: `${itemWidth}px`,
    transitionDuration: `${animationDuration}ms`,
    transform: `translateX(-${startIndex * itemWidth}px)`,
  };

  return (
    <div className="Carousel" style={carouselContainerStyles}>
      <ul className="Carousel__list" style={carouselListStyles}>
        {images.map((image: string, index: number) => (
          <li key={image} className="Carousel__item">
            <img
              src={image}
              alt={`${index}`}
              width={itemWidth}
              className="Carousel__image"
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__btns">
        <button
          className="Carousel__btn"
          type="button"
          onClick={handlePrevClick}
          disabled={!infinite && startIndex === 0}
        >
          &lt;
        </button>
        <button
          className="Carousel__btn"
          type="button"
          onClick={handleNextClick}
          data-cy="next"
          disabled={
            !infinite
              && startIndex >= (itemWidth * (images.length - frameSize))
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
