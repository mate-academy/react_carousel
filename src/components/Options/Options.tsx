import './Options.scss';

type Props = {
  step: number
  frameSize: number
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  changeStep: (val: number) => void;
  changeFrameSize: (val: number) => void;
  changeItemWidth: (val: number) => void;
  changeAnimationDuration: (val: number) => void;
  changeInfinite: (val: boolean) => void;
};

export const Options: React.FC<Props> = ({
  step,
  itemWidth,
  frameSize,
  animationDuration,
  infinite,
  changeStep,
  changeFrameSize,
  changeItemWidth,
  changeAnimationDuration,
  changeInfinite,
}) => {
  return (
    <div className="Options">
      <label className="Options__row">
        Item Width:
        <input
          type="number"
          className="Options__input"
          step={10}
          value={itemWidth}
          onChange={e => changeItemWidth(+e.target.value)}
        />
      </label>

      <label className="Options__row">
        Step:
        <input
          type="number"
          className="Options__input"
          value={step}
          onChange={e => changeStep(+e.target.value)}
        />
      </label>

      <label className="Options__row">
        Frame Size:
        <input
          type="number"
          className="Options__input"
          value={frameSize}
          max="8"
          min="1"
          onChange={e => changeFrameSize(+e.target.value)}
        />
      </label>

      <label className="Options__row">
        Animation Duration:
        <input
          type="number"
          className="Options__input"
          step={100}
          value={animationDuration}
          onChange={e => changeAnimationDuration(+e.target.value)}
        />
      </label>

      <label className="Options__row">
        Infinite:
        <input
          type="checkbox"
          className="Options__input"
          checked={infinite}
          onChange={e => changeInfinite(e.target.checked)}
        />
      </label>
    </div>
  );
};
