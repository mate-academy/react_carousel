import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [inputs, setInputs] = useState({
    itemSize: itemWidth,
    frameWidth: frameSize,
    stepMove: step,
    animationMove: animationDuration,
  });
  const [position, setPosition] = useState(0);
  const [infnt, setInfnt] = useState(infinite);
  const lastStep = (inputs.frameWidth - images.length) * inputs.itemSize;

  function changeAnimation(evnt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evnt.target;

    setInputs(prevInputs => ({ ...prevInputs, [name]: +value }));
  }

  function changeInfinite(evnt: React.ChangeEvent<HTMLInputElement>) {
    setInfnt(evnt.target.checked);
  }

  function nextStep() {
    if (infnt && position === lastStep) {
      setPosition(0);
    } else if (position - inputs.itemSize * inputs.stepMove < lastStep) {
      setPosition(lastStep);
    } else {
      setPosition(position - inputs.itemSize * inputs.stepMove);
    }
  }

  function prevStep() {
    if (infnt && position === 0) {
      setPosition(lastStep);
    } else if (position + inputs.itemSize * inputs.stepMove > 0) {
      setPosition(0);
    } else {
      setPosition(position + inputs.itemSize * inputs.stepMove);
    }
  }

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={
          {
            width: inputs.frameWidth * inputs.itemSize,
            transition: `${inputs.animationMove}ms`,
          }
        }
      >
        {images.map(image => (
          <li
            key={image.slice(6).slice(0, -4)}
            style={
              {
                transform: `translateX(${position}px)`,
                transition: `${inputs.animationMove}ms`,
              }
            }
          >
            <img
              style={{ width: inputs.itemSize }}
              src={image}
              alt={image.slice(6).slice(0, -4)}
            />
          </li>
        ))}
      </ul>

      <div
        className="Buttons"
        style={
          {
            width: inputs.frameWidth * inputs.itemSize,
            transition: `${inputs.animationMove}ms`,
          }
        }
      >
        <button
          type="button"
          className="Buttons__button"
          disabled={position === 0 && !infnt}
          onClick={prevStep}
        >
          Prev
        </button>
        <button
          type="button"
          className="Buttons__button"
          disabled={position <= lastStep && !infnt}
          onClick={nextStep}
        >
          Next
        </button>
      </div>
      <div className="Inputs">
        <label>
          Item Width
          <input
            className="Carousel__input"
            name="itemSize"
            value={inputs.itemSize}
            type="number"
            step="10"
            min={130}
            max={500}
            onChange={changeAnimation}
          />
        </label>

        <label>
          Frame size
          <input
            name="frameWidth"
            className="Carousel__input"
            value={inputs.frameWidth}
            type="number"
            step="1"
            min={1}
            max={10}
            onChange={changeAnimation}
          />
        </label>

        <label>
          Step
          <input
            name="stepMove"
            className="Carousel__input"
            value={inputs.stepMove}
            type="number"
            step="1"
            min={1}
            max={10}
            onChange={changeAnimation}
          />
        </label>

        <label>
          AnimationDuration
          <input
            name="animationMove"
            className="Carousel__input"
            value={inputs.animationMove}
            type="number"
            step="500"
            min={500}
            max={5000}
            onChange={changeAnimation}
          />
        </label>

        <label>
          Infinite
          <input
            name="fnimationDuration"
            type="checkbox"
            onChange={changeInfinite}
          />
        </label>
      </div>
    </div>
  );
};

export default Carousel;
