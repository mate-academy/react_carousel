import './Carousel.scss';
import { useState } from 'react';

type Props = {
  images: string[],
  infinite: boolean,
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images, infinite, frameSize, step, itemWidth, animationDuration,
}) => {
  const [stepInPx, setStepInPx] = useState(0);
  const [end, setEnd] = useState(images.length);
  const [count, setCount] = useState(0);

  function valueIncrement(value: number, increment: number) {
    return value + increment;
  }

  function valueDecrement(value: number, decrement: number) {
    return value - decrement;
  }

  let stepCopy = step;

  if (step >= images.length) {
    stepCopy = images.length - 1;
  }

  const distance = stepCopy * itemWidth;
  const something = (images.length - 1) * itemWidth;

  const next = () => {
    if (infinite === false) {
      if (stepCopy < end) {
        setEnd(end2 => valueDecrement(end2, stepCopy));
        setStepInPx(stepInPx2 => valueIncrement(stepInPx2, distance));
      } else if (stepCopy >= end && end >= 1) {
        setStepInPx(something);
        setEnd(1);
      }
    } else if (infinite === true) {
      if ((end - stepCopy) < frameSize - 1) {
        setCount(1);
      }

      if (end > stepCopy) {
        setEnd(end2 => valueDecrement(end2, stepCopy));
        setStepInPx(stepInPx2 => valueIncrement(stepInPx2, distance));
      } else if (end <= stepCopy) {
        if (count > 0) {
          setStepInPx(0);
          setCount(0);
          setEnd(images.length);
        } else {
          setStepInPx(something);
          setCount(1);
        }
      }
    }
  };

  const back = () => {
    if (stepInPx > 0 && stepInPx > (stepCopy * itemWidth)) {
      setStepInPx(stepInPx2 => valueDecrement(stepInPx2, distance));
      setEnd(end2 => valueIncrement(end2, stepCopy));
    } else {
      setStepInPx(0);
      setCount(0);
      setEnd(images.length);
    }
  };

  return (
    <div className="Carousel">
      <div className="box" style={{ width: frameSize * itemWidth }}>
        <ul className="Carousel__list" style={{ transform: `translateX(${-stepInPx}px)`, transitionDuration: `${animationDuration / 1000}s` }}>
          {images.map((image: string) => (
            <li key={image}>
              <img
                src={image}
                alt="2"
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={back}>Prev</button>
      <button type="button" onClick={next} data-cy="next">Next</button>
    </div>
  );
};

export default Carousel;
