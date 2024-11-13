import React, { useState } from 'react';
import './Form.scss';

type Props = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  onChange: (data: {
    step: number;
    frameSize: number;
    itemWidth: number;
    animationDuration: number;
    infinite: boolean;
  }) => void;
};

export const Form: React.FC<Props> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  onChange,
}) => {
  const [formData, setFormData] = useState({
    step: step,
    frameSize: frameSize,
    itemWidth: itemWidth,
    animationDuration: animationDuration,
    infinite: infinite,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevData => {
      const updateData = {
        ...prevData,
        [name]: value,
      };

      onChange({
        step: updateData.step,
        frameSize: updateData.frameSize,
        itemWidth: updateData.itemWidth,
        animationDuration: updateData.animationDuration,
        infinite: e.target.checked,
      });

      return updateData;
    });
  };

  return (
    <form className="Form">
      <div className="Form__field">
        <label className="Form__label" htmlFor="stepId">
          Step
        </label>
        <input
          className="Form__input"
          type="number"
          name="step"
          id="stepId"
          defaultValue={formData.step}
          onChange={handleInputChange}
        />
      </div>

      <div className="Form__field">
        <label className="Form__label" htmlFor="frameId">
          Frame size
        </label>
        <input
          className="Form__input"
          type="number"
          name="frameSize"
          id="frameId"
          defaultValue={formData.frameSize}
          onChange={handleInputChange}
        />
      </div>

      <div className="Form__field">
        <label className="Form__label" htmlFor="itemId">
          Item width
        </label>
        <input
          className="Form__input"
          type="number"
          name="itemWidth"
          id="itemId"
          defaultValue={formData.itemWidth}
          onChange={handleInputChange}
        />
      </div>

      <div className="Form__field">
        <label className="Form__label" htmlFor="animationId">
          Animation duration
        </label>
        <input
          className="Form__input"
          type="number"
          name="animationDuration"
          id="animationId"
          defaultValue={formData.animationDuration}
          onChange={handleInputChange}
        />
      </div>

      <div className="Form__field">
        <label className="Form__label" htmlFor="infiniteId">
          Infinite
        </label>
        <input
          className="Form__input"
          type="checkbox"
          name="infinite"
          id="infiniteId"
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};
