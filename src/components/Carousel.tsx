import React from 'react';
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
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = React.useState(0);
  const handleNext = () => {
    const maxPosition = images.length - frameSize;

    if (infinite && position >= maxPosition) {
      setPosition(0);

      return;
    }

    setPosition(Math.min(position + step, maxPosition));
  };

  const handlePrev = () => {
    const maxPosition = images.length - frameSize;

    if (infinite && position === 0) {
      setPosition(maxPosition);

      return;
    }

    setPosition(Math.max(position - step, 0));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${position * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              style={{
                width: `${itemWidth}px`,
                flexShrink: 0,
              }}
            >
              <img src={image} alt="" width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>

      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
