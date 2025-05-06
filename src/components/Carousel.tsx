import React, { useState } from 'react';
import './Carousel.scss';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepManual, setStepManual] = useState(step);
  const [frameSizeManual, setFrameSizeManual] = useState(frameSize);
  const [itemWidthManual, setItemWidthManual] = useState(itemWidth);

  const translateDistance = itemWidthManual * currentIndex;
  const frameWidth = frameSizeManual * itemWidthManual;

  const move = (direction: () => void) => {
    setTimeout(direction, animationDuration);
  };

  const prev = () => {
    if (currentIndex > 0) {
      if (currentIndex - stepManual < stepManual){
        const littleStep = currentIndex;

        setCurrentIndex(() => currentIndex - littleStep);
      } else {
        setCurrentIndex(() => currentIndex - stepManual);
      }
    } else {
      if (infinite) {
        setCurrentIndex(() => images.length - stepManual);
      }
    }
  };

  const next = () => {
    if (currentIndex < images.length - stepManual) {
      if (images.length - (currentIndex + stepManual) < frameSizeManual) {
        const littleStep = images.length - (currentIndex + stepManual);

        setCurrentIndex(() => currentIndex + littleStep);
      } else {
        setCurrentIndex(() => currentIndex + stepManual);
      }
    } else {
      if (infinite) {
        setCurrentIndex(() => 0);
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          defaultValue={3}
          onChange={e => {
            setStepManual(Number(e.target.value));
          }}
        />

        <label htmlFor="frameId">Frame Size</label>
        <input
          id="frameId"
          type="number"
          name="frameId"
          defaultValue={3}
          onChange={e => {
            setFrameSizeManual(Number(e.target.value));
          }}
        />

        <label htmlFor="itemId">Item Width</label>
        <input
          id="itemId"
          type="number"
          name="itemId"
          defaultValue={130}
          // step={130}
          onChange={e => {
            setItemWidthManual(Number(e.target.value));
          }}
        />
      </div>
      <div
        className="Carousel"
        style={{ width: `${frameWidth}px`, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__list"
          style={{ transform: `translate(${-translateDistance}px)` }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img width={`${itemWidthManual}`} src={image} alt={image} />
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => move(prev)}>
          Prev
        </button>
        <button data-cy="next" type="button" onClick={() => move(next)}>
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
