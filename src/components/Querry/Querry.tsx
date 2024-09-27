import React from 'react';
import './Querry.scss';
import { Querries } from '../../types/Queries';

type Props = {
  onChange: (num: number, querry: string) => void;
};

const Querry: React.FC<Props> = ({ onChange }) => {
  return (
    <section className="control-panel">
      <form className="control-panel__item">
        <label className="control-panel__input-label" htmlFor="itemId">
          Item Width
        </label>
        <input
          className="control-panel__input"
          type="number"
          id="itemId"
          name={Querries.itemWidth}
          onChange={e => onChange(+e.target.value, Querries.itemWidth)}
          placeholder="Please match item width"
        />
      </form>

      <form className="control-panel__item">
        <label htmlFor="frameId" className="control-panel__input-label">
          Frame
        </label>
        <input
          className="control-panel__input control-panel__input--frame"
          type="number"
          id="frameId"
          name={Querries.frameSize}
          onChange={e => onChange(+e.target.value, Querries.frameSize)}
          placeholder="Please match frame size"
        />
      </form>

      <form className="control-panel__item">
        <label className="control-panel__input-label" htmlFor="stepId">
          Steps
        </label>
        <input
          className="control-panel__input control-panel__input--step"
          type="number"
          id="stepId"
          name={Querries.step}
          onChange={e => onChange(+e.target.value, Querries.step)}
          placeholder="Please match step"
        />
      </form>

      <form className="control-panel__item">
        <label className="control-panel__input-label" htmlFor="animation">
          Animation duration
        </label>
        <input
          className="control-panel__input control-panel__input--animation"
          type="number"
          id="animation"
          name={Querries.animationDuration}
          onChange={e => onChange(+e.target.value, Querries.animationDuration)}
          placeholder="Animation duration"
        />
      </form>

      <form className="control-panel__item">
        <label className="control-panel__infinite-label" htmlFor="infinite">
          Infinite
        </label>
        <input
          className="control-panel__input control-panel__input--animation"
          type="checkbox"
          id="infinite"
          name={Querries.infinite}
          onChange={e => {
            const value = e.target.checked ? 1 : 0;

            onChange(value, Querries.infinite);
          }}
          placeholder="Animation duration"
        />
      </form>
    </section>
  );
};

export default Querry;
