import React, { useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC = (props: {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  images: string[];
  infinite?: boolean;
}) => {
  const [steps, setSteps] = useState(0);
  const maxSteps = props.images.length - props.frameSize;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: props.frameSize * props.itemWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${steps * props.itemWidth}px)`,
            transition: `transform ${props.animationDuration}ms`,
          }}
        >
          {props.images.map((img, i) => (
            <li key={i}>
              <img src={img} alt={`${i + 1}`} width={props.itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setSteps(Math.max(steps - props.step, 0))}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => setSteps(Math.min(steps + props.step, maxSteps))}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
