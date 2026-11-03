import React, { useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC = (props: {
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  images: string[];
  infinite?: boolean;
}) => {
  const {
    itemWidth = 130,
    frameSize = 3,
    step = 3,
    animationDuration = 1000,
    infinite = false,
  } = props;
  const [steps, setSteps] = useState(0);
  const maxSteps = props.images.length - frameSize;

  const goNext = () => {
    if (infinite === true && steps === maxSteps) {
      setSteps(0);
    } else {
      setSteps(Math.min(steps + step, maxSteps));
    }
  };

  const goPrev = () => {
    if (infinite === true && steps === 0) {
      setSteps(maxSteps);
    } else {
      setSteps(Math.max(steps - step, 0));
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: frameSize * itemWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${steps * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {props.images.map((img, i) => (
            <li key={i}>
              <img src={img} alt={`${i + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={goPrev}>
        Prev
      </button>
      <button data-cy="next" type="button" onClick={goNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
