import React from 'react';
import './Form.scss';

type Props = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

interface FormProps extends Props {
  setStep: (value: number) => void
  setFrameSize: (value: number) => void
  setItemWidth: (value: number) => void
  setAnimation: (value: number) => void
  setInfinite: (value: boolean) => void
}

export const Form: React.FC<FormProps> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  setStep,
  setFrameSize,
  setItemWidth,
  setAnimation,
  setInfinite,
}) => {
  return (
    <form action="/my-handling-form-page" method="get">
      <ul>
        <li>
          <label
            htmlFor="step"
            className="label"
          >
            Step
          </label>
          <input
            onChange={(e) => setStep(+e.target.value)}
            value={step}
            className="input is-primary"
            type="number"
            id="step"
            name="user_name"
            min="1"
            max="10"
          />
        </li>
        <li>
          <label
            htmlFor="frameSize"
            className="label"
          >
            Frame Size:
          </label>
          <input
            onChange={(e) => setFrameSize(+e.target.value)}
            value={frameSize}
            className="input is-primary"
            type="number"
            id="frameSize"
            name="user_email"
            min="1"
            max="10"
          />
        </li>
        <li>
          <label
            htmlFor="itemWidth"
            className="label"
          >
            Picture Width:
          </label>
          <input
            onChange={(e) => setItemWidth(+e.target.value)}
            value={itemWidth}
            className="input is-primary"
            type="number"
            id="itemWidth"
            name="user_email"
            min="130"
            max="260"
            step="5"
          />
        </li>
        <li>
          <label
            htmlFor="animationDuration"
            className="label"
          >
            Animation Duration:
          </label>
          <input
            onChange={(e) => setAnimation(+e.target.value)}
            value={animationDuration}
            className="input is-primary"
            type="number"
            id="animationDuration"
            name="user_email"
            min="0"
            max="2000"
            step="50"
          />
        </li>
        <li className="checkboxItems">
          <label
            htmlFor="accepted"
            className="checkbox
        is-primary"
          >
            Infinity scroll
          </label>
          <input
            onChange={(e) => setInfinite(e.target.checked)}
            checked={infinite}
            id="accepted"
            type="checkbox"
            name="accepted"
          />
        </li>
      </ul>
    </form>
  );
};
