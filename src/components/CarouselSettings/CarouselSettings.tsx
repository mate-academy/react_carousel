import { FC } from 'react';

interface Props {
  itemWidth: number;
  onChangeItemWidth: (value: number) => void;
  frameSize: number;
  onChangeFrameSize: (value: number) => void;
  step: number;
  onChangeStep: (value: number) => void;
  duration: number;
  onChangeDuration: (value: number) => void;
  infinite: boolean;
  onChangeInfinite: (value: boolean) => void;
}

export const CarouselSettings: FC<Props> = ({
  itemWidth,
  onChangeItemWidth,
  frameSize,
  onChangeFrameSize,
  step,
  onChangeStep,
  duration,
  onChangeDuration,
  infinite,
  onChangeInfinite,
}) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="itemId">Item Width:</label>
      <input
        id="itemId"
        type="number"
        name="itemId"
        value={itemWidth}
        onChange={e => onChangeItemWidth(+e.target.value)}
      />

      <label htmlFor="frameId">Frame Size:</label>
      <input
        id="frameId"
        type="number"
        name="frameId"
        value={frameSize}
        onChange={e => onChangeFrameSize(+e.target.value)}
      />

      <label htmlFor="stepId">Step:</label>
      <input
        id="stepId"
        type="number"
        name="stepId"
        value={step}
        onChange={e => onChangeStep(+e.target.value)}
      />

      <label htmlFor="duration">Animation Duration:</label>
      <input
        id="duration"
        type="number"
        name="duration"
        value={duration}
        onChange={e => onChangeDuration(+e.target.value)}
      />

      <label htmlFor="infinite">Infinite:</label>
      <input
        id="infinite"
        type="checkbox"
        name="infinite"
        checked={infinite}
        onChange={e => onChangeInfinite(e.target.checked)}
      />
    </form>
  );
};
