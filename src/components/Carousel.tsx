import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const maxIndex = Math.max(images.length - frameSize, 0);

  React.useEffect(() => {
    setCurrentIndex(current => Math.min(current, maxIndex));
  }, [maxIndex]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: itemWidth * frameSize,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-(currentIndex * itemWidth)}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              style={{
                width: itemWidth,
              }}
            >
              <img src={image} alt="image" width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        disabled={currentIndex <= 0}
        onClick={() => {
          setCurrentIndex(current => Math.max(current - step, 0));
        }}
      >
        Prev
      </button>

      <button
        data-cy="next"
        type="button"
        disabled={currentIndex >= maxIndex}
        onClick={() => {
          setCurrentIndex(current => Math.min(current + step, maxIndex));
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
