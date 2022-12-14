import { Input } from './Input';

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
  const inputs:{
    type: 'number' | 'boolean',
    name: string,
    value: number | boolean,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }[] = [
    {
      type: 'number',
      name: 'Step',
      value: props.step,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => props.sS
        .step(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'number',
      name: 'Frame size',
      value: props.frameSize,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => props.sS
        .frameSize(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'number',
      name: 'Item width',
      value: props.itemWidth,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => props.sS
        .itemWidth(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'number',
      name: 'Animation duration',
      value: props.animationDuration,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => props.sS
        .animationDuration(Number.parseInt(e.target.value, 10)),
    },
    {
      type: 'boolean',
      name: 'Infinite',
      value: props.infinite,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => props.sS
        .infinite(Boolean(e.target.checked)),
    },
  ];

  return (
    <div className="Options">
      {inputs.map(inp => (
        <Input key={inp.name} {...inp} />
      ))}
    </div>
  );
};
