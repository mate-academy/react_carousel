import React from 'react';
import './Form.scss';
import { ValuesImgType } from '../../App';

interface Props {
  valuesImage: ValuesImgType;
  setValuesImage: React.Dispatch<React.SetStateAction<ValuesImgType>>;
}

export const Form: React.FC<Props> = ({ valuesImage, setValuesImage }) => (
  <form action="/my-handling-form-page" method="get">
    <ul>
      <li>
        <label
          htmlFor="step"
          className="label"
        >
          Step
        </label>
        <input
          onChange={(e) => setValuesImage({
            ...valuesImage, step: +e.target.value,
          })}
          value={valuesImage.step}
          className="input is-primary"
          type="number"
          id="step"
          name="user_name"
          min="1"
          max="10"
        />
      </li>
      <li>
        <label
          htmlFor="frameSize"
          className="label"
        >
          Frame Size:
        </label>
        <input
          onChange={(e) => setValuesImage({
            ...valuesImage, frameSize: +e.target.value,
          })}
          value={valuesImage.frameSize}
          className="input is-primary"
          type="number"
          id="frameSize"
          name="user_email"
          min="1"
          max="10"
        />
      </li>
      <li>
        <label
          htmlFor="itemWidth"
          className="label"
        >
          Picture Width:
        </label>
        <input
          onChange={(e) => setValuesImage({
            ...valuesImage, itemWidth: +e.target.value,
          })}
          value={valuesImage.itemWidth}
          className="input is-primary"
          type="number"
          id="itemWidth"
          name="user_email"
          min="130"
          max="260"
          step="5"
        />
      </li>
      <li>
        <label
          htmlFor="animationDuration"
          className="label"
        >
          Animation Duration:
        </label>
        <input
          onChange={(e) => setValuesImage({
            ...valuesImage, animationDuration: +e.target.value,
          })}
          value={valuesImage.animationDuration}
          className="input is-primary"
          type="number"
          id="animationDuration"
          name="user_email"
          min="0"
          max="3000"
          step="50"
        />
      </li>
      <li className="checkboxItems">
        <label
          htmlFor="accepted"
          className="checkbox is-primary"
        >
          Infinity scroll
        </label>
        <input
          onChange={(e) => setValuesImage({
            ...valuesImage, infinite: e.target.checked,
          })}
          checked={valuesImage.infinite}
          id="accepted"
          type="checkbox"
          name="accepted"
        />
      </li>
    </ul>
  </form>
);
