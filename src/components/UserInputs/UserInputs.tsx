import { FC } from 'react';
import { InputsProps } from '../../types';
import s from './UserInputs.module.scss';

export const UserInputs: FC<InputsProps> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  setState,
}) => {
  return (
    <div className={s.formWrapper}>
      <div className={s.inputWrapper}>
        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={event => setState({ step: Number(event.target.value) })}
        />
      </div>
      <div className={s.inputWrapper}>
        <label htmlFor="frameId">Frame Size:</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={event =>
            setState({ frameSize: Number(event.target.value) })
          }
        />
      </div>
      <div className={s.inputWrapper}>
        <label htmlFor="itemId">itemWidth:</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={event =>
            setState({ itemWidth: Number(event.target.value) })
          }
        />
      </div>
      <div className={s.inputWrapper}>
        <label htmlFor="animationDuration">animationDuration:</label>
        <input
          id="animationDuration"
          type="number"
          value={animationDuration}
          onChange={event =>
            setState({ animationDuration: Number(event.target.value) })
          }
        />
      </div>
      <div className={s.inputWrapper}>
        <label htmlFor="infinite">infinite:</label>
        <input
          id="infinite"
          type="checkbox"
          checked={infinite}
          onChange={event => setState({ infinite: event.target.checked })}
        />
      </div>
    </div>
  );
};
