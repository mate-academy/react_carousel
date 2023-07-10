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
  const [itemSize, setItemSize] = useState(itemWidth);
  const [frameWidth, setFrameWidth] = useState(frameSize);
  const [position, setPosition] = useState(0);
  const [stepMove, setStepMove] = useState(step);
  const [animationMove, setAnimatonMove] = useState(animationDuration);
  const [infnt, setInfnt] = useState(infinite);

  function changeItemSize(evnt: React.ChangeEvent<HTMLInputElement>) {
    setItemSize(+evnt.target.value);
  }

  function changeFrameWidth(evnt: React.ChangeEvent<HTMLInputElement>) {
    setFrameWidth(+evnt.target.value);
  }

  function changeStep(evnt: React.ChangeEvent<HTMLInputElement>) {
    setStepMove(+evnt.target.value);
  }

  function changeAnimation(evnt: React.ChangeEvent<HTMLInputElement>) {
    setAnimatonMove(+evnt.target.value);
  }

  function changeInfinite(evnt: React.ChangeEvent<HTMLInputElement>) {
    setInfnt(evnt.target.checked);
  }

  function nextStep() {
    if (infnt && position === itemSize * -7) {
      setPosition(0);
    } else if (position - itemSize * stepMove < itemSize * -7) {
      setPosition(itemSize * -7);
    } else {
      setPosition(position - itemSize * stepMove);
    }
  }

  function prevStep() {
    if (infnt && position === 0) {
      setPosition(itemSize * -7);
    } else if (position + itemSize * stepMove > 0) {
      setPosition(0);
    } else {
      setPosition(position + itemSize * stepMove);
    }
  }

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={
          {
            width: frameWidth * itemSize,
            transition: `${animationMove}ms`,
          }
        }
      >
        {images.map(image => (
          <li
            key={image.slice(6).slice(0, -4)}
            style={
              {
                transform: `translateX(${position}px)`,
                transition: `${animationMove}ms`,
              }
            }
          >
            <img
              style={{ width: itemSize }}
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
            width: frameWidth * itemSize,
            transition: `${animationMove}ms`,
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
          disabled={position <= itemSize * -7 && !infnt}
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
            name="itemWidth"
            value={itemSize}
            type="number"
            step="10"
            onChange={changeItemSize}
          />
        </label>

        <label>
          Frame size
          <input
            name="frameSize"
            className="Carousel__input"
            value={frameWidth}
            type="number"
            step="1"
            min={1}
            max={10}
            onChange={changeFrameWidth}
          />
        </label>

        <label>
          Step
          <input
            name="step"
            className="Carousel__input"
            value={stepMove}
            type="number"
            step="1"
            min={1}
            max={10}
            onChange={changeStep}
          />
        </label>

        <label>
          AnimationDuration
          <input
            name="fnimationDuration"
            className="Carousel__input"
            value={animationMove}
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
