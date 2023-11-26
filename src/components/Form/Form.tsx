import React from 'react';
import './Form.scss';

type Props = {
  members: number;
  pace: number;
  enteredStep: (pace: number) => void;
  frame: number;
  enteredFrame: (frame: number) => void;
  size: number;
  enteredSize: (size: number) => void;
  speed: number;
  enteredSpeed: (speed: number) => void;
  infinite: boolean;
  setInfinite: (infinite: boolean) => void;
};

export const Form: React.FC<Props> = ({
  members,
  pace,
  enteredStep,
  frame,
  enteredFrame,
  size,
  enteredSize,
  speed,
  enteredSpeed,
  infinite,
  setInfinite,
}) => {
  const onChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    enteredFunction: (value: number) => void,
    currentValue: number,
    startValue: number,
  ) => {
    if (+event.target.value && +event.target.value !== currentValue) {
      enteredFunction(+event.target.value);
    } else {
      enteredFunction(startValue);
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
