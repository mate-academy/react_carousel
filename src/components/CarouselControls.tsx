import React from 'react';

type Props = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  onItemWidthChange: (value: number) => void;
  onFrameSizeChange: (value: number) => void;
  onStepChange: (value: number) => void;
  onAnimationDurationChange: (value: number) => void;
};

const CarouselControls: React.FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  onItemWidthChange,
  onFrameSizeChange,
  onStepChange,
  onAnimationDurationChange,
}) => {
  return (
    <div>
      <input
        id="itemId"
        htmlFor="itemId"
        type="number"
        value={itemWidth}
        onChange={event => onItemWidthChange(Number(event.target.value) || 0)}
      />

      <input
        id="frameId"
        htmlFor="frameId"
        type="number"
        value={frameSize}
        onChange={event => onFrameSizeChange(Number(event.target.value) || 0)}
      />

      <input
        id="stepId"
        htmlFor="stepId"
        type="number"
        value={step}
        onChange={event => onStepChange(Number(event.target.value) || 0)}
      />

      <input
        id="animationId"
        htmlFor="animationId"
        type="number"
        value={animationDuration}
        onChange={event =>
          onAnimationDurationChange(Number(event.target.value) || 0)
        }
      />
    </div>
  );
};

export default CarouselControls;
