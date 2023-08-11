import React from 'react';
import './CarouselSettings.scss';

type CarouselSettingsProps = {
  frameSize: number;
  step: number;
  itemWidth?: number;
  animationDuration: number;
  infinite: boolean;
  onItemWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFrameSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnimationDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInfiniteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CarouselSettings: React.FC<CarouselSettingsProps> = ({
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
    <div className="settings">
      <h2>Carousel Settings</h2>
      <div className="grid">
        <label>
          Item Width:
          <input
            type="number"
            value={itemWidth}
            onChange={onItemWidthChange}
          />
        </label>
        <label>
          Frame Size:
          <input
            type="number"
            value={frameSize}
            onChange={onFrameSizeChange}
          />
        </label>
        <label>
          Step:
          <input
            type="number"
            value={step}
            onChange={onStepChange}
          />
        </label>
        <label>
          Animation Duration (ms):
          <input
            type="number"
            value={animationDuration}
            onChange={onAnimationDurationChange}
          />
        </label>
        <label>
          Infinite:
          <input
            type="checkbox"
            checked={infinite}
            onChange={onInfiniteChange}
          />
        </label>
      </div>
    </div>
  );
};

CarouselSettings.defaultProps = {
  itemWidth: 130,
};
