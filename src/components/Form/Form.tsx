import React from 'react';
import './Form.scss';

interface FormProps {
  isInfinite: boolean;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  onToggleInfinite: () => void;
  onInputChange: (key: string) => (value: number) => void;
}

const Form: React.FC<FormProps> = ({
  isInfinite,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  onToggleInfinite,
  onInputChange,
}) => {
  const handleInputChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;

      onInputChange(key)(value);
    };

  return (
    <form action="#" className="form">
      <div className="form_items">
        <label htmlFor="itemWidth">Item Width:</label>
        <input
          type="text"
          id="itemWidth"
          name="itemWidth"
          className="input"
          value={itemWidth}
          onChange={handleInputChange('itemWidth')}
        />
      </div>

      <div className="form_items">
        <label htmlFor="frameSize">Frame Size:</label>
        <input
          type="text"
          id="frameSize"
          name="frameSize"
          className="input"
          value={frameSize}
          onChange={handleInputChange('frameSize')}
        />
      </div>

      <div className="form_items">
        <label htmlFor="step">Step:</label>
        <input
          type="text"
          id="step"
          name="step"
          className="input"
          value={step}
          onChange={handleInputChange('step')}
        />
      </div>

      <div className="form_items">
        <label htmlFor="animationDuration">Animation Duration:</label>
        <input
          type="text"
          id="animationDuration"
          name="animationDuration"
          className="input"
          value={animationDuration}
          onChange={handleInputChange('animationDuration')}
        />
      </div>

      <div className="form_items">
        <label htmlFor="infinite">Infinite:</label>
        <input
          type="radio"
          id="infinite"
          name="infinite"
          className="infinite"
          checked={isInfinite}
          onClick={onToggleInfinite}
        />
      </div>
    </form>
  );
};

export default Form;
