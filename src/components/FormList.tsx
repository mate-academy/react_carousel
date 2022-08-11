import { useState } from 'react';

import './FormList.scss';

type Props = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean
  onSetValue: React.Dispatch<React.SetStateAction<{
    step: number;
    frameSize: number;
    itemWidth: number;
    animationDuration: number;
    infinite: boolean;
  }>>
};

export const FormList: React.FC<Props> = (props) => {
  const [step, setStep] = useState(props.step);
  const [frameSize, setFrameSize] = useState(props.frameSize);
  const [itemWidth, setItemWidth] = useState(props.itemWidth);
  const [infinite, setInfinite] = useState(props.infinite);
  const [animationDuration,
    setAnimationDuration] = useState(props.animationDuration);

  return (
    <form>
      <label htmlFor="">
        Item width
        <input
          className="input"
          type="number"
          value={itemWidth}
          name="itemWidth"
          onChange={e => {
            setItemWidth(+e.target.value);
          }}
        />
      </label>
      <label htmlFor="">
        Frame size
        <input
          className="input"
          type="number"
          value={frameSize}
          name="frameSize"
          onChange={e => {
            setFrameSize(+e.target.value);
          }}
        />
      </label>
      <label htmlFor="">
        Step
        <input
          className="input"
          type="number"
          value={step}
          name="Step"
          onChange={e => {
            setStep(+e.target.value);
          }}
        />
      </label>
      <label htmlFor="">
        Animation duration
        <input
          className="input"
          type="number"
          value={animationDuration}
          name="animationDuration"
          onChange={e => {
            setAnimationDuration(+e.target.value);
          }}
        />
      </label>

      <label htmlFor="">
        Infinite
        <input
          className="input"
          name="infinite"
          type="checkbox"
          checked={infinite}
          onChange={e => {
            setInfinite(e.target.checked);
          }}
        />
      </label>

      <button
        type="button"
        onClick={() => {
          props.onSetValue({
            step, frameSize, itemWidth, animationDuration, infinite,
          });
        }}
      >
        Apply
      </button>
    </form>
  );
};
