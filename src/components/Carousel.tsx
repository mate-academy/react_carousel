import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

type Direction = 'forward' | 'backward';

const Carousel: React.FC<Props> = ({
  images, itemWidth, frameSize, step, animationDuration,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleMove = (direction: Direction) => {
    const stepShift = direction === 'forward' ? step : -step;

    const lastImageIndex = startIndex + stepShift;

    if (lastImageIndex >= images.length - frameSize) {
      setStartIndex(images.length - frameSize);
    } else if (lastImageIndex <= 0) {
      setStartIndex(0);
    } else {
      setStartIndex(lastImageIndex);
    }
  };

  const styleImages = {
    transitionDuration: `${animationDuration}ms`,
    transform: `translateX(-${startIndex * itemWidth}px)`,
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${itemWidth * frameSize}px` }}
    >
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            key={image}
            className="Carousel__emoji"
            style={styleImages}
          >
            <img
              src={image}
              width={itemWidth}
              alt={image
                .substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'))}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => handleMove('backward')}
        disabled={startIndex === 0}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        onClick={() => handleMove('forward')}
        disabled={startIndex === images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
