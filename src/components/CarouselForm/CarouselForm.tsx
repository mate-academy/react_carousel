import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
} from 'react';
import style from './styles.module.scss';
import { IOptions } from '../../types/inputOpt';

interface Props {
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleChangeOption: (e: ChangeEvent<HTMLInputElement>) => void;
  options: IOptions;
  maxitemsLength: number;
  infinity: boolean;
  onChangeInfinity: Dispatch<SetStateAction<boolean>>;
}
export const CarouselForm: FC<Props> = ({
  handleKeyDown,
  handleChangeOption,
  options,
  maxitemsLength,
  infinity,
  onChangeInfinity,
}) => {
  return (
    <form className={style.input__container}>
      <label htmlFor="stepId" className={style.label}>
        Step
        <input
          type="number"
          id="stepId"
          name="step"
          value={options.step}
          onKeyDown={handleKeyDown}
          onChange={handleChangeOption}
        />
      </label>
      <label htmlFor="frameId" className={style.label}>
        Frame Size
        <input
          type="number"
          id="frameId"
          name="frameSize"
          value={options.frameSize}
          onKeyDown={handleKeyDown}
          onChange={handleChangeOption}
          min={1}
          max={maxitemsLength}
        />
      </label>
      <label htmlFor="itemId" className={style.label}>
        Item Width
        <input
          type="number"
          id="itemId"
          name="itemWidth"
          value={options.itemWidth}
          onKeyDown={handleKeyDown}
          onChange={handleChangeOption}
          min={1}
        />
      </label>
      <label htmlFor="animationDuration" className={style.label}>
        Animation Duration
        <input
          type="number"
          id="animationDuration"
          name="animationDuration"
          value={options.animationDuration}
          onKeyDown={handleKeyDown}
          onChange={handleChangeOption}
        />
      </label>
      <label htmlFor="infinity" className={style.label}>
        Infinity
        <input
          type="checkbox"
          id="infinity"
          name="infinity"
          checked={infinity}
          onChange={() => onChangeInfinity(!infinity)}
        />
      </label>
    </form>
  );
};
