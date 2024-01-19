import React, { useState } from 'react';
import { TextInput } from '../TextInput';
import { CarouselRules } from '../../types/CarouselRules';

type Props = {
  initialCarouselRules: CarouselRules
  onSubmit: (newRules: CarouselRules) => void,
};

type CarouselRulesFormErrors = {
  hasItemWidthError: boolean,
  hasFrameSizeError: boolean,
  hasStepError: boolean,
  hasAnimationDurationError: boolean,
};

const defaultCarouselRulesFormErrors: CarouselRulesFormErrors = {
  hasItemWidthError: false,
  hasFrameSizeError: false,
  hasStepError: false,
  hasAnimationDurationError: false,
};

const resetedCarouselRules: CarouselRules = {
  itemWidth: 0,
  frameSize: 0,
  step: 0,
  animationDuration: 0,
  infinite: false,
};

export const CarouselRulesForm: React.FC<Props> = ({
  onSubmit,
  initialCarouselRules,
}) => {
  const [newCarouselRules, setNewCarouselRules]
    = useState(initialCarouselRules);
  const [formState, setFormState] = useState(0);
  const [errors, setErrors] = useState(defaultCarouselRulesFormErrors);

  const handleFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    // eslint-disable-next-line prefer-destructuring
    const value = +event.target.value;

    setNewCarouselRules({
      ...newCarouselRules,
      [fieldName]: value,
    });
  };

  const handleReset = () => {
    setFormState(currentState => currentState + 1);
    setNewCarouselRules(resetedCarouselRules);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({
      hasItemWidthError: !(newCarouselRules.itemWidth > 0),
      hasAnimationDurationError: !(newCarouselRules.animationDuration > 0),
      hasFrameSizeError: !(newCarouselRules.frameSize > 0),
      hasStepError: !(newCarouselRules.step > 0),
    });

    if (newCarouselRules.animationDuration > 0
      && newCarouselRules.frameSize > 0
      && newCarouselRules.itemWidth > 0
      && newCarouselRules.step > 0
    ) {
      onSubmit(newCarouselRules);
      handleReset();
    }
  };

  const handleInfiniteInputChanged
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCarouselRules({
      ...newCarouselRules,
      infinite: event.target.checked,
    });
  };

  return (
    <form
      className="box App__form"
      key={formState}
      onReset={handleReset}
      onSubmit={handleSubmit}
    >

      <TextInput
        inputInitialValue={newCarouselRules.itemWidth}
        inputName="itemWidth"
        placeholder="Enter item width"
        labelText="Item width"
        hasError={errors.hasItemWidthError}
        onChange={handleFieldChanged}
      />

      <TextInput
        inputInitialValue={newCarouselRules.frameSize}
        inputName="frameSize"
        placeholder="Enter frame size"
        labelText="Frame size"
        hasError={errors.hasFrameSizeError}
        onChange={handleFieldChanged}
      />

      <TextInput
        inputInitialValue={newCarouselRules.step}
        inputName="step"
        placeholder="Enter step"
        labelText="Step"
        hasError={errors.hasStepError}
        onChange={handleFieldChanged}
      />

      <TextInput
        inputInitialValue={newCarouselRules.animationDuration}
        inputName="animationDuration"
        placeholder="Enter animation duration"
        labelText="Animation duration"
        hasError={errors.hasAnimationDurationError}
        onChange={handleFieldChanged}
      />

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              onChange={(event) => handleInfiniteInputChanged(event)}
            />
            Infinite mode
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
        <div className="control">
          {/* eslint-disable-next-line */}
          <button type="reset" className="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
