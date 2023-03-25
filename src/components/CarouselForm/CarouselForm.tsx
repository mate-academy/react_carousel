import { ChangeEvent } from 'react';
import './CarouselFrom.scss';

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
    <div className="carousel-form">
      <div className="carousel-form__item">
        <label htmlFor="itemWidth">Item width:</label>
        <input
          id="itemWidth"
          type="range"
          value={itemWidth}
          min="60"
          max="300"
          onChange={handleItemWidthChange}
        />
      </div>

      <div className="carousel-form__item">
        <label htmlFor="frameSize">
          Frame size:
        </label>
        <input
          id="frameSize"
          value={frameSize}
          type="range"
          min="1"
          max="9"
          onChange={handleFrameSizeChange}
        />
      </div>

      <div className="carousel-form__item">
        <label htmlFor="step">
          Step:
        </label>
        <input
          id="step"
          value={step}
          type="range"
          min="1"
          max="9"
          onChange={handleStepChange}
        />
      </div>

      <div className="carousel-form__item">
        <label htmlFor="duration">
          AnimationDuration:
        </label>
        <input
          id="duration"
          value={duration}
          type="range"
          min="500"
          max="3000"
          onChange={handleDurationChange}
        />
      </div>

      <div className="carousel-form__item carousel-form__item--infinite ">
        <label htmlFor="infinite">
          Infinite:
        </label>
        <input
          id="infinite"
          checked={isInfinite}
          type="checkbox"
          min="500"
          max="3000"
          onChange={handleIsInfiniteChange}
        />
      </div>
    </div>
  );
};
