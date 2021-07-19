import React from 'react';
import { FuncType } from '../../types';

export const Controls = ({ changeSetting }) => (
  <form className="form">
    <label className="form__inputs">
      step:
      <label>{` 3`}</label>
      <input
        type="range"
        defaultValue="3"
        min="1"
        max="5"
        onInput={({ target }) => {
          const output = target.previousSibling;

          output.textContent = ` ${target.value}`;

          changeSetting(target, 'step');
        }}
      />
    </label>
    <label className="form__inputs">
      frameSize:
      <label>{` 3`}</label>
      <input
        type="range"
        defaultValue="3"
        min="1"
        max="5"
        onInput={({ target }) => {
          const output = target.previousSibling;

          output.textContent = ` ${target.value}`;

          changeSetting(target, 'frameSize');
        }}
      />
    </label>
    <label className="form__inputs">
      itemWidth:
      <label>{` 130`}</label>
      <input
        type="range"
        defaultValue="130"
        min="100"
        max="259"
        onInput={({ target }) => {
          const output = target.previousSibling;

          output.textContent = ` ${target.value}`;

          changeSetting(target, 'itemWidth');
        }}
      />
    </label>
    <label className="form__inputs">
      animationDuration:
      <label>{` 1000`}</label>
      <input
        type="range"
        defaultValue="1000"
        min="1000"
        max="3000"
        onInput={({ target }) => {
          const output = target.previousSibling;

          output.textContent = ` ${target.value}`;

          changeSetting(target, 'animationDuration');
        }}
      />
    </label>
    <label className="form__inputs">
      infinite:
      <input
        type="checkbox"
        onInput={({ target }) => {
          changeSetting(target, 'infinite');
        }}
      />
    </label>
  </form>
);

Controls.propTypes = {
  changeSetting: FuncType.isRequired,
};
