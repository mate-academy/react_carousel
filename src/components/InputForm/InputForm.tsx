/* eslint-disable react/state-in-constructor */
import React from 'react';
import { CaruselSettings } from '../../types/CaruselSettings';

import './InputForm.scss';

type Props = {
  images: Array<string>
  caruselSettings: CaruselSettings,
  updateSettings: (event: React.FormEvent<HTMLInputElement>) => void,
};

// eslint-disable-next-line react/prefer-stateless-function
export class InputForm extends React.Component<Props> {
  render() {
    const {
      itemWidth,
      frameSize,
      stepCount,
      animationDuration,
      isInfinite,
    } = this.props.caruselSettings;
    const {
      images,
      updateSettings,
    } = this.props;

    return (
      <form
        className="inputForm"
        method="get"
      >
        <label className="inputForm__label" htmlFor="width">
          ItemWidth (px):
        </label>
        <input
          id="width"
          name="itemWidth"
          type="number"
          min="50"
          max="200"
          step="10"
          defaultValue={itemWidth}
          required
          className="inputForm__input"
          onChange={updateSettings}
        />
        <label className="inputForm__label" htmlFor="frameSize">
          FrameSize (count):
        </label>
        <input
          id="frameSize"
          name="frameSize"
          min="1"
          step="1"
          max={images.length}
          type="number"
          defaultValue={frameSize}
          required
          className="inputForm__input"
          onChange={updateSettings}
        />
        <label className="inputForm__label" htmlFor="stepCount">
          Step (count):
        </label>
        <input
          id="stepCount"
          name="stepCount"
          min="1"
          max={images.length}
          step="1"
          type="number"
          defaultValue={stepCount}
          required
          className="inputForm__input"
          onChange={updateSettings}
        />
        <label className="inputForm__label" htmlFor="animationDuration">
          animationDuration (ms):
        </label>
        <input
          id="animationDuration"
          name="animationDuration"
          min="0"
          step="100"
          type="number"
          defaultValue={animationDuration}
          required
          className="inputForm__input"
          onChange={updateSettings}
        />
        <label className="inputForm__label" htmlFor="isInfinite">
          isInfinite (y/n):
        </label>
        <input
          id="isInfinite"
          name="isInfinite"
          type="checkbox"
          checked={isInfinite}
          className="inputForm__input"
          onChange={updateSettings}
        />
      </form>
    );
  }
}
