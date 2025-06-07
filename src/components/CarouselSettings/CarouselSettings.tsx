import React, { ChangeEvent } from "react";

interface Params {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  onItemWidthChange: (value: number) => void;
  onFrameSizeChange: (value: number) => void;
  onStepChange: (value: number) => void;
  onAnimationDurationChange: (value: number) => void;
  onInfiniteChange: (value: boolean) => void;
}

const CarouselSettings: React.FC<Params> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  onItemWidthChange,
  onFrameSizeChange,
  onStepChange,
  onAnimationDurationChange,
  onInfiniteChange,
}) => {
  return (
    <form
      className="Carousel__form Form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <label className="Form__label" htmlFor="itemId">
        <span>item width:</span>
        <input
          id="itemId"
          type="text"
          value={itemWidth}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onItemWidthChange(Number(e.target.value))
          }
        />
      </label>
      <label className="Form__label" htmlFor="frameId">
        <span>frame size:</span>
        <input
          id="frameId"
          type="text"
          value={frameSize}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onFrameSizeChange(Number(e.target.value))
          }
        />
      </label>
      <label className="Form__label" htmlFor="stepId">
        <span>step:</span>
        <input
          id="stepId"
          type="text"
          value={step}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onStepChange(Number(e.target.value))
          }
        />
      </label>
      <label className="Form__label" htmlFor="durationId">
        <span>animation duration:</span>
        <input
          id="durationId"
          type="text"
          value={animationDuration}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onAnimationDurationChange(Number(e.target.value))
          }
        />
      </label>
      <label className="Form__label" htmlFor="infiniteId">
        <span>infinite:</span>
        <input
          id="infiniteId"
          type="checkbox"
          checked={infinite}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onInfiniteChange(e.target.checked)
          }
        />
      </label>
    </form>
  );
};

export default CarouselSettings;
