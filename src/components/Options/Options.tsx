import { Input } from './Input';
import './Options.scss';

interface Props {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  sS: {
    step: React.Dispatch<React.SetStateAction<number>>,
    frameSize: React.Dispatch<React.SetStateAction<number>>,
    itemWidth: React.Dispatch<React.SetStateAction<number>>,
    animationDuration: React.Dispatch<React.SetStateAction<number>>,
    infinite: React.Dispatch<React.SetStateAction<boolean>>,
  },
}

export const Options = (props: Props) => {
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
    sS,
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
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => sS
        .step(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'number',
      name: 'Frame size',
      id: 'frame',
      value: frameSize,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => sS
        .frameSize(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'number',
      name: 'Item width',
      id: 'item',
      value: itemWidth,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => sS
        .itemWidth(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'number',
      name: 'Animation duration',
      id: 'animation',
      value: animationDuration,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => sS
        .animationDuration(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'boolean',
      name: 'Infinite',
      id: 'inf',
      value: infinite,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => sS
        .infinite(Boolean(e.target.checked)),
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
