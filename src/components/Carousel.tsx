import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIncrement = () => {
    const lastIndex = images.length - 1;
    let newIndex = currentIndex + step;

    if (infinite) {
      newIndex = newIndex > lastIndex ? 0 : newIndex;
    } else {
      newIndex = Math.min(newIndex, lastIndex - frameSize + 1);
    }

    setCurrentIndex(newIndex);
  };

  const handleDecrement = () => {
    let newIndex = currentIndex - step;

    if (infinite) {
      newIndex = newIndex < 0 ? 0 : newIndex;
    } else {
      newIndex = Math.max(newIndex, 0);
    }

    setCurrentIndex(newIndex);
  };

  const visibleImages = images.slice(currentIndex, currentIndex + frameSize);

  const frameStyle = {
    width: `${itemWidth * frameSize}px`,
    transition: `transform ${animationDuration}ms ease-in-out`,
  };

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={frameStyle}>
        {visibleImages.map((image, index) => (
          <img
            className="Carousel__frame--img"
            key={image}
            src={image}
            alt={`Slide ${currentIndex + index + 1}`}
            style={{ width: `${itemWidth}px` }}
          />
        ))}
      </div>

      <button
        className="Carousel__button Carousel__button--prev"
        type="button"
        onClick={handleDecrement}
      >
        Prev
      </button>

      <button
        className="Carousel__button Carousel__button-next"
        type="button"
        onClick={handleIncrement}
        data-cy="next-button"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
