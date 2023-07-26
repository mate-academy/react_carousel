import React from 'react';
import './Form.scss';
import { Params } from '../types/Params';
import { images } from './Images';

interface Props {
  vizibleParam: Params,
  changeImgPosition: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const Form: React.FC<Props> = ({
  vizibleParam,
  changeImgPosition,
}) => {
  const {
    step, frameSize, itemWidth, animationDuration,
  } = vizibleParam;

  return (
    <form className="Form">
      <fieldset className="Form__fieldset">
        <legend className="Form__title">
          Make your own settings
        </legend>

        <label className="Form__input">
          Set img step
          <input
            type="number"
            name="step"
            className="Form__settings"
            min={1}
            max={images.length - 1}
            value={step}
            onChange={changeImgPosition}
          />
        </label>

        <label className="Form__input">
          Set frame size
          <input
            type="number"
            name="frameSize"
            className="Form__settings"
            min={1}
            max={images.length}
            value={frameSize}
            onChange={changeImgPosition}
          />
        </label>

        <label className="Form__input">
          Set width
          <input
            type="number"
            name="itemWidth"
            className="Form__settings"
            min={30}
            max={200}
            value={itemWidth}
            onChange={changeImgPosition}
          />
        </label>

        <label className="Form__input">
          Set time
          <input
            type="number"
            name="animationDuration"
            className="Form__settings"
            min={0}
            max={3000}
            value={animationDuration}
            onChange={changeImgPosition}
          />
        </label>

        <label className="Form__input">
          Infinite
          <input
            name="infinite"
            type="checkbox"
            className="Form__checkbox"
            onChange={changeImgPosition}
          />
        </label>
      </fieldset>
    </form>
  );
};

export default Form;
