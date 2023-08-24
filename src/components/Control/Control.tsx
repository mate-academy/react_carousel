import React from 'react';
import './Control.scss';

interface Props {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  handleInputChange: (
    key: 'itemWidth' | 'frameSize' | 'step' | 'animationDuration'
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Control: React.FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  handleInputChange,
}) => {
  return (
    <div className="Control">
      <h2 className="Control__title">Control panel</h2>
      <div className="Control__container">
        <div className="Control__item">
          <label
            htmlFor="itemWidth"
            className="Control__label"
          >
            Item Width:
          </label>
          <input
            type="number"
            id="itemWidth"
            className="Control__input"
            name="itemWidth"
            min="130"
            max="260"
            step="10"
            value={itemWidth}
            onChange={handleInputChange('itemWidth')}
          />
        </div>
        <div className="Control__item">
          <label
            htmlFor="frameSize"
            className="Control__label"
          >
            Frame Size:
          </label>
          <input
            type="number"
            id="frameSize"
            className="Control__input"
            name="frameSize"
            min="1"
            max="10"
            step="1"
            value={frameSize}
            onChange={handleInputChange('frameSize')}
          />
        </div>
        <div className="Control__item">
          <label
            htmlFor="step"
            className="Control__label"
          >
            Step:
          </label>
          <input
            type="number"
            id="step"
            className="Control__input"
            name="step"
            min="1"
            max="10"
            step="1"
            value={step}
            onChange={handleInputChange('step')}
          />
        </div>
        <div className="Control__item">
          <label
            htmlFor="animationDuration"
            className="Control__label"
          >
            Duration:
          </label>
          <input
            type="number"
            id="animationDuration"
            className="Control__input"
            name="animationDuration"
            min="500"
            max="5000"
            step="500"
            value={animationDuration}
            onChange={handleInputChange('animationDuration')}
          />
        </div>
      </div>
    </div>
  );
};

export default Control;
