import { Input } from './Input';

export const Controller: React.FC<Props> = ({
  changeDuration,
  changeFrameSize,
  changeItemWidth,
  changeStep,

}) => {
  return (
    <div className="controller">
      <Input
        name="width"
        defaultValue={130}
        min={50}
        max={250}
        step={10}
        onChange={changeItemWidth}
      />
      <Input
        name="frameSize"
        defaultValue={3}
        min={1}
        max={10}
        step={1}
        onChange={changeFrameSize}
      />
      <Input
        name="step"
        defaultValue={3}
        min={1}
        max={10}
        step={1}
        onChange={changeStep}
      />
      <Input
        name="animation-duration"
        defaultValue={1000}
        min={100}
        max={5000}
        step={100}
        onChange={changeDuration}
      />
    </div>
  );
};

interface Props {
  changeItemWidth: (value:number) => void,
  changeFrameSize: (value:number) => void,
  changeDuration: (value:number) => void,
  changeStep: (value:number) => void,
}
