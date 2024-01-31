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
  useFrameSize: (value: number) => void
  iseItemWidth: (value: number) => void
  useAnimation: (value: number) => void
  useInfinite: (value: boolean) => void
}

export const Form: React.FC<FormProps> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  setStep,
  useFrameSize,
  iseItemWidth,
  useAnimation,
  useInfinite,
}) => {
  return (
    <form action="/my-handling-form-page" method="get">
      <div className="buttons">
        <button
          type="button"
          className="button is-success is-light"
        >
          Prev
        </button>
        <button
          type="button"
          className="button is-success is-light"
        >
          Next
        </button>
      </div>
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
            max="8"
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
            onChange={(e) => useFrameSize(+e.target.value)}
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
            onChange={(e) => iseItemWidth(+e.target.value)}
            value={itemWidth}
            className="input is-primary"
            type="number"
            id="itemWidth"
            name="user_email"
            min="130"
            max="520"
            step="10"
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
            onChange={(e) => useAnimation(+e.target.value)}
            value={animationDuration}
            className="input is-primary"
            type="number"
            id="animationDuration"
            name="user_email"
            min="0"
            max="1500"
            step="10"
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
            onChange={(e) => useInfinite(e.target.checked)}
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
