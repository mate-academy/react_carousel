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
  setLengthMove: (frame: number) => void;
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
    if (+event.target.value && +event.target.value !== currentValue) {
      enteredFunction(+event.target.value);
    } else {
      enteredFunction(startValue);
    }

    if (event.target.getAttribute('name') === 'size' && lengthMove < 0) {
      const disp = (lengthMove / currentValue) * +event.target.value;

      setLengthMove(disp);
    }

    const position = (-1 * lengthMove) + (size * frame);

    if (event.target.getAttribute('name') === 'frame'
      && lengthMove < 0
      && position === members * size
    ) {
      const disp = (members - +event.target.value) * size * -1;

      setLengthMove(disp);
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
