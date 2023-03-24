import { ChangeEvent } from 'react';

type CarouselFormProps = {
  itemWidth: number,
  onItemWidthChange: (itemWidth: number) => void;
  frameSize: number,
  onframeSizeChange: (frameSize: number) => void;
  step: number,
  onStepChange: (step: number) => void;
  duration: number,
  onDurationChange: (duration: number) => void;
  isInfinite: boolean,
  onIsInfiniteChange: (isInfinite: boolean) => void;
};

export const CarouselForm: React.FC<CarouselFormProps> = ({
  itemWidth,
  frameSize,
  step,
  duration,
  isInfinite,
  onItemWidthChange,
  onframeSizeChange,
  onDurationChange,
  onIsInfiniteChange,
  onStepChange,
}) => {
  const handleItemWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    onItemWidthChange(+e.target.value);
  };

  const handleFrameSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onframeSizeChange(+e.target.value);
  };

  const handleStepChange = (e: ChangeEvent<HTMLInputElement>) => {
    onStepChange(+e.target.value);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    onDurationChange(+e.target.value);
  };

  const handleIsInfiniteChange = () => {
    onIsInfiniteChange(!isInfinite);
  };

  return (
    <>
      <label>
        Item width:
        <input
          type="range"
          value={itemWidth}
          min="60"
          max="300"
          onChange={handleItemWidthChange}
        />
      </label>
      <label>
        Frame size:
        <input
          value={frameSize}
          type="range"
          min="1"
          max="9"
          onChange={handleFrameSizeChange}
        />
      </label>
      <label>
        Step:
        <input
          value={step}
          type="range"
          min="1"
          max="9"
          onChange={handleStepChange}
        />
      </label>
      <label>
        AnimationDuration:
        <input
          value={duration}
          type="range"
          min="500"
          max="3000"
          onChange={handleDurationChange}
        />
      </label>
      <label>
        Infinite:
        <input
          checked={isInfinite}
          type="checkbox"
          min="500"
          max="3000"
          onChange={handleIsInfiniteChange}
        />
      </label>

    </>
  );
};
