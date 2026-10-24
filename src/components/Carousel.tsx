import React from 'react';
import './Carousel.scss';
import { useState } from 'react';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize,
  itemWidth,
  animationDuration,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(itemWidth);
  const [frame, setFrames] = useState(frameSize);
  const [steps, setSteps] = useState(step);
  const [duration, setDuration] = useState(animationDuration);

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const prevHandler = () => {
    if (infinite && currentIndex === 0) {
      setCurrentIndex(images.length - frame);

      return;
    }

    const basicIndex = Math.max(0, currentIndex - steps);

    setCurrentIndex(basicIndex);
  };

  const nextHandler = () => {
    const lastIndex = images.length - frame;

    if (infinite && currentIndex === lastIndex) {
      setCurrentIndex(0);

      return;
    }

    const basicIndex = Math.min(
      currentIndex + steps,

      lastIndex,
    );

    setCurrentIndex(basicIndex);
  };

  return (
    <div className="Carousel">
      {/* /////////////// form elements://////////////// */}
      <form onSubmit={formHandler} className="Carousel__form">
        {/* <input type="text" value={} onChange={}/> */}
        <label htmlFor="itemId">Image width:</label>
        <input
          id="itemId"
          type="number"
          value={width}
          onChange={event => {
            if (+event.target.value > 300) {
              return;
            }

            return setWidth(+event.target.value);
          }}
        />

        <label htmlFor="frameId">Number of icons:</label>
        <input
          id="frameId"
          type="number"
          value={frame}
          onChange={event => {
            if (+event.target.value > 10) {
              return;
            }

            return setFrames(+event.target.value);
          }}
        />

        <label htmlFor="stepId">Number of steps:</label>
        <input
          id="stepId"
          type="number"
          value={steps}
          onChange={event => setSteps(+event.target.value)}
        />

        <label htmlFor="durationId">Set animation duration:</label>
        <input
          id="durationId"
          type="number"
          value={duration}
          onChange={event => setDuration(+event.target.value)}
        />

        <button
          type="button"
          onClick={prevHandler}
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={nextHandler}
          disabled={!infinite && currentIndex === images.length - frame}
          data-cy="next"
        >
          Next
        </button>
      </form>
      {/* /////////////// list://////////////// */}
      <div className="Carousel__images" style={{ width: width * frame }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-(width * currentIndex)}px)`,
            transition: `transform ${duration}ms`,
          }}
        >
          {[...images].map(image => (
            <li key={image}>
              <img src={image} alt="1" width={width} height={width} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
