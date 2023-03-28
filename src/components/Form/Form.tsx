import React from 'react';
import './Form.scss';

type Props = {
  updateStateInput: (value: number, name: string) => void,
  updateStateCheckBox: (isChecked: boolean) => void,
};

export const Form: React.FC<Props> = ({
  updateStateInput,
  updateStateCheckBox,
}) => (
  <form className="Form">
    <label
      className="Form__label"
      htmlFor="stepId"
    >
      Step:
      <input
        className="Form__input"
        id="stepId"
        name="step"
        type="number"
        defaultValue={3}
        onChange={(event) => {
          updateStateInput(
            +event.currentTarget.value,
            event.currentTarget.name,
          );
        }}
      />
    </label>

    <label
      className="Form__label"
      htmlFor="frameId"
    >
      Frame size:
      <input
        className="Form__input"
        id="frameId"
        name="frameSize"
        type="number"
        defaultValue={3}
        onChange={(event) => {
          updateStateInput(
            +event.currentTarget.value,
            event.currentTarget.name,
          );
        }}
      />
    </label>

    <label
      className="Form__label"
      htmlFor="itemId"
    >
      Item width:
      <input
        className="Form__input"
        id="itemId"
        name="itemWidth"
        type="number"
        defaultValue={130}
        onChange={(event) => {
          updateStateInput(
            +event.currentTarget.value,
            event.currentTarget.name,
          );
        }}
      />
    </label>

    <label
      className="Form__label"
      htmlFor="durationId"
    >
      Animation duration:
      <input
        className="Form__input"
        id="durationIdId"
        name="animationDuration"
        type="number"
        defaultValue={1000}
        onChange={(event) => {
          updateStateInput(
            +event.currentTarget.value,
            event.currentTarget.name,
          );
        }}
      />
    </label>

    <label
      className="Form__label"
      htmlFor="infiniteId"
    >
      Infinite:
      <input
        className="Form__checkbox"
        id="infiniteId"
        name="duration"
        type="checkbox"
        onChange={(eventCheck) => {
          updateStateCheckBox(eventCheck.currentTarget.checked);
        }}
      />
    </label>
  </form>
);
