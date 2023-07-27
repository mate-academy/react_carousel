import React from 'react';
import './Form.scss';

type Props = {
  handleInput(event: React.ChangeEvent<HTMLInputElement>): void;
};

export class Form extends React.PureComponent<Props> {
  render() {
    const { handleInput } = this.props;

    return (
      <form className="form">
        <fieldset className="form__fieldSet">
          <legend>Options</legend>
          <label htmlFor="item">
            Image width:
            <input
              type="number"
              id="item"
              name="itemWidth"
              step={10}
              min={100}
              max={450}
              defaultValue={130}
              onChange={handleInput}
              className="form__input"
            />
          </label>

          <label htmlFor="frame">
            Frame size:
            <input
              type="number"
              id="frame"
              name="frameSize"
              min={1}
              max={10}
              defaultValue={3}
              onChange={handleInput}
              className="form__input"
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              type="number"
              id="stepId"
              name="step"
              min={1}
              max={10}
              defaultValue={3}
              onChange={handleInput}
              className="form__input"
            />
          </label>

          <label htmlFor="duration">
            Animation duration:
            <input
              type="number"
              id="duration"
              name="animationDuration"
              min={1000}
              max={5000}
              defaultValue={1000}
              onChange={handleInput}
              step="100"
              className="form__input"
            />
          </label>
        </fieldset>
      </form>
    );
  }
}
