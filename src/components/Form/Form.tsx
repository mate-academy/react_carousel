import React from 'react';
import './Form.scss';

type Props = {
  members: number;
  lengthMove: number;
  pace: number;
  frame: number;
  size: number;
  speed: number;
  infinite: boolean;
  setLengthMove: (lengthMove: number) => void;
  enteredStep: (pace: number) => void;
  enteredFrame: (frame: number) => void;
  enteredSize: (size: number) => void;
  enteredSpeed: (speed: number) => void;
  setInfinite: (infinite: boolean) => void;
};

export const Form: React.FC<Props> = ({
  members,
  lengthMove,
  pace,
  frame,
  size,
  speed,
  infinite,
  setLengthMove,
  enteredStep,
  enteredFrame,
  enteredSize,
  enteredSpeed,
  setInfinite,
}) => {
  const onChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    enteredFunction: (value: number) => void,
    currentValue: number,
    startValue: number,
  ) => {
    const buttonNext = document
      .querySelector<HTMLButtonElement>('[data-cy=next]');
    const buttonPrev = document
      .querySelector<HTMLButtonElement>('[data-cy=prev]');

    if (+event.target.value && +event.target.value !== currentValue) {
      enteredFunction(+event.target.value);
    } else {
      enteredFunction(startValue);
    }

    const dispSize = (lengthMove / currentValue) * +event.target.value;
    const dispFrame = (members - +event.target.value) * size * -1;
    const position = (-1 * lengthMove) + (size * frame);

    switch (event.target.getAttribute('name')) {
      case 'size':
        setLengthMove(dispSize);
        break;

      case 'frame':
        if (position === members * size) {
          setLengthMove(dispFrame);
        }

        if (frame + 1 !== members
          && buttonNext instanceof HTMLElement
          && buttonPrev instanceof HTMLElement) {
          buttonPrev.disabled = false;
          buttonNext.disabled = false;
        }

        break;

      default:
        break;
    }
  };

  return (
    <form className="form">
      <label>
        Step:
        <input
          type="number"
          value={pace}
          min={1}
          max={members}
          onChange={(event) => onChangeValue(event, enteredStep, pace, 3)}
        />
      </label>
      <label>
        Frame:
        <input
          type="number"
          name="frame"
          value={frame}
          min={1}
          max={members}
          onChange={(event) => onChangeValue(event, enteredFrame, frame, 3)}
        />
      </label>
      <label>
        Size:
        <input
          type="number"
          name="size"
          value={size}
          min={50}
          max={300}
          onChange={(event) => onChangeValue(event, enteredSize, size, 130)}
        />
      </label>
      <label>
        Speed:
        <input
          type="number"
          value={speed}
          min={0}
          max={5000}
          onChange={(event) => onChangeValue(event, enteredSpeed, speed, 1000)}
        />
      </label>
      <label>
        Infinite:
        <input
          type="checkbox"
          onChange={() => {
            setInfinite(!infinite);
          }}
        />
      </label>
    </form>
  );
};
