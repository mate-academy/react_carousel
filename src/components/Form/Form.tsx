import { FC, ChangeEvent } from 'react';
import { CarouselOptions } from '../../types/CarouselOptions';
import { OptionsEnum } from '../../enums/OptionsEnum';
import './Form.scss';

type Props = {
  carouselOptions: CarouselOptions;
  changeOptionValue: (event: ChangeEvent<HTMLInputElement>) => void;
  maxSlidesCount: number;
};

export const Form: FC<Props> = (
  { carouselOptions, changeOptionValue, maxSlidesCount },
) => {
  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
  } = carouselOptions;

  return (
    <form action="#" className="App-Form Form">
      <div className="Form-Field">
        <label
          htmlFor={OptionsEnum.ItemWidth}
          className="Form-Label"
        >
          {'Item width: '}
        </label>

        <input
          id="itemId"
          className="Form-Input"
          type="number"
          name={OptionsEnum.ItemWidth}
          value={itemWidth}
          onChange={changeOptionValue}
        />
      </div>

      <div className="Form-Field">
        <label
          htmlFor={OptionsEnum.FrameSize}
          className="Form-Label"
        >
          {'Frame size: '}
        </label>

        <input
          id="frameId"
          className="Form-Input"
          type="number"
          name={OptionsEnum.FrameSize}
          value={frameSize}
          min={1}
          max={maxSlidesCount}
          onChange={changeOptionValue}
        />
      </div>

      <div className="Form-Field">
        <label
          htmlFor={OptionsEnum.Step}
          className="Form-Label"
        >
          {'Step: '}
        </label>

        <input
          id="stepId"
          className="Form-Input"
          type="number"
          name={OptionsEnum.Step}
          value={step}
          min={1}
          max={maxSlidesCount - 1}
          onChange={changeOptionValue}
        />
      </div>

      <div className="Form-Field">
        <label
          htmlFor={OptionsEnum.AnimationDuration}
          className="Form-Label"
        >
          {'Animation duration (ms): '}
        </label>

        <input
          id={OptionsEnum.AnimationDuration}
          className="Form-Input"
          type="number"
          name={OptionsEnum.AnimationDuration}
          value={animationDuration}
          onChange={changeOptionValue}
        />
      </div>
    </form>
  );
};
