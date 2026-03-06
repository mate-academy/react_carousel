import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const maxIndex = Math.max(images.length - frameSize, 0);
  const frameWidth = frameSize * itemWidth;
  const offset = -(startIndex * itemWidth);

  useEffect(() => {
    setStartIndex(prev => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const onNextBtn = () => {
    setStartIndex(prev =>
      infinite && prev >= maxIndex ? 0 : Math.min(prev + step, maxIndex),
    );
  };

  const onPrevBtn = () => {
    setStartIndex(prev =>
      infinite && prev <= 0 ? maxIndex : Math.max(prev - step, 0),
    );
  };

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${offset}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => {
            const alt = image.split('/').pop()?.split('.')[0] || 'slide';

            return (
              <li
                key={image}
                className="Carousel__item"
                style={{ width: `${itemWidth}px` }}
              >
                <img
                  src={image}
                  alt={alt}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button type="button" onClick={onPrevBtn}>
          Previous
        </button>

        <button type="button" onClick={onNextBtn} data-cy="next">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
