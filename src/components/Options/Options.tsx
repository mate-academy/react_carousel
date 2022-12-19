import { Input } from './Input';
import './Options.scss';

interface Props {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  setFrameSize: React.Dispatch<React.SetStateAction<number>>,
  setItemWidth: React.Dispatch<React.SetStateAction<number>>,
  setAnimDuration: React.Dispatch<React.SetStateAction<number>>,
  setInfinite: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Options = (props: Props) => {
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
    setStep,
    setFrameSize,
    setAnimDuration,
    setItemWidth,
    setInfinite,
  } = props;

  const inputs:{
    type: 'number' | 'boolean',
    name: string,
    id: string,
    value: number | boolean,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }[] = [
    {
      type: 'number',
      name: 'Step',
      id: 'step',
      value: step,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => setStep(
        Number.parseInt(e.target.value, 10),
      ),
    },
    {
      type: 'number',
      name: 'Frame size',
      id: 'frame',
      value: frameSize,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => setFrameSize(
        Number.parseInt(e.target.value, 10),
      ),
    },
    {
      type: 'number',
      name: 'Item width',
      id: 'item',
      value: itemWidth,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => setItemWidth(
        Number.parseInt(e.target.value, 10),
      ),
    },
    {
      type: 'number',
      name: 'Animation duration',
      id: 'animation',
      value: animationDuration,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => setAnimDuration(
        Number.parseInt(e.target.value, 10),
      ),
    },
    {
      type: 'boolean',
      name: 'Infinite',
      id: 'inf',
      value: infinite,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => setInfinite(
        Boolean(e.target.checked),
      ),
    },
  ];

  return (
    <div className="Options">
      {inputs.map(inp => (
        <Input key={inp.name} props={inp} />
      ))}
    </div>
  );
};
