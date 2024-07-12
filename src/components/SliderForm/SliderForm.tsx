import React from 'react';
import { Options } from '../../types/Options';
import './SliderForm.scss';
import { optionKey } from '../../constants';

type Props = {
  data: Options;
  setData: (data: Options) => void;
};

export const SliderForm: React.FC<Props> = ({ data, setData }) => {
  const minOptions: Omit<Options, 'infinite'> = {
    step: 1,
    frameSize: 1,
    itemWidth: 1,
    animationDuration: 100,
  };

  const maxOptions: Omit<Options, 'infinite'> = {
    step: 10,
    frameSize: 10,
    itemWidth: 200,
    animationDuration: 2000,
  };

  const isValidLength = (value: number, min: number, max: number) => {
    return value >= min && value <= max;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const isValidNumber = /^[0-9]*$/.test(value);

    if (isValidNumber) {
      const min = minOptions[name as keyof typeof minOptions];
      const max = maxOptions[name as keyof typeof maxOptions];
      const numericValue = +value;

      if (isValidLength(numericValue, min, max)) {
        setData({ ...data, [name]: numericValue });
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setData({ ...data, [name]: checked });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const name = (e.target as HTMLInputElement).name;
    const min = minOptions[name as keyof typeof minOptions];

    if (e.key === 'Backspace') {
      setData({ ...data, [name]: min });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, dataset } = e.currentTarget;

    const step = data[name as keyof Options];

    if (typeof step === 'number') {
      const min = minOptions[name as keyof typeof minOptions];
      const max = maxOptions[name as keyof typeof maxOptions];
      const increment = dataset.action === 'decrement' ? -min : min;
      const newStep = step + increment;

      if (isValidLength(newStep, min, max)) {
        setData({ ...data, [name]: newStep });
      }
    }
  };

  return (
    <form action="" className="SliderForm">
      <div className="SliderForm__container">
        <div className="SliderForm__settings">
          <div className="SliderForm__column">
            <div className="SliderForm__item">
              <label htmlFor='stepId' className="SliderForm__title">Set step</label>

              <div className="SliderForm__field">
                <button
                  type="button"
                  name={optionKey.step}
                  data-action="decrement"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  -
                </button>

                <input
                  id='stepId'
                  type="text"
                  name="step"
                  value={data.step}
                  className="SliderForm__input"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />

                <button
                  type="button"
                  name={optionKey.step}
                  data-action="increment"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="SliderForm__column">
            <div className="SliderForm__item">
              <label htmlFor='frameId' className="SliderForm__title">Frame size</label>

              <div className="SliderForm__field">
                <button
                  type="button"
                  name={optionKey.frameSize}
                  data-action="decrement"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  -
                </button>

                <input
                  id='frameId'
                  type="text"
                  name="frameSize"
                  value={data.frameSize}
                  className="SliderForm__input"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />

                <button
                  type="button"
                  name={optionKey.frameSize}
                  data-action="increment"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="SliderForm__column">
            <div className="SliderForm__item">
              <label htmlFor='itemId' className="SliderForm__title">Item width</label>

              <div className="SliderForm__field">
                <button
                  type="button"
                  name={optionKey.itemWidth}
                  data-action="decrement"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  -
                </button>

                <input
                  id='itemId'
                  type="text"
                  name="itemWidth"
                  value={data.itemWidth}
                  className="SliderForm__input"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />

                <button
                  type="button"
                  name={optionKey.itemWidth}
                  data-action="increment"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="SliderForm__column">
            <div className="SliderForm__item">
              <h3 className="SliderForm__title">Animation duration</h3>

              <div className="SliderForm__field">
                <button
                  type="button"
                  name={optionKey.animationDuration}
                  data-action="decrement"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  -
                </button>

                <input
                  type="text"
                  name="animationDuration"
                  value={data.animationDuration}
                  className="SliderForm__input"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />

                <button
                  type="button"
                  name={optionKey.animationDuration}
                  data-action="increment"
                  className="SliderForm__btn"
                  onClick={handleClick}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="SliderForm__column">
            <div className="SliderForm__item">
              <label htmlFor="infinite" className="SliderForm__label">
                ∞
                <input
                  id="infinite"
                  type="checkbox"
                  name="infinite"
                  className="SliderForm__input SliderForm__input--check"
                  checked={data.infinite}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
