import React from 'react';
import { CarouselConfig } from '../../types';
import './Form.scss';

type Props = CarouselConfig & {
  containerSize: number;
  imagesCount: number;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

const MIN_ITEM_WIDTH = 100;
const MAX_ITEM_WIDTH = 300;
const MIN_ANIMATION_DURATION = 200;
const MAX_ANIMATION_DURATION = 2000;

export const Form: React.FC<Props> = ({
  animationDuration,
  containerSize,
  frameSize,
  infinite,
  itemWidth,
  step,
  handleChange,
  imagesCount: imageCount,
}) => {
  return (
    <form action="#" className="Form">
      <div className="Form__input-group">
        <label className="Form__label" htmlFor="itemWidth">
          Item Width ({itemWidth})
        </label>
        <input
          className="Form__input"
          name="itemWidth"
          id="itemWidth"
          type="range"
          value={itemWidth}
          onChange={handleChange}
          min={MIN_ITEM_WIDTH}
          max={Math.floor(Math.min(containerSize / frameSize, MAX_ITEM_WIDTH))}
        />
      </div>

      <div className="Form__input-group">
        <label className="Form__label" htmlFor="frameSize">
          Frame Size ({frameSize})
        </label>
        <input
          className="Form__input"
          name="frameSize"
          id="frameSize"
          type="range"
          min={1}
          value={frameSize}
          onChange={handleChange}
          max={Math.floor(Math.min(containerSize / itemWidth, imageCount))}
        />
      </div>

      <div className="Form__input-group">
        <label className="Form__label" htmlFor="step">
          Step ({step})
        </label>
        <input
          className="Form__input"
          name="step"
          id="step"
          type="range"
          min={1}
          max={imageCount}
          value={step}
          onChange={handleChange}
        />
      </div>

      <div className="Form__input-group">
        <label className="Form__label" htmlFor="animationDuration">
          Animation duration ({animationDuration})
        </label>
        <input
          className="Form__input"
          name="animationDuration"
          id="animationDuration"
          type="range"
          min={MIN_ANIMATION_DURATION}
          max={MAX_ANIMATION_DURATION}
          value={animationDuration}
          onChange={handleChange}
        />
      </div>

      <div className="Form__input-group">
        <label className="Form__label" htmlFor="infinite">
          Infinite loop
        </label>
        <input
          className="Form__input"
          name="infinite"
          id="infinite"
          type="checkbox"
          checked={infinite}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};
