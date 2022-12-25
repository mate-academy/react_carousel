import { FC, useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  transform: number;
  setTransform: (value: number | ((value: number) => number)) => void;
  infinite: boolean;
};

export const Carousel: FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  transform,
  setTransform,
  infinite,
}) => {
  const [stopTransition, setStopTransition] = useState(false);

  const maxTransition = 0;
  const minTransition = -(images.length - frameSize) * itemWidth;

  const isStart = transform === maxTransition;
  const isEnd = transform === minTransition;

  const goForward = () => {
    setTransform((prev) => {
      return prev - itemWidth * step < minTransition
        ? minTransition
        : prev - itemWidth * step;
    });
  };

  const goBackward = () => {
    setTransform((prev) => {
      return prev + itemWidth * step > maxTransition
        ? maxTransition
        : prev + itemWidth * step;
    });
  };

  const handleButtonClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      goBackward();
    } else {
      goForward();
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (transform > minTransition && infinite) {
        goForward();

        return;
      }

      if (transform > minTransition && !infinite && !stopTransition) {
        goForward();

        return;
      }

      if (!infinite && !stopTransition) {
        setStopTransition(true);

        return;
      }

      if (infinite) {
        setTransform(maxTransition);
      }
    }, animationDuration);

    return () => {
      clearTimeout(timerId);
    };
  }, [infinite, transform]);

  const listStyle = {
    width: `${frameSize * itemWidth}px`,
    height: `${itemWidth}px`,
  };

  const listItemStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
    transform: `translateX(${transform}px)`,
  };

  const imgStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        className="button"
        onClick={() => handleButtonClick('prev')}
        disabled={isStart}
      >
        <img
          className="button__arrow"
          src="./icons/arrow-prev.png"
          alt="Prev"
        />
      </button>

      <ul className="Carousel__list" style={listStyle}>
        {images.map((img, i) => (
          <li
            key={img}
            className="Carousel__list-item"
            style={listItemStyle}
          >
            <img
              src={img}
              alt={`${i + 1}`}
              className="Carousel__img"
              style={imgStyle}
            />
          </li>
        ))}
      </ul>

      <button
        data-cy="next"
        type="button"
        className="button"
        onClick={() => handleButtonClick('next')}
        disabled={isEnd}
      >
        <img
          src="./icons/arrow-next.png"
          alt="Next"
          className="button__arrow"
        />
      </button>
    </div>
  );
};
