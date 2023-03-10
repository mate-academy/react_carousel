import { FC } from 'react';
import { Input } from './Input';

type Props = {
  imagesLength: number,
  changeState: (name: string | undefined, value: number, a: boolean) => void,
};

export const Form: FC<Props> = ({ imagesLength, changeState }) => (
  <form>
    <h2>Custom settings</h2>

    <Input
      type="number"
      step="20"
      min="50"
      dataName="itemWidth"
      changeState={changeState}
    >
      Image width
    </Input>

    <Input
      type="number"
      max={`${imagesLength}`}
      dataName="frameSize"
      changeState={changeState}
    >
      Frame size
    </Input>

    <Input
      type="number"
      max={`${imagesLength}`}
      dataName="step"
      changeState={changeState}
    >
      Step
    </Input>

    <Input
      type="number"
      min="1000"
      step="200"
      dataName="animationDuration"
      changeState={changeState}
    >
      Animation duration
    </Input>

    <Input
      type="checkbox"
      dataName="infinite"
      changeState={changeState}
    >
      Infinite loop
    </Input>
  </form>
);
