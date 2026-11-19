import { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const [transform, setTransform] = useState(0);
  const size = images.length;
  const change = itemWidth * frameSize;

  const maxIndex = size - frameSize;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ width: `${change}px` }}>
        {images.map(img => (
          <li
            key={img}
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
              transition: `transform, ${animationDuration}ms`,
            }}
          >
            <img
              src={img}
              alt={img + ''}
              style={{ width: `${itemWidth}px` }}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          if (currentIndex > 0) {
            setTransform(transform - change);
            setCurrentIndex(Math.max(currentIndex - step, 0));
          } else if (infinite) {
            setCurrentIndex(maxIndex);
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={() => {
          if (currentIndex < maxIndex) {
            setTransform(transform + change);
            setCurrentIndex(Math.min(currentIndex + step, maxIndex));
          } else if (infinite) {
            setCurrentIndex(0);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
