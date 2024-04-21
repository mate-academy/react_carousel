import React, { FormEvent, useRef } from 'react';
import './Querry.scss';
import { Querries } from '../../types/Queries';

type Props = {
  onChange: (num: number, querry: string) => void;
};

const Querry: React.FC<Props> = ({ onChange }) => {
  const itemWidthInput = useRef<HTMLInputElement>(null);
  const frameSizeInput = useRef<HTMLInputElement>(null);
  const stepSizeInput = useRef<HTMLInputElement>(null);
  const animationDurationInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    querry: Querries,
  ) => {
    event.preventDefault();

    let value;

    if (itemWidthInput.current?.value) {
      value = itemWidthInput.current.value;
      onChange(+value, querry);
      itemWidthInput.current.value = '';

      return;
    }

    if (frameSizeInput.current?.value) {
      value = frameSizeInput.current.value;
      onChange(+value, querry);
      frameSizeInput.current.value = '';

      return;
    }

    if (stepSizeInput.current?.value) {
      value = stepSizeInput.current.value;
      onChange(+value, querry);
      stepSizeInput.current.value = '';

      return;
    }

    if (animationDurationInput.current?.value) {
      value = animationDurationInput.current.value;
      onChange(+value, querry);
      animationDurationInput.current.value = '';

      return;
    }

    throw new Error('Something went wrong. Please try again later)');
  };

  return (
    <section className="control-panel">
      <form
        className="control-panel__item"
        onSubmit={event => handleSubmit(event, Querries.itemWidth)}
      >
        <label className="control-panel__input-label" htmlFor="itemId">
          Item Width
        </label>
        <input
          className="control-panel__input"
          type="number"
          id="itemId"
          name={Querries.itemWidth}
          ref={itemWidthInput}
          placeholder="Please match item width"
        />
        <input className="control-panel__btn" type="submit" value="OK" />
      </form>

      <form
        className="control-panel__item"
        onSubmit={event => handleSubmit(event, Querries.frameSize)}
      >
        <label htmlFor="frameId" className="control-panel__input-label">
          Frame
        </label>
        <input
          className="control-panel__input control-panel__input--frame"
          type="number"
          id="frameId"
          name={Querries.frameSize}
          ref={frameSizeInput}
          placeholder="Please match frame size"
        />
        <input className="control-panel__btn" type="submit" value="OK" />
      </form>

      <form
        className="control-panel__item"
        onSubmit={event => handleSubmit(event, Querries.step)}
      >
        <label className="control-panel__input-label" htmlFor="stepId">
          Steps
        </label>
        <input
          className="control-panel__input control-panel__input--step"
          type="number"
          id="stepId"
          name={Querries.step}
          ref={stepSizeInput}
          placeholder="Please match step"
        />
        <input className="control-panel__btn" type="submit" value="OK" />
      </form>

      <form
        className="control-panel__item"
        onSubmit={event => handleSubmit(event, Querries.animationDuration)}
      >
        <input
          className="control-panel__input control-panel__input--animation"
          type="number"
          name={Querries.animationDuration}
          ref={animationDurationInput}
          placeholder="Animation duration"
        />
        <input className="control-panel__btn" type="submit" value="OK" />
      </form>
    </section>
  );
};

export default Querry;
