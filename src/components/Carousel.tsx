import { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const lastPosition = -(images.length - frameSize);
  const isNextDisabled = position === lastPosition && !infinite;
  const isPrevDisabled = !position && !infinite;
  const handlePrev = () => {
    if (position < 0) {
      setPosition(prevPosition =>
        prevPosition + step < 0 ? prevPosition + step : 0,
      );

      return;
    }

    setPosition(lastPosition);
  };

  const handleNext = () => {
    if (position > lastPosition) {
      setPosition(prevPosition =>
        prevPosition - step > lastPosition ? prevPosition - step : lastPosition,
      );

      return;
    }

    setPosition(0);
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(${position * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              className="Carousel__image"
              src={image}
              alt={image}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
