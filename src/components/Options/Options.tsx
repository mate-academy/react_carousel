import React from 'react';
import './Options.scss';

type Props = {
  itemWidth: number;
  setItemWidth: (e: number) => void;
  frameSize: number;
  setFrameSize: (e: number) => void;
  images: string[];
  step: number;
  setStep: (e: number) => void;
  animationDuration: number;
  setAnimationDuration: (e: number) => void;
  setInfinite: (e: boolean) => void;
};

export const Options: React.FC<Props> = ({
  itemWidth,
  setItemWidth,
  frameSize,
  setFrameSize,
  images,
  step,
  setStep,
  animationDuration,
  setAnimationDuration,
  setInfinite,
}) => {
  const infinite = false;

  return (
    <div className="options">
      <label htmlFor="itemId" className="options__label">
        Item Width:
        <input
          className="options__input"
          type="number"
          id="itemId"
          value={itemWidth}
          min={130}
          max={260}
          step={10}
          onChange={(event) => setItemWidth(+event.target.value)}
        />
      </label>

      <label htmlFor="frameId" className="options__label">
        Frame Size:
        <input
          className="options__input"
          type="number"
          id="frameId"
          value={frameSize}
          min={1}
          max={images.length}
          step={1}
          onChange={(event) => setFrameSize(+event.target.value)}
        />
      </label>

      <label htmlFor="stepId" className="options__label">
        Step:
        <input
          className="options__input"
          type="number"
          id="stepId"
          value={step}
          min={1}
          max={images.length}
          step={1}
          onChange={(event) => setStep(+event.target.value)}
        />
      </label>

      <label htmlFor="animationId" className="options__label">
        AnimationDuration:
        <input
          className="options__input"
          type="number"
          id="animationId"
          value={animationDuration}
          min={500}
          max={5000}
          step={500}
          onChange={(event) => setAnimationDuration(+event.target.value)}
        />
      </label>

      <label htmlFor="infinityId" className="options__label">
        Infinite:
        <input
          type="checkbox"
          id="infinityId"
          onChange={() => setInfinite(!infinite)}
        />
      </label>
    </div>
  );
};
