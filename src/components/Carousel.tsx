import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="Carousel" style={{ width: frameSize * itemWidth }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${-currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={`${image}-${index}`} style={{ width: itemWidth }}>
            <img
              data-cy="image"
              src={image}
              alt={`image-${index}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        data-cy="prev"
        onClick={() =>
          setCurrentIndex(prev =>
            infinite === true && prev === 0
              ? images.length - frameSize
              : Math.max(0, prev - step),
          )
        }
        disabled={!infinite && currentIndex === 0}
        type="button"
      >
        Prev
      </button>
      <button
        data-cy="next"
        onClick={() =>
          setCurrentIndex(next =>
            infinite === true && next >= images.length - frameSize
              ? 0
              : Math.min(images.length - frameSize, next + step),
          )
        }
        disabled={!infinite && currentIndex >= images.length - frameSize}
        type="button"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
