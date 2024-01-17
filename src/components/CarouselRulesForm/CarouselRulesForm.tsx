import React, { useState } from 'react';
import { TextInput } from '../TextInput';
import { CarouselRules } from '../../types/CarouselRules';

const INITIAL_NEW_CAROUSEL_RULES: CarouselRules = {
  step: 0,
  frameSize: 0,
  itemWidth: 0,
  animationDuration: 0,
  infinite: false,
};

type Props = {
  onSubmit: (newRules: CarouselRules) => void,
};

export const CarouselRulesForm: React.FC<Props> = ({
  onSubmit,
}) => {
  const [newCarouselRules, setNewCarouselRules]
    = useState(INITIAL_NEW_CAROUSEL_RULES);
  const [formState, setFormState] = useState(0);

  const [hasItemWidthError, setHasItemWidthError] = useState(false);
  const [hasFrameSizeError, setHasFrameSizeError] = useState(false);
  const [hasStepError, setHasStepError] = useState(false);
  const [hasAnimationDurationError, setHasAnimationDurationError]
    = useState(false);

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
    setNewCarouselRules(INITIAL_NEW_CAROUSEL_RULES);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasAnimationDurationError(!(newCarouselRules.animationDuration > 0));
    setHasFrameSizeError(!(newCarouselRules.frameSize > 0));
    setHasItemWidthError(!(newCarouselRules.itemWidth > 0));
    setHasStepError(!(newCarouselRules.step > 0));

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
      onSubmit={(event) => handleSubmit(event)}
    >

      <TextInput
        inputName="itemWidth"
        placeholder="Enter item width"
        labelText="Item width"
        hasError={hasItemWidthError}
        onChange={handleFieldChanged}
      />

      <TextInput
        inputName="frameSize"
        placeholder="Enter frame size"
        labelText="Frame size"
        hasError={hasFrameSizeError}
        onChange={handleFieldChanged}
      />

      <TextInput
        inputName="step"
        placeholder="Enter step"
        labelText="Step"
        hasError={hasStepError}
        onChange={handleFieldChanged}
      />

      <TextInput
        inputName="animationDuration"
        placeholder="Enter animation duration"
        labelText="Animation duration"
        hasError={hasAnimationDurationError}
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
